const registrationUser = document.querySelector(".registrationUser");
const registrationPassword = document.querySelector(".registrationPassword");
const registrationConfirm = document.querySelector(".registrationConfirm");

const registerSubmit = document.querySelector(".registerSubmit");


registerSubmit.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!registrationUser.value.trim()) {
        alert("User name is required");
        return;
    }
    if (!registrationPassword.value.trim()) {
        alert("Password is required");
        return;
    }
    if (registrationPassword.value !== registrationConfirm.value) {
        alert("Passwords do not match");
        return;
    }
    const userData = {
        username: registrationUser.value,
        password: registrationPassword.value
    };
    try {
        const response = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) {
            alert(data.message);
            return;
        }
        alert(data.message);
    } catch (error) {
        console.error(error);
        alert("Server Error");
    }

});

// login 
const loginUser = document.querySelector(".loginUser");
const loginPassword = document.querySelector(".loginPassword");

const loginSubmit = document.querySelector(".loginSubmit");

loginSubmit.addEventListener("click", async (e) => {
    e.preventDefault();
    const userData = {
        username: loginUser.value,
        password: loginPassword.value
    };
    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) {
            alert(data.message);
            return;
        }
        alert(data.message);
        // window.location.href = "../index.html";
    } catch (error) {
        console.error(error);
    }
});