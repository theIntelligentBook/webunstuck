"use strict";

(function() {

    let segments = [
        { x1: 75, x2: 325, y1: 50, y2: 50, on: false },
        { x1: 75, x2: 325, y1: 250, y2: 250, on: false },
        { x1: 75, x2: 325, y1: 450, y2: 450, on: false },
        { x1: 50, x2: 50, y1: 100, y2: 200, on: false },
        { x1: 350, x2: 350, y1: 100, y2: 200, on: false },
        { x1: 50, x2: 50, y1: 300, y2: 400, on: false },
        { x1: 350, x2: 350, y1: 300, y2: 400, on: false }
    ]

    let display = document.getElementById("display")

    segments.forEach(function (seg) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("class", "segment")
        line.setAttribute("x1", seg.x1)
        line.setAttribute("x2", seg.x2)
        line.setAttribute("y1", seg.y1)
        line.setAttribute("y2", seg.y2)
        
        line.addEventListener("click", function(evt) {
            seg.on = !seg.on
            evt.target.classList.toggle("on")
        })

        display.appendChild(line)
    })

})()
