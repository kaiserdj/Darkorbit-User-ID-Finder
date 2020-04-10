/* https://dostats.info/ */

let det_click = false;
$(document).click(function (event) {
    if (event.target.id === "input") {
        det_click = true;
    } else if (event.target.id !== "input" && det_click === true) {
        get_id(event.target.value);
        det_click = false;
    }
});

$(document).keypress(function (event) {
    if (event.key === "Enter" && event.target.id === "input" && event.target.value !== "") {
        get_id(event.target.value);
    }
});

function get_id(username) {
    console.log("------loading------");
    let cors = "https://cors-anywhere.herokuapp.com/";
    let server = $("#server").val();;
    let darkorbit = `https://${server}.darkorbit.com/ajax/pilotprofil.php`;

    let settings = {
        "url": `${cors}${darkorbit}`,
        "type": "POST",
        "header": '{"X-Requested-With": "XMLHttpRequest"}',
        "dataType": "json",
        "data": {
            "command": "searchProfileFromExternalPPP",
            "profileUsername": username
        }
    };

    $.ajax(settings).done(function (json) {
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
            iduser64 = json.url.split("/")[4].split("-")[0];

            let digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            let iduser10 = 0;
            for (let i = 0; i < iduser64.length; i++) {
                let p = digits.indexOf(iduser64[i]);
                if (p < 0) {
                    iduser64 = NaN;
                } else {
                    iduser10 += p * Math.pow(digits.length, iduser64.length - i - 1);
                }
            }
            console.log(`User: ${username}`);
            $("#user").val(username);
            console.log(`Iduser-64: ${iduser64}`);
            $("#64").val(iduser64);
            console.log(`Iduser-10: ${iduser10}`);
            $("#10").val(iduser10);
        } else {
            console.log(`User: ${json.status}`);
            $("#user").val(json.status);
            $("#64").val("");
            $("#10").val("");
        }
    }).fail(function(data) {
        error(data);
        
      });
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