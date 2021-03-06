import React, { useState } from "react";
import axios from "axios";
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

const AddProjectForm = ({ user }) => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [end, setEnd] = useState("")
    const [location, setLocation] = useState("")
    const [department, setDepartment] = useState("")
    const [region, setRegion] = useState("")
    const [newRegion, setNewRegion] = useState("")
    const [workArray, setWorkArray] = useState([])
    const [content, setContent] = useState({})
    const [files, setFiles] = useState([])
    // const navigate = useNavigate()
    const [step, setStep] = useState(0);
    const onNext = () => setStep(step + 1);
    const onBack = () => setStep(step - 1);
    const [error, setError] = useState(null)
    const [isErr, setErr] = useState(false)

    const handleAddProject = async (e) => {
        e.preventDefault()
        if (title === "" || title.length < 10 || title.length > 120) {
            setErr(true)
            setError("Veuillez saisir un titre valide, votre titre doit faire entre 10 et 120 caractères")
        } else if (category === "") {
            setErr(true)
            setError("Veuillez saisir une catégorie")
        } else if (content === "" || content.length < 10) {
            setErr(true)
            setError("Veuillez ajouter une description")
        } else {
            let newTitle = title.toLowerCase();
            newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
            newTitle = newTitle.replace(/[&#,+()$~%^.'":*?!;<>{}/\\\\]/g, " ")
            newTitle = newTitle.replace(/ +/g, " ")
            newTitle = newTitle.trim()
            setTitle(newTitle)
            let url = newTitle.toLowerCase();
            url = removeAccents(url)
            url = url.replace(/ /g, "-")

            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/project/add`,
                data: {
                    posterId: user._id,
                    posterPseudo: user.pseudo,
                    posterAvatar: user.picture,
                    title: title,
                    URL: url,
                    category: category,
                    location: location,
                    department: department,
                    region: region,
                    new_region: newRegion,
                    end: end,
                    content: content,
                    works: workArray,
                    members: { id: user._id, pseudo: user.pseudo, picture: user.picture, role: "manager", since: new Date().toISOString() },
                    manager: user._id
                },
            }).then(async (res) => {
                if (res.data.errors) {
                    if (res.data.errors.title) setError(res.data.errors.title)
                    else if (res.data.errors.category) setError(res.data.errors.category)
                    else if (res.data.errors.content) setError(res.data.errors.content)
                } else {
                    let formData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        formData.append('files', files[i])
                    }
                    await axios({
                        method: "post",
                        url: `${process.env.REACT_APP_API_URL}api/project/add/pictures`,
                        data: { files: files }
                    }).then(res => {
                        e.preventDefault()
                        Swal.fire({
                            icon: 'success',
                            title: 'Votre projet est en ligne !',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    // // const redirection = navigate(`/project/${URL}`)
                    // // setTimeout(redirection, 2000)
                }
            }).catch((err) => console.log(err));
        }
    }

    const allSteps = [
        {
            content:
                <Title
                    title={title}
                    setTitle={setTitle}
                    category={category}
                    setCategory={setCategory}
                    isErr={isErr}
                    setErr={setErr}
                    error={error}
                    setError={setError}
                    onNext={onNext}
                />,
            key: 0,
        },
        {
            content:
                <Location
                    location={location}
                    setLocation={setLocation}
                    department={department}
                    setDepartment={setDepartment}
                    region={region}
                    setRegion={setRegion}
                    newRegion={newRegion}
                    setNewRegion={setNewRegion}
                    isErr={isErr}
                    setErr={setErr}
                    error={error}
                    setError={setError}
                    onNext={onNext}
                    onBack={onBack}
                />,
            key: 1,
        },
        {
            content:
                <Contributors
                    isErr={isErr}
                    setErr={setErr}
                    error={error}
                    setError={setError}
                    onNext={onNext}
                    onBack={onBack}
                />,
            key: 2,
        },
        {
            content:
                <Workers
                    workArray={workArray}
                    setWorkArray={setWorkArray}
                    isErr={isErr}
                    setErr={setErr}
                    error={error}
                    setError={setError}
                    onNext={onNext}
                    onBack={onBack}
                />,
            key: 3,
        },
        {
            content:
                <End
                    end={end}
                    setEnd={setEnd}
                    isErr={isErr}
                    setErr={setErr}
                    error={error}
                    setError={setError}
                    onNext={onNext}
                    onBack={onBack}
                />,
            key: 4,
        },
        {
            content:
                <Description
                    content={content}
                    setContent={setContent}
                    isErr={isErr}
                    setErr={setErr}
                    error={error}
                    setError={setError}
                    onNext={onNext}
                    onBack={onBack}
                />,
            key: 5,
        },
        {
            content:
                <Pictures
                    files={files}
                    setFiles={setFiles}
                    isErr={isErr}
                    setErr={setErr}
                    error={error}
                    setError={setError}
                    onNext={onNext}
                    onBack={onBack}
                    handleAddProject={handleAddProject}
                />,
            key: 6,
        }
    ];

    return (
        <>
            <Stepper activeIndex={step}>
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