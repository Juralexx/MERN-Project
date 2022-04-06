import React, { useRef, useState } from 'react'
import { ISOtoNavFormat } from '../../../Utils'
import Title from './Title'
import Category from './Category'
import State from './State'
import End from './End'
import Location from './Location'
import Works from './Works'
import Content from './Content'
import { Button, OutlinedButton, TextButton } from '../../../tools/components/Button'

const Edit = ({ project, user }) => {
    const [title, setTitle] = useState(project.title)
    const [category, setCategory] = useState(project.category)
    const [location, setLocation] = useState(project.location)
    const [department, setDepartment] = useState(project.department)
    const [region, setRegion] = useState(project.region)
    const [newRegion, setNewRegion] = useState(project.new_region)
    const [numberofcontributors, setNumberofcontributors] = useState(project.numberofcontributors)
    const [workArray, setWorkArray] = useState(project.works)
    const [end, setEnd] = useState(ISOtoNavFormat(project.end))
    const [content, setContent] = useState(project.content[0].ops)
    const [state, setState] = useState(project.state)
    const [error, setError] = useState(null)
    const [isErr, setErr] = useState(null)
    const errorRef = useRef()

    return (
        <div className="edit-project">
            <div className="edit-project-container">
                <div className="header flex justify-between mb-5">
                    <h2>Modification du projet</h2>
                    <div className="flex">
                        <OutlinedButton text="Annuler" className="mx-2" />
                        <Button text="Enregistrer"  />
                    </div>
                </div>
                <Title
                    title={title}
                    setTitle={setTitle}
                    category={category}
                    setCategory={setCategory}
                    isErr={isErr}
                    setErr={setErr}
                    error={error}
                    setError={setError}
                />
                <div className="edit-project-flex-container">
                    <div className="edit-project-flex-content">
                        <Category
                            category={category}
                            setCategory={setCategory}
                            isErr={isErr}
                            error={error}
                        />
                    </div>
                    <div className="edit-project-flex-content">
                        <State
                            state={state}
                            setState={setState}
                        />
                    </div>
                </div>
                <div className="edit-project-flex-container">
                    <div className="edit-project-flex-content">
                        <Location
                            location={location}
                            setLocation={setLocation}
                            department={department}
                            setDepartment={setDepartment}
                            region={region}
                            setRegion={setRegion}
                            newRegion={newRegion}
                            setNewRegion={setNewRegion}
                            isErr={isErr}
                            error={error}
                        />
                    </div>
                    <div className="edit-project-flex-content">
                        <End
                            end={end}
                            setEnd={setEnd}
                        />
                    </div>
                </div>
                <Works
                    numberofcontributors={numberofcontributors}
                    setNumberofcontributors={setNumberofcontributors}
                    workArray={workArray}
                    setWorkArray={setWorkArray}
                    isErr={isErr}
                    setErr={setErr}
                    error={error}
                    setError={setError}
                />
                <Content 
                    content={content}
                    setContent={setContent}
                />
            </div>
        </div>
    )
}

export default Edit