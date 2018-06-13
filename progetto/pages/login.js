var tentativi = 0;

function login() {
    var user = $("#user").val();
    var pass = $("#pass").val();

    if (user == "" || pass == "") {
        alert("Tutti i campi sono obbligatori");
    }
    else {
        $.post("/login", {user: user, pass: pass})
        .done((res) => success(user, pass))
        .fail((res) => fail())
    }
}

function success(user, pass) {
    setCookie("jit_user", user);
    setCookie("jit_pass", pass);
    alert("Login eseguito con successo, benvenuto " + user);
    window.location.href = 'index.html';
}

function fail() {
    tentativi ++;
    alert("Login errato, " + parseInt(3-tentativi) + " tentativi rimasti");

    if (tentativi == 3) {
        tentativi = 0;
        alert("Tentativi esauriti, attendere 5 secondi");
        $("#button").hide();
        setTimeout(()=> $("#button").show(), 5000);
    }
}

function setCookie(name, value) {
    var expDate = new Date();
    expDate.setTime(expDate.getTime() + (12 * 60 * 60 * 1000));
    var expires = "expires="+expDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
