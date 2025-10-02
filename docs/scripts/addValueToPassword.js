// Ensure there is always a default user object in localStorage
if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify({
        FirstName: "",
        LastName: "",
        DOB: "",
        HealthCardNumber: "",
        NewPassword: "2345" // default password for first login
    }));
}

// Ensure legal agreement flag exists
if (!localStorage.getItem("agreedToLegal")) {
    localStorage.setItem("agreedToLegal", "false");
}
//STOP

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
        if (localStorage.getItem("agreedToLegal") !== "true") {
            $.mobile.changePage("#legalNotice");
        } 
        else {
            var user = JSON.parse(localStorage.getItem("user"));
            if (!user.FirstName || !user.LastName) {
                // User info not complete
                $.mobile.changePage("#pageUserInfo");
            } 
            else {
                // All good, go to menu
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
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.NewPassword) {
        // Fallback in case storage is missing or corrupted
        return "2345";
    }
    return user.NewPassword;
}
