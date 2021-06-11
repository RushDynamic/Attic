export function registerUser(userData, setRegState, setUser) {
    setRegState({ regInProgress: true, showAlert: false });
    fetch("http://localhost:3001/account/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
    })
        .then(res => res.json())
        .then((data) => {
            setUser({ username: userData.username, accessToken: data.accessToken })
            setRegState({ regInProgress: false, showAlert: true })
        })
        .catch(err => console.log(err));
}