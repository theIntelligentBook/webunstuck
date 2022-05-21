"use strict";

// Wrap this as a module
(function() {

    let canvas = document.getElementById("thecanvas")

    let pointArray = []

    let numPoints = 50

    function newPoint(x, y) {
        let rect = canvas.getBoundingClientRect()
        let cx = rect.left
        let cy = rect.top

        pointArray.push({ x: x - cx, y: y - cy})
        if (pointArray.length > numPoints) {
            pointArray.shift()
        }
    }

    function redraw() {
        let ctx = canvas.getContext("2d")
        let h = ctx.canvas.clientHeight
        let w = ctx.canvas.clientWidth

        ctx.fillStyle = "#444"
        ctx.fillRect(0, 0, w, h)

        for (let i = 0; i < pointArray.length; i++) {
            let frac = (i + 1) / numPoints
            let intensity = Math.floor(frac * 211) + 40
            let radius = frac * 10

            let p = pointArray[i]
            if (p.x !== undefined) {
                ctx.fillStyle = "rgb(" + intensity + "," + intensity + "," + intensity +")"
                ctx.strokeStyle = "rgb(" + intensity + "," + intensity + "," + intensity +")"

                ctx.beginPath()
                ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI)
                ctx.fill()

            }
            
        }
        newPoint(undefined, undefined)

    }

    canvas.addEventListener("mousemove", function (evt) {
        newPoint(evt.clientX, evt.clientY)
    })

    redraw()

    setInterval(redraw, 20);  


})()