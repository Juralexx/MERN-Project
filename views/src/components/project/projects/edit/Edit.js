import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateProject } from '../../../../actions/project.action'
import { addClass, ISOtoNavFormat, removeAccents } from '../../../Utils'
import { Button, TextButton } from '../../../tools/global/Button'
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
    const [title, setTitle] = useState(project.title)
    const [subtitle, setSubtitle] = useState(project.subtitle)
    const [url, setUrl] = useState(project.URL)
    const [category, setCategory] = useState(project.category)
    const [tags, setTags] = useState(project.tags)
    const [geolocalisation, setGeolocalisation] = useState(project.geolocalisation)
    const [location, setLocation] = useState(project.location)
    const [department, setDepartment] = useState(project.department)
    const [codeDepartment, setCodeDepartment] = useState(project.code_department)
    const [region, setRegion] = useState(project.region)
    const [codeRegion, setCodeRegion] = useState(project.code_region)
    const [newRegion, setNewRegion] = useState(project.new_region)
    const [codeNewRegion, setCodeNewRegion] = useState(project.code_new_region)
    const [description, setDescription] = useState(project.description)
    const [workArray, setWorkArray] = useState(project.works)
    const [end, setEnd] = useState(ISOtoNavFormat(project.end))
    const [content, setContent] = useState(project.content[0].ops)
    const [state, setState] = useState(project.state)
    const [networks, setNetworks] = useState(project.networks)
    const [contentChanged, setContentChanged] = useState(false)
    const [error, setError] = useState({ element: "", error: "" })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nav, setNav] = useState(0)

    const handleUpdate = async () => {
        if (title === "" || title.length < 10 || title.length > 60) {
            setError({
                element: "title",
                error: "Veuillez saisir un titre valide, votre titre doit faire entre 10 et 60 caractères"
            })
        } else if (subtitle === "" || subtitle.length < 10 || subtitle.length > 120) {
            setError({
                element: "subtitle",
                error: "Veuillez saisir un sous-titre valide, votre sous-titre doit faire entre 10 et 120 caractères"
            })
        } else if (category === "") {
            setError({
                element: "category",
                error: "Veuillez saisir une catégorie"
            })
        } else if (description === "" || description.length < 10 || description.length > 300) {
            setError({
                element: "description",
                error: "Veuillez ajouter une courte description à votre projet"
            })
        } else if (content === "" || content.length < 10 || content.length > 100000) {
            setError({
                element: "content",
                error: "Veuillez saisir une description valide, votre description doit faire entre 10 et 10 000 caractères"
            })
        } else {
            if (title !== project.title) {
                let cleanTitle = title.toLowerCase();
                cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
                cleanTitle = cleanTitle.replace(/[&#,+()$~%^.'":*?!;<>{}/\\\\]/g, " ")
                cleanTitle = cleanTitle.replace(/ +/g, " ")
                cleanTitle = cleanTitle.trim()
                setTitle(cleanTitle)

                let URL = cleanTitle.toLowerCase();
                URL = removeAccents(URL)
                URL = URL.replace(/ /g, "-")
                setUrl(URL)
            }

            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/project/${project._id}`,
                data: {
                    title: title,
                    URL: url,
                    subtitle: subtitle,
                    category: category,
                    description: description,
                    tags: tags,
                    state: state,
                    geolocalisation: geolocalisation,
                    location: location,
                    department: department,
                    code_department: codeDepartment,
                    region: region,
                    code_region: codeRegion,
                    new_region: newRegion,
                    code_new_region: codeNewRegion,
                    end: end,
                    content: content,
                    works: workArray,
                    networks: networks,
                }
            }).then(async res => {
                if (res.data.errors) {
                    if (res.data.errors.title) setError(res.data.errors.title)
                    else if (res.data.errors.category) setError(res.data.errors.category)
                    else if (res.data.errors.content) setError(res.data.errors.content)
                } else {
                    dispatch(updateProject(project._id, title, URL, subtitle, category, tags, state, geolocalisation, location, department, codeDepartment, region, codeRegion, newRegion, codeNewRegion, description, end, workArray, content))
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
                    <div className={`${addClass(nav === 0, "active")}`} onClick={() => setNav(0)}>Les bases</div>
                    <div className={`${addClass(nav === 1, "active")}`} onClick={() => setNav(1)}>Description</div>
                    <div className={`${addClass(nav === 2, "active")}`} onClick={() => setNav(2)}>Recherches</div>
                </div>
            </nav>
            {nav === 0 &&
                <>
                    <div className="edit-container">
                        <Title
                            title={title}
                            setTitle={setTitle}
                            subtitle={subtitle}
                            setSubtitle={setSubtitle}
                            category={category}
                            setCategory={setCategory}
                            error={error}
                            setError={setError}
                        />
                    </div>
                    <div className="edit-container">
                        <Description
                            description={description}
                            setDescription={setDescription}
                            error={error}
                            setError={setError}
                        />
                    </div>
                    <div className="edit-container">
                        <Tags
                            tags={tags}
                            setTags={setTags}
                            error={error}
                            setError={setError}
                        />
                    </div>
                    <div className="edit-container">
                        <State
                            state={state}
                            setState={setState}
                        />
                    </div>
                    <div className="edit-container">
                        <Location
                            project={project}
                            location={location}
                            setLocation={setLocation}
                            department={department}
                            setDepartment={setDepartment}
                            setCodeDepartment={setCodeDepartment}
                            region={region}
                            setRegion={setRegion}
                            setCodeRegion={setCodeRegion}
                            setNewRegion={setNewRegion}
                            setCodeNewRegion={setCodeNewRegion}
                            geolocalisation={geolocalisation}
                            setGeolocalisation={setGeolocalisation}
                            error={error}
                            setError={setError}
                        />
                    </div>
                    <div className="edit-container">
                        <End
                            end={end}
                            setEnd={setEnd}
                        />
                    </div>
                    <div className="edit-container">
                        <Networks
                            networks={networks}
                            setNetworks={setNetworks}
                            error={error}
                            setError={setError}
                        />
                    </div>
                </>
            }

            {nav === 1 &&
                <div className="edit-container">
                    <Content
                        content={content}
                        setContent={setContent}
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
                        workArray={workArray}
                        setWorkArray={setWorkArray}
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
                        disabled={title === project.title && subtitle === project.subtitle && category === project.category && description === project.description && state === project.state && location === project.location && end === ISOtoNavFormat(project.end) && JSON.stringify(workArray) === JSON.stringify(project.works) && !contentChanged}
                    >
                        Enregistrer
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Edit