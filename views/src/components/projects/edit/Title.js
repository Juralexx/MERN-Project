import React from 'react'
import { ErrorCard } from '../../tools/global/Error'
import { ClassicInput, Textarea, DropdownInput } from '../../tools/global/Inputs'
import { categories } from '../../../api/categories'
import { addClass } from '../../Utils'

const Title = ({ title, subtitle, category, setDatas, error, setError }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-6">
                    <h3>Titre du projet</h3>
                    <p>
                        Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                    </p>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="title full">Titre <span>Champ requis</span></div>
                    <ClassicInput
                        className={`full ${addClass(error.element === "title", 'err')}`}
                        type="text"
                        placeholder="Titre du projet"
                        onChange={(e) => setDatas(data => ({ ...data, title: (e.target.value).substring(0, 60) }))}
                        value={title}
                    />
                    <div className="field_infos full">{title.length} / 60</div>
                    {error.element === "title" &&
                        <ErrorCard
                            display={error.element === "title"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
            </div>
            <div className="row py-9">
                <div className="col-12 col-lg-6">
                    <h3>Sous-titre du projet</h3>
                    <p>
                        Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                    </p>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="title full">Sous-titre <span>Champ requis</span></div>
                    <Textarea
                        className={`w-full ${addClass(error.element === "subtitle", 'err')}`}
                        type="text"
                        placeholder="Sous-titre du projet"
                        onChange={(e) => setDatas(data => ({ ...data, subtitle: (e.target.value).substring(0, 120) }))}
                        value={subtitle}
                    />
                    <div className="field_infos full">{subtitle.length} / 120</div>
                    {error.element === "subtitle" &&
                        <ErrorCard
                            display={error.element === "subtitle"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-6">
                    <h3>Catégorie</h3>
                    <p>
                        Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.
                    </p>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="title full">Catégorie <span>Champ requis</span></div>
                    <DropdownInput
                        className={`full ${addClass(error.element === "category", 'err')}`}
                        readOnly
                        placeholder="Catégorie"
                        type="text"
                        value={category}
                        onChange={() => { }}
                    >
                        {categories.map((category, key) => {
                            return <div key={key} onClick={() => setDatas(data => ({ ...data, category: category.name }))}>{category.name}</div>
                        })}
                    </DropdownInput>
                    {error.element === "category" &&
                        <ErrorCard
                            display={error.element === "category"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default Title