// Load CSV and convert string to number
d3.csv("data/sample1.csv").then(function(data) {
    data.forEach(d => d.Energy = +d.Energy); // ensure Energy is numeric
    drawChart1(data);
  });
  
  function drawChart1(data) {
    const width = 400;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  
    // Create responsive SVG canvas
    const svg = d3.select("#chart1")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
  
    // X scale — categories (screen technologies)
    const x = d3.scaleBand()
      .domain(data.map(d => d.Technology))
      .range([margin.left, width - margin.right])
      .padding(0.2);
  
    // Y scale — linear scale for energy values
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Energy)]).nice()
      .range([height - margin.bottom, margin.top]);
  
    // Create bars
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.Technology))
      .attr("y", d => y(d.Energy))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.Energy))
      .attr("fill", "#69b3a2");
  
    // X axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
  
    // Y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }
  