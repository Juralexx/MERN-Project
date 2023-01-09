import React from 'react'
import { ErrorCard } from '../../../tools/global/Error'
import { ClassicInput, Textarea, DropdownInput } from '../../../tools/global/Inputs'
import { categories } from '../../../../api/categories'

const Title = ({ title, setTitle, subtitle, setSubtitle, error, setError, category, setCategory }) => {
    const checkErr = name => { if (error.element === name) return "err" }

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6">
                    <p className="title full">Titre <span>Champ requis</span></p>
                    <ClassicInput
                        className={`full ${checkErr("title")}`}
                        type="text"
                        placeholder="Titre du projet"
                        onChange={(e) => setTitle((e.target.value).substring(0, 60))}
                        value={title}
                    />
                    <div className="field_infos full">{title.length} / 60 caractères</div>
                    {error.element === "title" &&
                        <ErrorCard
                            display={error.element === "title"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
                <div className="col-12 col-md-6">
                    <h3>Titre du projet</h3>
                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                </div>
            </div>
            <div className="row py-9">
                <div className="col-12 col-md-6">
                    <p className="title full">Sous-titre <span>Champ requis</span></p>
                    <Textarea
                        className={`w-full ${checkErr("subtitle")}`}
                        type="text"
                        placeholder="Sous-titre du projet"
                        onChange={(e) => setSubtitle((e.target.value).substring(0, 120))}
                        value={subtitle}
                    />
                    <div className="field_infos full">{subtitle.length} / 120 caractères</div>
                    {error.element === "subtitle" &&
                        <ErrorCard
                            display={error.element === "subtitle"}
                            text={error.error}
                            clean={() => setError({ element: "", error: "" })}
                        />
                    }
                </div>
                <div className="col-12 col-md-6">
                    <h3>Sous-titre du projet</h3>
                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <p className="title full">Catégorie <span>Champ requis</span></p>
                    <DropdownInput
                        className={`full ${checkErr("category")}`}
                        readOnly
                        cross
                        placeholder="Catégorie"
                        type="text"
                        value={category}
                        onChange={() => { }}
                        onClean={() => setCategory("")}
                    >
                        {categories.map((category, key) => {
                            return <div key={key} onClick={() => setCategory(category.name)}>{category.name}</div>
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
                <div className="col-12 col-md-6">
                    <h3>Catégorie</h3>
                    <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                        Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                </div>
            </div>
        </>
    )
}

export default Title