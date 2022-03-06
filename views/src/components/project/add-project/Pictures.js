import React, { useRef } from 'react'
import { MdOutlineAddPhotoAlternate, MdOutlineInsertPhoto, MdClear } from 'react-icons/md'
import { coverPicture } from '../../tools/functions/useAvatar'

const Pictures = ({ files, setFiles }) => {

    const removePicture = (index) => {
        const array = files.slice()
        array.splice(index, 1)
        setFiles(array)
    }

    const classes = {
        img_preview_container: "flex relative h-[140px] w-[140px] bg-slate-200 dark:bg-background_primary_light rounded-xl",
        delete_img: "absolute right-[-5px] top-[-5px] p-1 rounded-full text-white cursor-pointer bg-gray-700 dark:bg-slate-500",
        img_preview : "absolute h-[140px] w-[140px] flex flex-col items-center justify-center top-0 rounded-sm z-0",
        delete_svg: "w-[26px] h-[26px]",
        svg: "h-[100px] w-[100px]"
    }

    return (
        <div className="mt-3 w-full py-5 px-7 rounded-xl bg-white dark:bg-background_primary shadow-xl text-gray-500 dark:text-slate-300">
            <form method="post" encType="multipart/form-data">
                <h3 className="mb-2">De belles images vous donne plus de visibilité !</h3>
                <div className="flex justify-between">
                    <div className={classes.img_preview_container}>
                        <input
                            className="relative h-[140px] w-[140px] opacity-0 z-[1] cursor-pointer"
                            type="file"
                            name="files"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => setFiles([...files, e.target.files[0]])}
                        />
                        <input
                            type="hidden"
                            name="pictures"
                            value={files}
                            multiple
                        />
                        <div className="absolute h-[140px] w-[140px] flex flex-col items-center justify-center top-0 z-0 border-[3px] border-primary rounded-xl">
                            <MdOutlineAddPhotoAlternate className="h-[100px] w-[100px] text-primary" />
                        </div>
                    </div>
                    <div className={classes.img_preview_container}>
                        {files.length ? (
                            <div className={classes.img_preview} style={coverPicture(URL.createObjectURL(files[0]))}>
                                <div className={classes.delete_img} onClick={() => removePicture(0)}><MdClear className={classes.delete_svg}/></div>
                            </div>
                        ) : (
                            <div className={classes.img_preview}><MdOutlineInsertPhoto className={classes.svg} /></div>
                        )}
                    </div>
                    <div className={classes.img_preview_container}>
                        {files.length > 1 ? (
                            <div className={classes.img_preview} style={coverPicture(URL.createObjectURL(files[1]))}>
                                <div className={classes.delete_img} onClick={() => removePicture(1)}><MdClear className={classes.delete_svg}/></div>
                            </div>
                        ) : (
                            <div className={classes.img_preview}><MdOutlineInsertPhoto className={classes.svg} /></div>
                        )}
                    </div>
                    <div className={classes.img_preview_container}>
                        {files.length > 2 ? (
                            <div className={classes.img_preview} style={coverPicture(URL.createObjectURL(files[2]))}>
                                <div className={classes.delete_img} onClick={() => removePicture(2)}><MdClear className={classes.delete_svg}/></div>
                            </div>
                        ) : (
                            <div className={classes.img_preview}><MdOutlineInsertPhoto className={classes.svg} /></div>
                        )}
                    </div>
                    <div className={classes.img_preview_container}>
                        {files.length > 3 ? (
                            <div className={classes.img_preview} style={coverPicture(URL.createObjectURL(files[3]))}>
                                <div className={classes.delete_img} onClick={() => removePicture(3)}><MdClear className={classes.delete_svg}/></div>
                            </div>
                        ) : (
                            <div className={classes.img_preview}><MdOutlineInsertPhoto className={classes.svg} /></div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Pictures