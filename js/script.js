$("#input").on('keypress',function(e) {
    console.log("a");
    console.log(e);
    if(e.which == 13) {
        let cors = "https://cors-anywhere.herokuapp.com/";
        let server = "es1";
        let darkorbit = `https://${server}.darkorbit.com/ajax/pilotprofil.php`;

        let username = e.target.value;

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
            console.log("json answer: ");
            console.log(json);

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

            console.log(`Iduser-64: ${iduser64}`);
            console.log(`Iduser-10: ${iduser10}`);
        });
    }
});

$(document).keypress(function(event) {
    if (event.key === "Enter" && event.target.id === "input" && event.target.value !== "") {
        console.log("cargando");
        let cors = "https://cors-anywhere.herokuapp.com/";
        let server = "es1";
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
            console.log("json answer: ");
            console.log(json);

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

            console.log(`Iduser-64: ${iduser64}`);
            console.log(`Iduser-10: ${iduser10}`);
        });
    }
});

