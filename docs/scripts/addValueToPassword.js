/* Adds given text value to the password text
* field
*/
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
$(document).on("click", "#btnEnter", function () {
    var entered = $.trim($("#passcode").val());
    var password = getPassword(); 

    if (entered === password) {
        if (localStorage.getItem("agreedToLegal") == null) {
            $.mobile.changePage("#legalNotice");
        }
        else if (localStorage.getItem("agreedToLegal") == "true") {
            if (localStorage.getItem("user") == null) {
                /* User has not been created, direct user
                * to User Creation page
                */
                $.mobile.changePage("#pageUserInfo");
            }
            else {
                $.mobile.changePage("#pageMenu");
            }
        }
    }
    else {
        alert("Incorrect password, please try again.");
    }
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