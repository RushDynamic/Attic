import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(8, 0, 6)
    },

    // Header properties
    header_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingTop: '3vh',
        paddingBottom: '5vh'

    },
    header_logo: {
        height: '20vh',
        paddingRight: '2vh'
    },

    newNoteContainer: {
        marginBottom: '3vh',
        width: '75%'
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
        marginRight: '1vh',
        background: '-webkit-linear-gradient(315deg, #1fd1f9, #b621fe)'
    },

    btn_register: {
        width: '20vh',
        marginTop: '0.5vh'
    },

    actions_container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },

    newNoteButton: {
        background: '-webkit-linear-gradient(315deg, #1fd1f9, #b621fe)',
        opacity: '65%',
        '&:hover': {
            transition: 'opacity 0.55s',
            opacity: '100%',
            background: '-webkit-linear-gradient(255deg, #1fd1f9, #b621fe)',
        },
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
        backgroundColor: '-webkit-linear-gradient(75deg, #1fd1f9, #b621fe)',
    },
    progressBarProgressColorPrimary: {
        backgroundColor: '-webkit-linear-gradient(75deg, #1fd1f9, #b621fe)',
    },

    // Added to anchor footer at the bottom
    mainContainer: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    footerBar: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: '5vh',
        background: 'linear-gradient(315deg, #1fd1f9, #b621fe)',
        minHeight: '3vh'
    },
    footerContainer: {
        padding: '2vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    footerText: {
        display: 'flex',
        flexDirection: 'column',
        color: 'black',
        justifyContent: 'center',
        width: '100%',
        fontFamily: "font-family: 'Raleway', sans-serif"
    },
    footerIcon: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'black'
    }
}));

export default useStyles;