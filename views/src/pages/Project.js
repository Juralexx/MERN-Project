import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import axios from "axios";
import { dateParser } from '../components/Utils';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import Title from '../components/project/project-page/Title';
import { getProject } from '../actions/project.action';
import Category from '../components/project/project-page/Category';
import Location from '../components/project/project-page/Location';
import End from '../components/project/project-page/End';
import Content from '../components/project/project-page/Content';

const Project = () => {
  const projectData = useSelector((state) => state.projectReducer)
  const { titleURL } = useParams()
  const [project, setProject] = useState([])
  const [description, setDescription] = useState([])
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
        } else { navigate('/') }

      } catch (err) {
        console.error(err)
      }
    };
    fetch()
  }, [titleURL, navigate])

  return (
    <div className="container">
      <Title props={projectData.title} id={project._id} />
      <p>Posté par : <NavLink to={"/" + project.posterPseudo}>{project.posterPseudo}</NavLink></p>
      <Category props={projectData.category} id={project._id} />
      <Location props={projectData.location} id={project._id} />
      <End props={projectData.end} id={project._id} />
      <p>Nombre de personne : {project.numberofcontributors}</p>
      <p>Date de création : {dateParser(project.createdAt)}</p>
      <p>Dernière modification : {dateParser(project.updatedAt)}</p>
      <Content props={description} id={project._id} />
    </div>
  )
}

export default Project;