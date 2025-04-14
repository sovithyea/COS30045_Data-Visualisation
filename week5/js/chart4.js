// Load CSV and parse numbers
d3.csv("data/sample4.csv").then(function(data) {
    data.forEach(d => {
      d.Size = +d.Size;
      d.Power = +d.Power;
    });
    drawChart4(data);
  });
  
  function drawChart4(data) {
    const width = 400;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  
    // Create responsive SVG canvas
    const svg = d3.select("#chart4")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
  
    // X scale — TV size
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Size)])
      .range([margin.left, width - margin.right]);
  
    // Y scale — Power usage
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Power)])
      .range([height - margin.bottom, margin.top]);
  
    // Draw dots
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.Size))
      .attr("cy", d => y(d.Power))
      .attr("r", 5)
      .attr("fill", "cornflowerblue");
  
    // X axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
  
    // Y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }
  