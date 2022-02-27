import React, { useState, useRef } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { removeAccents } from "../../Utils";

import Title from "./Title";
import Location from "./Location";
import Workers from "./Workers";
import End from "./End";
import Description from "./Description";
import Contributors from "./Contributors";
import Pictures from "./Pictures";

const AddProjectForm = () => {
    const userData = useSelector((state) => state.userReducer)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [end, setEnd] = useState("")
    const [location, setLocation] = useState("")
    const [department, setDepartment] = useState("")
    const [region, setRegion] = useState("")
    const [newRegion, setNewRegion] = useState("")
    const [numberofcontributors, setNumberofcontributors] = useState("")
    const [workArray, setWorkArray] = useState([])
    const [content, setContent] = useState({})
    const [pictures, setPictures] = useState([])
    const navigate = useNavigate()

    const titleError = useRef("")
    const categoryError = useRef("")
    const contentError = useRef("")
    const numberofcontributorsError = useRef("")

    const handleAddProject = async (e) => {
        e.preventDefault()

        if (title === "" || title.length < 10 || title.length > 120) {
            titleError.current = "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 120 caractères"
        } else if (category === "") {
            categoryError.current.innerHTML = "Veuillez saisir une catégorie"
        } else if (numberofcontributors.value === "" || numberofcontributors.value === 0) {
            numberofcontributorsError.current.innerHTML = "Veuillez indiquer de combien de personne vous avez besoin, si vous ne savez pas merci de l'indiquer"
        } else if (content === "" || content.length < 10) {
            contentError.current.innerHTML = "Veuillez ajouter une description"
        } else {
            const tolower = title.toLowerCase()
            const uppercase = tolower.charAt(0).toUpperCase() + tolower.slice(1)
            const deletechars = uppercase.replace(/[&#,+()$~%.'":*?!<>{}/\\\\]/g, " ")
            const deletespaces = deletechars.replace(/ +/g, " ")
            const newTitle = deletespaces.trim()
            setTitle(newTitle)

            const lowerTitle = newTitle.toLowerCase()
            const removeaccent = removeAccents(lowerTitle)
            const url = removeaccent.replace(/ /g, "-")
            const titleURL = url

            const data = new FormData()
            for (let i = 0; i < pictures.length; i++) {
                data.append("pictures", pictures[i])
            }

            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/project/add`,
                data: {
                    posterId: userData._id,
                    posterPseudo: userData.pseudo,
                    posterAvatar: userData.picture,
                    title: title,
                    titleURL: titleURL,
                    category: category,
                    location: location,
                    department: department,
                    region: region,
                    new_region: newRegion,
                    end: end,
                    content: content,
                    numberofcontributors: numberofcontributors,
                    works: workArray,
                    pictures: data
                },
            })
                .then((res) => {
                    if (res.data.errors) {
                        titleError.current.innerHTML = res.data.errors.title;
                        categoryError.current.innerHTML = res.data.errors.category;
                        contentError.current.innerHTML = res.data.errors.content;
                        numberofcontributorsError.current.innerHTML = res.data.errors.numberofcontributors;
                    } else {
                        e.preventDefault()
                        Swal.fire({
                            icon: 'success',
                            title: 'Votre projet est en ligne !',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        // const redirection = navigate(`/project/${titleURL}`)
                        // setTimeout(redirection, 2000)
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <>
            <form className="add-img-bloc add-project-bloc" encType="multipart/form-data">
                <Pictures pictures={pictures} setPictures={setPictures} />
                <Title
                    title={title}
                    setTitle={setTitle}
                    category={category}
                    setCategory={setCategory}
                    titleError={titleError}
                    categoryError={categoryError}
                />
                <Location
                    location={location}
                    setLocation={setLocation}
                    department={department}
                    setDepartment={setDepartment}
                    region={region}
                    setRegion={setRegion}
                    newRegion={newRegion}
                    setNewRegion={setNewRegion}
                />
                <Contributors
                    numberofcontributors={numberofcontributors}
                    setNumberofcontributors={setNumberofcontributors}
                    numberofcontributorsError={numberofcontributorsError}
                />
                <Workers
                    workArray={workArray}
                    setWorkArray={setWorkArray}
                />
                <End
                    end={end}
                    setEnd={setEnd}
                />
                <Description
                    content={content}
                    setContent={setContent}
                    contentError={contentError}
                />

                <div className="btn-container">
                    <button className="btn btn-primary" onClick={handleAddProject}>Publier mon projet</button>
                </div>
            </form>
        </>
    )
}

export default AddProjectForm;