import React from 'react'
import { Button, TextButton } from '../tools/global/Button'
import { ErrorCard } from '../tools/global/Error'
import { ClassicInput, Textarea } from '../tools/global/Inputs'
import { addClass, deleteItemFromArray } from '../Utils'

const Qna = ({ datas, setDatas, error, setError }) => {

    const handleQuestion = (e, key) => {
        let arr = [...datas.qna]
        arr[key].question = e.target.value.substring(0, 200)
        setDatas(data => ({ ...data, qna: arr }))
    }

    const handleAnswer = (e, key) => {
        let arr = [...datas.qna]
        arr[key].answer = e.target.value.substring(0, 1000)
        setDatas(data => ({ ...data, qna: arr }))
    }

    return (
        datas.qna.length > 0 && (
            <div className="add-project-card">
                {datas.qna.map((element, key) => {
                    return (
                        <div className="qna-form mb-4" key={key}>
                            <div className="header flex items-center mb-5">
                                <h4 className="mr-4 !mb-0">Question n°{key + 1}</h4>
                                <TextButton
                                    onClick={() => setDatas(data => ({ ...data, qna: deleteItemFromArray(datas.qna, key) }))}
                                >
                                    Supprimer
                                </TextButton>
                            </div>
                            <div className="content-form">
                                <p className="title full">Question</p>
                                <ClassicInput
                                    className={`${addClass(error.element === `question-${key}`, 'err')} full`}
                                    type="text"
                                    placeholder={`Question n°${key + 1}`}
                                    onChange={e => handleQuestion(e, key)} value={element.question}
                                />
                                <div className="field_infos full">
                                    {element.question.length} / 200 caractères
                                </div>
                                {error.element === `question-${key}` &&
                                    <ErrorCard
                                        display={error.element === `question-${key}`}
                                        text={error.error}
                                        clean={() => setError({ element: "", error: "" })}
                                    />
                                }
                            </div>

                            <div className="content-form mt-4">
                                <p className="title full">Réponse</p>
                                <Textarea
                                    className={`${addClass(error.element === `answer-${key}`, 'err')} w-full`}
                                    type="text"
                                    placeholder={`Réponse n°${key + 1}`}
                                    value={element.answer}
                                    onChange={e => handleAnswer(e, key)}
                                />
                                <div className="field_infos full">
                                    {element.answer.length} / 1000 caractères
                                </div>
                                {error.element === `answer-${key}` &&
                                    <ErrorCard
                                        display={error.element === `answer-${key}`}
                                        text={error.error}
                                        clean={() => setError({ element: "", error: "" })}
                                    />
                                }
                            </div>
                            {key + 1 === datas.qna.length &&
                                <Button
                                    className="mx-auto"
                                    onClick={() => setDatas(data => ({ ...data, qna: [...datas.qna, { question: "", answer: "" }] }))}
                                    disabled={datas.qna[key].question.length < 10 || datas.qna[key].answer.length < 10}
                                >
                                    Ajouter une nouvelle question
                                </Button>
                            }
                        </div>
                    )
                })}
            </div>
        )
    )
}

export default Qna