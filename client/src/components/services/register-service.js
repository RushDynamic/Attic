export function registerUser(userData, setRegState, setUser, setFailureMsg) {
    setRegState({ regInProgress: true, showSuccessAlert: false, showFailureAlert: false });
    if (validateRequiredFields(userData)) {
        fetch("http://localhost:3001/account/register", {
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
        setRegState({ regInProgress: false, showSuccessAlert: false, showFailureAlert: true })
        setFailureMsg("Please fill all the required fields!")
    }
}

function validateRequiredFields(userData) {
    if (userData.username == "" || userData.email == "" || userData.password == "") {
        return false;
    }

    return true;
}