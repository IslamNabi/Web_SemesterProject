document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const loginForm = document.getElementById('loginForm');
    const noteSection = document.getElementById('noteSection');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const signUp = document.getElementById('signUpButton');
    const logoutButton = document.getElementById('logoutButton');
    const noteInput = document.getElementById('noteInput');
    const saveButton = document.getElementById('saveButton');
    const output = document.getElementById('output');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const disableDarkModeToggle = document.getElementById('disableDarkModeToggle');

    loginButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (username === '' || password === '') {
            alert('Please enter both username and password.');
            return;
        }

        if (username === 'user' && password === 'password') {
            sessionStorage.setItem('loggedIn', 'true');
            loginForm.style.display = 'none';
            noteSection.style.display = 'block';
            displayNotes();
        } else {
            alert('Invalid username or password.');
        }
    });

    signUp.addEventListener('click', function() {
        window.location.href = 'signUp.html';
    });

    logoutButton.addEventListener('click', function() {
        disableDarkMode();
        sessionStorage.removeItem('loggedIn');
        noteSection.style.display = 'none';
        loginForm.style.display = 'block';

    });

    saveButton.addEventListener('click', function() {
        const currentDate = new Date();
        const noteCheck = noteInput.value.trim();
        const note = noteInput.value.trim() + ' ' + currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();

        
        if (noteCheck !== '') {
            saveNoteToLocalStorage(note);
            displayNotes();
            noteInput.value = '';
        } else {
            alert('Please enter a note.');
        }
    });

// Event listener for enabling dark mode
darkModeToggle.addEventListener('click', enableDarkMode);

// Event listener for disabling dark mode
disableDarkModeToggle.addEventListener('click', disableDarkMode);

// Function to enable dark mode
function enableDarkMode() {
    const body = document.body;
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');   
    // Hide the enable button and show the disable button
    darkModeToggle.style.display = 'none';
    disableDarkModeToggle.style.display = 'block';
}

// Function to disable dark mode
function disableDarkMode() {
    const body = document.body;
    body.classList.remove('dark-mode');
    localStorage.removeItem('darkMode');
    // Hide the disable button and show the enable button
    disableDarkModeToggle.style.display = 'none';
    darkModeToggle.style.display = 'block';
}

    function saveNoteToLocalStorage(note) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function displayNotes() {
        output.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(function(note, index) {
            output.innerHTML += `<p><strong>Note ${index + 1}:</strong> ${note}</p>`;
        });
    }

    // Check if user is already logged in
    if (sessionStorage.getItem('loggedIn') === 'true') {
        loginForm.style.display = 'none';
        noteSection.style.display = 'block';
        displayNotes();
    }
});