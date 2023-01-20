import React, { useMemo, useState } from 'react'
import { addClass, bySelectedDate, convertToLocalDate, dateParser, getHourOnly, keepNewDateOnly, lastDay, reverseArray, thisDay, timeBetween } from '../../Utils'
import Icon from '../../tools/icons/Icon'
import { activityFeedContent, randomColor } from './functions'
import { DropdownInput } from '../../tools/global/Inputs'
import { TextButton } from '../../tools/global/Button'
import { DatePicker } from '../../tools/global/DatePicker'

const ActivityFeed = ({ project }) => {
    const today = useMemo(() => new Date().toISOString(), [])
    const allDates = keepNewDateOnly(reverseArray(project.activity_feed) || [])
    const reversed = reverseArray(project.activity_feed) || []
    const [activityFeed, setActivityFeed] = useState({
        activities: reversed,
        dates: allDates
    })

    const [filter, setFilter] = useState("")
    const [byDate, setByDate] = useState({ state: false, date: today })

    return (
        <div className="container-lg py-8 !px-0 sm:!px-3">
            <div className='dashboard-big-card'>
                <div className="dashboard-big-card-title">
                    <h2>Fil d'activité <span>{project.activity_feed.length}</span></h2>
                    <div className="flex items-center">
                        {byDate.date !== today &&
                            <TextButton className="mr-2 red xbg-red" onClick={() => {
                                setActivityFeed({
                                    activities: reverseArray(project.activity_feed || []),
                                    dates: allDates
                                })
                                setByDate(prevState => ({ ...prevState, date: today }))
                            }}>
                                Annuler
                            </TextButton>
                        }
                        <TextButton className="!h-[42px]" onClick={() => setByDate(prevState => ({ ...prevState, state: true }))}>
                            {byDate.date !== today ? dateParser(byDate.date) : 'Par date'}
                        </TextButton>
                        <DropdownInput
                            className="ml-3"
                            placeholder="Par date"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            cross
                            onClean={() => {
                                setActivityFeed({
                                    activities: reversed,
                                    dates: allDates
                                })
                                setFilter("")
                            }}
                        >
                            <div onClick={() => {
                                setActivityFeed(prevState => ({ ...prevState, activities: thisDay(reversed) }))
                                setFilter("Aujourd'hui")
                            }}>
                                Aujourd'hui
                            </div>
                            <div onClick={() => {
                                setActivityFeed(prevState => ({ ...prevState, activities: lastDay(reversed) }))
                                setFilter("Hier")
                            }}>
                                Hier
                            </div>
                            <div onClick={() => {
                                setActivityFeed(prevState => ({ ...prevState, activities: timeBetween(reversed, 7) }))
                                setFilter("Cette semaine")
                            }}>
                                Cette semaine
                            </div>
                            <div onClick={() => {
                                setActivityFeed(prevState => ({ ...prevState, activities: timeBetween(reversed, 30) }))
                                setFilter("Ce mois-ci")
                            }}>
                                Ce mois-ci
                            </div>
                            <div onClick={() => {
                                setActivityFeed(prevState => ({ ...prevState, activities: timeBetween(reversed, 365) }))
                                setFilter("Cette année")
                            }}>
                                Cette année
                            </div>
                        </DropdownInput>
                    </div>
                </div>
                <div className="dashboard-card-container activity-feed-container activity-page custom-scrollbar">
                    {activityFeed.activities.length > 0 ? (
                        activityFeed.activities.map((element, key) => {
                            return (
                                <div className='activity-feed-block' key={key}>
                                    {activityFeed.dates.some(activity => activity.date === element.date.substring(0, 10) && activity.index === key) &&
                                        <div className="activity-date">
                                            <Icon name="Calendar" className={randomColor()} /> {dateParser(element.date)}
                                        </div>
                                    }
                                    <div className={`
                                            home-activity-feed-item
                                            ${addClass((activityFeed.dates.some(activity => activity.date !== element.date.substring(0, 10) && activity.index === key + 1)), 'no-before')
                                        }`}
                                    >
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
                            <div>Aucune activité à afficher...</div>
                        </div>
                    )}
                </div>
            </div>
            <DatePicker
                open={byDate.state}
                setOpen={setByDate}
                selected={byDate.date}
                onDayClick={date => {
                    setByDate({ state: false, date: date })
                    setActivityFeed({
                        activities: bySelectedDate(reverseArray(project.activity_feed), date),
                        dates: [{ index: 0, date: convertToLocalDate(date) }]
                    })
                }}
            />
        </div>
    )
}

export default ActivityFeed