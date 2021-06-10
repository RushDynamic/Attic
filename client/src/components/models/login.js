export function loginUser(userData, setLoginState, setUser) {
    setLoginState({ loginStatus: false, showAlert: false });
    fetch("http://localhost:3001/account/login", {
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
                // localStorage.setItem("jwt_authorization", result.accessToken)
                // localStorage.setItem("logged_in", true);
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