import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AddProjectForm = () => {
    const [submitted, setSubmitted] = useState(false)
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [numberofcontributors, setNumberofcontributors] = useState("");
    const wrapperRef = useRef()

    const [displaySelection, setDisplaySelection] = useState(false)

    const handleAddProject = async (e) => {
        e.preventDefault();

        const pseudoError = document.querySelector(".pseudo.error");
        const categoryError = document.querySelector(".category.error");
        const contentError = document.querySelector(".content.error");
        const numberofcontributorsError = document.querySelector(".numberofcontributors.error");

        pseudoError.innerHTML = ""
        categoryError.innerHTML = ""
        contentError.innerHTML = ""
        numberofcontributorsError.innerHTML = ""


        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/project/add`,
            data: {
                title,
                category,
                content,
                numberofcontributors
            },
        })
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo;
                    categoryError.innerHTML = res.data.errors.email;
                    contentError.innerHTML = res.data.errors.password;
                    numberofcontributorsError.innerHTML = res.data.errors.password;
                } else {
                    setSubmitted(true)
                }
            })
            .catch((err) => console.log(err));
    };

    const handleClickOutside = (e) => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(e.target)) {
            setDisplaySelection(false);
        }
    }; useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCategory = (e) => {
        setCategory(e.target.value)
        setDisplaySelection(false)
    }

    return (
        <>
            <div className="add-title-category-bloc add-project-bloc">
                <h3>Un titre clair et cours est le meilleur moyen de vous faire repérer !</h3>
                <label htmlFor="title"><span>Quel est le titre de votre project ?</span><small>Champ requis</small></label>
                <div className="input-container">
                    <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <div className="title error"></div>

                <label htmlFor="category"><span>Catégorie</span><small>Champ requis</small></label>
                <div className="input-container">
                    <div>
                        <input readOnly type="text" name="category" id="category" onClick={() => setDisplaySelection(!displaySelection)} onChange={(e) => setCategory(e.target.value)} value={category} placeholder="Choisissez une categorie" />
                        {displaySelection && (
                            <div className="category-selection" ref={wrapperRef}>
                                <option value="category 1" onClick={handleCategory}>Category 1</option>
                                <option value="category 2" onClick={handleCategory}>Category 2</option>
                                <option value="category 3" onClick={handleCategory}>Category 3</option>
                                <option value="category 4" onClick={handleCategory}>Category 4</option>
                            </div>
                        )}
                    </div>
                </div>
                <div className="category error"></div>
                <div className="btn-container">
                    <button className="btn btn-primary">Continuer</button>
                </div>
            </div>

            <div className="add-numberofcontributors-bloc add-project-bloc">
                <h3>Avez-vous besoin d'une équipe ?</h3>
                <label htmlFor="numberofcontributors"><span>Nombre de personne dont vous avez besoin</span></label>
                <div className="number-container">
                    <input type="number" name="numberofcontributors" id="numberofcontributors" onChange={(e) => setNumberofcontributors(e.target.value)} value={numberofcontributors} />
                    <div className="undefined-choice">
                        <input type="checkbox" className="option-input" onClick={(e) => setNumberofcontributors("Non défini")} /> <label>Je ne sais pas encore</label>
                    </div>
                </div>
                <div className="numberofcontributors error"></div>

                <div className="btn-container">
                    <button className="btn btn-primary">Continuer</button>
                </div>
            </div>

            <div className="add-content-bloc add-project-bloc" disabled>
                <h3>Il est temps d'expliquer votre projet en détail !</h3>
                <div className="content-container">
                    <label htmlFor="content"><span>Description de votre projet</span><small>Champ requis</small></label>
                    <textarea type="text" name="content" id="content" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                </div>
                <div className="title error"></div>

                <div className="btn-container">
                    <button className="btn btn-primary">Continuer</button>
                </div>
            </div>


            {/* <div className="btn-container">
                <button className="btn btn-primary" id="submitRegister" onClick={handleAddProject}>Valider mon projet</button>
            </div> */}
        </>
    );
};

export default AddProjectForm;