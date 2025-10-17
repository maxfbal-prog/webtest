    // JavaScript source code
    function drawGraph() {
        if (localStorage.getItem("tbRecords") === null) {
            alert("No records exist.");

            $(location).attr("href", "#pageMenu");
        }
        else {
            RGraph.reset(document.getElementById("GraphCanvas"));
            setupCanvas();

            var Systolicarr = new Array();
            var Diastolicarr = new Array();
            var Datearr = new Array(); 
            getBPhistory(Systolicarr, Diastolicarr, Datearr);

            var bpLower = new Array(2);
            var bpUpper = new Array(2);
            getBPbounds(bpLower, bpUpper);

            drawLines(Systolicarr, Diastolicarr, bpUpper, bpLower, Datearr)
            labelAxes();
        }
    }

    function setupCanvas() {
        var c = document.getElementById("GraphCanvas");
        var ctx = c.getContext("2d");

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 500, 500);
    }

    function getBPhistory(Systolicarr, Diastolicarr, Datearr) {
        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
        tbRecords.sort(compareDates);

        for (var i = 0; i < tbRecords.length; i++) {
            var date = new Date(tbRecords[i].Date);

            //These methods start at 0, must increment by one to compensate
            var m = date.getMonth() + 1;
            var d = date.getDate();

            //The x-axis label
            Datearr[i] = (m + "/" + d);

            //The point to plot
            Systolicarr[i] = parseFloat(tbRecords[i].Systolic);
            Diastolicarr[i] = parseFloat(tbRecords[i].Diastolic);
        }
    }

    function getBPbounds(bpLower, bpUpper) {
        var user = JSON.parse(localStorage.getItem("user"));
        var BPLevel = user.BPRange;

        if (BPLevel == "StageA") {
            bpUpper[0] = bpUpper[1] = 120;
            bpLower[0] = bpLower[1] = 80;
        }
        else if (BPLevel == "StageB") {
            bpUpper[0] = bpUpper[1] = 130;
            bpLower[0] = bpLower[1] = 80;
        }
        else {
            bpUpper[0] = bpUpper[1] = 140;
            bpLower[0] = bpLower[1] = 90;
        }
    }

    function drawLines(Systolicarr, Diastolicarr, bpUpper, bpLower, Datearr) {
        var BPline = new RGraph.Line({
            id: "GraphCanvas",
            data: [bpUpper, bpLower, Systolicarr, Diastolicarr],
            options: {
                labels: Datearr,
                colors: ["green", "green", "blue", "red"],
                shadow: true,
                shadowOffsetx: 1,
                shadowOffsety: 1,
                linewidth: 1,
                numxticks: 6,
                scaleDecimals: 0,
                xaxispos: "bottom",
                gutterLeft: 40,
                gutterBottom: 50,
                tickmarks: ["filledcircle", "filledcircle", null, null],
                ticksize: 5,
                title: "Blood Pressure"
            }
        }).draw();
    }

    function labelAxes() {
        var c = document.getElementById("GraphCanvas");
        var ctx = c.getContext("2d");
        ctx.font = "11px Georgia";
        ctx.fillStyle = "green";
        ctx.fillText("Date(MM/DD)", 400, 470);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillText("BP (mmHg)", -250, 10);
    }