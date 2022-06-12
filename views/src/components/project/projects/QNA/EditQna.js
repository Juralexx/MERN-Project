import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { updateQNA } from '../../../../actions/project.action'
import { Button, TextButton } from '../../../tools/global/Button'
import { ErrorCard } from '../../../tools/global/Error'
import { ClassicInput, Textarea } from '../../../tools/global/Inputs'

const EditQna = ({ project, user }) => {
    const [qna, setQna] = useState(project.QNA)
    const [isErr, setErr] = useState(false)
    const [error, setError] = useState(null)
    const checkErr = (name) => { if (isErr === name) return "err" }
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const handleQna = () => {
        let i = 0
        qna.forEach(async (element, key) => {
            i++
            if (element.question === "" || element.question.length < 10 || element.question.length > 100) {
                setErr(`question-${key}`)
                setError("Veuillez saisir une question valide, votre question doit faire entre 10 et 100 caractères")
            } else if (element.answer === "" || element.answer.length < 10 || element.answer.length > 4000) {
                setErr(`answer-${key}`)
                setError("Veuillez ajouter une reponse valide à votre question")
            } else {
                if (i === qna.length) {
                    const activity = { type: "update-qna", who: user.pseudo, date: new Date().toISOString() }
                    dispatch(updateQNA(project._id, qna, activity))
                        .then(() => {
                            const redirection = navigate(`/projects/${project.URLID}/${project.URL}/qna`)
                            setTimeout(redirection, 2000)
                        }).catch(err => console.log(err))
                }
            }
        })
    }

    return (
        <div className="content_container add-qna">
            <div className="content_box">
                <div className="header flex justify-between mb-5">
                    <h2>Foire aux questions</h2>
                </div>
                {qna.map((element, key) => {
                    return (
                        <div className="qna-form mt-8" key={key}>
                            <div className="header flex mb-5">
                                <h3>Question n°{key + 1}</h3>
                                <Button text="Supprimer" className="ml-4" onClick={() => deleteQuestion(key)} />
                                {key + 1 === qna.length &&
                                    <Button text="Ajouter une nouvelle question" className="ml-2" onClick={() => setQna(e => [...e, { question: "", answer: "" }])} disabled={qna[key].question.length < 10 || qna[key].answer.length < 10} />
                                }
                            </div>
                            <div className="content-form">
                                <p className="title w-full">Question <span>Champ requis</span></p>
                                <ClassicInput className={`${checkErr(`question-${key}`)} full`} type="text" placeholder={`Question n°${key + 1}`} onChange={e => handleQuestion(e, key)} value={element.question} />
                                <div className="field_infos w-full">{element.question.length} / 100 caractères</div>
                                {isErr === `question-${key}` && <ErrorCard display={isErr === `question-${key}`} text={error} clean={() => setErr("")} />}
                            </div>

                            <div className="content-form mt-4">
                                <p className="title w-full">Réponse <span>Champ requis</span></p>
                                <Textarea className={`${checkErr(`answer-${key}`)} w-full`} type="text" placeholder={`Réponse n°${key + 1}`} onChange={e => handleAnswer(e, key)} value={element.answer} />
                                <div className="field_infos w-full">{element.answer.length} / 1000 caractères</div>
                                {isErr === `answer-${key}` && <ErrorCard display={isErr === `answer-${key}`} text={error} clean={() => setErr("")} />}
                            </div>
                        </div>
                    )
                })}
                <div id="back-actions">
                    <NavLink to={`/projects/${project.URLID}/${project.URL}/qna`}><TextButton text="Annuler" /></NavLink>
                    <Button text="Enregistrer" className="ml-2" onClick={handleQna} />
                </div>
            </div>
        </div>
    )
}

export default EditQna