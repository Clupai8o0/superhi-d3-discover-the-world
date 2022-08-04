const selectTags = document.querySelectorAll("select");
const svg = d3.select("svg");

svg.attr("width", 960).attr("height", 720);

const placeCities = () => {
	let valueX = "singlePerson";
	let valueY = "apartment";

	let maxValueX = d3.max(data, (d) => d[valueX]);
	let maxValueY = d3.max(data, (d) => d[valueY]);

	const scaleX = d3.scaleLinear().domain([0, maxValueX]).range([100, 860]);
	const scaleY = d3.scaleLinear().domain([0, maxValueY]).range([620, 100]);

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
	cities.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 15);
};

placeCities();

selectTags.forEach((selectTag) => {
	selectTag.addEventListener("change", placeCities);
});
