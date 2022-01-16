import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { removeAccents } from "../Utils";

const AddProjectForm = () => {
    const userData = useSelector((state) => state.userReducer)
    const posterId = userData._id
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [numberofcontributors, setNumberofcontributors] = useState("");
    const wrapperRef = useRef()
    const navigate = useNavigate()
    const [displaySelection, setDisplaySelection] = useState(false)

    const handleAddProject = async () => {
        const titleError = document.querySelector(".title.error");
        const categoryError = document.querySelector(".category.error");
        const contentError = document.querySelector(".content.error");
        const numberofcontributorsError = document.querySelector(".numberofcontributors.error");

        titleError.innerHTML = ""
        categoryError.innerHTML = ""
        contentError.innerHTML = ""
        numberofcontributorsError.innerHTML = ""

        if (title === "" || title.length < 10 || title.length > 120) { titleError.innerHTML = "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 120 caractères" }
        else if (category === "") { categoryError.innerHTML = "Veuillez saisir une catégorie" }
        else if (numberofcontributors.value === "" || numberofcontributors.value === 0) { numberofcontributorsError.innerHTML = "Veuillez indiquer de combien de personne vous avez besoin, si vous ne savez pas merci de l'indiquer" }
        else if (content === "" || content.length < 10) { contentError.innerHTML = "Veuillez ajouter une description" }

        else {
            const tolower = title.toLowerCase();
            const uppercase = tolower.charAt(0).toUpperCase() + tolower.slice(1);
            const deletechars = uppercase.replace(/[&#,+()$~%.'":*?!<>{}/\\\\]/g, " ");
            const deletespaces = deletechars.replace(/ +/g, " ");
            const newTitle = deletespaces.trim();
            setTitle(newTitle);

            const lowerTitle = newTitle.toLowerCase();
            const removeaccent = removeAccents(lowerTitle)
            const url = removeaccent.replace(/ /g, "-");
            const titleURL = url
            console.log(titleURL)

            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/project/add`,
                data: {
                    posterId: posterId,
                    title: title,
                    titleURL: titleURL,
                    category: category,
                    content: content,
                    numberofcontributors: numberofcontributors,
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                        titleError.innerHTML = res.data.errors.title;
                        categoryError.innerHTML = res.data.errors.category;
                        contentError.innerHTML = res.data.errors.content;
                        numberofcontributorsError.innerHTML = res.data.errors.numberofcontributors;
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Votre projet est en ligne !',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        const redirection = navigate(`/project/${titleURL}`)
                        setTimeout(redirection, 2000)
                    }
                })
                .catch((err) => console.log(err));
        }
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
                    <div ref={wrapperRef}>
                        <input readOnly type="text" name="category" id="category" onClick={() => setDisplaySelection(!displaySelection)} onChange={(e) => setCategory(e.target.value)} value={category} placeholder="Choisissez une categorie" />
                        {displaySelection && (
                            <div className="category-selection">
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
                <div className="content error"></div>

                <div className="btn-container">
                    <button className="btn btn-primary">Continuer</button>
                </div>
            </div>


            <div className="btn-container">
                <button className="btn btn-primary" onClick={handleAddProject}>Valider mon projet</button>
            </div>
        </>
    );
};

export default AddProjectForm;