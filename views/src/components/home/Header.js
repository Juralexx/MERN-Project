import React, { useState } from 'react'
import LeftNav from '../LeftNav'
import Categories from './Categories'
import MapModal from '../tools/map/MapModal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { BsFillSunFill } from 'react-icons/bs'
import Stack from '@mui/material/Stack';
import ManIcon from '@mui/icons-material/Man';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {Button, IconButton, IconToggle} from '../tools/components/Button';

const Header = () => {
    const [openCategoriesPicker, setOpenCategoriesPicker] = useState(false)
    const [openMapModal, setOpenMapModal] = useState(false)
    const [category, setCategory] = useState("")

    return (
        <div className="relative flex justify-center items-center h-[calc(100vh-60px)] max-h-[1080px] bg-gradient-to-r from-background_primary to-background_primary_light">
            <div className="container px-10">
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="pr-10">
                        <h1 className="text-slate-300 text-6xl font-bold leading-[1.1]">
                            Where <span className="text-primary_darker font-bold">all projects</span><br />become reality
                        </h1>
                        <p className="mt-2 text-2xl text-slate-400 pr-10">
                            Circa hos dies Lollianus primae lanuginis adulesce,
                            Lampadi filius ex praefecto, exploratius causam Maximino spectante,
                            convictus codicem noxiarum artium nondum per aetatem
                        </p>
                    </div>
                    <div className="pt-5">
                        <TextField
                            id="outlined-search"
                            label="Rechercher"
                            placeholder="Rechercher un projet"
                            type="search"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlined fontSize="medium" />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-4 relative py-4">
                            <div>
                                <TextField
                                    id="outlined-basic"
                                    label="Catégorie"
                                    variant="outlined"
                                    placeholder="Choisissez une catégorie"
                                    fullWidth
                                    value={category}
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountTreeOutlinedIcon fontSize="medium" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <ArrowDropDownOutlinedIcon fontSize="medium" />
                                            </InputAdornment>
                                        )
                                    }}
                                    onClick={() => setOpenCategoriesPicker(!openCategoriesPicker)}
                                />
                                <Categories open={openCategoriesPicker} setOpen={setOpenCategoriesPicker} category={category} setCategory={setCategory} />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-basic"
                                    label="Métier"
                                    placeholder="Rechercher un métier"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ManIcon fontSize="medium" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </div>
                        </div>
                        <TextField
                            id="outlined-basic"
                            label="Localisation"
                            placeholder="Saisissez une localisation"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FmdGoodOutlinedIcon fontSize="medium" />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <div className="flex flex-row justify-between pt-4">
                            <Button text="Rechercher" />
                            <IconToggle icon={<BsFillSunFill style={{width: "24px", height: "24px"}} />} color="text-primary" hover="bg-primary/20" />
                            <IconButton text="Rechercher" startIcon={<BsFillSunFill />} />
                        </div>
                    </div>
                </div>
            </div>
            <MapModal open={openMapModal} setOpen={setOpenMapModal} />
            <LeftNav />
        </div>
    )
}

export default Header