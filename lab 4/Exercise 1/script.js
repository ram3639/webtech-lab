let usernameInput = document.getElementById("username");
let statusMsg = document.getElementById("status");
let form = document.getElementById("regForm");

let isAvailable = false;

usernameInput.addEventListener("keyup", function () {

    let username = usernameInput.value.trim();

    if(username.length == 0){
        statusMsg.innerHTML = "";
        return;
    }

    // SHOW LOADING
    statusMsg.innerHTML = "Checking <span class='spinner'></span>";
    statusMsg.className = "loading";

    // ARTIFICIAL DELAY (2 sec)
    setTimeout(() => {

        fetch("users.json")
        .then(response => response.json())
        .then(data => {

            let exists = data.usernames.includes(username.toLowerCase());

            if (exists) {
                statusMsg.innerHTML = "Username already taken";
                statusMsg.className = "taken";
                isAvailable = false;
            }
            else {
                statusMsg.innerHTML = "Username available";
                statusMsg.className = "available";
                isAvailable = true;
            }

        });

    },2000);   // Delay added so loading is visible

});


// PREVENT SUBMISSION

form.addEventListener("submit", function(e){

    if(!isAvailable){
        e.preventDefault();
        alert("Username not available!");
    }

});
