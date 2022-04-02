import axios from 'axios'
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdClear, MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto } from 'react-icons/md'
import { StartIconButton } from '../../../tools/components/Button'
import { coverPicture } from '../../../tools/functions/useAvatar'

const Galery = ({ project }) => {

    return (
        project.pictures.map((element, key) => {
            return <div key={key} style={coverPicture(element)} className="w-[300px] h-[300px]"></div>
        })
    )
}

export default Galery