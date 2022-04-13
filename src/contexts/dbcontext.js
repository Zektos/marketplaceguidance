const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('./dbcontextconfig.json');

const executeQuery = (query, params) => new Promise(
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

module.exports.executeQuery = executeQuery;

const executeNonQuery = (query, params) => new Promise(
    (resolve, reject) => {
        let response = [];
        let rowCounter = 0;

        // Create Request
        let req = new Request(query, (err) => {
            if (err) reject(err);
            resolve(response);
        });

        for (let i = 0; i < params.length; i++) {
            let paramName = params[i][0];
            let paramType = params[i][1];
            let paramValue = params[i][2];

            req.addParameter(paramName, paramType, paramValue);
        }

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

module.exports.executeNonQuery = executeNonQuery;