import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Stepper } from '@zendeskgarden/react-accordions'
import { removeAccents } from "../components/Utils";
import Title from "../components/project/add-project/Title";
import Location from "../components/project/add-project/Location";
import Contributors from "../components/project/add-project/Contributors";
import End from "../components/project/add-project/End";
import Description from "../components/project/add-project/Description";
import Pictures from "../components/project/add-project/Pictures";

const AddProject = ({ user }) => {
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [category, setCategory] = useState("")
    const [location, setLocation] = useState("")
    const [department, setDepartment] = useState("")
    const [region, setRegion] = useState("")
    const [newRegion, setNewRegion] = useState("")
    const [numberofcontributors, setNumberofcontributors] = useState("")
    const [workArray, setWorkArray] = useState([])
    const [end, setEnd] = useState("")
    const [content, setContent] = useState({})
    const [files, setFiles] = useState([])
    const [submit, setSubmit] = useState(false)
    // const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const onNext = () => setStep(step + 1)
    const onBack = () => setStep(step - 1)
    const [error, setError] = useState(null)
    const [isErr, setErr] = useState(null)

    const handleAddProject = async (e) => {
        e.preventDefault()
        if (title === "" || title.length < 10 || title.length > 100) {
            setErr("title")
            setStep(1)
            setError("Veuillez saisir un titre valide, votre titre doit faire entre 10 et 100 caractères")
        } else if (category === "") {
            setErr("category")
            setStep(1)
            setError("Veuillez saisir une catégorie")
        } else if (numberofcontributors.value === "" || numberofcontributors.value === 0) {
            setErr("numberofcontributors")
            setStep(4)
            setError("Veuillez indiquer de combien de personne vous avez besoin, si vous ne savez pas merci de l'indiquer")
        } else if (content === "" || content.length < 10) {
            setErr("content")
            setStep(5)
            setError("Veuillez ajouter une description")
        } else {
            let newTitle = title.toLowerCase();
            newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
            newTitle = newTitle.replace(/[&#,+()$~%.'":*?!<>{}/\\\\]/g, " ")
            newTitle = newTitle.replace(/ +/g, " ")
            newTitle = newTitle.trim()
            setTitle(newTitle)
            let URL = newTitle.toLowerCase();
            URL = removeAccents(URL)
            URL = URL.replace(/ /g, "-")
            setUrl(URL)

            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/project/add`,
                data: {
                    posterId: user._id,
                    posterPseudo: user.pseudo,
                    posterAvatar: user.picture,
                    title: title,
                    titleURL: URL,
                    category: category,
                    location: location,
                    department: department,
                    region: region,
                    new_region: newRegion,
                    end: end,
                    content: content,
                    numberofcontributors: numberofcontributors,
                    works: workArray,
                    manager: user._id,
                    members: { id: user._id, pseudo: user.pseudo, picture: user.picture, role: "manager", since: new Date().toISOString() }
                }
            }).then(async (res) => {
                if (res.data.errors) {
                    if (res.data.errors.title) setError(res.data.errors.title)
                    else if (res.data.errors.category) setError(res.data.errors.category)
                    else if (res.data.errors.content) setError(res.data.errors.content)
                    else if (res.data.errors.numberofcontributors) setError(res.data.errors.numberofcontributors)
                } else {
                    setSubmit(true)
                    //const redirection = navigate(`/project/${titleURL}`)
                    //setTimeout(redirection, 2000)
                }
            }).catch((err) => console.log(err))
        }
    }

    useEffect(() => {
        if (submit) {
            const sendFiles = async () => {
                await axios.get(`${process.env.REACT_APP_API_URL}api/project/${url}`)
                    .then((res) => {
                        if (files.length > 0) {
                            let formData = new FormData()
                            for (let i = 0; i < files.length; i++) {
                                formData.append('files', files[i])
                            }
                            console.log(res.data)
                            axios.put(`${process.env.REACT_APP_API_URL}api/project/add-pictures/${res.data._id}`, formData)
                                .then(res => {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Votre projet est en ligne !',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    setSubmit(false)
                                }).catch(err => console.log(err))
                        }
                    }).catch((err) => console.log(err))
            }
            sendFiles()
        }
    }, [submit, files, url])

    return (
        <div className="add-project">
            <div className="add-project-container">
                <h1>Soumettre un projet</h1>
                <Stepper activeIndex={step}>
                    <Stepper.Step key={1}>
                        <Stepper.Label>Titre et catégorie</Stepper.Label>
                        <Stepper.Content>
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
                            />
                        </Stepper.Content>
                    </Stepper.Step>
                    <Stepper.Step key={2}>
                        <Stepper.Label>Localisation</Stepper.Label>
                        <Stepper.Content>
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
                            />
                        </Stepper.Content>
                    </Stepper.Step>
                    <Stepper.Step key={3}>
                        <Stepper.Label>Nombre de personnes</Stepper.Label>
                        <Stepper.Content>
                            <Contributors
                                numberofcontributors={numberofcontributors}
                                setNumberofcontributors={setNumberofcontributors}
                                workArray={workArray}
                                setWorkArray={setWorkArray}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                                onNext={onNext}
                                onBack={onBack}
                            />
                        </Stepper.Content>
                    </Stepper.Step>
                    <Stepper.Step key={4}>
                        <Stepper.Label>Date</Stepper.Label>
                        <Stepper.Content>
                            <End
                                end={end}
                                setEnd={setEnd}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                                onNext={onNext}
                                onBack={onBack}
                            />
                        </Stepper.Content>
                    </Stepper.Step>
                    <Stepper.Step key={5}>
                        <Stepper.Label>Description</Stepper.Label>
                        <Stepper.Content>
                            <Description
                                content={content}
                                setContent={setContent}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                                onNext={onNext}
                                onBack={onBack}
                            />
                        </Stepper.Content>
                    </Stepper.Step>
                    <Stepper.Step key={6}>
                        <Stepper.Label>Photos</Stepper.Label>
                        <Stepper.Content>
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
                            />
                        </Stepper.Content>
                    </Stepper.Step>
                </Stepper>
            </div>
        </div>
    );
}

export default AddProject;