import React, { useState, useRef } from 'react'
import axios from 'axios'
import { avatar } from '../../tools/functions/useAvatar'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useClickOutside } from '../../tools/functions/useClickOutside'
import { Button } from '../../tools/components/Button'
import AddMember from './AddMember'

const Members = ({ project, admins, user }) => {
    const [addMember, setAddMember] = useState(false)
    const [openMenu, setOpenMenu] = useState(-1)
    const wrapperRef = useRef()
    useClickOutside(wrapperRef, setOpenMenu, -1)
    const isAdmin = admins.some(member => member.id === user._id)

    const removeUserFromProject = async (element) => {
        const memberId = element.id
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/project/remove-user/${project._id}`,
            data: { memberId }
        }).catch(err => console.log(err))
    }

    return (
        <>
            <div className="py-3">
                <div className="flex justify-between items-center px-3 py-3 mb-2 border-b border-b-slate-300/30">
                    <div className="text-xl">Membres ({project.members.length})</div>
                    { isAdmin && <Button text="Ajouter un membre" onClick={() => setAddMember(true)} />}
                </div>
                {project.members.map((element, key) => {
                    return (
                        <div className="relative flex justify-between items-center py-3 px-3" key={key}>
                            <div className="flex">
                                <div className="h-11 w-11 rounded-full mr-4" style={avatar(element.picture)}></div>
                                <div>
                                    <div className="">{element.pseudo}</div>
                                    <div className="text-gray-500 dark:text-slate-400">{element.role}</div>
                                </div>
                            </div>
                            <div ref={wrapperRef}>
                                {element.id !== user._id && (
                                    <>
                                        <BiDotsVerticalRounded className="h-5 w-5 cursor-pointer" onClick={() => setOpenMenu(key)} />
                                        {openMenu === key && (
                                            <div className="absolute right-10 min-w-[200px] top-6 p-3 bg-background_light dark:bg-background_primary shadow-lg rounded-lg">
                                                <div className="py-2 cursor-pointer">Voir le profil</div>
                                                {isAdmin &&
                                                    <>
                                                        {element.role !== "admin" && (
                                                            <div className="py-2 cursor-pointer">Nommer Admin</div>
                                                        )}
                                                        {element.role === "admin" && project.posterId === user._id && element.id !== user._id && (
                                                            <div className="py-2 cursor-pointer">Supprimer Admin</div>
                                                        )}
                                                        {element.id !== user._id && project.posterId === user._id && (
                                                            <div className="py-2 cursor-pointer" onClick={() => removeUserFromProject(element)}>Supprimer ce membre</div>
                                                        )}
                                                    </>
                                                }
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            {<AddMember open={addMember} setOpen={setAddMember} project={project} user={user} />}
        </>
    )
}

export default Members