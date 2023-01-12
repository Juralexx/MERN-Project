import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateProject } from '../../../actions/project.action'
import { addClass, ISOtoNavFormat, removeAccents } from '../../Utils'
import { Button, TextButton } from '../../tools/global/Button'
import Title from './Title'
import State from './State'
import Tags from './Tags'
import Location from './Location'
import End from './End'
import Works from './Works'
import Content from './Content'
import Description from './Description'
import Networks from './Networks'

const Edit = ({ project }) => {
    const [datas, setDatas] = useState({
        title: project.title,
        subtitle: project.subtitle,
        url: project.URL,
        category: project.category,
        tags: project.tags,
        geolocalisation: project.geolocalisation,
        location: project.location,
        department: project.department,
        codeDepartment: project.code_department,
        region: project.region,
        codeRegion: project.code_region,
        newRegion: project.new_region,
        codeNewRegion: project.code_new_region,
        description: project.description,
        workArray: project.works,
        end: project.end,
        content: project.content[0].ops,
        state: project.state,
        networks: project.networks,
    })
    const [contentChanged, setContentChanged] = useState(false)
    const [error, setError] = useState({ element: "", error: "" })
    const [nav, setNav] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdate = async () => {
        if (datas.title === "" || datas.title.length < 10 || datas.title.length > 60) {
            setError({
                element: "title",
                error: "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 60 caractères"
            })
        } else if (datas.subtitle === "" || datas.subtitle.length < 10 || datas.subtitle.length > 120) {
            setError({
                element: "subtitle",
                error: "Veuillez saisir un sous-titre valide, votre sous-titre doit faire entre 10 et 120 caractères"
            })
        } else if (datas.category === "") {
            setError({
                element: "category",
                error: "Veuillez saisir une catégorie"
            })
        } else if (datas.description === "" || datas.description.length < 10 || datas.description.length > 300) {
            setError({
                element: "description",
                error: "Veuillez ajouter une courte description à votre projet"
            })
        } else if (datas.content === "" || datas.content.length < 10 || datas.content.length > 100000) {
            setError({
                element: "content",
                error: "Veuillez saisir une description valide, votre description doit faire entre 10 et 10 000 caractères"
            })
        } else {
            if (datas.title !== project.title) {
                let cleanTitle = datas.title.toLowerCase();
                cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
                cleanTitle = cleanTitle.replace(/[&#,+()$~%^.'":*?!;<>{}/\\\\]/g, " ")
                cleanTitle = cleanTitle.replace(/ +/g, " ")
                cleanTitle = cleanTitle.trim()
                setDatas(data => ({ ...data, title: cleanTitle }))

                let URL = cleanTitle.toLowerCase();
                URL = removeAccents(URL)
                URL = URL.replace(/ /g, "-")
                setDatas(data => ({ ...data, url: URL }))
            }

            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/project/${project._id}`,
                data: {
                    title: datas.title,
                    URL: datas.url,
                    subtitle: datas.subtitle,
                    category: datas.category,
                    description: datas.description,
                    tags: datas.tags,
                    state: datas.state,
                    geolocalisation: datas.geolocalisation,
                    location: datas.location,
                    department: datas.department,
                    code_department: datas.codeDepartment,
                    region: datas.region,
                    code_region: datas.codeRegion,
                    new_region: datas.newRegion,
                    code_new_region: datas.codeNewRegion,
                    end: datas.end,
                    content: datas.content,
                    works: datas.workArray,
                    networks: datas.networks,
                }
            }).then(async res => {
                if (res.data.errors) {
                    if (res.data.errors.title)
                        setError({ element: "title", error: res.data.errors.title })
                    else if (res.data.errors.category)
                        setError({ element: "category", error: res.data.errors.category })
                    else if (res.data.errors.content)
                        setError({ element: "content", error: res.data.errors.content })
                } else {
                    dispatch(updateProject(
                        project._id,
                        datas.title,
                        datas.url,
                        datas.subtitle,
                        datas.category,
                        datas.description,
                        datas.tags,
                        datas.state,
                        datas.geolocalisation,
                        datas.location,
                        datas.department,
                        datas.codeDepartment,
                        datas.region,
                        datas.codeRegion,
                        datas.newRegion,
                        datas.codeNewRegion,
                        datas.end,
                        datas.content,
                        datas.workArray,
                        datas.networks
                    ))
                    const redirection = navigate(`/projects/${project.URLID}/${project.URL}/about`)
                    setTimeout(redirection, 2000)
                }
            }).catch(err => console.log(err))
        }
    }

    return (
        <div className="container-lg py-8 pb-[100px] edit-project">
            <div className="header flex justify-between mb-5">
                <h3>Modification du projet</h3>
            </div>
            <nav className="dashboard-header_navbar">
                <div className='dashboard-header_navbar-content border-none custom-scrollbar-x'>
                    <div
                        className={`${addClass(nav === 0, "active")}`}
                        onClick={() => setNav(0)}
                    >
                        Les bases
                    </div>
                    <div
                        className={`${addClass(nav === 1, "active")}`}
                        onClick={() => setNav(1)}
                    >
                        Description
                    </div>
                    <div
                        className={`${addClass(nav === 2, "active")}`}
                        onClick={() => setNav(2)}
                    >
                        Recherches
                    </div>
                </div>
            </nav>
            {nav === 0 &&
                <>
                    <div className="edit-container">
                        <Title
                            title={datas.title}
                            subtitle={datas.subtitle}
                            category={datas.category}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                    </div>
                    <div className="edit-container">
                        <Description
                            description={datas.description}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                    </div>
                    <div className="edit-container">
                        <Tags
                            tags={datas.tags}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                    </div>
                    <div className="edit-container">
                        <State
                            state={datas.state}
                            setDatas={setDatas}
                        />
                    </div>
                    <div className="edit-container">
                        <Location
                            project={project}
                            location={datas.location}
                            department={datas.department}
                            region={datas.region}
                            geolocalisation={datas.geolocalisation}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                    </div>
                    <div className="edit-container">
                        <End
                            end={datas.end}
                            setDatas={setDatas}
                        />
                    </div>
                    <div className="edit-container">
                        <Networks
                            networks={datas.networks}
                            setDatas={setDatas}
                            error={error}
                            setError={setError}
                        />
                    </div>
                </>
            }

            {nav === 1 &&
                <div className="edit-container">
                    <Content
                        content={datas.content}
                        setDatas={setDatas}
                        contentChanged={contentChanged}
                        setContentChanged={setContentChanged}
                    />
                </div>
            }

            {nav === 2 &&
                <div className="edit-container">
                    <h3>Nombre de personnes et compétences recherchées</h3>
                    <p>
                        Saisissez l'emplacement géographique qui correspond au mieux à votre projet. Les contributeurs potentiels les verront aussi si votre projet apparaît dans les différentes catégories,
                        les résultats de recherche ou les e-mails que nous envoyons à notre communauté.
                    </p>
                    <Works
                        workArray={datas.workArray}
                        setDatas={setDatas}
                        error={error}
                        setError={setError}
                    />
                </div>
            }
            <div id="back-actions">
                <div className='back-actions-inner'>
                    <TextButton>
                        <Link to={`/projects/${project.URLID}/${project.URL}/about`}>Annuler</Link>
                    </TextButton>
                    <Button
                        className="ml-2"
                        onClick={handleUpdate}
                        disabled={
                            datas.title === project.title
                            && datas.subtitle === project.subtitle
                            && datas.category === project.category
                            && datas.description === project.description
                            && datas.state === project.state
                            && datas.location === project.location
                            && datas.end === ISOtoNavFormat(project.end)
                            && JSON.stringify(datas.workArray) === JSON.stringify(project.works)
                            && !contentChanged
                        }
                    >
                        Enregistrer
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Edit