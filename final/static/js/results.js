// this function is run when the page loads
function main() {
    console.log("Beginning main()");
    matchesTable(); // draw the matches
}

function queryStringParser() {
    let results = {};
    let words = window.location.search.substring(1).split('&');
    console.log(words);
    for(word of words) {
        let [key, value]=word.split("=");
        results[key] = [value];

    }
    console.log(results);
    return results;
}

function matchesTable() {
    parameters = queryStringParser();
    console.log(parameters);
    var cityName= parameters['city']
    console.log(cityname);
    
    d3.json(`/api/age_matches?minage=${parameters['minage']}&maxage=${parameters['maxage']}`).then(rows => { // call the server.py api for salarydata
        // console.log(rows);
        let values = transpose(sqlToTable(rows).slice(1));
        let keys = Object.keys(rows[0]).map(key => [key]);

        let tableData = [{
            type: 'table',
            header: {
                values: keys,
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "grey" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: values,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }];

        Plotly.newPlot('matchesDiv', tableData);
    });
}

// this is a utility function that rearranges the data from a SQL resultSet to x/y traces
// rows=data from sql
//   [{"age": 25, "name": "Willy"}, {"age": 57, "name": "Greg"}]
// xname=the name of the x data, ("name")
// yname = the name of the y data ("age")
// results: { x:["Willy", "Greg"], y:[25, 57] }
// NOTE: You can call this multiple times to create multiple traces
function sqlToTrace(rows, xname, yname) {  
    let x = [];
    let y = [];
    for (row of rows) {
        x.push(row[xname]);
        y.push(row[yname]);
    }
    return { x, y };
}

//
// makes all the rows columns, and all the columns rows
function transpose(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
}

// this is a utility function that rearranges the data from a SQL resultSet tabular datas
// rows=data from sql, 
//   [{"age": 25, "name": "Willy"}, {"age": 57, "name": "Greg"}]
// returns a single row of HEADINGS
// and each subsequent row
//  results: [ ["name", "age"], ["Willy", 25], ["Greg", 57] ]

function sqlToTable(rows) {
    let header = [];
    let body = [];
    for (heading in rows[0]) {// getting the object keys
        header.push(heading);
    }
    body.push(header);
    for (row of rows) {
        body.push(Object.values(row))
    }
    return body;
}

main(); // initialize the page