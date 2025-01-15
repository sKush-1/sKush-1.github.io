var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
var interval;


for (var i = 0; i < navMenuAnchorTags.length; i++) {
    navMenuAnchorTags[i].addEventListener('click', function (event) {
        event.preventDefault();
        var targetSectionID = this.textContent.trim().toLowerCase();
        console.log(this.textContent);
        var targetSection = document.getElementById(targetSectionID);
        console.log(targetSection);
        //    interval = setInterval(scrollVertically, 20, targetSection);

        interval = setInterval(function () {
            scrollVertically(targetSection);
        }, 20);
    });
}


function scrollVertically(targetSection) {
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if (targetSectionCoordinates.top <= 0) {
        clearInterval(interval);
        return;
    }
    window.scrollBy(0, 50);
}

function myFunction() {
                window.location.href="./index.html";
            }


// Function to send form data using JSONP
function sendFormData(name, email, subject, message) {
    const callback = 'handleResponse'; // Name of the callback function
    const url = `https://script.google.com/macros/s/AKfycbya6tBHGkeqTwWy3ccE1YxtJEIIG1qBf_IVDFeKjIm-EF9B-l2aHq_d-VSEvO-1LGbl/exec?callback=${callback}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;

    // Create a script element
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);

    // Remove the script element after the request is complete
    script.onload = () => document.body.removeChild(script);
}

// Callback function to handle the response
function handleResponse(response) {
    alert(response.message); // Show success message
    document.getElementById('contact-form').reset(); // Clear the form
}

// Add event listener to the form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById('input-name').value;
    const email = document.getElementById('input-email').value;
    const subject = document.getElementById('input-subject').value || 'Portfolio Contact'; // Use default subject if not provided
    const message = document.getElementById('input-message').value;

    // Send data using JSONP
    sendFormData(name, email, subject, message);
});