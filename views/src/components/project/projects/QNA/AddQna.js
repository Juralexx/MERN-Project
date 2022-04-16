import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createQNA } from '../../../../actions/project.action'
import { Button } from '../../../tools/components/Button'
import { ErrorCard } from '../../../tools/components/Error'
import { ClassicInput, Textarea } from '../../../tools/components/Inputs'

const AddQna = ({ project, user }) => {
    const [qna, setQna] = useState([{ question: "", answer: "" }])
    const [isErr, setErr] = useState(false)
    const [error, setError] = useState(null)
    const checkErr = (name) => { if (isErr === name) return "err" }
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleQuestion = (e, key) => {
        let arr = [...qna]
        arr[key].question = e.target.value
        setQna(arr)
    }

    const handleAnswer = (e, key) => {
        let arr = [...qna]
        arr[key].answer = e.target.value
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
                    const activity = { type: "create-qna", who: user.pseudo, date: new Date().toISOString() }
                    dispatch(createQNA(project._id, qna, activity))
                        .then(() => {
                            const redirection = navigate(`/projects/${project.URLID}/${project.URL}/qna`)
                            setTimeout(() => redirection, 2000)
                        })
                        .catch(err => console.log(err))
                }
            }
        })
    }

    return (
        <div className="content-container add-qna">
            <div className="content-box">
                <div className="header flex justify-between mb-5">
                    <h2>Foire aux questions</h2>
                </div>
                {qna.map((element, key) => {
                    return (
                        <div className="qna-form mt-8" key={key}>
                            <div className="header flex justify-between mb-5">
                                <h3>Question n°{key + 1}</h3>
                                <Button text="Supprimer" onClick={() => deleteQuestion(key)} />
                            </div>
                            <div className="content-form">
                                <p className="title full">Question <span>Champ requis</span></p>
                                <ClassicInput className={`${checkErr(`question-${key}`)} full`} type="text" placeholder="Titre de l'actualité" onChange={e => handleQuestion(e, key)} value={element.question} />
                                <div className="field-infos full">{element.question.length} / 100 caractères</div>
                                {isErr === `question-${key}` && <ErrorCard display={isErr === `question-${key}`} text={error} clean={() => setErr("")} />}
                            </div>

                            <div className="content-form mt-4">
                                <p className="title full">Réponse <span>Champ requis</span></p>
                                <Textarea className={`${checkErr(`answer-${key}`)} full`} type="text" placeholder="Sous-titre du projet" onChange={e => handleAnswer(e, key)} value={element.answer} />
                                <div className="field-infos full">{element.answer.length} / 1000 caractères</div>
                                {isErr === `answer-${key}` && <ErrorCard display={isErr === `answer-${key}`} text={error} clean={() => setErr("")} />}
                            </div>
                        </div>
                    )
                })}
                <div className="btn-container">
                    <Button text="Ajouter une nouvelle question" onClick={() => setQna(e => [...e, { question: "", answer: "" }])} />
                    <Button text="Enregistrer" onClick={handleQna} />
                </div>
            </div>
        </div>
    )
}

export default AddQna