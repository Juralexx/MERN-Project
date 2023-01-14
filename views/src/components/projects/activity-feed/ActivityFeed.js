import React, { useState } from 'react'
import { dateParser, getHourOnly, keepNewDateOnly, lastDay, reverseArray, thisDay, timeBetween } from '../../Utils'
import Icon from '../../tools/icons/Icon'
import { activityFeedContent, randomColor } from './functions'
import { DropdownInput } from '../../tools/global/Inputs'

const ActivityFeed = ({ project }) => {
    const dates = keepNewDateOnly(reverseArray(project.activity_feed || []))
    const [activities, setActivities] = useState(reverseArray(project.activity_feed || []))
    const reversed = reverseArray(project.activity_feed)

    const [filter, setFilter] = useState("")

    return (
        <div className="container-lg py-8 !px-0 sm:!px-3">
            <div className='dashboard-big-card'>
                <div className="dashboard-big-card-title">
                    <h2>Fil d'activité <span>{project.activity_feed.length}</span></h2>
                    <div className="flex items-center">
                        <DropdownInput
                            className="ml-3"
                            placeholder="Par date"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            cross
                            onClean={() => {
                                setActivities(reversed)
                                setFilter("")
                            }}
                        >
                            <div onClick={() => {
                                setActivities(thisDay(reversed))
                                setFilter("Aujourd'hui")
                            }}>
                                Aujourd'hui
                            </div>
                            <div onClick={() => {
                                setActivities(lastDay(reversed))
                                setFilter("Hier")
                            }}>
                                Hier
                            </div>
                            <div onClick={() => {
                                setActivities(timeBetween(reversed, 7))
                                setFilter("Cette semaine")
                            }}>
                                Cette semaine
                            </div>
                            <div onClick={() => {
                                setActivities(timeBetween(reversed, 30))
                                setFilter("Ce mois-ci")
                            }}>
                                Ce mois-ci
                            </div>
                            <div onClick={() => {
                                setActivities(timeBetween(reversed, 365))
                                setFilter("Cette année")
                            }}>
                                Cette année
                            </div>
                        </DropdownInput>
                    </div>
                </div>
                <div className="dashboard-card-container activity-feed-container activity-page custom-scrollbar">
                    {activities.length > 0 ? (
                        activities.map((element, key) => {
                            return (
                                <>
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
                                </>
                            )
                        })
                    ) : (
                        <div className="empty-array">
                            <Icon name="Calendar" />
                            <div>Aucune activité à afficher...</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ActivityFeed