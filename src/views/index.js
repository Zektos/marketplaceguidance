document.addEventListener("DOMContentLoaded", (event) => {

    // Event on button click
    document.getElementById("getUsersButton").addEventListener("click", (x, ev) => {
        fetch(location.origin + "/users/getall", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                // body: JSON.stringify(user),
            })
            .then((resp) => {
                return resp.json();
            })
            .then((body) => {
                console.log(body);
                let utCont = document.getElementById('userTableContainer');
                // Remove all chrildren
                while (utCont.firstChild) utCont.removeChild(utCont.firstChild);
                let nTable = document.createElement('table');
                let nTHead = document.createElement('thead');
                let nTBody = document.createElement('tbody');
                // let rHeaders = ['Email', 'Followed_ads', 'ID', 'Password', 'Userlevel', 'Username'];
                let rHeaders = ['ID', 'Username', 'Email', 'Userlevel', 'Followed_ads']; // No password, prettier order
                for (let i = 0; i < rHeaders.length; i++) {
                    let nHValue = rHeaders[i];
                    let nHElem = document.createElement('th')
                    nHElem.innerHTML = nHValue;
                    nTHead.appendChild(nHElem);
                }
                for (let i = 0; i < body.length; i++) {
                    let nRValue = body[i];
                    let nRElem = document.createElement('tr')
                    for (let x = 0; x < rHeaders.length; x++) {
                        let propName = rHeaders[x];
                        let nDValue = nRValue[propName];
                        let nDElem = document.createElement('td')
                        nDElem.innerHTML = nDValue;
                        nRElem.appendChild(nDElem);
                    }
                    // nRElem.innerHTML = nRValue;
                    nTBody.appendChild(nRElem);
                }
                nTable.appendChild(nTHead);
                nTable.appendChild(nTBody);
                utCont.appendChild(nTable);
            })
            .catch(() => {
                window.alert("Der skete en fejl");
            });
    });
});