function register() {
    //TODO: add validation
    fetch("/addUser", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'first_name': document.getElementById("firstName").value,
            'last_name': document.getElementById("lastName").value,
            'username': document.getElementById("username").value,
            'password': document.getElementById("password").value,
            "email": document.getElementById("email").value
        })
    })
        .then(response => {
            if (response.ok) {
                window.location.replace('login.html');
            } else {
                throw new Error("Could not register.")
            }
        })
        .catch((error) => console.log(error))
}