// Records that the user has agreed to the legal disclaimer on this device/browser

$(document).on("click", "#noticeYes", function () {
    localStorage.setItem("agreedToLegal", "true");
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user.FirstName || !user.LastName) {
        $.mobile.changePage("#pageUserInfo");
    } else {
        $.mobile.changePage("#pageMenu");
    }
});

function checkUserForm() {
    //Check for empty fields in the form
    //for finding current date
    var d = new Date();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var year = d.getFullYear();
    var currentDate = year + '/' +
    (('' + month).length < 2 ? '0' : '') + month + '/' +
    (('' + date).length < 2 ? '0' : '') + date;

    if ($("#txtFirstName").val() != "" &&
        $("#txtLastName").val() != "" &&
        $("#txtHealthCardNumber").val() != "" &&
        $("#datBirthdate").val() != "" &&
        new Date($("#datBirthdate").val()) <= new Date()) {
        return true;
    }
    else {
        return false;
    }
}

$(document).on("submit", "#frmUserForm", function(e) {
    e.preventDefault();

    if (checkUserForm()) {
        var user = {
            FirstName: $("#txtFirstName").val(),
            LastName: $("#txtLastName").val(),
            DOB: $("#datBirthdate").val(),
            HealthCardNumber: $("#txtHealthCardNumber").val(),
            NewPassword: $("#changePassword").val() || "2345"
        };

        localStorage.setItem("user", JSON.stringify(user));
        alert("Information saved!");
        $.mobile.changePage("#pageMenu");
    } else {
        alert("Please complete all fields correctly.");
    }
});

function showUserForm() {
    //Load the stored values in the form
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
            alert("Error: Saving to local storage");
        }

        console.log(e);
    }

    if (user != null) {
        $("#txtFirstName").val(user.FirstName);
        $("#txtLastName").val(user.LastName);
        $("#txtHealthCardNumber").val(user.HealthCardNumber);
        $("#changePassword").val(user.NewPassword);
        $("#datBirthdate").val(user.DOB);
    }
}


