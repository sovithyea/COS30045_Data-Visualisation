// Load the CSV file with a row conversion function
d3.csv("data/Ex6_TVdata.csv", d => ({
  brand: d.brand,
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  energyConsumption: +d.energyConsumption,
  star: +d.star
})).then(data => {
  console.log(" Data loaded:", data); // Debug log

  drawHistogram(data);
  populateFilters(data);
}).catch(error => {
  console.error("Error loading the CSV file:", error);
});
