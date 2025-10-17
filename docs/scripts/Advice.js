// JavaScript source code
function advicePage() {
    if (localStorage.getItem("tbRecords") === null) {
        alert("No records exist.");

        $(location).attr("href", "#pageMenu");
    }
    else {
        var user = JSON.parse(localStorage.getItem("user"));

        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
        tbRecords.sort(compareDates);
        var i = tbRecords.length - 1;

        var systolic = tbRecords[i].Systolic;
        var diastolic = tbRecords[i].Diastolic;

        var bpCategory = getBPStage(systolic, diastolic);

        var c = document.getElementById("AdviceCanvas");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#c0c0c0";
        ctx.fillRect(0, 0, 550, 550);
        ctx.font = "22px Arial";

        drawAdviceCanvas(ctx, bpCategory, systolic, diastolic);
    }
}

function getBPStage(s, d) {
    if (s < 120 && d < 80) {
        return "StageA";
    } else if (s < 140 && d < 90) {
        return "StageB"; 
    } else {
        return "StageC"; 
    }
}

function drawAdviceCanvas(ctx, bpCategory, systolic, diastolic) {
    ctx.font = "22px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Your current BP is " + systolic + "/" + diastolic + " mmHg.", 25, 320);

    if (bpCategory == "StageA") {
        ctx.fillText("Your target BP is less than 120/80 mmHg", 25, 350);
        stageAwrite(ctx, systolic, diastolic);
        stageAMeter(ctx, systolic, diastolic);
    }
    else if (bpCategory == "StageB") {
        ctx.fillText("Your target BP is less than 130/80 mmHg", 25, 350);
        stageBwrite(ctx, systolic, diastolic);
        stageBMeter(ctx, systolic, diastolic);
    }
    else if (bpCategory == "StageC") {
        ctx.fillText("Your target BP is less than 140/80 mmHg", 25, 350);
        stageCwrite(ctx, systolic, diastolic);
        stageCMeter(ctx, systolic, diastolic);
    }
}

function stageAwrite(ctx, s, d) {
    if ((s < 120) && (d < 80)) {
        writeAdvice(ctx,"green");
    }
    else if ((s < 130) && (d < 85)) {
        writeAdvice(ctx, "yellow");
    }
    else {
        writeAdvice(ctx,"red");
    }
}

function stageBwrite(ctx, s, d) {
    if ((s < 130) && (d < 80)) {
        writeAdvice(ctx, "green");
    }
    else if ((s < 140) && (d < 90)) {
        writeAdvice(ctx, "yellow");
    }
    else {
        writeAdvice(ctx, "red");
    }
}

function stageCwrite(ctx, s, d) {
    if ((s < 130) && (d < 80)) {
        writeAdvice(ctx, "green");
    }
    else if ((s < 140) && (d < 90)) {
        writeAdvice(ctx, "yellow");
    }
    else {
        writeAdvice(ctx, "red");
    }
}

function writeAdvice(ctx, level) {
    var adviceLine1 = "";
    var adviceLine2 = "";
    if (level == "red") {
        adviceLine1 = "Your blood pressure is at a high level.";
        adviceLine2 = "Please contact your doctor as soon as possible.";
    }
    else if (level == "yellow") {
        adviceLine1 = "Your blood pressure is at a slightly high level.";
        adviceLine2 = "Adjust your lifestyle while monitoring blood pressure.";
    }
    else if (level =="green") {
        adviceLine1 = "Your blood pressure is at a healthy level.";
        adviceLine2 = "Maintain your healthy lifestyle.";
    }
    ctx.fillText("Your BP status is " + level + ".", 25, 380);
    ctx.fillText(adviceLine1, 25, 410);
    ctx.fillText(adviceLine2, 25, 440);
}

function stageAMeter(ctx, BP) {
    if (BP <= 180) {
        var cg = new RGraph.Gauge("AdviceCanvas", 0, 180, BP)
        .Set("chart.colors.ranges", [[140, 180, "red"], [120, 139, "yellow"], [0, 119, "#0f0"]]);
    }
    else {
        var cg = new RGraph.Gauge("AdviceCanvas", 0, BP, BP)
        .Set("chart.colors.ranges", [[140, 180, "red"], [120, 139, "yellow"], [0, 119, "#0f0"], [181, BP, "red"]]);
    }
    drawMeter(cg);
}

function stageBMeter(ctx, BP) {
    if (BP <= 180) {
        var bcg = new RGraph.Gauge("AdviceCanvas", 0, 180, BP)
        .Set("chart.colors.ranges", [[160, 180, "red"], [130, 159, "yellow"], [90, 129, "#0f0"], [0, 89, "yellow"]]);
    }
    else {
        var bcg = new RGraph.Gauge("AdviceCanvas", 0, BP, BP)
            .Set("chart.colors.ranges", [[160, 180, "red"], [130, 159, "yellow"], [90, 129, "#0f0"], [0, 89, "yellow"], [181, BP, "red"]]);
    }
    drawMeter(bcg);
}

function stageCMeter(ctx, BP) {
    if (BP <= 200) {
        var ccg = new RGraph.Gauge("AdviceCanvas", 0, 200, BP)
        .Set("chart.colors.ranges", [[180, 200, "red"], [140, 179, "yellow"], [90, 139, "#0f0"], [0, 89, "yellow"]]);
    }
    else {
        var ccg = new RGraph.Gauge("AdviceCanvas", 0, BP, BP)
            .Set("chart.colors.ranges", [[180, 200, "red"], [140, 179, "yellow"], [90, 139, "#0f0"], [0, 89, "yellow"], [201, BP, "red"]]);
    }
    drawMeter(ccg);
}

function drawMeter(g) {
    g.set("chart.value.text.units.post", "mmHg")
        .set("chart.value.text.boxed", false)
        .set("chart.value.text.size", 14)
        .set("chart.value.text.font", "Verdana")
        .set("chart.value.text.bold", true)
        .set("chart.value.text.decimals", 0)
        .set("chart.shadow.offsetx", 5)
        .set("chart.shadow.offsety", 5)
        .set("chart.scale.decimals", 0)
        .set("chart.title", "BLOOD PRESSURE LEVEL")
        .set("chart.radius", 250)
        .set("chart.centerx", 300)
        .set("chart.centery", 250)
        .draw();
}

