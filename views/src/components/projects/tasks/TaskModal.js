import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Oval from '../../tools/loaders/Oval'
import Modal from '../../tools/global/Modal'
import UpdateTask from './UpdateTask'
import { TinyAvatar } from '../../tools/global/Avatars'
import { Button, TextButton } from '../../tools/global/Button'
import { Textarea } from '../../tools/global/Inputs'
import { dateParser, getHourOnly, goBack, randomNbLtID } from '../../Utils'
import { isDatePassed, stateToBackground, stateToString, statusToBackground, statusToString } from '../../tools/functions/task'

const TaskModal = ({ project, user, websocket }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [task, setTask] = useState({})
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                await axios.get(`${process.env.REACT_APP_API_URL}api/project/${project._id}/tasks/task/${id}`)
                    .then(res => {
                        if (res.data.tasks.length > 0) {
                            setTask(res.data.tasks[0])
                            setLoading(false)
                        } else navigate(`/projects/${project.URLID}/${project.URL}/tasks`)
                    }).catch(err => console.error(err))
            }
            fetchTask()
        }
    }, [id, project])

    /**
     * 
     */

    const [comment, setComment] = useState({ state: false, text: "" })

    const handleComment = async () => {
        const com = {
            _id: randomNbLtID(24),
            text: comment.text,
            date: new Date().toISOString(),
            poster: {
                _id: user._id,
                pseudo: user.pseudo,
                picture: user.picture,
            }
        }
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/${project._id}/tasks/${task._id}/comment/`,
            data: {
                comment: com
            }
        })
            .then(async () => {
                await project.members.map(member => {
                    return websocket.current.emit('commentTask', {
                        receiverId: member._id,
                        taskId: task._id,
                        comment: com
                    })
                })
                setComment({ state: false, text: "" })
            })
    }

    /**
     * 
     */

    return (
        <Routes>
            <Route index element={
                <Modal open={true} onClose={() => goBack()} className="task-modal">
                    {!isLoading ? (
                        <>
                            <div className="task-modal_header">
                                <h4>{task.title}</h4>
                                <p>Créée par {task.poster.pseudo} le {dateParser(task.date)} à {getHourOnly(new Date(task.date))}</p>
                                <div className="flex mt-2">
                                    <div className={`details mr-1 ${stateToBackground(task.state)}`}>
                                        {stateToString(task.state)}
                                    </div>
                                    <div className={`details mr-1 ${statusToBackground(task.status)}`}>
                                        {statusToString(task.status)}
                                    </div>
                                    <div className={`details mr-1 ${isDatePassed(task.end)}`}>
                                        {dateParser(task.end)}
                                    </div>
                                    {task.members.map((member, key) => {
                                        return <div className="pseudo mr-1" key={key}>
                                            {member.pseudo.substring(0, 3)}
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="task-modal-description">{task.description}</div>
                            {comment.state &&
                                <div className="add-comment-container">
                                    <div className="mb-2">Commentaire</div>
                                    <Textarea
                                        className="w-full"
                                        placeholder="Ajouter un commentaire..."
                                        value={comment.text}
                                        onChange={e => setComment(prevState => ({ ...prevState, text: e.target.value }))}
                                    />
                                </div>
                            }
                            {!comment.state ? (
                                <div className="btn_container">
                                    <TextButton className="mr-2" onClick={() => setComment(prevState => ({ ...prevState, state: true }))}>
                                        Commenter
                                    </TextButton>
                                    <Button>
                                        <Link to='update'>
                                            Modifier
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="btn_container">
                                    <Button className="mr-1" onClick={handleComment}>
                                        Enregistrer
                                    </Button>
                                    <TextButton onClick={() => setComment(prevState => ({ ...prevState, state: false }))}>
                                        Annuler
                                    </TextButton>
                                </div>
                            )}
                            <div className="comments-container custom-scrollbar">
                                {task.comments && task.comments.length > 0 ? (
                                    task.comments.map((element, key) => {
                                        return (
                                            <div className="comment" key={key}>
                                                <div className="comment-header">
                                                    <div className='flex items-center'>
                                                        <TinyAvatar pic={element.poster.picture} />
                                                        <p>{element.poster.pseudo}</p>
                                                    </div>
                                                    <p className='date'>Le {dateParser(element.date)} à {getHourOnly(new Date(task.date))}</p>
                                                </div>
                                                <div className="comment-body">{element.text}</div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="is-empty">Aucun commentaire pour le moment</div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className='min-h-[300px] flex items-center'>
                            <Oval />
                        </div>
                    )}
                </Modal>
            } />
            <Route path="update" element={
                Object.keys(task).length > 0 &&
                <UpdateTask
                    task={task}
                    project={project}
                    user={user}
                    websocket={websocket}
                />
            } />
        </Routes>
    )
}

export default TaskModal