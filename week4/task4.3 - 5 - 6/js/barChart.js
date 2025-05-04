// changed title color
d3.select("h1")
  .style("color", "black");

// added paragraph
d3.select("div")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// border
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 500 1600")
  .style("border", "1px solid black");

  const CreateBarChart = (data) => {
    const xScale = d3.scaleLinear()
      .domain([0, 1310])
      .range([0, 500]);
  
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.brand))
      .range([0, 1600]) 
      .padding(0.2);
  
    const barAndLabels = svg
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.brand)})`);
  
    barAndLabels
      .append("rect")
      .attr("x", 70)
      .attr("y", 0) 
      .attr("width", d => xScale(d.count))
      .attr("height", yScale.bandwidth())
      .attr("fill", "blue");
  
    barAndLabels
      .append("text")
      .text(d => d.brand)
      .attr("x", 50)
      .attr("y", yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .style("font-family", "sans-serif")
      .style("font-size", "8px");
  
    barAndLabels
      .append("text")
      .text(d => d.count)
      .attr("x", d => 70 + xScale(d.count) + 4)
      .attr("y", yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "start")
      .style("font-family", "sans-serif")
      .style("font-size", "8px");
  };
  

// data
d3.csv("/data/televisions.csv", d => {
  return {
    brand: d.brand,
    count: +d.count // converts to number
  };
}).then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count)); // array with min and max

  //barchart
  CreateBarChart(data);
});
