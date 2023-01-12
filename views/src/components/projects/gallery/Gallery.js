import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone';
import { ErrorCard } from '../../tools/global/Error';
import { deleteProjectPictures, updateProjectPictures } from '../../../actions/project.action'
import { download } from '../../Utils';
import FsLightbox from 'fslightbox-react';
import Oval from '../../tools/loaders/Oval'
import Icon from '../../tools/icons/Icon';

const Gallery = ({ project, isManager }) => {
     const [toggler, setToggler] = useState({ open: false, imgIndex: 0 })
     const [pictures, setPictures] = useState(project.pictures)
     const [error, setError] = useState({ state: false, error: "" })
     const [areLoading, setLoading] = useState([])
     const dispatch = useDispatch()

     const { getRootProps, getInputProps, isDragActive } = useDropzone({
          accept: 'image/jpeg, image/jpg, image/png, image/gif, image/heic, image/heif, image/tiff, image/webp',
          maxSize: 5000000,
          onDrop: files => getFiles(files),
          disabled: pictures.length === 6
     })

     const getFiles = (filesArray) => {
          let formData = new FormData()
          let i = 0
          Array.from(filesArray).forEach((file, key) => {
               if (pictures.length < 6) {
                    formData.append('files', file)
                    setLoading(loads => [...loads, pictures.length + key])
                    setTimeout(() => {
                         setPictures(pics => [...pics, `${process.env.REACT_APP_API_URL}uploads/projects/${project._id}/${project._id}-${pictures.length + key}.jpg`])
                         setLoading(loads => loads.filter(element => element !== pictures.length + key))
                    }, 5000)
                    i++
               } else {
                    setError({ state: true, error: "Vous ne pouvez pas ajouter plus de 6 photos" })
               }
          })
          if (i > 0) {
               dispatch(updateProjectPictures(project._id, formData, pictures))
          }
     }

     const deleteFile = (file) => {
          if (!file.includes("blob")) {
               dispatch(deleteProjectPictures(project._id, file))
               setPictures(project.pictures)
          }
     }

     return (
          <div className="container-lg py-8">
               <div className="gallery">
                    {isManager &&
                         <>
                              <div {...getRootProps({ className: `dropzone ${isDragActive && "active"} ${pictures.length === 6 && "disabled"}` })}>
                                   <input {...getInputProps()} name="files" />
                                   <Icon name="UploadCloud" />
                                   {pictures.length === 6 ? (
                                        <p>Votre galerie est pleine</p>
                                   ) : (
                                        <p>Cliquez ou glissez-déposez<br />vos images ici</p>
                                   )}
                              </div>
                              {error.state &&
                                   <ErrorCard display={error.state} text={error.error} clean={() => setError(err => ({ ...err, state: false }))} />
                              }
                         </>
                    }
                    {pictures.map((element, key) => {
                         return (
                              <div className="gallery-brick" key={key} onClick={() => { setToggler({ open: !toggler.open, imgIndex: key }) }}>
                                   <img src={element} alt={project.title} title={project.title} />
                                   <div className="img-tools">
                                        <div className="img-tools-item" onClick={() => download(element)}>
                                             <Icon name="Download" />
                                        </div>
                                        {isManager &&
                                             <div className="img-tools-item" onClick={() => deleteFile(element)}>
                                                  <Icon name="Trash" />
                                             </div>
                                        }
                                   </div>
                              </div>
                         )
                    })}
                    {[...Array(6 - pictures.length)].map((_, key) => {
                         return (
                              <div className="gallery-brick-empty" key={key}>
                                   {areLoading.includes(pictures.length + key) ? <Oval /> : <Icon name="Picture" />}
                              </div>
                         )
                    })}
                    <FsLightbox
                         toggler={toggler.open}
                         sources={project.pictures}
                         source={project.pictures[toggler.imgIndex]}
                         types={[...Array(project.pictures.length)].fill('image')}
                    />
               </div>
          </div>
     )
}

export default Gallery