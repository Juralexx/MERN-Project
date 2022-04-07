import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react';
import { useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone';
import { ErrorCard } from '../../tools/components/Error';
import { SmallLoader } from '../../tools/components/Loader';
import { deleteProjectPictures, updateProjectPictures } from '../../../actions/project.action'
import { ImImage } from 'react-icons/im'
import { IoMdCloudDownload } from 'react-icons/io'
import { IoTrashSharp } from 'react-icons/io5'
import { Oval } from 'react-loading-icons'

const Gallery = ({ project, isManager }) => {
     const [toggler, setToggler] = useState(false)
     const [pictures, setPictures] = useState(project.pictures)
     const [isErr, setErr] = useState(false)
     const [error, setError] = useState("")
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
                    setErr(true)
                    setError("Vous ne pouvez pas ajouter plus de 6 photos")
               }
          })
          if (i > 0)
               dispatch(updateProjectPictures(project._id, formData, `${process.env.REACT_APP_API_URL}uploads/projects/${project._id}/${project._id}.jpg`))
     }

     const deleteFile = (file) => {
          setPictures(project.pictures)
          if (!file.includes("blob"))
               dispatch(deleteProjectPictures(project._id, file))
     }

     return (
          <div className="gallery-wrapper">
               <div className="gallery-container">
                    {isManager &&
                         <>
                              <div {...getRootProps({ className: `dropzone ${isDragActive && "active"} ${pictures.length === 6 && "disabled"}` })}>
                                   <input {...getInputProps()} name="files" />
                                   <IoMdCloudDownload />
                                   {pictures.length === 6 ? (
                                        <p>Votre galerie est pleine</p>
                                   ) : (
                                        <p>Cliquez ou glisser-déposer vos images ici</p>
                                   )}
                              </div>
                              {isErr && <ErrorCard display={isErr} text={error} clean={() => setErr(false)} />}
                         </>
                    }
                    <div className="gallery">
                         {pictures.map((element, key) => {
                              return (
                                   <div className="gallery-brick" key={key}>
                                        <img src={element} alt={project.title} title={project.title} onClick={() => setToggler(!toggler)} />
                                        <div className="img-tools">
                                             <div className="img-tools-item" onClick={() => deleteFile(element)}>
                                                  <IoTrashSharp />
                                             </div>
                                        </div>
                                   </div>
                              )
                         })}
                         {[...Array(6 - pictures.length)].map((element, key) => {
                              return (
                                   <div className="gallery-brick-empty" key={key}>
                                        {areLoading.includes(pictures.length + key) ? (
                                             <Oval />
                                        ) : (
                                             <ImImage />
                                        )}
                                   </div>
                              )
                         })}
                    </div>
                    <FsLightbox
                         toggler={toggler}
                         sources={pictures}
                         types={[...Array(pictures.length)].fill('image')}
                    />
               </div>
          </div>
     )
}

export default Gallery