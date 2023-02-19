if (this.sessionStorage.getItem('id')) {
    var button_my_charities = document.getElementById("btn-my-charities");
    var button_participations = document.getElementById("btn-participations")
    var participants_window = document.getElementById("participations-window");
    var my_charities_window = document.getElementById("charities-window");
    var x_button1 = document.getElementsByClassName("x-button")[0];
    var x_button2 = document.getElementsByClassName("x-button")[1];
    var volunteeredPoints = document.getElementById('volunteeredCausesPoints');
    var createdPoints = document.getElementById('createdCausesPoints');
    var allPoints = document.getElementById('points');


    button_my_charities.addEventListener("click", () => toggle_charities(my_charities_window));
    button_participations.addEventListener("click", () => toggle_charities(participants_window));
    x_button1.addEventListener("click", () => toggle_charities(participants_window));
    x_button2.addEventListener("click", () => toggle_charities(my_charities_window));

    function toggle_charities(el) {
        el.classList.toggle("hidden")
        document.querySelector("section").classList.toggle("opacity");
        document.querySelector("header").classList.toggle("opacity");
        document.querySelector(".navbar").classList.toggle("opacity");
    };

    var volunteeredCauses = [];
    var createdCauses = [];

    initProfile();
} else {
    window.location.replace('login.html')
}

function initProfile() {
    const fullName = document.getElementById('fullName');
    const username = document.getElementById('username');
    const welcome = document.getElementById('welcome');
    const userId = this.sessionStorage.getItem('id');

    fetch("/user/" + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Could not get logged user.");
        }
    }).then(data => {
        const user = data[0];
        fullName.innerHTML = user.first_name + ' '+ user.last_name;
        username.innerHTML = user.username;
        welcome.innerHTML = user.username;

        setAllCauses();
    })
}

function setAllCauses() {
    fetch("/getCreatedCauses/" + this.sessionStorage.getItem('id') , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not get created causes.")
            }
        })
        .then(data => {
            createdCauses = data;

            if (createdCauses.length > 0) {
                setCreatedCauses();
            }

            setVolunteeredCausesCount();

        })
        .catch((error) => console.log(error))

}


function setVolunteeredCausesCount() {
    fetch("/getVolunteeredCauses/" + this.sessionStorage.getItem('id') , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();

            } else {
                throw new Error("Could not get volunteered causes.")
            }
        })
        .then(data => {
            const firstElement = document.createElement('h2');
            firstElement.setAttribute('class', 'charities-heading');
            firstElement.innerHTML = 'Каузи, за които съм записан';
            participants_window.appendChild(firstElement);

            if (data.length > 0) {
                data.forEach(cause => getCause(cause.cause_id));
            } else {
                setPoints();
            }

        })
        .catch((error) => console.log(error))
}


function getCause(id) {
    fetch("/getCause/" + id , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();

            } else {
                throw new Error("Could not get the cause with id " + id)
            }
        })
        .then(data => {
            const cause = data[0];
            volunteeredCauses.push(cause);
            setPoints();

            const charityParticipations = document.createElement('div');
            charityParticipations.setAttribute('class', 'charity participations');


            const causeName = document.createElement('span');
            causeName.setAttribute('class', 'charity-name');
            causeName.innerHTML = cause.name;

            const unsubscribeEl = document.createElement('span');
            unsubscribeEl.setAttribute('class', 'unsubscribe-charity');
            const unsubscribedId = "unsubscribe-" + JSON.stringify(cause.cause_id);
            unsubscribeEl.setAttribute('id', unsubscribedId);
            unsubscribeEl.innerHTML = 'Отпиши ме';

            charityParticipations.appendChild(causeName);
            charityParticipations.appendChild(unsubscribeEl);

            participants_window.appendChild(charityParticipations);

            const btn = document.getElementById(unsubscribedId);
            if (btn) {
                btn.addEventListener("click", () => {
                    const to_delete = btn.parentElement;

                    const foundCause = volunteeredCauses.find(c => c.name == cause.name);

                    volunteeredCauses.splice(volunteeredCauses.indexOf(foundCause), 1);
                    participants_window.removeChild(to_delete);
                    deleteVolunteeredCause(cause.cause_id);
                })
            }

        })
        .catch((error) => console.log(error))
}

function deleteVolunteeredCause(id) {
    fetch("/deleteVolunteeredCause/" + id , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                setPoints();
            } else {
                throw new Error("Could not unsubscribe from cause with id " + id);
            }
        })
        .catch((error) => console.log(error))
}

function deleteCreatedCause(id) {
    fetch("/deleteCreatedCause/" + id , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                setPoints();
            } else {
                throw new Error("Could not delete cause with id " + id);
            }
        })
        .catch((error) => console.log(error))
}

function setCreatedCauses() {
    const firstElement = document.createElement('h2');
    firstElement.setAttribute('class', 'charities-heading');
    firstElement.innerHTML = 'Моите каузи';
    my_charities_window.appendChild(firstElement);

    createdCauses.forEach(cause => {
        const myCharities = document.createElement('div');
        myCharities.setAttribute('class', 'charity my-charities');

        const causeName = document.createElement('span');
        causeName.setAttribute('class', 'charity-name');
        causeName.innerHTML = cause.name;

        const deleteEl = document.createElement('span');
        deleteEl.setAttribute('class', 'delete-charity');
        const deletedId = "delete-" + JSON.stringify(cause.cause_id);
        deleteEl.setAttribute('id', deletedId);
        deleteEl.innerHTML = 'Изтрий';

        myCharities.appendChild(causeName);
        myCharities.appendChild(deleteEl);

        my_charities_window.appendChild(myCharities);

        const btn = document.getElementById(deletedId);
        if (btn) {
            btn.addEventListener("click", () => {
                const to_delete = btn.parentElement;
                const foundCause = createdCauses.find(c => c.name == cause.name);

                createdCauses.splice(createdCauses.indexOf(foundCause), 1);
                my_charities_window.removeChild(to_delete);
                deleteCreatedCause(cause.cause_id);
            })
        }

    })
}

function setPoints() {
    volunteeredPoints.innerHTML = JSON.stringify(volunteeredCauses.length);
    createdPoints.innerHTML = JSON.stringify(createdCauses.length);
    allPoints.innerText = JSON.stringify(volunteeredCauses.length + createdCauses.length);
}

function logout() {
    sessionStorage.removeItem('id');
    window.location.replace('login.html')
}