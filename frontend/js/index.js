
function changeVisibility (ind) {
    var options = document.getElementsByClassName("options-wrapper")[ind];
    const expand_category_btn = document.querySelectorAll(".expand-category-button")[ind];
    if (options.classList.contains("no-display")){
        options.classList.remove("no-display");
        expand_category_btn.innerHTML = `<i class="fa">&#xf107;</i>`;
    }
    else{
        options.classList.add("no-display");
        expand_category_btn.innerHTML = `<i class="fa">&#xf105;</i>`;
    }
}

function getFilters() {
    fetch("/getFilters", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();

            } else {
                throw new Error("Could not load filters.")
            }
        })
        .then(data => {
            addOptions(data);
        })
        .catch((error) => console.log(error))
}



function addOptions(data){
    addOptionsByFilter(data["categories"],0,"name","category-option");
    addOptionsByFilter(data["durations"],1,"type","duration-option");
    addOptionsByFilter(data["cities"],2,"name", "city-option");
}

function addOptionsByFilter(filterArr,wrapperInd,property, classname){
    const filterWrapper =  document.getElementsByClassName('options-wrapper')[wrapperInd];
    filterWrapper.innerHTML="";
    filterArr.forEach( filterOption =>{
        const parent = document.createElement('label');
        parent.classList.add('option-container'); 
        parent.classList.add(classname); 
        parent.textContent = filterOption[property];
        const child = ` <input  type="checkbox">
        <span class="checkmark"></span>`;
        parent.insertAdjacentHTML('beforeend', child);
        filterWrapper.appendChild(parent);
    })
}

// function getAllCheckedValues(){

//     const selectedDurations = getSelectedValuesByClass(".duration-option");
//     const selectedCategories = getSelectedValuesByClass(".category-option");
//     const selectedCities = getSelectedValuesByClass(".city-option");
//     console.log(selectedDurations,selectedCategories,selectedCities)
   
// }

function getSelectedValuesByClass(classname){
    const durationOpts= document.querySelectorAll(classname);
    let selected=[];
    Array.from(durationOpts).forEach(element => {
        if(element.querySelector("input").checked){
            selected.push(element.textContent.trim());
        }
    });
    return selected;
}

async function displayFilteredInCatalog(){
    const filteredCauses = await getFilteredCauses();
    console.log(filteredCauses)
    displayCauses(filteredCauses);
}

async function getFilteredCauses() {
    const selectedDurations = getSelectedValuesByClass(".duration-option");
    const selectedCategories = getSelectedValuesByClass(".category-option");
    const selectedCities = getSelectedValuesByClass(".city-option");

     const fetchedData = await fetch("/getFilteredCauses", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'durations': selectedDurations,
            'categories': selectedCategories,
            'cities': selectedCities
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not load filtered causes.")
            }
        })
        .then(data => {
             return data;
        })
        .catch((error) => console.log(error))

        return fetchedData;
}
