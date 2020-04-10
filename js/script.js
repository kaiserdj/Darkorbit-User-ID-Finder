/* https://dostats.info/ */

$(document).keypress(function (event) {
    if (event.key === "Enter" && event.target.id === "input" && event.target.value !== "") {
        console.log("------loading------");
        let cors = "https://cors-anywhere.herokuapp.com/";
        let server = $("#server").val();;
        let darkorbit = `https://${server}.darkorbit.com/ajax/pilotprofil.php`;
        let username = event.target.value;

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
                console.log(`User: ${event.target.value}`);
                $("#user").val(event.target.value);
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
        });
    }
});