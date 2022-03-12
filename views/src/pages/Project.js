import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import axios from "axios";
import { dateParser } from '../components/Utils';
import { getProject } from '../actions/project.action';
import Loader from '../components/tools/components/Loader';
import { UidContext } from '../components/AppContext';
import { convertDeltaToHTML } from '../components/messenger/tools/function';

const Project = () => {
    const uid = useContext(UidContext)
    const { titleURL } = useParams()
    const [project, setProject] = useState([])
    const [description, setDescription] = useState([])
    const [isLoading, setLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/project/${titleURL}`)
                if (data.titleURL) {
                    dispatch(getProject(data._id))
                    setProject(data)
                    setDescription(data.content[0])
                    setLoading(false)
                } else { navigate('/') }
            } catch (err) {
                console.error(err)
            }
        };
        fetch()
    }, [titleURL, navigate, dispatch, uid, project.posterId])

    return (
        <div className="container">
            {isLoading && <Loader />}
            {!isLoading && (
                <div>
                    <p>{project.title}</p>
                    <p>Posté par : <NavLink to={"/" + project.posterPseudo}>{project.posterPseudo}</NavLink></p>
                    <p>{project.category}</p>
                    <p>{project.location}</p>
                    <p>Date de fin potentielle : {dateParser(project.end)}</p>
                    <p>Nombre de personne : {project.numberofcontributors}</p>
                    <p>Date de création : {dateParser(project.createdAt)}</p>
                    <p>Dernière modification : {dateParser(project.updatedAt)}</p>
                    <p dangerouslySetInnerHTML={convertDeltaToHTML(description.ops)}></p>
                </div>
            )}
        </div>
    )
}

export default Project;