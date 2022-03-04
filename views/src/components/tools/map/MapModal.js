import React, { useState } from "react";
import MapDepartments from "./MapDepartments";
import MapRegions from "./MapRegions";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { TextField, Autocomplete } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FmdGoodOutlined from "@mui/icons-material/FmdGoodOutlined";

const MapModal = ({ open, setOpen }) => {
    const [selectByDepartments, setSelectByDepartments] = useState(false)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => { setValue(newValue) }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ pt: 1 }}>{children}</Box>
                )}
            </div>
        )
    }

    function getContent(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    const regions = [
        { label: "Alsace" },
        { label: "Aquitaine" },
        { label: "Auvergne" },
        { label: "Basse-Normandie" },
        { label: "Bourgogne" },
        { label: "Bretagne" },
        { label: "Centre" },
        { label: "Champagne-Ardenne" },
        { label: "Corse" },
        { label: "Franche-Comté" },
        { label: "Haute-Normandie" },
        { label: "Île-de-France" },
        { label: "Languedoc-Roussillon" },
        { label: "Limousin" },
        { label: "Lorraine" },
        { label: "Midi-Pyrénées" },
        { label: "Nord-Pas-de-Calais" },
        { label: "Pays de la Loire" },
        { label: "Picardie" },
        { label: "Poitou-Charentes" },
        { label: "Provence-Alpes-Côte d'Azur" },
        { label: "Rhône-Alpes" },
        { label: "Guadeloupe" },
        { label: "Martinique" },
        { label: "Guyane" },
        { label: "La Réunion" },
        { label: "Mayotte" }
    ]

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                style: {
                    background: '#091726'
                }
            }}>
            <DialogTitle id="alert-dialog-title">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Par région" {...getContent(0)} />
                            <Tab label="Par département" {...getContent(1)} />
                        </Tabs>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <TabPanel value={value} index={0}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={regions}
                        sx={{ width: "100%" }}
                        ListboxProps={{
                            style: {
                                width: "100%",
                                background: '#102944'
                            }
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Région"
                                placeholder="Saisissez une région"
                            />
                        }
                    />
                    <MapRegions />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={regions}
                        sx={{ width: "100%" }}
                        ListboxProps={{
                            style: {
                                width: "100%",
                                background: '#102944'
                            }
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Région"
                                placeholder="Saisissez une région"
                            />
                        }
                    />
                    <MapDepartments />
                </TabPanel>
            </DialogContent>
        </Dialog>
    )
}

export default MapModal;