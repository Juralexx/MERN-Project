import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { removeAccents } from '../components/Utils'
import Title from "../components/project/add-project/Title";
import Location from "../components/project/add-project/Location";
import Contributors from "../components/project/add-project/Contributors";
import End from "../components/project/add-project/End";
import Content from "../components/project/add-project/Content";
import Pictures from "../components/project/add-project/Pictures";
import Description from "../components/project/add-project/Description";
import Qna from "../components/project/add-project/Qna";
import FooterLight from "../components/FooterLight";
import { Button, EndIconButton, StartIconButton, StartIconOutlinedButton } from "../components/tools/components/Button";
import { BsFillEyeFill, BsChatLeftQuote } from "react-icons/bs";
import { MdOutlineDescription, MdOutlinePhotoLibrary } from 'react-icons/md'
import { RiBook3Line, RiTeamLine } from 'react-icons/ri'
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from 'react-icons/hi'

const AddProject = ({ user }) => {
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState([])
    const [geolocalisation, setGeolocalisation] = useState("")
    const [location, setLocation] = useState("")
    const [department, setDepartment] = useState("")
    const [codeDepartment, setCodeDepartment] = useState("")
    const [region, setRegion] = useState("")
    const [codeRegion, setCodeRegion] = useState("")
    const [newRegion, setNewRegion] = useState("")
    const [codeNewRegion, setCodeNewRegion] = useState("")
    const [leafletLoading, setLeafletLoading] = useState(false)
    const [geoJSON, setGeoJSON] = useState([])
    const [description, setDescription] = useState("")
    const [workArray, setWorkArray] = useState([])
    const [end, setEnd] = useState("")
    const [content, setContent] = useState({})
    const [mainPic, setMainPic] = useState([])
    const [files, setFiles] = useState([])
    const [qna, setQna] = useState([])
    const [error, setError] = useState(null)
    const [isErr, setErr] = useState(null)
    const [nav, setNav] = useState(0)
    const addActive = (state, classe) => { if (state) { return classe } else { return "" } }
    // const navigate = useNavigate()

    const handleAddProject = async () => {
        if (title === "" || title.length < 10 || title.length > 60) {
            setErr("title")
            setError("Veuillez saisir un titre valide, votre titre doit faire entre 10 et 60 caractères")
            setNav(0)
        } else if (subtitle === "" || subtitle.length < 10 || subtitle.length > 100) {
            setErr("subtitle")
            setError("Veuillez saisir un sous-titre valide, votre sous-titre doit faire entre 10 et 100 caractères")
            setNav(0)
        } else if (category === "") {
            setErr("category")
            setError("Veuillez saisir une catégorie")
            setNav(0)
        } else if (description === "" || description.length < 10 || description.length > 300) {
            setErr("description")
            setError("Veuillez ajouter une courte description à votre projet")
            setNav(0)
        } else if (content === "" || content.length < 10 || content.length > 100000) {
            setErr("content")
            setError("Veuillez saisir une description valide, votre description doit faire entre 10 et 10 000 caractères")
            setNav(1)
        } else if (qna.length > 0) {
            for (let i = 0; i < qna.length; i++) {
                if (qna[i].question === "" || qna[i].question.length < 10 || qna[i].question.length > 100) {
                    setErr(`question-${i}`)
                    setError("Veuillez saisir une question valide, votre question doit faire entre 10 et 100 caractères")
                    setNav(4)
                } else if (qna[i].answer === "" || qna[i].answer.length < 10 || qna[i].answer.length > 4000) {
                    setErr(`answer-${i}`)
                    setError("Veuillez ajouter une reponse valide à votre question")
                    setNav(4)
                }
            }
        } else {
            let cleanTitle = title.toLowerCase();
            cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
            cleanTitle = cleanTitle.replace(/[&#,+()$~%^.|_@°=§µ£¤'"`:*?!;<>[\]{}/\\\\]/g, " ")
            cleanTitle = cleanTitle.replace(/ +/g, " ")
            cleanTitle = cleanTitle.trim()
            setTitle(cleanTitle)

            let URL = cleanTitle.toLowerCase();
            URL = removeAccents(URL)
            URL = URL.replace(/ /g, "-")
            let URLID = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)).toString()

            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/project/add`,
                data: {
                    posterId: user._id,
                    posterPseudo: user.pseudo,
                    posterAvatar: user.picture,
                    title: cleanTitle,
                    URL: URL,
                    URLID: URLID,
                    subtitle: subtitle,
                    category: category,
                    tags: tags,
                    state: "worked on",
                    geolocalisation: geolocalisation,
                    location: location,
                    department: department,
                    code_department: codeDepartment,
                    region: region,
                    code_region: codeRegion,
                    new_region: newRegion,
                    code_new_region: codeNewRegion,
                    description: description,
                    end: end,
                    content: content,
                    works: workArray,
                    manager: user._id,
                    members: { id: user._id, pseudo: user.pseudo, picture: user.picture, role: "manager", since: new Date().toISOString() }
                }
            }).then(async (res) => {
                if (res.data.errors) {
                    if (res.data.errors.title) setError(res.data.errors.title)
                    else if (res.data.errors.category) setError(res.data.errors.category)
                    else if (res.data.errors.content) setError(res.data.errors.content)
                } else {
                    let pictures = mainPic.concat(files)
                    if (pictures.length > 0) {
                        await axios.get(`${process.env.REACT_APP_API_URL}api/project/${URLID}/${URL}`)
                            .then(async (response) => {
                                let formData = new FormData()
                                for (let i = 0; i < pictures.length; i++) {
                                    formData.append('files', pictures[i])
                                }
                                await axios.put(`${process.env.REACT_APP_API_URL}api/project/add-pictures/${response.data._id}`, formData)
                                    .then(res => res.data).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                    }
                    //setTimeout(navigate(`/project/${URLID}/${URL}`), 2000)
                }
            }).catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if (location) {
            const fetchGeolocalisation = async () => {
                setLeafletLoading(true)
                await axios.get(`${process.env.REACT_APP_API_URL}api/geolocation/${location}`)
                    .then(res => {
                        if (res.data)
                            setGeoJSON(res.data.geometry.coordinates)
                        setInterval(() => setLeafletLoading(false), 1000)
                    }).catch(err => console.log(err))
            }
            fetchGeolocalisation()
        }
    }, [location])

    return (
        <>
            <div className="content-container add-project">
                <div className="add-project-header">
                    <div className="add-project-header-top">
                        <div className="logo-container">
                            <Link to="/">
                                <div className="logo-inner">
                                    <img src={`${process.env.REACT_APP_API_URL}files/img/logo-top.png`} alt="" />
                                </div>
                            </Link>
                        </div>
                        <div className="header-top-right">
                            <StartIconOutlinedButton text="Aperçu" icon={<BsFillEyeFill />} />
                            <Button text="Enregistrer et publier" onClick={handleAddProject} />
                        </div>
                    </div>
                    <div className="add-project-header-bottom">
                        <div className="header-bottom-container">
                            <div className={`header-bottom-item ${addActive(nav === 0, "active")}`} onClick={() => setNav(0)}>
                                <MdOutlineDescription />
                                <p>Les bases</p>
                            </div>
                            <div className={`header-bottom-item ${addActive(nav === 1, "active")}`} onClick={() => setNav(1)}>
                                <RiBook3Line />
                                <p>Description</p>
                            </div>
                            <div className={`header-bottom-item ${addActive(nav === 2, "active")}`} onClick={() => setNav(2)}>
                                <MdOutlinePhotoLibrary />
                                <p>Galerie</p>
                            </div>
                            <div className={`header-bottom-item ${addActive(nav === 3, "active")}`} onClick={() => setNav(3)}>
                                <RiTeamLine />
                                <p>Équipe</p>
                            </div>
                            <div className={`header-bottom-item ${addActive(nav === 4, "active")}`} onClick={() => setNav(4)}>
                                <BsChatLeftQuote />
                                <p>FAQ</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-box">
                    {nav === 0 &&
                        <>
                            <div className="titles-container">
                                <h1>Commençons par les bases</h1>
                                <h2>Facilitez la tâche de ceux qui veulent en savoir plus.</h2>
                            </div>
                            <Title
                                title={title}
                                setTitle={setTitle}
                                subtitle={subtitle}
                                setSubtitle={setSubtitle}
                                category={category}
                                setCategory={setCategory}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                            />
                            <Location
                                geolocalisation={geolocalisation}
                                setGeolocalisation={setGeolocalisation}
                                location={location}
                                setLocation={setLocation}
                                setDepartment={setDepartment}
                                setCodeDepartment={setCodeDepartment}
                                setRegion={setRegion}
                                setCodeRegion={setCodeRegion}
                                setNewRegion={setNewRegion}
                                setCodeNewRegion={setCodeNewRegion}
                                leafletLoading={leafletLoading}
                                geoJSON={geoJSON}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                            />
                            <Description
                                description={description}
                                setDescription={setDescription}
                                tags={tags}
                                setTags={setTags}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                            />
                            <End
                                end={end}
                                setEnd={setEnd}
                            />
                            <div className="btn-container">
                                <EndIconButton text="Suivant : Description" icon={<HiOutlineArrowNarrowRight />} onClick={() => setNav(1)} />
                            </div>
                        </>
                    }
                    {nav === 1 &&
                        <>
                            <div className="titles-container">
                                <h1>Il est temps de décrire votre projet en détail !</h1>
                                <h2>Qu'est-ce qui donnera envie à votre public de se rassembler autour de votre projet ? Ici, clarté, concision et précision sont de mise.</h2>
                            </div>
                            <Content
                                content={content}
                                setContent={setContent}
                            />
                            <div className="btn-container">
                                <StartIconButton text="Retour : Les bases" icon={<HiOutlineArrowNarrowLeft />} className="mr-2" onClick={() => setNav(0)} />
                                <EndIconButton text="Suivant : Galerie" icon={<HiOutlineArrowNarrowRight />} onClick={() => setNav(2)} />
                            </div>
                        </>
                    }
                    {nav === 2 &&
                        <>
                            <div className="titles-container">
                                <h1>De belles images vous donne plus de visibilité !</h1>
                                <h2>Ajoutez des images qui représente clairement votre projet.</h2>
                            </div>
                            <Pictures
                                mainPic={mainPic}
                                setMainPic={setMainPic}
                                files={files}
                                setFiles={setFiles}
                            />
                            <div className="btn-container">
                                <StartIconButton text="Retour : Description" icon={<HiOutlineArrowNarrowLeft />} className="mr-2" onClick={() => setNav(1)} />
                                <EndIconButton text="Suivant : Équipe" icon={<HiOutlineArrowNarrowRight />} onClick={() => setNav(3)} />
                            </div>
                        </>
                    }
                    {nav === 3 &&
                        <>
                            <div className="titles-container">
                                <h1>Compétences recherchées</h1>
                                <h2>Séléctionnez les compétences que vous recherchez et décrivez pourquoi.</h2>
                                {workArray.length === 0 &&
                                    <Button text="Rechercher des compétences" className="mx-auto mt-8" onClick={() => setWorkArray([{ name: "", number: "", numberFound: "", description: "" }])} />
                                }
                            </div>
                            <Contributors
                                workArray={workArray}
                                setWorkArray={setWorkArray}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                            />
                            <div className="btn-container">
                                <StartIconButton text="Retour : Galerie" icon={<HiOutlineArrowNarrowLeft />} className="mr-2" onClick={() => setNav(2)} />
                                <EndIconButton text="Suivant : FAQ" icon={<HiOutlineArrowNarrowRight />} onClick={() => setNav(4)} />
                            </div>
                        </>
                    }
                    {nav === 4 &&
                        <>
                            <div className="titles-container">
                                <h1>Foire aux questions</h1>
                                <h2>Répondez aux questions que votre public pourrait se poser.</h2>
                                {qna.length === 0 &&
                                    <Button text="Démarrer une foire aux questions" className="mx-auto mt-8" onClick={() => setQna([{ question: "", answer: "" }])} />
                                }
                            </div>
                            <Qna
                                qna={qna}
                                setQna={setQna}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                            />
                            <div className="btn-container">
                                <StartIconButton text="Retour : Équipe" icon={<HiOutlineArrowNarrowLeft />} className="mr-2" onClick={() => setNav(3)} />
                                <Button text="Enregistrer et publier" onClick={handleAddProject} />
                            </div>
                        </>
                    }
                </div>
            </div>
            <FooterLight />
        </>
    )
}

export default AddProject