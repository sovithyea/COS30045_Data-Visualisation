const drawHistogram = (data) => {
    // Clear previous chart
    d3.select("#histogram").selectAll("*").remove();
  
    // Set up SVG container
    const svg = d3.select("#histogram")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);
  
    // Add margin group
    const innerChart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Step 6.2: Set up bins
    const binGenerator = d3.bin()
      .value(d => d.energyConsumption); // accessor function
  
    const bins = binGenerator(data); // generate bins from data
    console.log(bins); // for debugging
  
    // Step 6.3: Define scales
    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);
  
    const xScale = d3.scaleLinear()
      .domain([minEng, maxEng])
      .range([0, innerWidth]);
  
    const yScale = d3.scaleLinear()
      .domain([0, binsMaxLength])
      .range([innerHeight, 0])
      .nice();
  
    // Step 6.4: Draw bars
    innerChart.selectAll("rect")
      .data(bins)
      .join("rect")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
      .attr("height", d => innerHeight - yScale(d.length))
      .attr("fill", "steelblue")
      .attr("stroke", "white")
      .attr("stroke-width", 2);
  
    // Step 6.5: Add bottom axis
    const bottomAxis = d3.axisBottom(xScale);
  
    innerChart.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);
  
    svg.append("text")
      .text("Labelled Energy Consumption (kWh/year)")
      .attr("text-anchor", "end")
      .attr("x", width - 20)
      .attr("y", height - 5)
      .attr("class", "axis-label");
  
    // Step 6.6: Add left axis
    const leftAxis = d3.axisLeft(yScale);
  
    innerChart.append("g")
      .call(leftAxis);
  
    svg.append("text")
      .text("Frequency")
      .attr("x", 30)
      .attr("y", 20)
      .attr("class", "axis-label");
  };
  