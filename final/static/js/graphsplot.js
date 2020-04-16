//from search query paramter, determine what city is being called
function queryStringParser() {
  let results = {};
  let words = window.location.search.substring(1).split('&');
  for (word of words) {
    let [key, value] = word.split("=");
    results[key] = [value];
  }
  return results;
}

// Get the city passed from the query parameter
let parms = queryStringParser();
let city = decodeURIComponent(parms.city);

// Define SVG area dimensions
let svgWidth = 650;
let svgHeight = 300;

// Define chart's margins as an object
let chartMargin = {
  top: 60,
  right: 40,
  bottom: 40,
  left: 60
};

// // Bring in toolTip to make it an interactive visual 
let toolTip = d3.select("body")
  .append("div")
  .classed("my-tooltip", true)
  .style("opacity", 0);

// Define dimensions of the chart area
let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
let svg = d3
  .select("#bar-plot")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
let chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from CSV
let icity = 0;
d3.csv("cleanedHousing.csv").then(function(priceData) {

 //show the housing price for each City/State combo 
  // console.log(priceData)
  for (let i = 0; i < priceData.length; i++) {
    // console.log(priceData[i].RegionName);
    if (city === priceData[i].RegionName) {
      icity = i;
      break;
    }
  }
  
  //create year (x) and price (y) values
  // console.log(priceData[icity]);
  let x = Object.keys(priceData[icity]);
  let y = Object.values(priceData[icity]);
  // console.log(x);
  let prices = [];
  for (let i = 0; i < x.length; i++) {
    if (x[i]==="RegionName" || x[i]==="")continue;
    prices.push({ year: x[i], prices: +y[i] });
  }

  // Create axes 
  let xScale = d3.scaleBand()
    .domain(prices.map(d => d.year))
    .range([0, chartWidth])
    .padding(0.4);

  yScale = d3.scaleLinear([0, d3.max(prices, row => row.prices)], [chartHeight, 0]);

  let xAxis = d3.axisBottom(xScale);
  let yAxis = d3.axisLeft(yScale).tickValues(yScale.ticks().concat(yScale.domain()));

  // Append axes
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

  chartGroup.append("g")
    .call(yAxis);

  let barSpacing = 5; // desired space between each bar

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  let barWidth = (chartWidth - (barSpacing * (prices.length - 1))) / prices.length;

  svg.append("text")
    .attr("x", 420)
    .attr("y", 30)
    .style("text-anchor", "end")
    .text("Average Housing Price Over Time");

  // Create code to build the bar chart using the state data.
  chartGroup.selectAll(".bar")
    .data(prices)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => chartHeight - yScale(d.prices))
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => yScale(d.prices))
    .style("fill", "#69b3a2")
    .style("opacity", 0.5)

    })
    ;



