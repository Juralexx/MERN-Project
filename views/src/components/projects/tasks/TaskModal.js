import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentTask } from '../../../actions/project.action'
import { isDatePassed, stateToBackground, stateToString, statusToBackground, statusToString } from '../../tools/functions/task'
import { dateParser, getHourOnly, randomNbLtID } from '../../Utils'
import Modal from '../../tools/global/Modal'
import { Button } from '../../tools/global/Button'
import { Textarea } from '../../tools/global/Inputs'

const TaskModal = ({ project, task, user, open, setOpen, setUpdateTask }) => {
    const [comment, setComment] = useState({
        state: false,
        text: ""
    })
    const dispatch = useDispatch()

    const handleComment = () => {
        const com = {
            _id: randomNbLtID(24),
            poster: user.pseudo,
            posterId: user._id,
            text: comment.text,
            date: new Date().toISOString()
        }
        dispatch(commentTask(project._id, task._id, com))
        setComment({ state: false, text: "" })
    }

    return (
        <Modal open={open} setOpen={setOpen} className="task-modal">
            <div className="task-modal_header">
                <h4>{task.title}</h4>
                <p>Créée par {task.creator} le {dateParser(task.date)} à {getHourOnly(new Date(task.date))}</p>
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
                    <Button className="mr-1" onClick={() => setComment(prevState => ({ ...prevState, state: true }))}>
                        Commenter
                    </Button>
                    <Button onClick={() => {
                        setUpdateTask(true)
                        setOpen(false)
                    }}>
                        Modifier
                    </Button>
                </div>
            ) : (
                <div className="btn_container">
                    <Button className="mr-1" onClick={handleComment}>
                        Enregistrer
                    </Button>
                    <Button onClick={() => setComment(prevState => ({ ...prevState, state: false }))}>
                        Annuler
                    </Button>
                </div>
            )}
            <div className="comments-container">
                {task.comments && task.comments.length > 0 ? (
                    task.comments.map((element, key) => {
                        return (
                            <div className="comment" key={key}>
                                <div className="comment-header">
                                    <p>{element.poster}</p>
                                    <p>Le {dateParser(element.date)} à {getHourOnly(new Date(task.date))}</p>
                                </div>
                                <div className="comment-body">{element.text}</div>
                            </div>
                        )
                    })
                ) : (
                    <div className="is-empty">Aucun commentaire pour le moment</div>
                )}
            </div>
        </Modal>
    )
}

export default TaskModal