// Adding constants 
const height = 500;
const width = 1000;
margin = ({top: 30, right: 0, bottom: 30, left: 40});

//read data from csv
d3.csv("observe-data.csv").then(function(data) {
  data.forEach(function(d) {   
    d.frequency = +d.frequency;    
  });

//SVG - change const svg = d3.create("svg") to const svg = d3.select("svg").Append("")
const  svg = d3.select("body").Append("svg")
      .attr("viewBox", [0, 0, width, height]);

      const bar = svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("g")
      .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => x(d.data.name))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
    .append("title")
     
const gx = svg.append("g")
.call(xAxis);

const gy = svg.append("g")
.call(yAxis);

return svg.node();
}
);


    
// x-scale
main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
    d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1)
    )});

// y-scale
main.variable(observer("y")).define("y", ["d3","series","height","margin"], function(d3,series,height,margin){return(
    d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
        .rangeRound([height - margin.bottom, margin.top])

// x-axis 
main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x"], function(height,margin,d3,x){return(
    g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call(g => g.selectAll(".domain").remove())
    )});

// y-axis 
main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], function(margin,d3,y){return(
    g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.selectAll(".domain").remove())
    )});

//Population by age and state. Compare to [horizontal stacked bars](/@d3/stacked-horizontal-bar-chart), [normalized stacked bars](/@d3/stacked-normalized-horizontal-bar) and a [dot plot](/@d3/dot-plot). Data: [American Community Survey](/@mbostock/working-with-the-census-api
main.variable(observer("key")).define("key", ["legend","color"], function(legend,color){return(
legend({color, title: "Age (years)"})
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","series","color","x","y","formatValue","xAxis","yAxis"], function(d3,width,height,series,color,x,y,formatValue,xAxis,yAxis)
{

//main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return( d3.csvParse(await FileAttachment("us-population-state-age.csv").text(), (d, i, columns) => (d3.autoType(d), d.total = d3.sum(columns, c => d[c]), d)).sort((a, b) => b.total - a.total))});

  main.variable(observer("series")).define("series", ["d3","data"], function(d3,data){return(
d3.stack()
    .keys(data.columns.slice(1))
  (data)
    .map(d => (d.forEach(v => v.key = d.key), d))
)});

  main.variable(observer("y")).define("y", ["d3","series","height","margin"], function(d3,series,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .rangeRound([height - margin.bottom, margin.top])
)});
  main.variable(observer("color")).define("color", ["d3","series"], function(d3,series){return(
d3.scaleOrdinal()
    .domain(series.map(d => d.key))
    .range(d3.schemeSpectral[series.length])
    .unknown("#ccc")
)});
    main.variable(observer("formatValue")).define("formatValue", function(){return(
    x => isNaN(x) ? "N/A" : x.toLocaleString("en")
    )});
    main.variable(observer("height")).define("height", function(){return(
    600
    )});
    main.variable(observer("margin")).define("margin", function(){return(
    {top: 10, right: 10, bottom: 20, left: 40}
    )});
      main.variable(observer("d3")).define("d3", ["require"], function(require){return(
    require("d3@5")
    )});
      const child1 = runtime.module(define1);
      main.import("legend", child1);
      return main;
    }
