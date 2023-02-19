function submitForm(event) {
    event.preventDefault();

    fetch("/users", {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not get users.")
            }
        }).then(data => {
            let users = data;
            validateForm(users);
    })
        .catch((error) => console.log(error))
}

function validateForm(users) {
    //create boolean array for all properties in the register form
    let areAllSuccessful = [false, false, false, false, false, false];

    //defining properties of the register form
    let username = document.getElementById('username');
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let repeatedPassword = document.getElementById('repeatedPassword');


    let properties = [username, firstName, lastName, email, password, repeatedPassword];

    properties.forEach((property, index) => {
        let validityState = property.validity;

        //access the section after the property - it is used for error messages
        let errorSection = property.nextElementSibling;


        //check if current property is valid
        if (!validityState.valid) {
            //the value at property's index is set to false in the areAllSuccessful array
            areAllSuccessful[index] = false;

            //when a property is not correct it is styled with the corresponding classes along with the error message beneath it
            styleErrorFields(errorSection);

            //error messages for different kind of words
            if (property == password || property == repeatedPassword || property == lastName) {
                errorSection.innerHTML = 'Невалидна ';
            } else if (property == email) {
                errorSection.innerHTML = 'Невалиден ';
            } else {
                errorSection.innerHTML = 'Невалидно ';
            }

            //validation checks
            if (validityState.valueMissing) {
                errorSection.innerHTML += property.getAttribute("placeholder") + '. Това поле е задължително.';
            } else if (validityState.tooShort) {
                errorSection.innerHTML += property.getAttribute("placeholder") + '. Дължината трябва да е поне ' + property.minLength + ' символа.';
            } else if (validityState.patternMismatch) {
                errorSection.innerHTML += property.getAttribute("placeholder") + '.';
                if (property == password) {
                    errorSection.innerHTML += " Трябва да съдържа само малки букви, главни букви и цифри."
                }
            }
        } else {
            //if the property is valid its index is set to true in areAllSuccessful array
            areAllSuccessful[index] = true;
            errorSection.classList.remove('error');
            errorSection.innerHTML = "";

            if (property == email) {
                //check if the username already exists in the fetched json
                areAllSuccessful = checkForExistingUser(property, users, areAllSuccessful, index);
            }

            if (property == repeatedPassword) {
                if (property.value != password.value) {
                    areAllSuccessful[index] = false;
                    errorSection.innerHTML += " Моля повторете правилната парола.";
                    styleErrorFields(errorSection);
                }
            }
        }
    })

    //check if all properties are successful
    checkSuccess(areAllSuccessful);
}

function styleErrorFields(errorSection) {
    if (!errorSection.className.includes('error')) {
        errorSection.className += 'error';
    }
}

function checkForExistingUser(property, users, areAllSuccessful, index) {
    if (users.some(u => u.email == property.value)) {
        let errorSection = property.nextElementSibling;
        styleErrorFields(errorSection);
        errorSection.innerHTML = 'Този имейл вече е регистриран.';
        areAllSuccessful[index] = false;
    }
    return areAllSuccessful;
}

function checkSuccess(areAllSuccessful) {
    if (areAllSuccessful.every(value => value == true)) {
        register();
    } else {

    }
}

function register() {
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