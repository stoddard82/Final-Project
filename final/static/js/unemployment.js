function unemployment(city) {
    // Define SVG area dimensions
    //let svgWidth = 850;
    //let svgHeight = 600;
    let svgWidth = 650;
    let svgHeight = 300;
    
    // Define the chart's margins as an object
    let chartMargin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    };

    // // Bring in toolTip to make it an interactive visual 
    // let toolTip = d3.select("body")
    //   .append("div")
    //   .classed("my-tooltip", true);
    // // .style("opacity", 0);

    // Define dimensions of the chart area
    let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

    d3.csv("final_unemployment.csv").then(function (unemployment) {
        // Select body, append SVG area to it, and set the dimensions
        let svg = d3
            .select("#unemployment")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);


        // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
        // to the margins set in the "chartMargin" object.
        let chartGroup = svg.append("g")
            .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

        //show the unemployment rate for each metro area 

        let cities = [];
        // console.log(unemployment)
        for (let i = 0; i < unemployment.length; i++) {
            // console.log(unemployment[i].city_state);
            if (city === unemployment[i].city_state) {
                unemployment[i].unemployment = +unemployment[i].unemployment;
                cities.push(unemployment[i]);
            }
        }

        //create year (x) and unemployment (y) values
        console.log("unemployment data by city:");
        console.log(cities);

        // Create axes 
        let xScale = d3.scaleBand()
            .domain(cities.map(d => d.year))
            .range([0, chartWidth])
            .padding(0.4);

        yScale = d3.scaleLinear([0, d3.max(cities, city => city.unemployment)], [chartHeight, 0]);

        svg.append("text")
            .attr("x", 420)
            .attr("y", 30)
            .style("text-anchor", "end")
            .text("Unemployment Rate over Time");

        var drawLine = d3.line()
            .x(data => xScale(data.year))
            .y(data => yScale(data.unemployment));

        // Append an SVG path and plot its points using the line function
        chartGroup.append("path")
            // The drawLine function returns the instructions for creating the line for forceData
            .attr("d", drawLine(cities))
            .classed("line", true)
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("fill", "none");

            
        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        // Append axes
        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);


    }).catch(function (error) {
        console.log(error);
    });
}
let myparms = queryStringParser();
let mycity = decodeURIComponent(myparms.city);
console.log(mycity);

unemployment(mycity);