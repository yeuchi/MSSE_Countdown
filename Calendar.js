/*
 * Mike Bostock's Calendar view
 * - http://bl.ocks.org/mbostock/4063318
 */
var cellSize = 17;

class CalendarView {
  constructor()
  {
    this.width = 960;
    this.height = 136;

    this.percent = d3.format(".1%");
    this.format = d3.time.format("%Y-%m-%d");
    
    this.color = d3.scale.quantize()
        .domain([-.05, .05])
        .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));
    
    this.svg = d3.select("body").selectAll("svg")
        .data(d3.range(2017, 2018))
      .enter().append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("class", "RdYlGn")
      .append("g")
        .attr("transform", "translate(" + ((this.width - cellSize * 53) / 2) + "," + (this.height - cellSize * 7 - 1) + ")");
    
    this.svg.append("text")
        .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text(function(d) { return d; });
    
    this.rect = this.svg.selectAll(".day")
        .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append("rect")
        .attr("class", "day")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function(d) { return d3.time.weekOfYear(d) * cellSize; })
        .attr("y", function(d) { return d.getDay() * cellSize; })
        .datum(this.format);
    
    this.rect.append("title")
        .text(function(d) { return d; });
    
    this.svg.selectAll(".month")
        .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append("path")
        .attr("class", "month")
        .attr("d", this.monthPath);
  }
  
  render(csv)
  { 
    if(csv)
    {
      var data = d3.nest()
        .key(function(d) { return d.Date; })
        //.rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
        .rollup(function(d) { return d[0].test; })
        .map(csv);
    
      var color = this.color;
      var percent = this.percent;
      this.rect.filter(function(d) { return d in data; })
          .attr("class", function(d) { return "day " + color(data[d]); })
        .select("title")
          .text(function(d) { return d + ": " + percent(data[d]); });
    }
  
  }
  
  monthPath(t0) {
    var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
        d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
        d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
        
    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
        + "H" + w0 * cellSize + "V" + 7 * cellSize
        + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
        + "H" + (w1 + 1) * cellSize + "V" + 0
        + "H" + (w0 + 1) * cellSize + "Z";
  }
}
/*
var width = 960,
    height = 136,
    cellSize = 17; // cell size

var percent = d3.format(".1%"),
    format = d3.time.format("%Y-%m-%d");

var color = d3.scale.quantize()
    .domain([-.05, .05])
    .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));

var svg = d3.select("body").selectAll("svg")
    .data(d3.range(2017, 2018))
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "RdYlGn")
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

var rect = svg.selectAll(".day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return d3.time.weekOfYear(d) * cellSize; })
    .attr("y", function(d) { return d.getDay() * cellSize; })
    .datum(format);

rect.append("title")
    .text(function(d) { return d; });

svg.selectAll(".month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("class", "month")
    .attr("d", monthPath);
    
function drawCalendar(csv)
{ 
  if(csv)
  {
    var data = d3.nest()
      .key(function(d) { return d.Date; })
      //.rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
      .rollup(function(d) { return d[0].test; })
      .map(csv);
  
    rect.filter(function(d) { return d in data; })
        .attr("class", function(d) { return "day " + color(data[d]); })
      .select("title")
        .text(function(d) { return d + ": " + percent(data[d]); });
  }

}

function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
      d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}*/