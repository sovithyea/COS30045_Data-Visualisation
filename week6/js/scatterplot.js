const drawScatterplot = (data) => {
    const svg = d3.select("#scatterplot")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);
  
    const innerChartS = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    xScaleS
      .domain(d3.extent(data, d => d.star))
      .range([0, innerWidth])
      .nice();

    yScaleS
      .domain(d3.extent(data, d => d.energyConsumption))
      .range([innerHeight, 0])
      .nice();

    // draw circles
    innerChartS.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => xScaleS(d.star))
      .attr("cy", d => yScaleS(d.energyConsumption))
      .attr("r", 4)
      .attr("fill", d => colorScale(d.screenTech))
      .attr("opacity", 0.7);
  
    // bottom axis
    const bottomAxisS = d3.axisBottom(xScaleS);
    innerChartS
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxisS);
  
    // left axis
    const leftAxisS = d3.axisLeft(yScaleS);
    innerChartS
      .append("g")
      .call(leftAxisS);
  
    // Draw legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right - 100}, ${margin.top})`);
  
    const screenTechs = ["LED", "LCD", "OLED"];
  
    legend.selectAll("legend-dots")
      .data(screenTechs)
      .join("circle")
        .attr("cx", 0)
        .attr("cy", (d, i) => i * 25)
        .attr("r", 6)
        .style("fill", d => colorScale(d));
  
    legend.selectAll("legend-labels")
      .data(screenTechs)
      .join("text")
        .attr("x", 15)
        .attr("y", (d, i) => i * 25)
        .attr("dy", "0.35em")
        .text(d => d)
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle");
  }
  