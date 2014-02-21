function init() {
document.addEventListener("deviceready", deviceReady, true);
delete init;
}

function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();

    console.log("click");
    if(u != '' && p!= '') {
        $.ajax({
            type       : "POST",
            url        : "http://app.openzix.com/api-token-auth/",
            crossDomain: true,
            beforeSend : function() {},
            complete   : function() {},
            data       : {username : u, password : p},
            dataType   : 'json',
            success    : function(response) {
                //console.error(JSON.stringify(response));
                alert('Works!');
                //console.log(response);
                window.localStorage["token"] = response.token;
            },
            error      : function() {
                //console.error("error");
                alert('Not working!');                  
            }
        });   
        if(window.localStorage["token"] != ''){
            console.log("Token:");
            console.log(window.localStorage["token"]);
        }
/*
        $.post("http://app.openzix.com/api-auth/login/", {username:u,password:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;             
                $.mobile.changePage("some.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#submitButton").removeAttr("disabled");
        },"json");
*/
    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {
    
$("#loginForm").on("submit",handleLogin);

}