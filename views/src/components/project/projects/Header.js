import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateTitle, updateTitleURL } from "../../../actions/project.action";
import { RoundedButton, Button } from "../../tools/components/Button";
import { removeAccents } from "../../Utils";
import { FaPen } from 'react-icons/fa'
import { BasicInput } from "../../tools/components/Inputs";
import { avatar } from '../../tools/functions/useAvatar'
import { dateParser } from '../../Utils'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { TiArrowForward } from 'react-icons/ti'
import { IconButton } from '../../tools/components/Button'

const Header = ({ project }) => {
    const projectData = useSelector((state) => state.projectReducer)
    const [title, setTitle] = useState("")
    const [openForm, setOpenForm] = useState(false)
    const [value, setValue] = useState(false)
    const [modified, setModified] = useState(false)
    const dispatch = useDispatch()

    const hideTitleUpdater = () => { setOpenForm(false) }
    const handleChange = () => { setValue(true) }

    const handleTitle = () => {
        const tolower = title.toLowerCase();
        const uppercase = tolower.charAt(0).toUpperCase() + tolower.slice(1);
        const deletechars = uppercase.replace(/[&#,+()$~%.'":*?!<>{}/\\\\]/g, " ")
        const deletespaces = deletechars.replace(/ +/g, " ")
        const newTitle = deletespaces.trim()
        setTitle(newTitle)

        const lowerTitle = newTitle.toLowerCase();
        const removeaccent = removeAccents(lowerTitle)
        const url = removeaccent.replace(/ /g, "-")

        dispatch(updateTitle(project._id, title))
        dispatch(updateTitleURL(project._id, url))
        setOpenForm(false)
        setModified(true)
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
                    <div className="flex items-center p-2 rounded-full text-gray-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-background_primary_light cursor-pointer">
                        <BiDotsVerticalRounded className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header