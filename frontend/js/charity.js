if (!this.sessionStorage.getItem('id')) {
    window.location.replace('login.html');
} else {
    const userId = this.sessionStorage.getItem('id');
    const welcome = document.getElementById('welcome');

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
        welcome.innerHTML = user.username;

    })
}



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cause = JSON.parse(decodeURIComponent(urlParams.get("cause")));

function loadCauseInfo(){
    console.log(cause)
    const start = document.getElementById('start')
    const start_string = (cause.start_date).split('T')[0]; 
    start.innerText=start_string

    const end = document.getElementById('end')
    const end_string = (cause.end_date).split('T')[0]; 
    end.innerText=end_string;

   const wrapper = document.querySelector('.charity-text')
   wrapper.innerHTML='';
   const desc = document.createElement('p')
    desc.innerText = cause.long_description;
    wrapper.appendChild(desc)
    const name = document.querySelector('.charity-heading')
    name.innerText=cause.name

    const causeImage = document.getElementById('causeImage');
    let src = "images/" + cause.image;
    causeImage.setAttribute('src', src);

}

function joinCause(){
    const cause_id = cause.cause_id;
    const user_id= sessionStorage.getItem("id");
    
    fetch("/addUserCause", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'cause_id': cause_id,
            'user_id': user_id
        })
    })
        .then(response => {
            if (response.ok) {
               window.location.replace('home.html')
            } else {
                throw new Error("Could not join cause.")
            }
        })
        .catch((error) => console.log(error))
}