function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/users", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not log in.")
            }
        })
        .then(data => {
            let foundUser = data.find(user => user.email == email && user.password == password );
            if (foundUser) {
                this.sessionStorage.setItem('id', foundUser.user_id);
                window.location.replace('home.html');
            } else {
                let errorEl = document.querySelector('section');
                errorEl.className = 'error';
                errorEl.innerHTML = "Грешни имейл или парола."
            }

        })
        .catch((error) => console.log(error))
}