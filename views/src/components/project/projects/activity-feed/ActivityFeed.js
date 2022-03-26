import React, { useState, useEffect } from 'react'
import { dateParser, getHourOnly, keepNewDateOnly, reverseArray, timeBetween } from '../../../Utils'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiFillCloud } from 'react-icons/ai'
import { ToolsBtn } from '../../../tools/components/Button'
import SmallMenu from '../../../tools/components/SmallMenu'

const ActivityFeed = ({ project, user, websocket }) => {
    const [dates, setDates] = useState([])
    const [activities, setActivities] = useState([])
    const [display, setDisplay] = useState(false)
    const reversed = reverseArray(project.activity_feed)

    useEffect(() => {
        if (project.activity_feed) {
            keepNewDateOnly(reverseArray(project.activity_feed), setDates)
            setActivities(reverseArray(project.activity_feed).slice(0, 20))
        }
    }, [project.activity_feed])

    const removeBefore = (element, key) => {
        if (dates.some(activity => activity.date === element.date.substring(0, 10) && activity.index === key)) return "no-before"
    }

    return (
        <div className="home-activity-feed">
            <div className="home-activity-feed-header">
                <h2>Fil d'activité</h2>
                <ToolsBtn onClick={() => setDisplay(!display)}><BiDotsHorizontalRounded /></ToolsBtn>
                {display &&
                    <SmallMenu top="top-1">
                        <div className="tools-choice" onClick={() => setActivities(timeBetween(reversed, 0))}>Aujourd'hui</div>
                        <div className="tools-choice" onClick={() => setActivities(timeBetween(reversed, 1))}>Hier</div>
                        <div className="tools-choice" onClick={() => setActivities(timeBetween(reversed, 7))}>Cette semaine</div>
                        <div className="tools-choice" onClick={() => setActivities(timeBetween(reversed, 30))}>Ce mois-ci</div>
                        <div className="tools-choice" onClick={() => setActivities(timeBetween(reversed, 365))}>Cette année</div>
                    </SmallMenu>
                }
            </div>
            <div className="home-activity-feed-container custom-scrollbar">
                {activities.length > 0 &&
                    activities.map((element, key) => {
                        return (
                            <div className="home-activity-feed-item" key={key}>
                                {dates.some(activity => activity.date === element.date.substring(0, 10) && activity.index === key) &&
                                    <div className="activity-date">{dateParser(element.date)}</div>
                                }
                                <div className={`home-activity-feed-item-inner ${removeBefore(element, key)}`}>
                                    <div className="activity-hour">
                                        <div>{getHourOnly(new Date(element.date))}</div>
                                    </div>
                                    <div className="activity-content">
                                        {element.type === "create-task" &&
                                            <div><AiFillCloud /><p><span className="mr-1">{element.who}</span> a ajouté une nouvelle tâche : <span className="ml-1">{element.task}</span></p></div>
                                        }
                                        {element.type === "update-task" &&
                                            <div><AiFillCloud /><p><span className="mr-1">{element.who}</span> a modifié la tâche <span className="ml-1">{element.task}</span></p></div>
                                        }
                                        {element.type === "update-task-state" &&
                                            <div><AiFillCloud /><p><span className="mr-1">{element.who}</span> a modifié la tâche <span className="mx-1">{element.task}</span> de <span className="mx-1">{element.prevState}</span> à <span className="ml-1">{element.newState}</span></p></div>
                                        }
                                        {element.type === "delete-task" &&
                                            <div><AiFillCloud /><p><span className="mr-1">{element.who}</span> a supprimé la tâche <span className="ml-1">{element.task}</span></p></div>
                                        }
                                        {element.type === "name-admin" &&
                                            <div><AiFillCloud /><p><span className="mr-1">{element.who}</span> a nommé <span className="mx-1">{element.newAdmin}</span> Administrateur</p></div>
                                        }
                                        {element.type === "join-project" &&
                                            <div><AiFillCloud /><p><span className="mr-1">{element.who}</span> a rejoint le projet</p></div>
                                        }
                                        {element.type === "exclude-from-project" &&
                                            <div><AiFillCloud /><p><span className="mr-1">{element.who}</span> a exclu <span className="ml-1">{element.excluded}</span></p></div>
                                        }
                                        {element.type === "leave-project" &&
                                            <div><AiFillCloud /><p><span className="mr-1">{element.leaver}</span> a quitté le projet</p></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ActivityFeed