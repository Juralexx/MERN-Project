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
import { Stepper } from '@zendeskgarden/react-accordions'

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
    const members = useState({ id: userData._id, pseudo: userData.pseudo, picture: userData.picture, role: "admin", since: new Date().toISOString()})
    const [files, setFiles] = useState([])
    // const navigate = useNavigate()

    const [step, setStep] = useState(0);
    const onNext = () => setStep(step + 1);
    const onBack = () => setStep(step - 1);

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
                    members: members
                },
            })
                .then(async (res) => {
                    if (res.data.errors) {
                        titleError.current.innerHTML = res.data.errors.title;
                        categoryError.current.innerHTML = res.data.errors.category;
                        contentError.current.innerHTML = res.data.errors.content;
                        numberofcontributorsError.current.innerHTML = res.data.errors.numberofcontributors;
                    } else {
                        var formData = new FormData();
                        for (var i = 0; i < files.length; i++) {
                            formData.append('files', files[i])
                        }
                        await axios({
                            method: "post",
                            url: `${process.env.REACT_APP_API_URL}api/project/add/pictures`,
                            data: { files: files }
                        })
                            .then(res => {
                                e.preventDefault()
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Votre projet est en ligne !',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            })
                        // // const redirection = navigate(`/project/${titleURL}`)
                        // // setTimeout(redirection, 2000)
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    const allSteps = [
        {
            content: <Title
                title={title}
                setTitle={setTitle}
                category={category}
                setCategory={setCategory}
                titleError={titleError}
                categoryError={categoryError}
                onNext={onNext}
            />,
            key: 0,
        },
        {
            content: <Location
                location={location}
                setLocation={setLocation}
                department={department}
                setDepartment={setDepartment}
                region={region}
                setRegion={setRegion}
                newRegion={newRegion}
                setNewRegion={setNewRegion}
                onNext={onNext}
                onBack={onBack}
            />,
            key: 1,
        },
        {
            content: <Contributors
                numberofcontributors={numberofcontributors}
                setNumberofcontributors={setNumberofcontributors}
                numberofcontributorsError={numberofcontributorsError}
                onNext={onNext}
                onBack={onBack}
            />,
            key: 2,
        },
        {
            content: <Workers
                workArray={workArray}
                setWorkArray={setWorkArray}
                onNext={onNext}
                onBack={onBack}
            />,
            key: 3,
        },
        {
            content: <End
                end={end}
                setEnd={setEnd}
                onNext={onNext}
                onBack={onBack}
            />,
            key: 4,
        },
        {
            content: <Description
                content={content}
                setContent={setContent}
                contentError={contentError}
                onNext={onNext}
                onBack={onBack}
            />,
            key: 5,
        },
        {
            content: <Pictures
                files={files}
                setFiles={setFiles}
                onNext={onNext}
                onBack={onBack}
                handleAddProject={handleAddProject}
            />,
            key: 6,
        }
    ];

    return (
        <>
            <Stepper activeIndex={step} isHorizontal>
                <Stepper.Step key="step-1">
                    <Stepper.Label>Titre et catégorie</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step key="step-2">
                    <Stepper.Label>Localisation</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step key="step-3">
                    <Stepper.Label>Nombre de personnes</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step key="step-4">
                    <Stepper.Label>Métiers recherchés</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step key="step-5">
                    <Stepper.Label>Date</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step key="step-6">
                    <Stepper.Label>Description</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step key="step-7">
                    <Stepper.Label>Photos</Stepper.Label>
                </Stepper.Step>
            </Stepper>
            {allSteps.map((element, index) =>
                index === step && (
                    <div key={index} className="py-10">
                        {element.content}
                    </div>
                )
            )}
        </>
    )
}

export default AddProjectForm;