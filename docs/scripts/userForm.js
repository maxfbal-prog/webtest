/* Adds given text value to the password text
* field
*/
//pg 124
function addValueToPassword(button) {
    var currVal = $("#passcode").val();
    if (button == "bksp") {
        $("#passcode").val(currVal.substring(0, currVal.length - 1));
    }
    else {
        $("#passcode").val(currVal.concat(button));
    }
}

/* On the main page, after password entry, directs user to main page,
* legal disclaimer if they have not yet agree to it, or user entry page
* if they have not yet completed their user info
*/
//pg 125
//modified code due to bug
$(document).on("pagecreate", "#pageHome", function () {
    $("#btnEnter").on("click", function (e) {
        e.preventDefault(); //failsafe for form errors
        var password = getPassword();
        if ($("#passcode").val() == password) {
            if (localStorage.getItem("agreedToLegal") == null) {
                $.mobile.changePage("#legalNotice");
            } else if (localStorage.getItem("agreedToLegal") == "true") {
                if (localStorage.getItem("user") == null) {
                    $.mobile.changePage("#pageUserInfo");
                } else {
                    $.mobile.changePage("#pageMenu"); //return to menu
                }
            }
        } else {
            alert("Incorrect password, please try again.");
        }
    });
});

// Retrieves password from local storage if it exists, otherwise returns the default password
function getPassword() {
    if (typeof (Storage) == "undefined") {
        alert("Your browser does not support HTML5 localStorage. Try upgrading");
    }
    else if (localStorage.getItem("user") != null) {
        return JSON.parse(localStorage.getItem("user")).NewPassword;
    }
    else {
        // Default password
        return "2345";
    }
}

// Records that the user has agreed to the legal disclaimer on this device/browser

$("#noticeYes").click(function () {
    localStorage.setItem("agreedToLegal", "true");
});

//slightly modified book code in order to bypass error
$(document).on("pagecreate", "#pageUserInfo", function () {
    $("#frmUserForm").submit(function (e) {
        e.preventDefault(); //failsafe for form errors
        saveUserForm();
        $.mobile.changePage("#pageMenu"); //return to main menu
        return false;
    });
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

    if (($("#txtFirstName").val() != "") &&
        ($("#txtLastName").val() != "") &&
        ($("#txtHealthCardNumber").val() != "") &&
        ($("#datBirthdate").val() != "") && ($("#datBirthdate").val() <= currentDate)) {
        return true;
    }
    else {
        return false;
    }
}

function saveUserForm() {
    if (checkUserForm()) {
        var user = {
            "FirstName": $("#txtFirstName").val(),
            "LastName": $("#txtLastName").val(),
            "HealthCardNumber": $("#txtHealthCardNumber").val(),
            "NewPassword": $("#changePassword").val(),
            "DOB": $("#datBirthdate").val()
        };

        try {
            localStorage.setItem("user", JSON.stringify(user));
            alert("Saving Information");
            $.mobile.changePage("#pageMenu");
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
    }
    else {
        alert("Please complete the form properly.");
    }
}

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