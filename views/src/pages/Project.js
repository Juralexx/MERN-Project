import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import axios from "axios";
import { dateParser } from '../components/Utils';
import { getProject } from '../actions/project.action';
import Title from '../components/project/project-page/owner/Title';
import Category from '../components/project/project-page/owner/Category';
import Location from '../components/project/project-page/owner/Location';
import End from '../components/project/project-page/owner/End';
import Content from '../components/project/project-page/owner/Content';
import Loader from '../components/tools/Loader';
import { UidContext } from '../components/AppContext';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import State from '../components/project/project-page/owner/State';
import Work from '../components/project/project-page/owner/Work';

const Project = () => {
  const uid = useContext(UidContext)
  const [projectOwner, setProjectOwner] = useState(false)
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
          setDescription(data.content[0].ops)
          setLoading(false)
          if (project.posterId === uid) {
            setProjectOwner(true)
          }
        } else { navigate('/') }
      } catch (err) {
        console.error(err)
      }
    };
    fetch()
  }, [titleURL, navigate, dispatch, uid, project.posterId])

  var callback = {}
  var converter = new QuillDeltaToHtmlConverter(description, callback)
  var html = converter.convert(description)
  function getDescription() { return ({ __html: html }) }

  return (
    <div className="container">
      {isLoading && <Loader />}
      {!isLoading && (
        projectOwner ? (
          <>
            <Title props={project.title} id={project._id} />
            <p>Posté par : <NavLink to={"/" + project.posterPseudo}>{project.posterPseudo}</NavLink></p>
            <State props={project.state} id={project._id} />
            <Category props={project.category} id={project._id} />
            <Location props={project.location} id={project._id} />
            <End props={project.end} id={project._id} />
            <p>Nombre de personne : {project.numberofcontributors}</p>
            <p>Date de création : {dateParser(project.createdAt)}</p>
            <p>Dernière modification : {dateParser(project.updatedAt)}</p>
            <Work props={project.works} id={project._id} />
            <Content props={description} id={project._id} />
          </>
        ) : (
          <>
            <p>{project.title}</p>
            <p>Posté par : <NavLink to={"/" + project.posterPseudo}>{project.posterPseudo}</NavLink></p>
            <p>{project.category}</p>
            <p>{project.location}</p>
            <p>Date de fin potentielle : {dateParser(project.end)}</p>
            <p>Nombre de personne : {project.numberofcontributors}</p>
            <p>Date de création : {dateParser(project.createdAt)}</p>
            <p>Dernière modification : {dateParser(project.updatedAt)}</p>
            <p dangerouslySetInnerHTML={getDescription()}></p>
          </>
        )
      )}
    </div>
  )
}

export default Project;