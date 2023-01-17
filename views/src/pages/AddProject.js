import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { addClass, removeAccents } from '../components/Utils'
import { Button, TextButton } from "../components/tools/global/Button";
import Icon from "../components/tools/icons/Icon";
import Title from "../components/project-[add]/Title";
import Location from "../components/project-[add]/Location";
import Works from "../components/project-[add]/Works";
import End from "../components/project-[add]/End";
import Content from "../components/project-[add]/Content";
import Pictures from "../components/project-[add]/Pictures";
import Description from "../components/project-[add]/Description";
import Qna from "../components/project-[add]/Qna";
import Networks from "../components/project-[add]/Networks";

const AddProject = ({ user }) => {
    const [datas, setDatas] = useState({
        title: "",
        subtitle: "",
        category: "",
        tags: [],
        location: {
            city: "",
            department: "",
            codeDepartment: "",
            region: "",
            codeRegion: "",
            newRegion: "",
            codeNewRegion: "",
            geolocalisation: "",
        },
        description: "",
        workArray: [],
        start: "",
        end: "",
        content: {},
        mainPic: [],
        pictures: [],
        qna: [],
        networks: []
    })

    const [error, setError] = useState({ element: "", error: "" })
    const [navbar, setNavbar] = useState(0)
    // const navigate = useNavigate()

    const handleAddProject = async () => {
        if (datas.title === "" || datas.title.length < 10 || datas.title.length > 60) {
            setNavbar(0)
            setError({
                element: "title",
                error: "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 60 caractères."
            })
        } else if (datas.subtitle === "" || datas.subtitle.length < 10 || datas.subtitle.length > 100) {
            setNavbar(0)
            setError({
                element: "subtitle",
                error: "Veuillez saisir un sous-titre valide, votre sous-titre doit faire entre 10 et 100 caractères."
            })
        } else if (datas.category === "") {
            setNavbar(0)
            setError({
                element: "category",
                error: "Veuillez saisir une catégorie."
            })
        } else if (datas.description === "" || datas.description.length < 10 || datas.description.length > 300) {
            setNavbar(0)
            setError({
                element: "description",
                error: "Veuillez ajouter une courte description à votre projet, votre courte-description doit faire entre 10 et 300 caractères."
            })
        } else if (datas.content === "" || datas.content.length < 10 || datas.content.length > 100000) {
            setNavbar(1)
            setError({
                element: "content",
                error: "Veuillez saisir une description valide, votre description doit faire entre 10 et 100 000 caractères."
            })
        } else if (datas.workArray.length > 0) {
            for (let i = 0; i < datas.workArray.length; i++) {
                if (datas.workArray[i].name === "") {
                    setNavbar(3)
                    setError({
                        element: `work-${i}`,
                        error: "Veuillez saisir un métier ou un nombre valide..."
                    })
                } else {
                    if (JSON.stringify(datas.workArray).includes(JSON.stringify(datas.workArray[i].work))) {
                        setNavbar(3)
                        setError({
                            element: `work-${i}`,
                            error: "Vous avez déjà sélectionné ce métier..."
                        })
                    }
                }
            }
        } else if (datas.qna.length > 0) {
            for (let i = 0; i < datas.qna.length; i++) {
                if (datas.qna[i].question === "" || datas.qna[i].question.length < 10 || datas.qna[i].question.length > 200) {
                    setNavbar(4)
                    setError({
                        element: `question-${i}`,
                        error: "Veuillez saisir une question valide, votre question doit faire entre 10 et 100 caractères"
                    })
                } else if (datas.qna[i].answer === "" || datas.qna[i].answer.length < 10 || datas.qna[i].answer.length > 4000) {
                    setNavbar(4)
                    setError({
                        element: `answer-${i}`,
                        error: "Veuillez ajouter une reponse valide à votre question"
                    })
                }
            }
        } else {
            let cleanTitle = datas.title.toLowerCase();
            cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
            cleanTitle = cleanTitle.replace(/[&#,+()$~%^.|_@°=§µ£¤'"`:*?!;<>[\]{}/\\\\]/g, " ")
            cleanTitle = cleanTitle.replace(/ +/g, " ")
            cleanTitle = cleanTitle.trim()
            setDatas(data => ({ ...data, title: cleanTitle }))

            let URL = cleanTitle.toLowerCase();
            URL = removeAccents(URL)
            URL = URL.replace(/ /g, "-")
            let URLID = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)).toString()

            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/project/add`,
                data: {
                    poster: {
                        _id: user._id,
                        pseudo: user.pseudo,
                        picture: user.picture,
                    },
                    title: cleanTitle,
                    URL: URL,
                    URLID: URLID,
                    subtitle: datas.subtitle,
                    category: datas.category,
                    tags: datas.tags,
                    location: {
                        city: datas.location.city,
                        department: datas.location.department,
                        code_department: datas.location.codeDepartment,
                        region: datas.location.region,
                        code_region: datas.location.codeRegion,
                        new_region: datas.location.newRegion,
                        code_new_region: datas.location.codeNewRegion,
                        geolocalisation: datas.location.geolocalisation,
                    },
                    description: datas.description,
                    content: datas.content,
                    start: datas.start,
                    end: datas.end,
                    works: datas.workArray,
                    qna: datas.qna,
                    networks: datas.networks,
                    manager: user._id,
                    members: {
                        _id: user._id,
                        pseudo: user.pseudo,
                        picture: user.picture,
                        role: "manager",
                        since: new Date().toISOString()
                    }
                }
            }).then(async res => {
                if (res.data.errors) {
                    if (res.data.errors.title) {
                        setError({
                            element: 'title',
                            error: res.data.errors.title
                        })
                    } else if (res.data.errors.subtitle) {
                        setError({
                            element: 'subtitle',
                            error: res.data.errors.subtitle
                        })
                    } else if (res.data.errors.category) {
                        setError({
                            element: 'category',
                            error: res.data.errors.category
                        })
                    } else if (res.data.errors.description) {
                        setError({
                            element: 'description',
                            error: res.data.errors.description
                        })
                    } else if (res.data.errors.content) {
                        setError({
                            element: 'content',
                            error: res.data.errors.content
                        })
                    }
                } else {
                    let pictures = datas.mainPic.concat(datas.pictures)
                    if (pictures.length > 0) {
                        await axios.get(`${process.env.REACT_APP_API_URL}api/project/${URLID}/${URL}`)
                            .then(async response => {
                                let formData = new FormData()
                                for (let i = 0; i < pictures.length; i++) {
                                    formData.append('files', pictures[i])
                                }
                                await axios
                                    .put(`${process.env.REACT_APP_API_URL}api/project/${response.data._id}/uploads/pictures/add/`, formData)
                                    .then(res => res.data)
                                    .catch(err => console.log(err))
                            }).catch(err => console.log(err))
                    }
                    //setTimeout(navigate(`/project/${URLID}/${URL}`), 2000)
                }
            }).catch(err => console.log(err))
        }
    }

    return (
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
                        <div className={`nav-item ${addClass(navbar === 0, "active")}`} onClick={() => setNavbar(0)}>
                            <Icon name="FilesMultiples" />
                            <p>Les bases</p>
                        </div>
                        <div className={`nav-item ${addClass(navbar === 1, "active")}`} onClick={() => setNavbar(1)}>
                            <Icon name="Article" />
                            <p>Description</p>
                        </div>
                        <div className={`nav-item ${addClass(navbar === 2, "active")}`} onClick={() => setNavbar(2)}>
                            <Icon name="Picture" />
                            <p>Galerie</p>
                        </div>
                        <div className={`nav-item ${addClass(navbar === 3, "active")}`} onClick={() => setNavbar(3)}>
                            <Icon name="Group" />
                            <p>Équipe</p>
                        </div>
                        <div className={`nav-item ${addClass(navbar === 4, "active")}`} onClick={() => setNavbar(4)}>
                            <Icon name="Quotes" />
                            <p>FAQ</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-md pb-8 pt-[120px]">
                {navbar === 0 &&
                    <>
                        <div className="titles-container">
                            <h1>Commençons par les bases</h1>
                            <h2>Facilitez la tâche de ceux qui veulent en savoir plus.</h2>
                        </div>
                        <Title
                            datas={datas}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                        <Location
                            datas={datas}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                        <Description
                            datas={datas}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                        <End
                            datas={datas}
                            setDatas={setDatas}
                        />
                        <Networks
                            datas={datas}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                        <div className="btn_container">
                            <Button className="btn_icon_end" onClick={() => setNavbar(1)}>
                                Suivant : Description <Icon name="DoubleArrowRight" />
                            </Button>
                        </div>
                    </>
                }
                {navbar === 1 &&
                    <>
                        <div className="titles-container">
                            <h1>Il est temps de décrire votre projet en détail !</h1>
                            <h2>Qu'est-ce qui donnera envie à votre public de se rassembler autour de votre projet ? Ici, clarté, concision et précision sont de mise.</h2>
                        </div>
                        <Content
                            datas={datas}
                            setDatas={setDatas}
                        />
                        <div className="btn_container">
                            <Button className="btn_icon_start mr-2" onClick={() => setNavbar(0)}>
                                <Icon name="DoubleArrowLeft" /> Retour : Les bases
                            </Button>
                            <Button className="btn_icon_end" onClick={() => setNavbar(2)}>
                                Suivant : Galerie <Icon name="DoubleArrowRight" />
                            </Button>
                        </div>
                    </>
                }
                {navbar === 2 &&
                    <>
                        <div className="titles-container">
                            <h1>De belles images vous donne plus de visibilité !</h1>
                            <h2>Ajoutez des images qui représente clairement votre projet.</h2>
                        </div>
                        <Pictures
                            datas={datas}
                            setDatas={setDatas}
                        />
                        <div className="btn_container">
                            <Button className="btn_icon_start mr-2" onClick={() => setNavbar(1)}>
                                <Icon name="DoubleArrowLeft" /> Retour : Description
                            </Button>
                            <Button onClick={() => setNavbar(3)}>
                                Suivant : Équipe <Icon name="DoubleArrowRight" />
                            </Button>
                        </div>
                    </>
                }
                {navbar === 3 &&
                    <>
                        <div className="titles-container">
                            <h1>Compétences recherchées</h1>
                            <h2>Séléctionnez les compétences que vous recherchez et décrivez pourquoi.</h2>
                            {datas.workArray.length === 0 &&
                                <TextButton
                                    className="mx-auto mt-8"
                                    onClick={() => setDatas(data => ({ ...data, workArray: [{ name: "", description: "" }] }))}
                                >
                                    Rechercher des compétences
                                </TextButton>
                            }
                        </div>
                        <Works
                            datas={datas}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                        <div className="btn_container">
                            <Button className="btn_icon_start mr-2" onClick={() => setNavbar(2)}>
                                <Icon name="DoubleArrowLeft" /> Retour : Galerie
                            </Button>
                            <Button onClick={() => setNavbar(4)}>
                                Suivant : FAQ <Icon name="DoubleArrowRight" />
                            </Button>
                        </div>
                    </>
                }
                {navbar === 4 &&
                    <>
                        <div className="titles-container">
                            <h1>Foire aux questions</h1>
                            <h2>Répondez aux questions que votre public pourrait se poser.</h2>
                            {datas.qna.length === 0 &&
                                <Button
                                    className="mx-auto mt-8"
                                    onClick={() => setDatas(data => ({ ...data, qna: [{ question: "", answer: "" }] }))}
                                >
                                    Démarrer une foire aux questions
                                </Button>
                            }
                        </div>
                        <Qna
                            datas={datas}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                        <div className="btn_container">
                            <Button className="btn_icon_start mr-2" onClick={() => setNavbar(3)}>
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
                    <Button onClick={handleAddProject}>
                        Enregistrer et publier
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddProject