document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("regName").value;
            const email = document.getElementById("regEmail").value;
            const password = document.getElementById("regPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const passwordError = document.getElementById("passwordError");

            // Validate password match
            if (password !== confirmPassword) {
                passwordError.style.display = "block";
                return;
            } else {
                passwordError.style.display = "none";
            }

            // Send registration request
            axios.post("http://localhost:8000/api/register", {
                name,
                email,
                password,
                password_confirmation: confirmPassword
            })
            .then(response => {
                // Save authentication token
                localStorage.setItem("authToken", response.data.token);

                alert("Registration successful! You can now log in.");
                window.location.href = "thankYou.html"; // Redirect to Thank You page
            })
            .catch(error => {
                console.error("Registration failed:", error.response?.data || error.message);
                alert("Registration failed! Please check your details.");
            });
        });
    }
});


// Function to toggle password visibility
function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}
