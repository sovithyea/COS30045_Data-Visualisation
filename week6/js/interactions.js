// Step 8.1: Create the filter buttons dynamically
const populateFilters = (data) => {
    d3.select("#filters_screen") // target div in HTML
      .selectAll("button")
      .data(filters_screen) // from shared-constants.js
      .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {
        console.log("Clicked filter:", d.id);
  
        if (!d.isActive) {
          // Update filter states
          filters_screen.forEach(filter => {
            filter.isActive = filter.id === d.id;
          });
  
          // Update button styles
          d3.selectAll("#filters_screen .filter")
            .classed("active", d => d.isActive);
  
          // Update the histogram
          updateHistogram(d.id, data);
        }
      });
  };
  
  // Step 8.4: Update histogram data based on selected filter
  const updateHistogram = (filterId, data) => {
    const updatedData = filterId === "all"
      ? data
      : data.filter(tv => tv.screenTech === filterId);
  
    const updatedBins = binGenerator(updatedData); // reuse the generator
  
    d3.selectAll("#histogram rect")
      .data(updatedBins)
      .join("rect")
      .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
      .attr("height", d => innerHeight - yScale(d.length));
  };
  