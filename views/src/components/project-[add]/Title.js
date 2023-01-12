import React, { useRef, useState } from 'react'
import { ClassicInput, IconInput, Textarea } from '../tools/global/Inputs';
import { useClickOutside } from "../tools/hooks/useClickOutside";
import CategoriesPicker from '../home/CategoriesPicker';
import { ErrorCard } from '../tools/global/Error';
import Icon from '../tools/icons/Icon';
import { addClass } from '../Utils';

const Title = ({ datas, setDatas, error, setError }) => {
    const wrapperRef = useRef()
    const [display, setDisplay] = useState(false)
    useClickOutside(wrapperRef, () => setDisplay(false))

    return (
        <div className="add-project-card">
            <h2>Titre, sous-titre et catégorie</h2>
            <div className="row py-4">
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <h3>Titre du projet</h3>
                    <p>
                        Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                    </p>
                </div>
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <p className="title full">Titre <span>Champ requis</span></p>
                    <ClassicInput
                        className={`full ${addClass(error.element === "title", 'err')}`}
                        type="text"
                        placeholder="Titre du projet"
                        value={datas.title}
                        onChange={e => setDatas(data => ({ ...data, title: (e.target.value).substring(0, 60) }))}
                    />
                    <div className="field_infos full">{datas.title.length} / 60 caractères</div>
                    {error.element === "title" &&
                        <ErrorCard
                            display={error.element === "title"}
                            text={error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
            </div>

            <div className="row py-4">
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <h3>Sous-titre du projet</h3>
                    <p>
                        Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                    </p>
                </div>
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <p className="title full">Sous-titre <span>Champ requis</span></p>
                    <Textarea
                        className={`w-full small ${addClass(error.element === "subtitle", 'err')}`}
                        type="text"
                        placeholder="Sous-titre du projet"
                        value={datas.subtitle}
                        onChange={e => setDatas(data => ({ ...data, subtitle: (e.target.value).substring(0, 100) }))}
                    />
                    <div className="field_infos full">{datas.subtitle.length} / 100 caractères</div>
                    {error.element === "subtitle" &&
                        <ErrorCard
                            display={error.element === "subtitle"}
                            text={error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
            </div>

            <div className="row py-4">
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <h3>Catégorie</h3>
                    <p>
                        Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                    </p>
                </div>
                <div className="col-12 col-lg-6 flex flex-col justify-center">
                    <p className="title full">Catégorie <span>Champ requis</span></p>
                    <div className="relative" ref={wrapperRef}>
                        <IconInput
                            className={`full ${addClass(error.element === "category", 'err')}`}
                            inputClassName="!pl-2"
                            type="text"
                            placeholder="Catégorie"
                            readOnly
                            value={datas.category}
                            onChange={e => setDatas(data => ({ ...data, category: e.target.value }))}
                            onClick={() => setDisplay(!display)}
                            endIcon={<Icon name="CaretDown" />}
                        />
                        <CategoriesPicker
                            open={display}
                            setOpen={setDisplay}
                            category={datas.category}
                            setCategory={setDatas}
                        />
                    </div>
                    {error.element === "category" &&
                        <ErrorCard
                            display={error.element === "category"}
                            text={error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Title