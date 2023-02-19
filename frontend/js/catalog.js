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

function getCauses() {
    fetch("/getCauses", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {

            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not load causes.")
            }
        })
        .then(data => {
            displayCauses(data);    
        })
        .catch((error) => console.log(error))
}


function displayCauses(data) {

    let wrapper = document.getElementsByClassName('charity-wrapper')[0];
    wrapper.innerHTML = '';

    data.forEach(cause => {
        
        
        let name = cause["name"];

        let causeWrapper = document.createElement('div');
        causeWrapper.classList.add('charity-content');

        let heading = document.createElement('div');
        heading.classList.add('charity-heading') //TODO onclick charity.html with the id of the cause
        heading.setAttribute('cause_id',cause['cause_id'])
        
        

        let span = document.createElement('span'); 
        span.innerText = name;
        heading.appendChild(span)

        let btn = `<button class="expand-button"><i class="fa">&#xf105;</i></button>`;
        heading.insertAdjacentHTML('beforeend', btn);

        let desc = document.createElement('div');
        desc.classList.add('charity-description');
        desc.classList.add('hidden');

        let shortDesc = cause["short_description"]
        let p = document.createElement('p');
        p.innerText = shortDesc;
        desc.appendChild(p);

        causeWrapper.appendChild(heading);
        causeWrapper.appendChild(desc);
        wrapper.appendChild(causeWrapper);

        
    })
    addListenerExapandBtn();
    addListenerHeading(data);
}


function addListenerHeading(allCauses){
const headings = document.querySelectorAll(".charity-heading").forEach(heading => {
    heading.addEventListener('click', () =>{
        const cause = allCauses.find(cause => cause.cause_id == heading.getAttribute('cause_id'));
        const queryString = "?cause=" + encodeURIComponent(JSON.stringify(cause));
        window.location.href = "charity.html" + queryString;
    })
});


}

function addListenerExapandBtn() {
    const expand_buttons = document.querySelectorAll(".expand-button");
    expand_buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const description_element = btn.parentElement.nextElementSibling;
            let isExpanded = !description_element.classList.contains("hidden");
            hide_all_descriptions()

            if (isExpanded) {
                description_element.classList.add("hidden");
                btn.classList.remove("expanded");
                btn.parentElement.classList.remove("expanded-charity");
                btn.innerHTML = `<i class="fa">&#xf105;</i>`;
            } else {
                description_element.classList.remove("hidden");
                btn.classList.add("expanded");
                btn.parentElement.classList.add("expanded-charity");
                btn.innerHTML = `<i class="fa">&#xf107;</i>`;
            }
        });
    });
}





const category_buttons = document.querySelectorAll(".category-button");
category_buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        category_buttons.forEach(button => {
            if (button != btn) button.classList.remove("active-category");
        });

        const charities = document.querySelectorAll(".charity-content");
        charities.forEach(charity => charity.classList.remove("hidden"));

        btn.classList.toggle("active-category");

        if (btn.classList.contains("active-category")) {
            charities.forEach(charity => {
                if (Math.floor(Math.random() * 10) % 2 != 0) charity.classList.add("hidden");
            });
        } else charities.forEach(charity => charity.classList.remove("hidden"));

        hide_all_descriptions()

    });
});


function hide_all_descriptions() {
    document.querySelectorAll(".charity-heading").forEach(heading => heading.classList.remove("expanded-charity"));
    document.querySelectorAll(".charity-description").forEach(desc => desc.classList.add("hidden"));
    document.querySelectorAll(".expand-button").forEach(exp_btn => {
        exp_btn.classList.remove("expanded");
        exp_btn.innerHTML = `<i class="fa">&#xf105;</i>`;
    });
}

navigator.geolocation.getCurrentPosition((pos)=>{
    localStorage.setItem("latitude", pos.coords.latitude)
    localStorage.setItem("longitude", pos.coords.longitude)
})




