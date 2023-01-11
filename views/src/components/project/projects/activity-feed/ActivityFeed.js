import React, { useState, useEffect } from 'react'
import { dateParser, getHourOnly, keepNewDateOnly, lastDay, reverseArray, thisDay, timeBetween } from '../../../Utils'
import { StringButton } from '../../../tools/global/Button'
import ToolsMenu from '../../../tools/global/ToolsMenu'
import Icon from '../../../tools/icons/Icon'

const ActivityFeed = ({ project, user, websocket }) => {
    const [dates, setDates] = useState([])
    const [activities, setActivities] = useState([])
    const reversed = reverseArray(project.activity_feed)

    useEffect(() => {
        if (project.activity_feed) {
            keepNewDateOnly(reverseArray(project.activity_feed), setDates)
            setActivities(reverseArray(project.activity_feed).slice(0, 20))
        }
    }, [project.activity_feed])

    return (
        <div className="dashboard-card home-activity-feed">
            <div className="home-activity-feed-header">
                <h3>Fil d'activités <span>{activities.length}</span></h3>
                <div className="flex items-center">
                    <StringButton className="mr-4" onClick={() => setActivities(reversed)}>Voir tous</StringButton>
                    <ToolsMenu>
                        <div className="tools_choice" onClick={() => setActivities(thisDay(reversed))}>Aujourd'hui</div>
                        <div className="tools_choice" onClick={() => setActivities(lastDay(reversed))}>Hier</div>
                        <div className="tools_choice" onClick={() => setActivities(timeBetween(reversed, 7))}>Cette semaine</div>
                        <div className="tools_choice" onClick={() => setActivities(timeBetween(reversed, 30))}>Ce mois-ci</div>
                        <div className="tools_choice" onClick={() => setActivities(timeBetween(reversed, 365))}>Cette année</div>
                    </ToolsMenu>
                </div>
            </div>
            <div className="dashboard-card-container home-activity-feed-container custom-scrollbar">
                {activities.length > 0 ? (
                    activities.map((element, key) => {
                        return (
                            <div className="home-activity-feed-item" key={key}>
                                {dates.some(activity => activity.date === element.date.substring(0, 10) && activity.index === key) &&
                                    <div className="activity-date">{dateParser(element.date)}</div>
                                }
                                <div className="home-activity-feed-item-inner">
                                    <div className="activity-hour">
                                        {getHourOnly(new Date(element.date))}
                                    </div>
                                    <div className="activity-content">
                                        {element.type === "create-task" &&
                                            <p><span className="mr-1">{element.who}</span> a ajouté une nouvelle tâche : <span className="ml-1">{element.task}</span></p>
                                        }
                                        {element.type === "update-task" &&
                                            <p><span className="mr-1">{element.who}</span> a modifié la tâche <span className="ml-1">{element.task}</span></p>
                                        }
                                        {element.type === "update-task-state" &&
                                            <p><span className="mr-1">{element.who}</span> a modifié la tâche <span className="mx-1">{element.task}</span> de <span className="mx-1">{element.prevState}</span> à <span className="ml-1">{element.newState}</span></p>
                                        }
                                        {element.type === "delete-task" &&
                                            <p><span className="mr-1">{element.who}</span> a supprimé la tâche <span className="ml-1">{element.task}</span></p>
                                        }
                                        {element.type === "name-admin" &&
                                            <p><span className="mr-1">{element.who}</span> a nommé <span className="mx-1">{element.newAdmin}</span> Administrateur</p>
                                        }
                                        {element.type === "join-project" &&
                                            <p><span className="mr-1">{element.who}</span> a rejoint le projet</p>
                                        }
                                        {element.type === "exclude-from-project" &&
                                            <p><span className="mr-1">{element.who}</span> a exclu <span className="ml-1">{element.excluded}</span></p>
                                        }
                                        {element.type === "leave-project" &&
                                            <p><span className="mr-1">{element.leaver}</span> a quitté le projet</p>
                                        }
                                        {element.type === "create-qna" &&
                                            <p><span className="mr-1">{element.who}</span> a créé une FAQ</p>
                                        }
                                        {element.type === "update-qna" &&
                                            <p><span className="mr-1">{element.who}</span> a modifié une FAQ</p>
                                        }
                                        {element.type === "delete-qna" &&
                                            <p><span className="mr-1">{element.who}</span> a supprimé la FAQ</p>
                                        }
                                        {element.type === "add-actuality" &&
                                            <p><span className="mr-1">{element.who}</span> a ajouté une nouvelle actualité : {element.actuality}</p>
                                        }
                                        {element.type === "update-actuality" &&
                                            <p><span className="mr-1">{element.who}</span> a modifié l'actualité : {element.actuality}</p>
                                        }
                                        {element.type === "delete-actuality" &&
                                            <p><span className="mr-1">{element.who}</span> a supprimé l'actualité : {element.actuality}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="empty-array">
                        <Icon name="Calendar" />
                        <div>Vous n'avez aucunes activité récentes...</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActivityFeed