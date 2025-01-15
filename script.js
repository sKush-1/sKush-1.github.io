var navMenuAnchorTags = document.querySelectorAll(".nav-menu a");
var interval;

for (var i = 0; i < navMenuAnchorTags.length; i++) {
  navMenuAnchorTags[i].addEventListener("click", function (event) {
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
  window.location.href = "./index.html";
}

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById("input-name").value;
    const email = document.getElementById("input-email").value;
    const subject =
      document.getElementById("input-subject").value || "Portfolio Contact"; // Use default subject if not provided
    const message = document.getElementById("input-message").value;

    // Send data to Google Apps Script
    fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
      redirect: "follow", // Follow redirects
      method: "POST", // Use POST method
      body: JSON.stringify({ name, email, subject, message }), // Send data as JSON string
      headers: {
        "Content-Type": "text/plain;charset=utf-8", // Use text/plain content type
      },
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        alert(data.message); // Show success message
        document.getElementById("contact-form").reset(); // Clear the form
      })
      .catch((error) => {
        alert("Failed to send message. Please try again.");
        console.error("Error:", error);
      });
  });
