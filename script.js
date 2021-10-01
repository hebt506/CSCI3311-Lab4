async function Charting(){
    
    d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{

        const margin = ({top: 20, right: 20, bottom: 20, left: 20})
        const width = 650 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        const svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // console.log(data)

        const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Income)])
        .range([0, width]);

        // console.log(xScale())
        // var test = d3.max(data, d => d.Income)
        // console.log(test)
        // console.log(xScale(d3.max(data, d => d.Income)));

        const yScale = d3.scaleLinear()
        .domain([d3.max(data, d => d.LifeExpectancy), d3.min(data, d => d.LifeExpectancy)])
        .range([0, height]);

        // console.log(yScale(d3.min(data, d => d.LifeExpectancy)));

        const rScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.Population)])
        .range([0, 25]);

        // console.log(rScale(d3.max(data, d => d.Population)))

        let region = [];
        data.forEach(d => region.push(d.Region));

        // console.log(region)

        let regionCategory = [...new Set(region)];

        // console.log(regionCategory)

        const colorScale = d3.scaleOrdinal()
        .domain(regionCategory)
        .range(d3.schemeTableau10);

        // console.log(colorScale.domain())

        svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.Income))
        .attr("cy", d => yScale(d.LifeExpectancy))
        .attr("r", d => rScale(d.Population))
        .attr("fill", d => colorScale(d.Region))
        .attr("stroke", "black")
        .on("mouseenter", (event, d) => {

            let c = d.Country;
            let i = d.Income;
            let l = d.LifeExpectancy;
            let p = d.Population;
            let r = d.Region;

            const pos = d3.pointer(event, window);

            d3.select(".tooltip")
            .style('left', pos[0] + 'px')
            .style('top', pos[1] + 'px')
            .style('display', 'block')
            .html(
                "Country: " + c + '</br>' +
                "Income($): " + i + '</br>' +
                "Life Expectancy: " + l + '</br>' +
                "Population: " + p + '</br>' +
                "Region: " + r 
            )
        })
        .on("mouseleave", (event, d) => {
            d3.select(".tooltip")
            .style('display', 'none')
        });

        const xAxis = d3.axisBottom()
	    .scale(xScale)
        .ticks(5, "s")

        const yAxis = d3.axisLeft()
	    .scale(yScale)

        svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

        svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

        svg.append("text")
        .attr('x', width - 50)
        .attr('y', height - 5)
        .text('Income');

        svg.append("text")
        .attr('x', 10)
        .attr('y', 5)
        .text('Life Expectancy')
        .attr('writing-mode', 'vertical-lr');

        // console.log(colorScale.domain())

        const legend = svg.selectAll('.legend')
        .data(colorScale.domain())
        .enter()
        .append('g');

        legend.append('rect')
        .attr('x', width - 200)
        .attr('y', (d,i) =>  height - 200 + i*20)
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', colorScale);

        legend.append('text')
        .attr('x', width - 180)
        .attr('y', (d,i) => height - 197 + i*20)
        .attr('dy','.50em')
        .text(d => d);

    })
}

async function main(){
    Charting()
}

main()