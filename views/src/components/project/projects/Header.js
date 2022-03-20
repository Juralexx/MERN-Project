import React, { useState, useRef } from 'react'
import { useDispatch } from "react-redux";
import { removeMember } from "../../../actions/project.action";
import { avatar } from '../../tools/functions/useAvatar'
import { dateParser } from '../../Utils'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { TiArrowForward } from 'react-icons/ti'
import { IconButton } from '../../tools/components/Button'
import SmallMenu from '../../tools/components/SmallMenu';
import { useClickOutside } from '../../tools/functions/useClickOutside';

const Header = ({ project, websocket, user }) => {
    const menuRef = useRef()
    const [openMenu, setOpenMenu] = useState(false)
    useClickOutside(menuRef, setOpenMenu, false)
    const dispatch = useDispatch()

    const leaveProject = () => {
        project.members.map(async member => {
            return await websocket.current.emit("getLeaverProject", {
                receiverId: member.id,
                memberId: user._id,
            })
        })
        websocket.current.emit("leaveProject", {
            receiverId: user._id,
            projectId: project._id
        })
        dispatch(removeMember(project._id, user._id))
    }

    return (
        <div className="h-[100px] flex items-center justify-between w-full py-4 px-6 bg-white dark:bg-background_primary_x_light">
            <div className="flex">
                <div className="h-12 w-12 rounded-full" style={avatar('img/paysage-4.jpg')}></div>
                <div className="px-8">
                    <h1 className="mb-1 text-gray-500 dark:text-white">{project.title}</h1>
                    <div className="text-xs text-gray-400 dark:text-gray-300">{dateParser(project.createdAt) + " - " + project.location + ", " + project.department}</div>
                </div>
            </div>
            <div>
                <div className="flex">
                    <IconButton text="Voir l'annonce public" endIcon={<TiArrowForward className="h-5 w-5" />} className="mr-2" />
                    <div ref={menuRef} className="flex items-center p-2 rounded-full text-gray-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-background_primary_light cursor-pointer">
                        <BiDotsVerticalRounded className="h-5 w-5" onClick={() => setOpenMenu(!openMenu)}/>
                        {openMenu && (
                            <SmallMenu top="top-6" right="right-16">
                                <div className="py-2 cursor-pointer" onClick={leaveProject}>Quitter le projet</div>
                            </SmallMenu>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header