function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    //TODO: add validation
    fetch("/users", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
                // console.log(response.json());

            } else {
                throw new Error("Could not register.")
            }
        })
        .then(data => {
            console.log(data);
            let foundUser = data.find(user => user.email == email && user.password == password );
            if (foundUser) {
                this.sessionStorage.setItem('id', foundUser.user_id);
                window.location.replace('home.html');
            }

        })
        .catch((error) => console.log(error))
}