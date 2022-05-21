"use strict"

let period = 10000
let values = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

function xValue(idx, time) {
    let frac = 2 * Math.PI / (values.length - 1)
    let phase = 2 * Math.PI * (time % period) / period

    return Math.sin(phase + idx * frac)
}

function updateValues() {
    let now = new Date()
    let millis = now.getTime()

    for (let i = 0; i < values.length; i++) {
        values[i] = xValue(i, millis)
    }
}

function updateList() {
    let selection = d3.select("#list")
                .selectAll("li")
                .data(values)
    
    selection.text(function(d, i) {        
        return d.toPrecision(3)
    })

    selection.enter().append("li").text(function(d, i) {
        return d
    })

    selection.exit().remove()
}

function updateChart() {

    let xscale = d3.scaleLinear().domain([0, values.length]).range([0, 300])
    let yscale = d3.scaleLinear().domain([-1,1]).range([0, 100])

    let line = d3.line()
        .x(function(d,i) { return xscale(i) })
        .y(function(d,i) { return yscale(d) })

    d3.select("#chart").datum(values).attr("d", line)
}

function addValue() {
    values.push(0)
}

function removeValue() {
    if (values.length >= 2) {
        values.shift()
    }
}


// a timer to run our simulation and update our data
setInterval(function () {
    updateValues()
    updateList()
    updateChart()
      
    // update the player velocity chart using d3.js
}, 20);   