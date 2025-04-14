// Load CSV and parse numeric values
d3.csv("data/sample3.csv").then(function(data) {
    data.forEach(d => d.Share = +d.Share);
    drawChart3(data);
  });
  
  function drawChart3(data) {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 10;
  
    // Create responsive SVG centered group
    const svg = d3.select("#chart3")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    // Set color scale
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.Type))
      .range(d3.schemeSet2);
  
    // Create pie layout
    const pie = d3.pie().value(d => d.Share);
  
    // Define arc generator
    const arc = d3.arc()
      .innerRadius(0) // for donut: use radius / 2
      .outerRadius(radius);
  
    // Draw pie slices
    svg.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.Type))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);
  }
  