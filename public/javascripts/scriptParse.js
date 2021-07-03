const form = document.getElementById('form');

function logSubmit(event) {
    event.preventDefault();
    var formData = {};
    console.log('submit');
    var data = new FormData(form);
    data.forEach(function(value, key) {
        formData[key] = value;
    });
    var json = JSON.stringify(formData);
    console.log(json);
    var http = new XMLHttpRequest();
    var url = '/registerForm';
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }
    http.send(json);
}

form.addEventListener('submit', logSubmit);