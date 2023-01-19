import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextButton } from '../../tools/global/Button'
import { ErrorCard } from '../../tools/global/Error'
import { ClassicInput, Textarea } from '../../tools/global/Inputs'

const AddQna = ({ project, user, websocket }) => {
    const [qna, setQna] = useState([{ question: "", answer: "" }])
    const [error, setError] = useState({ element: "", error: "" })
    const checkErr = name => { if (error.element === name) return "err" }
    const navigate = useNavigate()

    const handleQuestion = (e, key) => {
        let arr = [...qna]
        arr[key].question = e.target.value.substring(0, 100)
        setQna(arr)
    }

    const handleAnswer = (e, key) => {
        let arr = [...qna]
        arr[key].answer = e.target.value.substring(0, 1000)
        setQna(arr)
    }

    const deleteQuestion = (key) => {
        let arr = [...qna]
        arr.splice(key, 1)
        setQna(arr)
    }

    const handleQna = async () => {
        let i = 0
        qna.forEach((element, key) => {
            i++
            if (element.question === "" || element.question.length < 10 || element.question.length > 100) {
                setError({
                    element: `question-${key}`,
                    error: "Veuillez saisir une question valide, votre question doit faire entre 10 et 100 caractères."
                })
            } else if (element.answer === "" || element.answer.length < 10 || element.answer.length > 4000) {
                setError({
                    element: `answer-${key}`,
                    error: "Veuillez ajouter une reponse valide à votre question, votre question doit faire entre 10 et 4000 caractères."
                })
            }
        })
        if (i === qna.length) {
            const activity = {
                type: "create-qna",
                who: user.pseudo,
                date: new Date().toISOString()
            }
            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/project/${project._id}/qna/add/`,
                data: {
                    qna: qna,
                    activity: activity
                }
            })
                .then(async res => {
                    if (res.data.errors) {
                        if (res.data.errors.question) {
                            setError({
                                element: 'question',
                                error: res.data.errors.question
                            })
                        } else if (res.data.errors.answer) {
                            setError({
                                element: 'answer',
                                error: res.data.errors.answer
                            })
                        }
                    } else {
                        await project.members.map(member => {
                            return websocket.current.emit("createQna", {
                                receiverId: member._id,
                                qna: qna,
                                activity: activity
                            })
                        })
                    }
                })
                .then(() => {
                    const redirection = navigate(`/projects/${project.URLID}/${project.URL}/qna`)
                    setTimeout(() => redirection, 2000)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="container-lg py-8 pb-[150px] add-qna">
            <div className="header flex justify-between mb-5">
                <h2>Foire aux questions</h2>
            </div>
            {qna.map((element, key) => {
                return (
                    <div className="qna-form mt-8" key={key}>
                        <div className="header flex items-center mb-5">
                            <h3>Question n°{key + 1}</h3>
                            <TextButton className="ml-4" onClick={() => deleteQuestion(key)}>Supprimer</TextButton>
                        </div>

                        <div className="content-form">
                            <p className="title full">Question <span>Champ requis</span></p>
                            <ClassicInput
                                className={`${checkErr(`question-${key}`)} full`}
                                type="text"
                                placeholder={`Question n°${key + 1}`}
                                onChange={e => handleQuestion(e, key)}
                                value={element.question}
                            />
                            <div className="field_infos full">{element.question.length} / 100 caractères</div>
                            {error.element === `question-${key}` &&
                                <ErrorCard display={error.element === `question-${key}`} text={error.error} clean={() => setError({ element: "", error: "" })} />
                            }
                        </div>

                        <div className="content-form mt-4">
                            <p className="title full">Réponse <span>Champ requis</span></p>
                            <Textarea
                                className={`${checkErr(`answer-${key}`)} w-full`}
                                type="text"
                                placeholder={`Réponse n°${key + 1}`}
                                onChange={e => handleAnswer(e, key)} value={element.answer}
                            />
                            <div className="field_infos full">{element.answer.length} / 1000 caractères</div>
                            {error.element === `answer-${key}` &&
                                <ErrorCard display={error.element === `answer-${key}`} text={error.error} clean={() => setError({ element: "", error: "" })} />
                            }
                        </div>
                    </div>
                )
            })}
            <div id="back-actions">
                <div className='back-actions-inner'>
                    <div className='flex flex-col justify-center flex-grow'>
                        <TextButton
                            className="mb-2 w-full"
                            onClick={() => setQna(e => [...e, { question: "", answer: "" }])}
                        >
                            Ajouter une nouvelle question
                        </TextButton>
                        <div className='flex justify-center'>
                            <TextButton>
                                <Link to={`/projects/${project.URLID}/${project.URL}/qna`}>Annuler</Link>
                            </TextButton>
                            <Button className="ml-2" onClick={handleQna}>Enregistrer</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddQna