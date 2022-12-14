const button_my_charities = document.getElementById("btn-my-charities");
const button_participations = document.getElementById("btn-participations")
const participants_window = document.getElementById("participations-window");
const my_charities_window = document.getElementById("charities-window");
const x_button1 = document.getElementsByClassName("x-button")[0];
const x_button2 = document.getElementsByClassName("x-button")[1];



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

document.querySelectorAll(".delete-charity").forEach(btn => {
    btn.addEventListener("click", () => {
        const to_delete = btn.parentElement;
        if (to_delete.classList.contains("my-charities")) my_charities_window.removeChild(to_delete);
        else if (to_delete.classList.contains("participations")) participants_window.removeChild(to_delete);
    })
})