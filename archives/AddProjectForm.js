import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ThreeDots } from 'react-loading-icons'
import { ImCross } from 'react-icons/im'
import { removeAccents } from "../Utils";

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../tools/editor/EditorToolbar";
import { useClickOutside } from "../views/src/components/tools/functions/useClickOutside";

const AddProjectForm = () => {
    const userData = useSelector((state) => state.userReducer)
    const posterId = userData._id
    const posterPseudo = userData.pseudo
    const posterAvatar = userData.picture
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [end, setEnd] = useState("")
    const [numberofcontributors, setNumberofcontributors] = useState("");
    const wrapperRef = useRef()
    const navigate = useNavigate()
    const [displaySelection, setDisplaySelection] = useState(false)

    /*************************************************************************************** */
    /************************************ LOCALISATION ************************************* */

    const startOfReqUrl = 'https://api-adresse.data.gouv.fr/search/?q=';
    const endOfReqUrl = '&type=municipality&limit=5&autocomplete=1';
    const [location, setLocation] = useState("");
    const [searchQuery, setSearchQuery] = useState("")
    const [locationsFound, setLocationsFound] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isResponse, setResponse] = useState(true)
    const [display, setDisplay] = useState(false)
    const isEmpty = !locationsFound || locationsFound.length === 0

    /*************************************************************************************** */
    /*************************************** METIER **************************************** */

    const [workArray, setWorkArray] = useState([]);
    const [searchWorkQuery, setWorkSearchQuery] = useState("")
    const [workNumber, setWorkNumber] = useState("")
    const [choice, setChoice] = useState("")

    const [worksFound, setWorksFound] = useState([])
    const [isWorkLoading, setWorkLoading] = useState(false)
    const [isWorkResponse, setWorkResponse] = useState(true)
    const [displayWork, setDisplayWork] = useState(false)
    const isWorkEmpty = !worksFound || worksFound.length === 0

    /*************************************************************************************** */
    /********************************* FONCTION PRINCIPALE ********************************* */

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
        if (category === "") { categoryError.innerHTML = "Veuillez saisir une catégorie" }
        if (numberofcontributors.value === "" || numberofcontributors.value === 0) { numberofcontributorsError.innerHTML = "Veuillez indiquer de combien de personne vous avez besoin, si vous ne savez pas merci de l'indiquer" }
        if (content === "" || content.length < 10) { contentError.innerHTML = "Veuillez ajouter une description" }

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
            const URL = url

            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/project/add`,
                data: {
                    posterId: posterId,
                    posterPseudo: posterPseudo,
                    posterAvatar: posterAvatar,
                    title: title,
                    URL: URL,
                    category: category,
                    location: location,
                    end: end,
                    content: content,
                    numberofcontributors: numberofcontributors,
                    works: workArray
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
                        const redirection = navigate(`/project/${URL}`)
                        setTimeout(redirection, 2000)
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    /*************************************************************************************** */
    /************************************ LOCALISATION ************************************* */

    const setSelect = (e) => {
        setSearchQuery(e)
        setDisplay(false)
        setLoading(false)
    }

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
        setLocation(searchQuery)
    }

    const prepareSearchQuery = (query) => {
        const url = `${startOfReqUrl}${query}${endOfReqUrl}`
        return encodeURI(url)
    }

    const searchLocation = async () => {
        if (!searchQuery || searchQuery.trim() === "") { return }
        setLoading(true)
        setDisplay(false)
        const URL = prepareSearchQuery(searchQuery)
        const response = await axios.get(URL).catch((err) => {
            console.log("Error: ", err)
        })

        if (response) {
            if (searchQuery.length >= 2) {
                setLocationsFound(response.data.features)
                setDisplay(true)
                setResponse(true)
                if (locationsFound.length === 0) {
                    setResponse(false)
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
    }

    /*************************************************************************************** */
    /**************************************** METIER *************************************** */

    const setWorkSelect = (e) => {
        setWorkSearchQuery(e)
        setDisplayWork(false)
        setWorkLoading(false)
    }

    const handleWorkInputChange = (e) => {
        setWorkSearchQuery(e.target.value)
    }

    const prepareWorkSearchQuery = (query) => {
        const url = `${process.env.REACT_APP_API_URL}api/work/${query}`
        return encodeURI(url)
    }

    const searchWork = async () => {
        if (!searchWorkQuery || searchWorkQuery.trim() === "") { return }
        setWorkLoading(true)
        setDisplayWork(false)
        const URL = prepareWorkSearchQuery(searchWorkQuery)
        const response = await axios.get(URL).catch((err) => {
            console.log("Error: ", err)
        })

        if (response) {
            if (searchWorkQuery.length >= 2) {
                setWorksFound(response.data)
                setDisplayWork(true)
                setWorkResponse(true)
                if (worksFound.length === 0) {
                    setWorkResponse(false)
                    setWorkLoading(false)
                }
            } else { setWorkLoading(false) }
        }
    }

    const checkIfOk = () => {
        if (choice !== "" && workNumber !== "") {
            if (workNumber === "0") {
                document.querySelector('.submit.error').innerHTML = "Le nombre de personnes recherchées ne peut pas être de 0"
            } else {
                if (JSON.stringify(workArray).includes(JSON.stringify(choice))) {
                    document.querySelector('.submit.error').innerHTML = "Vous avez déjà selectionné ce métier"
                } else {
                    setWorkArray([...workArray, { name: choice, number: workNumber }])
                    setWorkSearchQuery("")
                    setWorkNumber("")
                }
            }
        }
    }

    const deleteItem = (key) => {
        let storedArray = workArray.slice()
        storedArray.splice(key, 1)
        setWorkArray(storedArray)
    }

    /*************************************************************************************** */
    /********************************* FONCTIONS SECONDAIRES ******************************* */

    useClickOutside(wrapperRef, setDisplaySelection, false)

    const handleCategory = (e) => {
        setCategory(e.target.value)
        setDisplaySelection(false)
    }

    const [content, setContent] = useState({})
    const handleChange = (text, delta, source, editor) => {
        setContent(editor.getContents());
    }

    return (
        <>
            {/* <>***********************************************************************************************</> */}
            {/* <>******************************************* TITRE *********************************************</> */}
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
            </div>

            {/* <>***********************************************************************************************</> */}
            {/* <>**************************************** LOCALISATION *****************************************</> */}
            <div className="auto-container add-title-location-bloc add-project-bloc">
                <h3>Où votre projet se situe-t-il ?</h3>
                <label htmlFor="title"><span>Localité</span><small>Champ requis</small></label>
                <input placeholder="Rechercher mon adresse" value={searchQuery} onInput={handleInputChange} onChange={searchLocation} type="search" />
                {!isEmpty && display && isResponse && (
                    <ul tabIndex="0" style={{ display: searchQuery.length < 3 ? "none" : "block" }} >
                        {locationsFound.map(({ properties }) => {
                            const town = `${properties.city}`;
                            const zipcode = `${properties.postcode}`;
                            const adress = `${town} (${zipcode})`;
                            return (
                                <li onClick={(e) => { setSelect(adress); setLocation(adress) }} key={properties.id}>{adress}</li>
                            )
                        })}
                    </ul>
                )}
                {isLoading && !display && (
                    <div className="load-container">
                        <ThreeDots />
                    </div>
                )}
                {!isResponse && !isLoading && (
                    <div className="load-container">
                        <p>Aucun resultat ne correspond à votre recherche</p>
                    </div>
                )}
            </div>

            {/* <>**********************************************************************************************</> */}
            {/* <>***************************************** DATE DE FIN ****************************************</> */}
            <div className="add-end-bloc add-project-bloc">
                <h3>Votre projet a-t-il une date de fin potentielle ?</h3>
                <label htmlFor="end"><span>Date de fin potentielle</span></label>
                <div className="input-container">
                    <input type="date" name="end" id="end" onChange={(e) => setEnd(e.target.value)} value={end} />
                </div>
                <div className="end error"></div>
            </div>

            {/* <>***********************************************************************************************</> */}
            {/* <>************************************** NOMBRE DE PERSONNES ************************************</> */}
            <div className="add-numberofcontributors-bloc add-project-bloc">
                <h3>Avez-vous besoin d'une équipe ?</h3>
                <label htmlFor="numberofcontributors"><span>Nombre de personne dont vous avez besoin</span></label>
                <div className="number-container">
                    <input type="number" min="1" name="numberofcontributors" id="numberofcontributors" onChange={(e) => setNumberofcontributors(e.target.value)} value={numberofcontributors} />
                    <div className="undefined-choice">
                        <input type="checkbox" className="option-input" onClick={(e) => setNumberofcontributors("Non défini")} /> <label>Je ne sais pas encore</label>
                    </div>
                </div>
                <div className="numberofcontributors error"></div>
            </div>

            {/* <>***********************************************************************************************</> */}
            {/* <>******************************************** METIER *******************************************</> */}
            <div className="auto-container add-work-bloc add-project-bloc">
                <h3>De qui avez vous besoin ?</h3>
                {workArray &&
                    workArray.map((works, key) => {
                        return (
                            <li key={key}>{works.name + " - " + works.number} <button onClick={() => deleteItem(key)}><ImCross /></button></li>
                        )
                    })
                }
                <label htmlFor="work"><span>Métier</span><small>Champ requis</small></label>
                <div style={{ display: "flex" }}>
                    <div>
                        <input placeholder="Rechercher un métier" value={searchWorkQuery} onChange={handleWorkInputChange} onKeyPress={searchWork} type="search" style={{ minWidth: 500 }} />
                        {!isWorkEmpty && displayWork && isWorkResponse && (
                            <ul tabIndex="0" style={{ display: searchWorkQuery.length < 3 ? "none" : "block" }}>
                                {worksFound.map((element) => {
                                    const chosenWork = `${element.appelation_metier}`;
                                    return (
                                        <li onClick={() => { setWorkSelect(chosenWork); setChoice(chosenWork) }} key={element._id}>{chosenWork}</li>
                                    )
                                })}
                            </ul>
                        )}
                        {isWorkLoading && !displayWork && (<div className="load-container"><ThreeDots /></div>)}
                        {!isWorkResponse && !isWorkLoading && (<div className="load-container"><p>Aucun resultat ne correspond à votre recherche</p></div>)}
                    </div>
                    <input type="number" min="1" onChange={(e) => setWorkNumber(e.target.value)} value={workNumber} style={{ maxWidth: 100, maxHeight: 46, margin: "0 50px" }} />
                    {(choice !== "" && workNumber !== "" && workNumber !== "0") ? (
                        <button className="btn btn-primary" onClick={checkIfOk} style={{ maxHeight: 46 }}>Valider</button>
                    ) : (
                        <button className="btn btn-primary" disabled style={{ maxHeight: 46 }}>Valider</button>
                    )}
                </div>
                <p className="submit error"></p>
            </div>

            {/* <>************************************************************************************************</> */}
            {/* <>***************************************** DESCRIPTION ******************************************</> */}
            <div className="add-content-bloc add-project-bloc" disabled>
                <h3>Il est temps d'expliquer votre projet en détail !</h3>
                <div className="content-container">
                    <label htmlFor="content"><span>Description de votre projet</span><small>Champ requis</small></label>
                    {/* <textarea type="text" name="content" id="content" onChange={(e) => setContent(e.target.value)} value={content}></textarea> */}

                    <div className="text-editor">
                        <EditorToolbar />
                        <ReactQuill
                            name="content"
                            id="content"
                            style={{ height: 200 }}
                            theme="snow"
                            value={content}
                            onChange={handleChange}
                            placeholder={"Décrivez votre projet..."}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                </div>
                <div className="content error"></div>
            </div>

            <div className="btn-container">
                <button className="btn btn-primary" onClick={handleAddProject}>Publier mon projet</button>
            </div>
        </>
    );
};

export default AddProjectForm;