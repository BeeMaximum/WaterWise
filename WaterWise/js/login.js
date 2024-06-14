document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Get the input values
    const username = event.target.username.value;
    const password = event.target.password.value;


    if (username === 'admin' && password === 'password') {
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password.');
    }
});
