document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.getElementById('signUpForm');
    const newUsernameInput = document.getElementById('newUsername');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = newUsernameInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (newUsername && newPassword) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.username === newUsername);

            if (userExists) {
                alert('Username already exists.');
                return;
            }

            users.push({ username: newUsername, password: newPassword });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Account created successfully!');

        } else {
            alert('Please fill in all fields.');
        }
    });
});
