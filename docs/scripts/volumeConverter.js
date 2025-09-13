// JavaScript source code
function setup()
{
    document.getElementById("gallons").onclick =
        function () {
            setUnits("L");
            document.getElementById("volume").max = 1000;
        };
    document.getElementById("litres").onclick =
        function () {
            setUnits("G");
            document.getElementById("volume").max = 4000;
        };


}

function setUnits(unit) {
    var label = document.getElementById("label");
    label.innerHTML = unit;
}

function validation(value, isLitres) {
    if (isLitres && value > 1000) {
        return false;
    }

    if (!isLitres && value > 4000) {
        return false;
    }
    return true;
}

function convert() {
    var litresButton = document.getElementById("litres");
    var volume = document.getElementById("volume").value;

    if (!validation(volume, litresButton.checked)) {
        return;
    }

    if (litresButton.checked) {
        convertToLitres(volume);
    }
    else {
        convertToGallons(volume);
    }
}

function convertToLitres(volumeInGallons) {
    var litresVolume = volumeInGallons * 3.78541;
    document.getElementById("answer").innerHTML =
        volumeInGallons + " Gallons converts to " +
        litresVolume.toFixed(1) + " Litres";
}

function convertToGallons(volumeInLitres) {
    var gallonsVolume = volumeInLitres / 3.78541;
    document.getElementById("answer").innerHTML =
        volumeInLitres + " Litres converts to " +
        gallonsVolume.toFixed(1) + " Gallons";

}
