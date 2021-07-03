let button = document.getElementById("registerButton");

// This handler will be executed only once when the cursor
// moves over the unordered list
button.addEventListener("mouseenter", function(event) {
    // highlight the mouseenter target
    button.innerText = 'Register Now';
}, false);

// This handler will be executed every time the cursor
// is moved over a different list item
button.addEventListener("mouseover", function(event) {
    // highlight the mouseover target
    button.innerText = 'Register';
    setTimeout(function() {
        button.innerText = 'Register';
    }, 500);
}, false);