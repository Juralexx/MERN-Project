import React from 'react'
import { Button } from '../../tools/global/Button'
import { ErrorCard } from '../../tools/global/Error'
import { ClassicInput, Textarea } from '../../tools/global/Inputs'

const Qna = ({ qna, setQna, isErr, setErr, error, setError }) => {
    const checkErr = (name) => { if (isErr === name) return "err" }

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

    return (
        qna.length > 0 &&
        <div className="add-project-card">
            {qna.map((element, key) => {
                return (
                    <div className="qna-form mb-4" key={key}>
                        <div className="header flex mb-5">
                            <h3 className="mr-4">Question n°{key + 1}</h3>
                            <Button onClick={() => deleteQuestion(key)}>Supprimer</Button>
                            {key + 1 === qna.length &&
                                <Button className="ml-2" onClick={() => setQna(e => [...e, { question: "", answer: "" }])} disabled={qna[key].question.length < 10 || qna[key].answer.length < 10}
                                >Ajouter une nouvelle question</Button>
                            }
                        </div>
                        <div className="content-form">
                            <p className="title full">Question</p>
                            <ClassicInput className={`${checkErr(`question-${key}`)} full`} type="text" placeholder={`Question n°${key + 1}`} onChange={e => handleQuestion(e, key)} value={element.question} />
                            <div className="field_infos full">
                                {element.question.length} / 100 caractères
                            </div>
                            {isErr === `question-${key}` && <ErrorCard display={isErr === `question-${key}`} text={error} clean={() => setErr("")} />}
                        </div>

                        <div className="content-form mt-4">
                            <p className="title full">Réponse</p>
                            <Textarea className={`${checkErr(`answer-${key}`)} w-full`} type="text" placeholder={`Réponse n°${key + 1}`} onChange={e => handleAnswer(e, key)} value={element.answer} />
                            <div className="field_infos full">
                                {element.answer.length} / 1000 caractères
                            </div>
                            {isErr === `answer-${key}` && <ErrorCard display={isErr === `answer-${key}`} text={error} clean={() => setErr("")} />}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Qna