const selectTags = document.querySelectorAll("select");
const svg = d3.select("svg");

svg.attr("viewBox", "0 0 960 720")

// axes
const axisXGroup = svg
	.append("g")
	.attr("class", "x-axis")
	.attr("transform", "translate(0, 620)");
const axisYGroup = svg
	.append("g")
	.attr("class", "y-axis")
	.attr("transform", "translate(100, 0)");

const axisXText = svg
	.append("text")
	.attr("class", "x-axis")
	.attr("transform", "translate(480, 670)")
	.text("x axis");
const axisYText = svg
	.append("text")
	.attr("class", "x-axis")
	.attr("transform", "translate(30, 360) rotate(-90)")
	.text("y axis");

const placeCities = () => {
	const inputX = document.querySelector("select[name=valueX]"),
		inputY = document.querySelector("select[name=valueY]");

	const valueX = inputX.value;
	const valueY = inputY.value;

	const textX = inputX.options[inputX.selectedIndex].innerHTML;
	const textY = inputY.options[inputY.selectedIndex].innerHTML;

	axisXText.text(textX);
	axisYText.text(textY);

	const maxValueX = d3.max(data, (d) => d[valueX]);
	const maxValueY = d3.max(data, (d) => d[valueY]);
	const maxValueR = d3.max(data, (d) => d.population);

	const scaleX = d3.scaleLinear().domain([0, maxValueX]).range([100, 860]);
	const scaleY = d3.scaleLinear().domain([0, maxValueY]).range([620, 100]);
	const scaleR = d3.scaleSqrt().domain([0, maxValueR]).range([0, 30]);

	const axisX = d3
		.axisBottom(scaleX)
		.tickSizeInner(-520)
		.tickSizeOuter(0)
		.tickPadding(10)
		.ticks(10, "$,f");
	const axisY = d3
		.axisLeft(scaleY)
		.tickSizeInner(-760)
		.tickSizeOuter(0)
		.tickPadding(10)
		.ticks(10, "$,f");
	axisXGroup.call(axisX);
	axisYGroup.call(axisY);

	const cities = svg
		.selectAll("g.city")
		.data(data, (d) => d.city)
		.enter()
		.append("g")
		.attr("class", "city")
		.attr("transform", (d) => {
			const x = d[valueX],
				y = d[valueY];
			return `translate(${scaleX(x)}, ${scaleY(y)})`;
		});
	cities
		.append("circle")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", (d) => scaleR(d.population));
	cities
		.append("rect")
		.attr("x", -60)
		.attr("y", (d) => -1 * scaleR(d.population) - 35)
		.attr("width", 120)
		.attr("height", 30);
	cities
		.append("text")
		.attr("x", 0)
		.attr("y", (d) => -1 * scaleR(d.population) - 15)
		.text((d) => d.city);

	svg
		.selectAll("g.city")
		.transition()
		.duration(500)
		.attr("transform", (d) => {
			const x = d[valueX],
				y = d[valueY];
			return `translate(${scaleX(x)}, ${scaleY(y)})`;
		});

	svg.selectAll("g.city").on("mouseover", () => {
		d3.select(this).raise();
	});
};

placeCities();

selectTags.forEach((selectTag) => {
	selectTag.addEventListener("change", placeCities);
});
