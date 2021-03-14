function buildUserCoinsTable(data) {
    // let data = [{
    //     Name: "Bitcoin",
    //     Symbol: "BTC",
    //     Price: 61453.95,
    //     Quantity: .21,
    //     Total: 0.0
    // }, {
    //     Name: "Ethereum",
    //     Symbol: "ETH",
    //     Price: 1900.89,
    //     Quantity: 10,
    //     Total: 0.0
    // }, {
    //     Name: "Cardano",
    //     Symbol: "ADA",
    //     Price: 1.06,
    //     Quantity: 800,
    //     Total: 0.0
    // }];
    let body = "<table class='table'><tr><thead>";
    let columns = [];
    for (let column in data[0]) {
        if (data[0].hasOwnProperty(column)) {
            body += ("<th scope='col'>" + column + "</th>");
            columns.push(column);
        }
    }
    body += "</tr><tbody>";
    data.forEach(function (row) {
        body += "<tr scope='row'>";
        let price = 0.0;
        let quantity = 0.0;
        columns.forEach(function (cell) {
            console.log(cell)
            if (cell == 'Price') {
                price = parseFloat(row[cell]);
                body += "<td>" + "$ " + row[cell] + "</td>";
            } else if (cell == 'Quantity') {
                quantity = parseFloat(row[cell]);
                body += "<td>" + row[cell] + "</td>";
            } else if (cell == 'Total') {
                let total = price * quantity;
                console.log(total)
                body += "<td>" + "$ " + total.toFixed(2).toString() + "</td>";
            } else {
                body += "<td>" + row[cell] + "</td>";
            }
        });
        body += "</tr>";
    });
    body += '</tbody><table>';
    return body;
}
