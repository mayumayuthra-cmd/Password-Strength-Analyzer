const password = document.getElementById("password");

password.addEventListener("input", checkPassword);

function checkPassword() {

    let p = password.value;

    let length = p.length >= 12;
    let upper = /[A-Z]/.test(p);
    let lower = /[a-z]/.test(p);
    let number = /[0-9]/.test(p);
    let special = /[^A-Za-z0-9]/.test(p);
    let unique = new Set(p).size === p.length;

    update("length", length, "At least 12 characters");
    update("upper", upper, "Uppercase letter");
    update("lower", lower, "Lowercase letter");
    update("number", number, "Number");
    update("special", special, "Special character");
    update("unique", unique, "No repeated characters");

    let score = [length, upper, lower, number, special, unique]
                .filter(Boolean).length;

    let bar = document.getElementById("progress-bar");
    let strength = document.getElementById("strength");

    bar.style.width = (score / 6 * 100) + "%";

    if (p.length === 0) {
        strength.innerText = "Password Strength";
        bar.style.width = "0%";
    }
    else if (score <= 2) {
        strength.innerText = "Weak Password";
        bar.style.background = "red";
    }
    else if (score <= 4) {
        strength.innerText = "Medium Password";
        bar.style.background = "orange";
    }
    else {
        strength.innerText = "Strong Password";
        bar.style.background = "green";
    }
}

function update(id, condition, message) {

    let element = document.getElementById(id);

    element.innerText =
        (condition ? "✅ " : "❌ ") + message;
}

function togglePassword() {

    let input = document.getElementById("password");
    let button = document.getElementById("toggle");

    if (input.type === "password") {
        input.type = "text";
        button.innerText = "Hide";
    }
    else {
        input.type = "password";
        button.innerText = "Show";
    }
}

function generatePassword() {

    let chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let result = "";
    let random = new Uint32Array(16);

    crypto.getRandomValues(random);

    for (let i = 0; i < 16; i++) {
        result += chars[random[i] % chars.length];
    }

    document.getElementById("suggestion").innerText = result;
}