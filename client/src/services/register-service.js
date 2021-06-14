import { ATTIC_CONSTANTS, SERVER_ENDPOINTS } from '../constants/attic-constants.js'

export function registerUser(userData, setRegState, setUser, setFailureMsg) {
    setRegState({ regInProgress: true, showSuccessAlert: false, showFailureAlert: false });
    if (validateRequiredFields(userData, setFailureMsg)) {
        fetch(`${ATTIC_CONSTANTS.BASE_URI}${SERVER_ENDPOINTS.REGISTER}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then((data) => {
                if (data.username != null) {
                    setUser({ username: userData.username, accessToken: data.accessToken })
                    setRegState({ regInProgress: false, showSuccessAlert: true, showFailureAlert: false })
                }
                else if (data.success == false) {
                    // Some error occured
                    if (data.duplicate === true) {
                        // Username is taken
                        setRegState({ regInProgress: false, showSuccessAlert: false, showFailureAlert: true })
                        setFailureMsg("Sorry, that username is already taken!")
                    }
                }
            })
            .catch(err => console.log(err));
    }
    else {
        //setFailureMsg("Please fill all the required fields!")
        setRegState({ regInProgress: false, showSuccessAlert: false, showFailureAlert: true })
    }
}

function validateRequiredFields(userData, setFailureMsg) {
    if (userData.username == "" || userData.email == "" || userData.password == "") {
        setFailureMsg("Please fill all the required fields!")
        return false;
    }

    if (!(/\S+@\S+\.\S+/).test(userData.email)) {
        setFailureMsg("Please enter a valid email address!")
        return false;
    }

    if (!(/^[a-z0-9]+$/i).test(userData.username)) {
        setFailureMsg("Please enter a valid username!");
        return false
    }

    return true;
}