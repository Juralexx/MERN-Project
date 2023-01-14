import React, { useState, useEffect } from 'react'
import { dateParser, getHourOnly, keepNewDateOnly, lastDay, reverseArray, thisDay, timeBetween } from '../../Utils'
import { TextButton } from '../../tools/global/Button'
import ToolsMenu from '../../tools/global/ToolsMenu'
import Icon from '../../tools/icons/Icon'
import { Link } from 'react-router-dom'
import { activityFeedContent, randomColor } from './functions'

const HomeActivityFeed = ({ project }) => {
    const [dates, setDates] = useState([])
    const [activities, setActivities] = useState([])
    const reversed = reverseArray(project.activity_feed)

    useEffect(() => {
        if (project.activity_feed) {
            setDates(keepNewDateOnly(reverseArray(project.activity_feed)))
            setActivities(reverseArray(project.activity_feed).slice(0, 20))
        }
    }, [project.activity_feed])

    return (
        <div className="dashboard-card home-activity-feed">
            <div className="home-activity-feed-header">
                <h3>Fil d'activités <span>{activities.length}</span></h3>
                <div className="flex items-center">
                    <TextButton className="mr-4">
                        <Link to="activity-feed">Voir tous</Link>
                    </TextButton>
                    <ToolsMenu>
                        <div className="tools_choice" onClick={() => setActivities(thisDay(reversed))}>
                            Aujourd'hui
                        </div>
                        <div className="tools_choice" onClick={() => setActivities(lastDay(reversed))}>
                            Hier
                        </div>
                        <div className="tools_choice" onClick={() => setActivities(timeBetween(reversed, 7))}>
                            Cette semaine
                        </div>
                        <div className="tools_choice" onClick={() => setActivities(timeBetween(reversed, 30))}>
                            Ce mois-ci
                        </div>
                        <div className="tools_choice" onClick={() => setActivities(timeBetween(reversed, 365))}>
                            Cette année
                        </div>
                    </ToolsMenu>
                </div>
            </div>
            <div className="dashboard-card-container activity-feed-container custom-scrollbar">
                {activities.length > 0 ? (
                    activities.map((element, key) => {
                        return (
                            <div className='activity-feed-block' key={key}>
                                {dates.some(activity => activity.date === element.date.substring(0, 10) && activity.index === key) &&
                                    <div className="activity-date">
                                        <Icon name="Calendar" className={randomColor()} /> {dateParser(element.date)}
                                    </div>
                                }
                                <div className="home-activity-feed-item" key={key}>
                                    <div className="activity-hour">
                                        {getHourOnly(new Date(element.date))}
                                    </div>
                                    <div className="timeline-badge">
                                        <Icon name="OutlineCircle" className={randomColor()} />
                                    </div>
                                    <div className="activity-content">
                                        {activityFeedContent(element)}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="empty-array">
                        <Icon name="Calendar" />
                        <div>Aucun activité à afficher...</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomeActivityFeed