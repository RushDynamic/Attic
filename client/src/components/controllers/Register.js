export function registerUser(userData, setShowAlert) {
    fetch("http://localhost:3001/account/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then(res => {
            res.json();
            setShowAlert(true);

        })
        .catch(err => console.log(err));
}