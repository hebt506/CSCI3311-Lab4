async function Charting(){

    const margin = ({top: 20, right: 20, bottom: 20, left: 20})
    const width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    const svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
    d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{
        // console.log(data)
        const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Income)])
        .range(0, width);

        // console.log(xScale())
        console.log(xScale(d3.max(data, d => d.Income)));

        const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.LifeExpectancy)])
        .range(0, height);

        const rScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.Population)])
        .range(0, 10);

        svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.Income))
        .attr("cy", d => yScale(d.LifeExpectancy))
        .attr("r", d => rScale(d.Population))
        .attr("fill", "blue");

    })
}

async function main(){
    Charting()
}

main()