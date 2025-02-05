const API_BASE_URL = "http://localhost:8000/api";
const LOGIN_URL = `${API_BASE_URL}/auth/login`;
const LOGOUT_URL = `${API_BASE_URL}/auth/logout`;
const CONTACTS_URL = `${API_BASE_URL}/contacts`;



// Retrieve stored token
const token = localStorage.getItem("authToken");

// Set Axios Authorization Header globally if token exists
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            axios.post(LOGIN_URL, { email, password })
                .then(response => {
                    const token = response.data.token;

                    // Store token in localStorage
                    localStorage.setItem("authToken", token);

                    // Set Axios Authorization Header globally
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    alert("Login successful! Redirecting...");
                    window.location.href = "contacts.html"; // Redirect to product page
                })
                .catch(error => {
                    console.error("Login failed:", error.response?.data || error.message);
                    alert("Login failed! Please check your credentials.");
                });
        });
    }
});


// Redirect to login page if not authenticated
function checkAuth() {
    if (!localStorage.getItem("authToken")) {
        window.location.href = "index.html";
    }
}


function fetchContacts() {
    axios.get(CONTACTS_URL)
        .then(response => {
            console.log(response);  // Log full response
            let tableContent = "";
            response.data.forEach(contact => {
                tableContent += `
                    <tr>
                        <td>${contact.name}</td>
                        <td>${contact.company}</td>
                        <td>${contact.phone}</td>
                        <td>${contact.email}</td>
                        <td>
                            <button onclick="editContact(${contact.id})">Edit</button>
                            <button onclick="deleteContact(${contact.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });

            document.getElementById("contactsTable").innerHTML = tableContent;
        })
        .catch(error => {
            console.error("Error fetching contacts:", error);
            if (error.response) {
                console.error("Response Status:", error.response.status);
                console.error("Response Data:", error.response.data);
            }
        });
}

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

// Edit a contact
function editContact(id) {
    const name = prompt("Enter new name:");
    const company = prompt("Enter new company:");
    const phone = prompt("Enter new phone:");
    const email = prompt("Enter new email:");

    if (name && company && phone && email) {
        axios.put(`${CONTACTS_URL}/${id}`, { name, company, phone, email })
            .then(response => {
                alert("Contact updated!");
                fetchContacts();
            })
            .catch(error => console.error("Error updating contact:", error));
    }
}

// Delete a contact
function deleteContact(id) {
    if (confirm("Are you sure you want to delete this contact?")) {
        axios.delete(`${CONTACTS_URL}/${id}`)
            .then(response => {
                alert("Contact deleted!");
                fetchContacts();
            })
            .catch(error => console.error("Error deleting contact:", error));
    }
}

// Load contacts on page load
if (document.getElementById("contactsTable")) {
    fetchContacts();
}

// Load products on page load (for products page)
if (document.getElementById("productTable")) {
    fetchProducts();
}

// Function to log out and clear session
function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
}

// Load contacts on page load
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("contactsTable")) {
        fetchContacts();
    }
});

// Function to log out
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            const token = localStorage.getItem("authToken");

            axios.post(LOGOUT_URL, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                alert("Logged out successfully!");
                logout();
            })
            .catch(error => {
                console.error("Error logging out:", error.response?.data || error.message);
                alert("Error logging out! Check console for details.");
            });
        });
    }
});

// Function to clear auth and redirect to login
function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "index.html";
}
