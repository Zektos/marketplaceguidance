const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const config = require('./dbcontextconfig.json');

const executeSQL = (query, params) => new Promise(
    (resolve, reject) => {
        let response = [];
        let rowCounter = 0;

        // Create Request
        let req = new Request(query, (err) => {
            if (err) reject(err);
            resolve(response);
        });

        req.on('row', function(columns) {
            response[rowCounter] = {}
            columns.forEach(function(column) {
                response[rowCounter][column.metadata.colName] = column.value
            });
            rowCounter += 1
        });

        // Create Connection
        let conn = new Connection(config);
        conn.on('connect', (err) => {
            if (err) reject(err);
            conn.execSql(req)
        });

        conn.connect();
    });

module.exports.executeSQL = executeSQL;