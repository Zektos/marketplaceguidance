const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
// var TYPES = require('tedious').TYPES;
const config = require('./dbcontextconfig.json');

/*
This is the database context file, which is the file that contains the database functionality.
It carries out the tasks that is in context of the database.
The functions has been written to be asyncronus by making promises that is either resolved with the response of the promise, or rejected by failing to deliver on the promise.
This is nessecary to make sure valid responses from the T-SQL Queries through the tedious library is resolved for the express library to respond correctly for a given request.
The functions of this file is primarily referenced in the controllers, which contains the routes (endpoints) for the requests made available by express.
Though i haven't yet been able to do this synchronously, it might actually be possible, but it is definitly the right way to go with async promises in this case any way.
This is due to the setup of tedious, and the way it utilises vanilla JS events to deliver the response(s) of the queries executed.

Insted of having a lot of strictly defined functions for specific requests, this has been written to allow for execution of variable requests with optional params.
This is, for now, split into either queries or so called non-queries.
Queries, which is called through the "executeQuery" function, is the queries of which you expect a resultset containing some amount of data.
Ex. a T-SQL select statement giving you any amount of rows of data.
Non-queries, which is called through the "executeNonQuery" function, is the queries of which you expect a result of either success or failed, and maybe even with an amount of rows affected.
Ex. a T-SQL insert statement, creating one or multiple rows of data.
*/


const executeQuery = (query, params) => new Promise(
    (resolve, reject) => {
        // Define response creation variables
        let response = [];
        let rowCounter = 0;

        // Create Request
        let req = new Request(query, (err) => {
            // Reject promise if err, resolve promise with the response if successful
            if (err) reject(err);
            resolve(response);
        });

        // Check if params is included, and if so, loop over them and add them to the request
        if (params != null) for (let i = 0; i < params.length; i++) {
            // Define and collect the params provided from the call
            let paramName = params[i][0];
            let paramType = params[i][1];
            let paramValue = params[i][2];

            // Add param to the request
            req.addParameter(paramName, paramType, paramValue);
        }

        // JS event to collect the data, if any is responded from the query, and add the data to the response to be resolved when all has been processed
        req.on('row', function(columns) {
            response[rowCounter] = {}
            columns.forEach(function(column) {
                response[rowCounter][column.metadata.colName] = column.value
            });
            rowCounter += 1
        });

        // Create Connection
        let conn = new Connection(config);
        // JS event to do something when connection is connected.
        conn.on('connect', (err) => {
            // Promise is rejected if error occour, otherwise, the previously defined request is executed.
            if (err) reject(err);
            conn.execSql(req)
        });

        // Do the connect to execute the above setup through JS events, and eventually reject or resolve the async promise awaited by the caller (In this example the controller).
        conn.connect();
    });

module.exports.executeQuery = executeQuery;

const executeNonQuery = (query, params) => new Promise(
    (resolve, reject) => {
        // Create Request
        let req = new Request(query, (err, rowCounter) => {
            // Reject promise if err, resolve promise with the response if successful
            if (err) reject(err);
            resolve(rowCounter);
        });

        // Check if params is included, and if so, loop over them and add them to the request
        if (params != null) for (let i = 0; i < params.length; i++) {
            // Define and collect the params provided from the call
            let paramName = params[i][0];
            let paramType = params[i][1];
            let paramValue = params[i][2];

            // Add param to the request
            req.addParameter(paramName, paramType, paramValue);
        }

        // Create Connection
        let conn = new Connection(config);
        // JS event to do something when connection is connected.
        conn.on('connect', (err) => {
            // Promise is rejected if error occour, otherwise, the previously defined request is executed.
            if (err) reject(err);
            conn.execSql(req)
        });

        // Do the connect to execute the above setup through JS events, and eventually reject or resolve the async promise awaited by the caller (In this example the controller).
        conn.connect();
    });

module.exports.executeNonQuery = executeNonQuery;