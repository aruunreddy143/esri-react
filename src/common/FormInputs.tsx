import {Button, createTheme, TextField, ThemeProvider} from "@mui/material";
import React from "react";
const theme = createTheme({
    palette: {
        primary: {
            main: '#FF5733',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#E0C2FF',
            light: '#F5EBFF',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#47008F',
        },
    },
    components: {
        // Name of the component
        MuiButton: {

            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '12px',
                    borderRadius: 50
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '12px',
                    borderRadius: 50,
                    '--TextField-brandBorderColor': '#E0E3E7',
                    '--TextField-brandBorderHoverColor': '#B2BAC2',
                    '--TextField-brandBorderFocusedColor': '#6F7E8C',
                    '& label.Mui-focused': {
                        color: 'var(--TextField-brandBorderFocusedColor)',
                    },
                    '&:before': {
                        borderBottom: '2px solid var(--TextField-brandBorderColor)',
                    },
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                    },
                    '&.Mui-focused:after': {
                        borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                    },
                    '&.Mui-focused': {
                        color: 'green'
                    }
                },
            },
        }
    },
});

const FormInputs = () => {

    return (<> <Button variant="contained" color={'primary'}>
            Custom
        </Button>
            <TextField id="standard-basic" label="Standard" variant="standard"/>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color={'primary'}>
                    Custom
                </Button>
                <Button variant="contained" color={'secondary'}>
                    Custom
                </Button>
                <TextField id="standard-basic" label="Standard" variant="standard"/>
            </ThemeProvider>
        </>
    )
}
export default FormInputs;