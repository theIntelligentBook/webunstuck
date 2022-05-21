"use strict";

// Wrap this as a module
(function() {

    let canvas = document.getElementById("thecanvas")

    let options = document.getElementById("optionspanel")

    let compositeStyle = 'source-over'

    let compositeStyles = [
        'source-over',
        'source-in',
        'source-out',
        'source-atop',
        'destination-in',
        'destination-out',
        'lighter',
        'lighten',
        'xor',
        'luminosity'
    ]

    function redraw() { 
        let ctx = canvas.getContext("2d")
        ctx.globalCompositeOperation = 'source-over'

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create a gradient fill
        let gradient = ctx.createLinearGradient(0,0,200,200)
        gradient.addColorStop(0, "hsl(0, 30%, 30%)") //"#040000")
        gradient.addColorStop(1, "hsl(0, 90%, 90%)") //"#00ffff")

        // Paint a rectangle
        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.fillRect(0,0,200, 200)

        // Set the composite style
        ctx.globalCompositeOperation = compositeStyle

        // Paint a single-colour circle
        ctx.beginPath()
        ctx.arc(150,150,100,0,Math.PI * 2)
        ctx.fillStyle = "hsl(270, 100%, 50%)"
        ctx.fill()

        // Reset the composite style
        ctx.globalCompositeOperation = 'source-over' 
    }

    // Set up the composite buttons
    compositeStyles.forEach(function (cs) {
        let btn = document.createElement("button")
        let tn = document.createTextNode(cs)
        btn.appendChild(tn)
        options.appendChild(btn)

        btn.onclick = function() { 
            compositeStyle = cs
            redraw()
        }
    })

    redraw()


})()