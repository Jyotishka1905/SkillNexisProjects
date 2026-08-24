// =========================
// DIGITAL CLOCK
// =========================

function updateClock() {

    // Create a new Date object
    const now = new Date();


    // Get hours, minutes and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();


    // Add leading zero
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");


    // Display time
    document.getElementById("clock").textContent =
        `${hours}:${minutes}:${seconds}`;


    // Display date
    const date = now.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    document.getElementById("date").textContent = date;
}


// Update clock immediately
updateClock();


// Update clock every 1 second
setInterval(updateClock, 1000);



// =========================
// NEW YEAR COUNTDOWN
// =========================

function updateCountdown() {

    const now = new Date();

    // Get the current year
    const currentYear = now.getFullYear();

    // Create New Year's date
    let newYear = new Date(
        currentYear + 1,
        0,
        1,
        0,
        0,
        0
    );


    // Difference between New Year and current time
    let difference = newYear - now;


    // Convert milliseconds into seconds
    const totalSeconds = Math.floor(
        difference / 1000
    );


    // Calculate time values
    const days = Math.floor(
        totalSeconds / (24 * 60 * 60)
    );

    const hours = Math.floor(
        (totalSeconds % (24 * 60 * 60)) / (60 * 60)
    );

    const minutes = Math.floor(
        (totalSeconds % (60 * 60)) / 60
    );

    const seconds =
        totalSeconds % 60;


    // Display countdown
    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


// Update countdown immediately
updateCountdown();


// Update countdown every 1 second
setInterval(updateCountdown, 1000);