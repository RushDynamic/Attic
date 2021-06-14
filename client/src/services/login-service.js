import { ATTIC_CONSTANTS, SERVER_ENDPOINTS } from '../constants/attic-constants.js'

export function loginUser(userData, setLoginState, setUser, setFailureMsg) {
    setLoginState({ loginStatus: false, showAlert: false });
    if (validateRequiredFields(userData)) {
        fetch(`${ATTIC_CONSTANTS.BASE_URI}${SERVER_ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(userData)
        })
            .then(res => {
                return res.json();
            })
            .then(result => {
                console.log(result);
                if (result.authenticated) {
                    console.log("Authenticated user!");
                    setUser({ username: userData.username, accessToken: result.accessToken })

                    setLoginState({ loginStatus: true, showAlert: true });
                    return true;
                }
                else {
                    console.log("Error while logging user in!");
                    setUser({ username: null, accessToken: null })
                    setLoginState({ loginStatus: false, showAlert: true });
                    return false;
                }
            })
            .catch(err => {
                console.log(err);
                return false;
            });
    }
    else {
        setFailureMsg("Please fill all the required fields!")
        setLoginState({ loginStatus: false, showAlert: true });
    }
}

export async function logoutUser(user) {
    const response = await fetch(`${ATTIC_CONSTANTS.BASE_URI}${SERVER_ENDPOINTS.LOGOUT}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user.username })
    });

    const data = await response.json();
    return data.success;
}

export async function checkLoginStatus(user) {
    const response = await fetch(`${ATTIC_CONSTANTS.BASE_URI}${SERVER_ENDPOINTS.LOGGED_IN}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        },
        credentials: 'include'
    });

    return await response.json();
}

function validateRequiredFields(userData) {
    if (userData.username == "" || userData.password == "") {
        return false;
    }

    return true;
}