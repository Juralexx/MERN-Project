import React, { useState } from 'react'
import HeaderNavbar from '../HeaderNavBar'
import Categories from './Categories'
import MapModal from '../tools/map/MapModal';
import { IconButton, TextButton } from '../tools/components/Button';
import { IoSend } from 'react-icons/io5'
import { IconInput } from '../tools/components/Inputs';
import { GoSearch } from 'react-icons/go'
import { BiCategoryAlt } from 'react-icons/bi'
import { BsCaretDownFill } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { MdWork } from 'react-icons/md'

const Header = () => {
    const [openCategoriesPicker, setOpenCategoriesPicker] = useState(false)
    const [openMapModal, setOpenMapModal] = useState(false)
    const [category, setCategory] = useState("")
    const [location, setLocation] = useState("")

    return (
        <div className="relative flex justify-center items-center h-[calc(100vh-60px)] max-h-[1080px] dark:bg-gradient-to-r from-background_primary to-background_primary_light">
            <div className="container px-10">
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="pr-10">
                        <h1 className="text-dark dark:text-slate-300 text-6xl font-extrabold leading-[1.1]" style={{ fontWeight: "900"}}>
                            Where <span className="text-primary_light font-bold">all projects</span><br />become <span className="text-title font-bold">reality</span>
                        </h1>
                        <p className="mt-2 text-xl dark:text-slate-400 text-slate-500 pr-10">
                            Circa hos dies Lollianus primae lanuginis adulesce,
                            Lampadi filius ex praefecto, exploratius causam Maximino spectante,
                            convictus codicem noxiarum artium nondum per aetatem
                        </p>
                    </div>
                    <div className="pt-5">
                        <IconInput
                            text="Rechercher un projet"
                            type="search"
                            fullwidth
                            icon={<GoSearch className="h-[18px] w-[18px] text-gray-500" />}
                        />
                        <div className="grid grid-cols-2 gap-4 relative py-4">
                            <div>
                                <IconInput
                                    text="Catégorie"
                                    fullwidth
                                    icon={<BiCategoryAlt className="h-[18px] w-[18px] text-gray-500" />}
                                    endIcon={<BsCaretDownFill className="h-[14px] w-[14px] mt-1 text-gray-500" />}
                                    onClick={() => setOpenCategoriesPicker(!openCategoriesPicker)}
                                    onChange={() => setCategory(category)}
                                    value={category}
                                />
                                <Categories open={openCategoriesPicker} setOpen={setOpenCategoriesPicker} category={category} setCategory={setCategory} />
                            </div>
                            <div>
                                <IconInput
                                    text="Métier"
                                    type="text"
                                    fullwidth
                                    icon={<MdWork className="h-[18px] w-[18px] text-gray-500" />}
                                />
                            </div>
                        </div>
                        <IconInput
                            text="Localisation"
                            type="text"
                            fullwidth
                            icon={<FaMapMarkerAlt className="h-[18px] w-[18px] text-gray-500" />}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <div className="flex flex-row justify-between pt-4">
                            <TextButton text="Voir la carte" onClick={() => setOpenMapModal(true)} />
                            <IconButton text="Rechercher" endIcon={<IoSend style={{ width: "16px", height: "16px", marginTop: 1 }} />} />
                        </div>
                    </div>
                </div>
            </div>
            <MapModal open={openMapModal} setOpen={setOpenMapModal} location={location} setLocation={setLocation} />
            <HeaderNavbar />
        </div>
    )
}

export default Header