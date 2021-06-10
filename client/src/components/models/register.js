export function registerUser(userData, setRegState) {
    setRegState({ regInProgress: true, showAlert: false });
    fetch("http://localhost:3001/account/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then(res => {
            res.json();
            setRegState({ regInProgress: false, showAlert: true })
        })
        .catch(err => console.log(err));
}