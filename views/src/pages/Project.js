import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";

const Project = () => {
    const { titleURL } = useParams();
    const [project, setProject] = useState({});
    const navigate = useNavigate()
  
    useEffect(() => {
      const fetch = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/project/${titleURL}`)
          data.titleURL ? setProject(data) : navigate('/')
          
        } catch (err) {
          console.error(err)
        }
      };
      fetch();
    }, [titleURL]);
  
    return (
      <>
        <div className="container">
          <h1>Titre du projet : {project.title}</h1>
        </div>
      </>
  
    )
}

export default Project;