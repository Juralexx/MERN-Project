import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            main: "#091726",
            semiLight: "#102944",
            light: "#184573"
        },
        utils: {
            yellow: "#EEEE0A"
        }
    },
    typography: {
        h1: {
            fontSize: "64px",
        }
    }
});