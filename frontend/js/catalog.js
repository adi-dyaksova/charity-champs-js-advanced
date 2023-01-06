
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




