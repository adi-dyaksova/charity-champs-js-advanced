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