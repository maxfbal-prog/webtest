/* Runs the function to display the user information, history, graph or
* suggestions, every time their div is shown
*/
//pg 137
$(document).on("pageshow", function () {
    if ($('.ui-page-active').attr('id') == "pageUserInfo") {
        showUserForm();
    }
    else if ($('.ui-page-active').attr('id') == "pageRecords") {
        loadUserInformation();
        listRecords();
    }
    else if ($('.ui-page-active').attr('id') == "pageAdvice") {
        setTimeout(function () {
            advicePage();
            resizeGraph();
        }, 10);
    }
    else if ($('.ui-page-active').attr('id') == "pageGraph") {
        setTimeout(function () {
            drawGraph();
            resizeGraph();
        }, 10);
    }
});

function loadUserInformation() {
    try {
        var user = JSON.parse(localStorage.getItem("user"));
    }
    catch (e) {
        /* Google browsers use different error
        * constant
        */
        if (window.navigator.vendor === "Google Inc") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Storage limit exceeded.");
            }
        }
        else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage failed.");
        }

        console.log(e);
    }

    if (user != null) {
        $("#divUserSection").empty();
        var today = new Date(); var today = new Date(); //Intended from book, not an error
        var dob = new Date(user.DOB);
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

        $("#divUserSection").append(
            "User's Name: " + user.FirstName + " " + user.LastName +
            "<br>Age: " + age +
            "<br>Health Card Number: " + user.HealthCardNumber +
            "<br>New Password: " + user.NewPassword);
        $("#divUserSection").append("<br><a href='#pageUserInfo' data-mini='true' id='btnProfile' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true' >Edit Profile</a>");

        $('#btnProfile').button(); // 'Refresh' the button 
    }
}

function resizeGraph() {
    if ($(window).width() < 700) {
        $("#GraphCanvas").css({ "width": $(window).width() - 50 });
        $("#AdviceCanvas").css({ "width": $(window).width() - 50 });
    }
}