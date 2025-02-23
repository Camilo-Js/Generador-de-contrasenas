// Selección de elementos del DOM
const passwordDisplay = document.getElementById("passwordDisplay");
const lengthInput = document.getElementById("length");
const includeUppercase = document.getElementById("includeUppercase");
const includeLowercase = document.getElementById("includeLowercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const generateBtn = document.getElementById("generateBtn");
const saveBtn = document.getElementById("saveBtn");
const savedPasswordsList = document.getElementById("savedPasswords");
const clearAllBtn = document.getElementById("clearAllBtn");

// Caracteres disponibles
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";

// Función para generar una contraseña aleatoria
function generatePassword() {
    let characters = lowercaseChars;
    if (includeUppercase.checked) characters += uppercaseChars;
    if (includeNumbers.checked) characters += numberChars;
    if (includeSymbols.checked) characters += symbolChars;

    const length = parseInt(lengthInput.value);
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    passwordDisplay.value = password;
}

// Función para guardar una contraseña
function savePassword() {
    const password = passwordDisplay.value;
    if (password === "") return;

    const listItem = document.createElement("li");
    listItem.textContent = password;

    // Botón para eliminar la contraseña guardada
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = function () {
        listItem.remove();
        updateLocalStorage();
    };

    listItem.appendChild(deleteBtn);
    savedPasswordsList.appendChild(listItem);
    updateLocalStorage();
}

// Función para guardar en localStorage
function updateLocalStorage() {
    const passwords = [];
    savedPasswordsList.querySelectorAll("li").forEach((li) => {
        passwords.push(li.firstChild.textContent);
    });
    localStorage.setItem("savedPasswords", JSON.stringify(passwords));
}

// Función para cargar contraseñas guardadas
function loadSavedPasswords() {
    const passwords = JSON.parse(localStorage.getItem("savedPasswords")) || [];
    passwords.forEach((password) => {
        const listItem = document.createElement("li");
        listItem.textContent = password;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = function () {
            listItem.remove();
            updateLocalStorage();
        };

        listItem.appendChild(deleteBtn);
        savedPasswordsList.appendChild(listItem);
    });
}

// Función para borrar todas las contraseñas guardadas
function clearAllPasswords() {
    savedPasswordsList.innerHTML = "";
    localStorage.removeItem("savedPasswords");
}

// Event Listeners
generateBtn.addEventListener("click", generatePassword);
saveBtn.addEventListener("click", savePassword);
clearAllBtn.addEventListener("click", clearAllPasswords);

// Cargar contraseñas al iniciar
loadSavedPasswords();
