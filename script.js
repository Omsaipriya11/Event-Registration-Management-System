```javascript
// ===============================
// EVENT REGISTRATION MANAGEMENT
// ===============================


// Get HTML elements
const registrationForm = document.getElementById("registrationForm");

const registrationTable =
    document.getElementById("registrationTable");

const emptyMessage =
    document.getElementById("emptyMessage");

const searchRegistration =
    document.getElementById("searchRegistration");

const successMessage =
    document.getElementById("successMessage");

const eventSelect =
    document.getElementById("event");


// Load registrations from Local Storage
let registrations =
    JSON.parse(localStorage.getItem("eventRegistrations")) || [];


// ===============================
// SELECT EVENT
// ===============================

function selectEvent(eventName) {

    eventSelect.value = eventName;

    document.getElementById("register").scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// REGISTER PARTICIPANT
// ===============================

registrationForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get form values
    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const department =
        document.getElementById("department").value;

    const year =
        document.getElementById("year").value;

    const selectedEvent =
        document.getElementById("event").value;


    // Create registration object
    const registration = {

        id: Date.now(),

        name: name,

        email: email,

        phone: phone,

        department: department,

        year: year,

        event: selectedEvent

    };


    // Add registration
    registrations.push(registration);


    // Save to Local Storage
    localStorage.setItem(
        "eventRegistrations",
        JSON.stringify(registrations)
    );


    // Reset form
    registrationForm.reset();


    // Show success popup
    successMessage.style.display = "flex";


    // Update table
    displayRegistrations();

});


// ===============================
// DISPLAY REGISTRATIONS
// ===============================

function displayRegistrations(list = registrations) {

    registrationTable.innerHTML = "";


    // No registrations
    if (list.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }


    emptyMessage.style.display = "none";


    // Add each registration
    list.forEach(function (registration) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${registration.name}</td>

            <td>${registration.email}</td>

            <td>${registration.department}</td>

            <td>${registration.year}</td>

            <td>${registration.event}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteRegistration(${registration.id})">
                    Delete
                </button>
            </td>

        `;


        registrationTable.appendChild(row);

    });

}


// ===============================
// DELETE REGISTRATION
// ===============================

function deleteRegistration(id) {

    const confirmation =
        confirm("Are you sure you want to delete this registration?");


    if (!confirmation) {
        return;
    }


    registrations =
        registrations.filter(function (registration) {

            return registration.id !== id;

        });


    localStorage.setItem(
        "eventRegistrations",
        JSON.stringify(registrations)
    );


    displayRegistrations();

}


// ===============================
// SEARCH REGISTRATIONS
// ===============================

searchRegistration.addEventListener(
    "input",
    function () {

        const searchText =
            searchRegistration.value.toLowerCase();


        const filteredRegistrations =
            registrations.filter(function (registration) {

                return (

                    registration.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    registration.event
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    registration.email
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    registration.department
                        .toLowerCase()
                        .includes(searchText)

                );

            });


        displayRegistrations(filteredRegistrations);

    }
);


// ===============================
// CLEAR ALL REGISTRATIONS
// ===============================

function clearRegistrations() {

    if (registrations.length === 0) {

        alert("There are no registrations to clear.");

        return;

    }


    const confirmation =
        confirm(
            "Are you sure you want to delete all registrations?"
        );


    if (!confirmation) {
        return;
    }


    registrations = [];


    localStorage.removeItem("eventRegistrations");


    displayRegistrations();

}


// ===============================
// CLOSE SUCCESS POPUP
// ===============================

function closeSuccess() {

    successMessage.style.display = "none";


    document
        .getElementById("registrations")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ===============================
// INITIAL LOAD
// ===============================

displayRegistrations();
```
