function changeVisibility () {
    var categories = document.querySelector(".categories-list");
    var filters = document.querySelector(".filters-list");
    var categoriesHeading = document.querySelector(".categories-heading");

    if (filters.classList.contains("no-display")){
        categories.classList.add("no-display");
        filters.classList.remove("no-display");
        categoriesHeading.innerText = "Филтри";
    }
    else{
        filters.classList.add("no-display");
        categories.classList.remove("no-display");
        categoriesHeading.innerText = "Категории";
    }
}