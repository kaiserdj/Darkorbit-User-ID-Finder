let user = "";
let det_click = false;

$(document).click(function (event) {
    if (event.target.id === "input") {
        det_click = true;
    } else if (event.target.id !== "input" && det_click === true) {
        get_id($("#input").val());
        det_click = false;
    }
});

$(document).keypress(function (event) {
    if (event.key === "Enter" && event.target.id === "input" && event.target.value !== "") {
        get_id(event.target.value);
    }
});

function get_id(username) {
    if (username === user || username === "") {
        return;
    }
    det_click = false;
    console.log("------loading------");
    let cors = "https://co.kaiserdj-c.workers.dev/?";
    let server = $("#server").val();;
    let darkorbit = `https://${server}.darkorbit.com/ajax/pilotprofil.php`;

    var formdata = new FormData();
    formdata.append("command", "searchProfileFromExternalPPP");
    formdata.append("profileUsername", username);
    formdata.append("language", "es");

    var requestOptions = {
        method: 'POST',
        body: formdata
    };
    
  fetch(`${cors}${darkorbit}`, requestOptions)
  .then(response => response.text())
  .then(json => {
        json = JSON.parse(json);
        if ($(".the-form").css("display") === "none") {
            $(".container").animate({
                height: "10%",
                "margin-top": "200px"
            }, 1500);
            $(".the-form").css("display", "inherit");
        }
        console.log("json answer: ");
        console.log(json);
        $("#json").val(JSON.stringify(json));

        if (json.url !== false) {
            iduser62 = json.url.split("/")[4].split("-")[0];

            let digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            let iduser10 = 0;
            for (let i = 0; i < iduser62.length; i++) {
                let p = digits.indexOf(iduser62[i]);
                if (p < 0) {
                    iduser62 = NaN;
                } else {
                    iduser10 += p * Math.pow(digits.length, iduser62.length - i - 1);
                }
            }
            console.log(`User: ${username}`);
            $("#user").val(username);
            console.log(`Iduser-62: ${iduser62}`);
            $("#62").val(iduser62);
            console.log(`Iduser-10: ${iduser10}`);
            $("#10").val(iduser10);
        } else {
            console.log(`User: ${json.status}`);
            $("#user").val(json.status);
            $("#62").val("");
            $("#10").val("");
        }
    }).catch(err => error(err));
}

function error(data) {
    console.error("---------------------------");
    console.error("-          ERROR          -");
    console.error("---------------------------");
    console.error(data);
    console.error(data.responseText);
    $("#notification").fadeIn("slow");
    $("#error").text("ERROR: " + data.statusText);
    $(".dismiss").click(function () {
        $("#notification").fadeOut("slow");
    });
}
