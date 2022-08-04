const selectTags = document.querySelectorAll("select");
const svg = d3.select("svg");

svg.attr("width", 960).attr("height", 720);

// axes
const axisXGroup = svg
	.append("g")
	.attr("class", "x-axis")
	.attr("transform", "translate(0, 620)");
const axisYGroup = svg
	.append("g")
	.attr("class", "y-axis")
	.attr("transform", "translate(100, 0)");

const placeCities = () => {
	const inputX = document.querySelector("select[name=valueX]"),
		inputY = document.querySelector("select[name=valueY]");

	const valueX = inputX.value;
	const valueY = inputY.value;

	const maxValueX = d3.max(data, (d) => d[valueX]);
	const maxValueY = d3.max(data, (d) => d[valueY]);
	const maxValueR = d3.max(data, (d) => d.population);

	const scaleX = d3.scaleLinear().domain([0, maxValueX]).range([100, 860]);
	const scaleY = d3.scaleLinear().domain([0, maxValueY]).range([620, 100]);
	const scaleR = d3.scaleSqrt().domain([0, maxValueR]).range([0, 30]);

	const axisX = d3.axisBottom(scaleX);
	axisXGroup.call(axisX);
	const axisY = d3.axisLeft(scaleY);
	axisYGroup.call(axisY);

	const cities = svg
		.selectAll("g.city")
		.data(data)
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

	svg
		.selectAll("g.city")
		.transition()
		.duration(500)
		.attr("transform", (d) => {
			const x = d[valueX],
				y = d[valueY];
			return `translate(${scaleX(x)}, ${scaleY(y)})`;
		});
};

placeCities();

selectTags.forEach((selectTag) => {
	selectTag.addEventListener("change", placeCities);
});
