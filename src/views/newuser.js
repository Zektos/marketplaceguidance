document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("getUsersButton").addEventListener("click", (x, ev) => {
        // Collect values for API
        let usernameVal = document.getElementById("usernameInput").value;
        let passwordVal = document.getElementById("passwordInput").value;
        let emailVal = document.getElementById("EmailInput").value;
        let userlevelVal = document.getElementById("userlevelInput").value;
        let followedadsVal = document.getElementById("followedadsInput").value;

        let user = {
            id: null,
            username: usernameVal,
            password: passwordVal,
            email: emailVal,
            userlevel: userlevelVal,
            followedads: followedadsVal
        };

        // Call API
        fetch(location.origin + "/users/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then((resp) => {
                return resp.json();
            })
            .then((body) => {
                console.log(body);
                document.getElementById("usernameInput").value = '';
                document.getElementById("passwordInput").value = '';
                document.getElementById("EmailInput").value = '';
                document.getElementById("userlevelInput").value = '';
                document.getElementById("followedadsInput").value = '';
                window.alert('User created!');
            })
            .catch(() => {
                window.alert("Der skete en fejl");
            });
    });
});