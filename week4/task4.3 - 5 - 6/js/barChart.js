function createBarChart(data) {
  const container = d3.select("#tv-chart-container");
  const containerWidth = container.node().clientWidth;
  const containerHeight = 600;

  const svg = container
    .append("svg")
    .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("border", "1px solid black");

  const barHeight = 30;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.modelCount)])
    .range([0, containerWidth - 200]); // Leave space for labels on left and right

  const yScale = d3.scaleBand()
    .domain(data.map((d) => d.brand))
    .range([0, data.length * barHeight])
    .padding(0.1);

  // Draw the bars
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", 100)
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.modelCount))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue");

  // Add brand name labels on the left
  svg.selectAll("text.label")
    .data(data)
    .join("text")
    .attr("class", "label")
    .attr("x", 95)
    .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 2 + 5)
    .text(d => d.brand)
    .attr("text-anchor", "end")
    .attr("font-size", "14px")
    .attr("fill", "black");

  // Add model count value labels at the end of each bar
  svg.selectAll("text.value")
    .data(data)
    .join("text")
    .attr("class", "value")
    .attr("x", d => 100 + xScale(d.modelCount) + 5) // position to the right of the bar
    .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 2 + 5)
    .text(d => d.modelCount)
    .attr("text-anchor", "start")
    .attr("font-size", "14px")
    .attr("fill", "black");
}
