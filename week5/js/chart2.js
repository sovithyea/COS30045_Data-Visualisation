// Load CSV and parse values
d3.csv("data/sample2.csv").then(function(data) {
    data.forEach(d => d.Power = +d.Power);
    drawChart2(data);
  });
  
  function drawChart2(data) {
    const width = 400;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  
    // Create responsive SVG
    const svg = d3.select("#chart2")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
  
    // X scale — time categories
    const x = d3.scalePoint()
      .domain(data.map(d => d.Time))
      .range([margin.left, width - margin.right]);
  
    // Y scale — linear for power values
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Power)]).nice()
      .range([height - margin.bottom, margin.top]);
  
    // Create line generator
    const line = d3.line()
      .x(d => x(d.Time))
      .y(d => y(d.Power));
  
    // Append path for the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "deeppink")
      .attr("stroke-width", 2)
      .attr("d", line);
  
    // X axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
  
    // Y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }
  