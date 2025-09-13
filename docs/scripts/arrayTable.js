// JavaScript source code

function setup() {
    array();
}


function array() {
    // creation of two empty arrays being a and b
    var a = [];
    var b = [];
    // for loop that runs 11 times and assigns a array and b array with a random number each time
    for (let i = 0; i <= 10; i++) {
        a[i] = Math.random();
        b[i] = Math.random();
    }

    // find the HTML table, data, and we store it in the new variable, table
    let table = document.getElementById("data");

    // new row is created at the top which is our header that names each column
    let header = table.insertRow();
    header.insertCell().textContent = "i";
    header.insertCell().textContent = "a[i]";
    header.insertCell().textContent = "b[i]";

    // loop 11 times, each time creating a new row with a new array value
    for (let i = 0; i <= 10; i++) {
        let row = table.insertRow();
        row.insertCell().textContent = i;
        row.insertCell().textContent = a[i];
        row.insertCell().textContent = b[i];
    }

    // call the function distance and pass the two arrays into it
    // we then store this in the variable distance
    let distance = Distance(a, b);

    //looks for HTML element with ID, distance
    document.getElementById("distance").textContent = "Distance: " + distance;
}

//function for calculating the distance between the arrays
function Distance(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += Math.pow(a[i] - b[i], 2);
    }
    return Math.sqrt(sum);
}