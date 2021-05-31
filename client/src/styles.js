import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(8, 0, 6)
    },

    // Header properties
    header_container: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '2vh',
        paddingBottom: '5vh'
    },
    header_logo: {
        height: '20vh'
    },

    // Card Properties
    text_field_container: {
        display: 'block'
    },

    login_buttons_container: {
        display: 'flex',
        justifyContent: 'space-around'
    },

    btn_login: {
        width: '80vh',
        marginTop: '0.5vh',
        marginRight: '1vh'
    },

    btn_register: {
        width: '20vh',
        marginTop: '0.5vh'
    },

    actions_container: {
        width: '100vh',
        display: 'flex',
        justifyContent: 'flex-end'
    },

    notes_default_container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5vh',
        width: '100vh'
    },

    // Loading data
    loading_container: {
        marginTop: '10vh',
        width: '50vh'
    },
    progressBarColorPrimary: {
        backgroundColor: 'grey',
    },
    progressBarProgressColorPrimary: {
        backgroundColor: 'black',
    },

    // Added to anchor footer at the bottom
    mainContainer: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    footerContainer: {
        textAlign: 'center',
        marginTop: '5vh',
        backgroundColor: 'grey',
        minHeight: '5vh'
    },
    footerText: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '2vh',
        color: 'white'
    }
}));

export default useStyles;