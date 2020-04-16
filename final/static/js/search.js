
$(document).ready(function () {
    $('#search').keyup(function () {
        console.log("Huh");
        search_table($(this).val());
    });
    function search_table(value) {
        $('#search_table tr').each(function () {
            var found = 'false';
            $(this).each(function () {
                if (($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) || ($(this).attr('id') === 'tr-header')) {
                    found = 'true';
                }
            });
            if (found == 'true' && value) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    }

});

function makeTable() {
    let header = `\
    <tr id="tr-header" style="display:none">
    <th title="Field #1">City Rank</th>
    <th title="Field #2">City</th>
    <th title="Field #3">State</th>
    <th title="Field #4">Average Salary</th>
    <th title="Field #5">Median House Price</th>
    <th title="Field #6">Median Rent</th>
    <th title="Field #7">Unemployment Rate</th>
    <th title="Field #8">Learn More</th>
</tr>`;
    $("#search_table").append(header);

    d3.json(`/api/tabledata`).then(rows => { // call the server.py api for salarydata
        console.log(rows);
        for (row of rows) {
            let html = `
        <tr style="display:none">
        <td align="center">${row.cityrank}</td>
        <td><a href="/House_Unemp.html?city=${row.city}, ${row.abbr}">${row.city}</a></td>
        <td>${row.state}</td>
        <td>${row.averagesalary}</td>
        <td>${row.medianhousingcost}</td>
        <td>${row.medianrent}</td>
        <td align="center">${row.unemploymentrate}</td>
        <td align="center"><a href="${row.href}" target="_blank">Explore the City</a></td>
        </tr>`;
            console.log(html);
            $("#search_table").append(html);
        }
    });

}

makeTable();
