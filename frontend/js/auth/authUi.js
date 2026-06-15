const logInGroup = document.querySelector(".logInGroup");
const signInGroup = document.querySelector(".signInGroup");
const togglebtn = document.querySelector(".togglebtn");
const page = localStorage.getItem("page")||"login";

if(page === "signin"){
    logInGroup.classList.add("hidden");
    signInGroup.classList.remove("hidden");
    togglebtn.textContent = "log in";
}else{
    logInGroup.classList.remove("hidden");
    signInGroup.classList.add("hidden");
    togglebtn.textContent = "sign in";
}

togglebtn.addEventListener("click", () => {
    logInGroup.classList.toggle("hidden");
    signInGroup.classList.toggle("hidden");
    togglebtn.textContent = logInGroup.classList.contains("hidden") ? "Log in" : "Sign in";

    localStorage.setItem("page", logInGroup.classList.contains("hidden") ? "signin" : "login");
});