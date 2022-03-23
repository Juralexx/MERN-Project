import React, { useState, useEffect } from 'react'
import { dateParser, getHourOnly, keepNewDateOnly } from '../../../Utils'

const ActivityFeed = ({ project, user, websocket }) => {
    const [dates, setDates] = useState([])
    const [activities, setActivities] = useState([])

    useEffect(() => {
        keepNewDateOnly(project.activity_feed, setDates)
        setActivities(project.activity_feed.reverse())
    }, [project.activity_feed])

    return (
        <div className="py-3">
            <div className="relative flex justify-between items-center px-3 py-3 mb-2 border-b border-b-slate-300/30">
                <div className="text-xl">Fil d'activité</div>
            </div>
            {project.activity_feed.reverse().map((element, key) => {
                return (
                    <div className="relative py-3 px-3" key={key}>
                        {dates.some(element => element.date === element.date.substr(0, 10) && element.index === key) &&
                            <div className="pb-3 text-xs">{dateParser(element.date)}</div>
                        }
                        <div className="flex">
                            <div className="flex items-center text-xs mr-3">
                                <div>{getHourOnly(new Date(element.date))}</div>
                            </div>
                            {element.type === "create-task" && (
                                <div className="flex items-center">
                                    <strong className="mr-1">{element.who}</strong> a ajouté une nouvelle tâche : <strong className="ml-1">{element.task}</strong>
                                </div>
                            )}
                            {element.type === "update-task" && (
                                <div className="flex items-center">
                                    <strong className="mr-1">{element.who}</strong> a modifié la tâche <strong className="ml-1">{element.task}</strong>
                                </div>
                            )}
                            {element.type === "update-task-state" && (
                                <div className="flex items-center">
                                    <strong className="mr-1">{element.who}</strong> a modifié la tâche <strong className="mx-1">{element.task}</strong> de <strong className="mx-1">{element.prevState}</strong> à <strong className="ml-1">{element.newState}</strong>
                                </div>
                            )}
                            {element.type === "delete-task" && (
                                <div className="flex items-center">
                                    <strong className="mr-1">{element.who}</strong> a supprimé la tâche <strong className="ml-1">{element.task}</strong>
                                </div>
                            )}
                            {element.type === "name-admin" && (
                                <div className="flex items-center">
                                    <strong className="mr-1">{element.who}</strong> a nommé <strong className="mx-1">{element.newAdmin}</strong> Administrateur
                                </div>
                            )}
                            {element.type === "join-project" && (
                                <div className="flex items-center">
                                    <strong className="mr-1">{element.who}</strong> a rejoint le projet
                                </div>
                            )}
                            {element.type === "exclude-from-project" && (
                                <div className="flex items-center">
                                    <strong className="mr-1">{element.who}</strong> a exclu <strong className="ml-1">{element.excluded}</strong>
                                </div>
                            )}
                            {element.type === "leave-project" && (
                                <div className="flex items-center">
                                    <strong className="mr-1">{element.leaver}</strong> a quitté le projet
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ActivityFeed