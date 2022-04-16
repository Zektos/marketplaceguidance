# marketplaceguidance

### NOTE:
Jeg kan se at i har opdateret databasen, så funktionerne passer ikke længere.
Det kan i selvfølgelig let tilpasse, og lege med det T-SQL som i laver.
Husk i altid bare kan lave nye endpoints i controlleren med en anden Query, og så bare i udviklerkonsollen i Chrome eller whatever browser kalde via et fetch kald, og få svaret skrevet i konsollen.
Burde også virke i debug mode:

GET Kald:

fetch(location.origin + "/users/getall", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
            })
            .then((resp) => {
                return resp.json();
            })
            .then((body) => {
                console.log(body);
            })
            .catch(() => {
                console.log('Der skete en fejl');
            });

POST Kald:

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
            })
            .catch(() => {
                console.log("Der skete en fejl");
            });


### To play around, just clone the repo and:
<ol>
  <li>In Terminal run: npm i</li>
  <li>In Terminal run: npm start</li>
  <li>Wait for server boot and click the localhost link in the terminal</li>
</ol>

### Or play around in debug mode, clone the repo and:
<ol>
  <li>In Terminal run: npm i</li>
  <li>Go to Run tab in the top of the window</li>
  <li>Click start debugging</li>
  <li>Select Node.js in the dropdown</li>
  <li>Remember to set some breakpoints</li>
</ol>