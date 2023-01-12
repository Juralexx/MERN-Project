import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { addClass, removeAccents } from '../components/Utils'
import { Button, TextButton } from "../components/tools/global/Button";
import Icon from "../components/tools/icons/Icon";
import Title from "../components/project/add-project/Title";
import Location from "../components/project/add-project/Location";
import Contributors from "../components/project/add-project/Contributors";
import End from "../components/project/add-project/End";
import Content from "../components/project/add-project/Content";
import Pictures from "../components/project/add-project/Pictures";
import Description from "../components/project/add-project/Description";
import Qna from "../components/project/add-project/Qna";
import Networks from "../components/project/add-project/Networks";
import FooterLight from "../components/FooterLight";

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
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [content, setContent] = useState({})
    const [mainPic, setMainPic] = useState([])
    const [files, setFiles] = useState([])
    const [qna, setQna] = useState([])
    const [networks, setNetworks] = useState([])
    const [error, setError] = useState(null)
    const [isErr, setErr] = useState(null)
    const [nav, setNav] = useState(0)
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
        } else if (workArray.length > 0) {
            for (let i = 0; i < workArray.length; i++) {
                if (workArray[i].name === "" || workArray[i].number === (null || undefined)) {
                    setErr(`work-${i}`)
                    setError("Veuillez saisir un métier ou un nombre valide...")
                    setNav(3)
                    break
                } else {
                    if (workArray[i].number === 0) {
                        setErr(`work-${i}`)
                        setError("Le nombre de personnes recherchées ne peut pas être de 0")
                        setNav(3)
                        break
                    } else {
                        if (JSON.stringify(workArray).includes(JSON.stringify(workArray[i].work))) {
                            setErr(`work-${i}`)
                            setError("Vous avez déjà sélectionné ce métier...")
                            setNav(3)
                            break
                        }
                    }
                }
            }
        } else if (qna.length > 0) {
            for (let i = 0; i < qna.length; i++) {
                if (qna[i].question === "" || qna[i].question.length < 10 || qna[i].question.length > 100) {
                    setErr(`question-${i}`)
                    setError("Veuillez saisir une question valide, votre question doit faire entre 10 et 100 caractères")
                    setNav(4)
                    break
                } else if (qna[i].answer === "" || qna[i].answer.length < 10 || qna[i].answer.length > 4000) {
                    setErr(`answer-${i}`)
                    setError("Veuillez ajouter une reponse valide à votre question")
                    setNav(4)
                    break
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
                    content: content,
                    start: start,
                    end: end,
                    works: workArray,
                    qna: qna,
                    networks: networks,
                    manager: user._id,
                    members: { id: user._id, pseudo: user.pseudo, picture: user.picture, role: "manager", since: new Date().toISOString() }
                }
            }).then(async res => {
                if (res.data.errors) {
                    if (res.data.errors.title) setError(res.data.errors.title)
                    else if (res.data.errors.category) setError(res.data.errors.category)
                    else if (res.data.errors.content) setError(res.data.errors.content)
                } else {
                    let pictures = mainPic.concat(files)
                    if (pictures.length > 0) {
                        await axios.get(`${process.env.REACT_APP_API_URL}api/project/${URLID}/${URL}`)
                            .then(async response => {
                                let formData = new FormData()
                                for (let i = 0; i < pictures.length; i++) {
                                    formData.append('files', pictures[i])
                                }
                                await axios
                                    .put(`${process.env.REACT_APP_API_URL}api/project/add-pictures/${response.data._id}`, formData)
                                    .then(res => res.data)
                                    .catch(err => console.log(err))
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
            <div className="add-project">
                <div className="add-project-header">
                    <div className="add-project-header-top">
                        <div className="logo_container">
                            <Link to="/">
                                <img className="logo-main" src="/img/logo-top.png" alt="" />
                            </Link>
                        </div>
                        <div className="header-top-right !hidden sm:!flex">
                            <TextButton className="btn_icon_start">
                                <Icon name="Visible" /> Aperçu
                            </TextButton>
                            <Button onClick={handleAddProject}>
                                Enregistrer et publier
                            </Button>
                        </div>
                    </div>
                    <div className="add-project-header-bottom">
                        <div className="add-project-header-bottom-container custom-scrollbar-x">
                            <div className={`${addClass(nav === 0, "active")}`} onClick={() => setNav(0)}>
                                <Icon name="FilesMultiples" />
                                <p>Les bases</p>
                            </div>
                            <div className={`${addClass(nav === 1, "active")}`} onClick={() => setNav(1)}>
                                <Icon name="Article" />
                                <p>Description</p>
                            </div>
                            <div className={`${addClass(nav === 2, "active")}`} onClick={() => setNav(2)}>
                                <Icon name="Picture" />
                                <p>Galerie</p>
                            </div>
                            <div className={`${addClass(nav === 3, "active")}`} onClick={() => setNav(3)}>
                                <Icon name="Group" />
                                <p>Équipe</p>
                            </div>
                            <div className={`${addClass(nav === 4, "active")}`} onClick={() => setNav(4)}>
                                <Icon name="Quotes" />
                                <p>FAQ</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-md pb-8 pt-[120px]">
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
                                start={start}
                                setStart={setStart}
                                end={end}
                                setEnd={setEnd}
                            />
                            <Networks
                                networks={networks}
                                setNetworks={setNetworks}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                            />
                            <div className="btn_container">
                                <Button className="btn_icon_end" onClick={() => setNav(1)}>
                                    Suivant : Description <Icon name="DoubleArrowRight" />
                                </Button>
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
                            <div className="btn_container">
                                <Button className="btn_icon_start mr-2" onClick={() => setNav(0)}>
                                    <Icon name="DoubleArrowLeft" /> Retour : Les bases
                                </Button>
                                <Button className="btn_icon_end" onClick={() => setNav(2)}>
                                    Suivant : Galerie <Icon name="DoubleArrowRight" />
                                </Button>
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
                            <div className="btn_container">
                                <Button className="btn_icon_start mr-2" onClick={() => setNav(1)}>
                                    <Icon name="DoubleArrowLeft" /> Retour : Description
                                </Button>
                                <Button onClick={() => setNav(3)}>
                                    Suivant : Équipe <Icon name="DoubleArrowRight" />
                                </Button>
                            </div>
                        </>
                    }
                    {nav === 3 &&
                        <>
                            <div className="titles-container">
                                <h1>Compétences recherchées</h1>
                                <h2>Séléctionnez les compétences que vous recherchez et décrivez pourquoi.</h2>
                                {workArray.length === 0 &&
                                    <Button
                                        className="mx-auto mt-8"
                                        onClick={() => setWorkArray([{ name: "", number: "", numberFound: "", description: "" }])}
                                    >
                                        Rechercher des compétences
                                    </Button>
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
                            <div className="btn_container">
                                <Button className="btn_icon_start mr-2" onClick={() => setNav(2)}>
                                    <Icon name="DoubleArrowLeft" /> Retour : Galerie
                                </Button>
                                <Button onClick={() => setNav(4)}>
                                    Suivant : FAQ <Icon name="DoubleArrowRight" />
                                </Button>
                            </div>
                        </>
                    }
                    {nav === 4 &&
                        <>
                            <div className="titles-container">
                                <h1>Foire aux questions</h1>
                                <h2>Répondez aux questions que votre public pourrait se poser.</h2>
                                {qna.length === 0 &&
                                    <Button
                                        className="mx-auto mt-8"
                                        onClick={() => setQna([{ question: "", answer: "" }])}
                                    >
                                        Démarrer une foire aux questions
                                    </Button>
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
                            <div className="btn_container">
                                <Button className="btn_icon_start mr-2" onClick={() => setNav(3)}>
                                    <Icon name="DoubleArrowLeft" /> Retour : Équipe
                                </Button>
                            </div>
                        </>
                    }
                </div>
                <div id="back-actions" className="block sm:hidden">
                    <div className="back-actions-inner">
                        <TextButton className="btn_icon_start mr-2">
                            <Icon name="Visible" />Aperçu
                        </TextButton>
                        <Button onClick={handleAddProject}>Enregistrer et publier</Button>
                    </div>
                </div>
                <FooterLight />
            </div>
        </>
    )
}

export default AddProject