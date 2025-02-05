// const CONTACTS_URL = "http://localhost:8000/api/contacts";
// const submitContactBtn = document.getElementById("submitContactBtn");

// Retrieve stored token
// const token = localStorage.getItem("authToken");

// Set Axios Authorization Header globally if token exists
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Add a new contact
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const company = document.getElementById("company").value;
            const phone = document.getElementById("phone").value;
            const email = document.getElementById("email").value;

            // Make the API call to create a new contact
            axios.post(CONTACTS_URL, { name, company, phone, email })
                .then(response => {
                    alert("Contact added successfully!");
                    contactForm.reset();  // Reset the form fields
                    window.location.href = "contacts.html"; // Redirect to contacts page
                })
                .catch(error => {
                    console.error("Error adding contact:", error);
                    alert("There was an error adding the contact. Please try again.");
                });
        });
    }
});
