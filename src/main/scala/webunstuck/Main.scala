package willscala

import com.wbillingsley.veautiful.html._
import com.wbillingsley.veautiful.doctacular._
import Medium._
import org.scalajs.dom

import Common._
import templates.{markdownDeck, markdownPage, markdownChapterPage, Example}
import templates.given

val site = Site()


object Main {

  val scaleChallengesToWindow:Boolean = {
    !dom.window.location.search.contains("scale=off")
  }

  def main(args:Array[String]): Unit = {
    val n = dom.document.getElementById("render-here")
    n.innerHTML = ""

    Styles.installStyles()

    import site.given 
        
    site.toc = site.Toc(
      "Home" -> site.HomeRoute,
      
      "1. JS, HTML, and the DOM" -> site.Toc(
        "Intro" -> site.addPage("browserAsAP", 
          markdownChapterPage(1, "JS, HTML, and the DOM", "", "markdown/browserAsPlatform.md")
        ),
        "HTML and the DOM" -> site.add("html", 
          Alternative("Slide deck", Deck(() => markdownDeck("HTML and the DOM -- a fast recap", "markdown/dom.md")))
        ),
        "ECMAScript 5" -> site.add("es5", 
          Alternative("Slide deck", Deck(() => markdownDeck("ECMAScript 5 -- a fast recap", "markdown/es5.md")))
        ),
        "Prototype inheritance" -> site.add("es5oo", 
          Alternative("Slide deck", Deck(() => markdownDeck("Prototype inheritance -- how OO worked in ES5", "markdown/es5oo.md")))
        ),
      ),

      "2. Graphics" -> site.Toc(
        "Intro" -> site.addPage("graphics",
          markdownChapterPage(2, "2D Graphics in the Browser", "", "markdown/graphics.md")
        ),
        "Canvas" -> site.add("canvas", 
          Alternative("Slide deck", Deck(() => markdownDeck("Canvas", "markdown/canvas.md")))
        ),
        "Example: mouse trails" -> site.addPage("mousetrails", 
          Example("examples/canvas/", "mousetrails.html", Seq("mousetrails.html", "canvasexample.js"))
        ),
        "Example: compositing" -> site.addPage("compositing", 
          Example("examples/canvas/", "composite.html", Seq("composite.html", "compositeexample.js"))
        ),
        "SVG" -> site.add("svg", 
          Alternative("Slide deck", Deck(() => markdownDeck("Scalable Vector Graphics (SVG)", "markdown/svg.md")))
        ),
        "D3" -> site.add("d3", 
          Alternative("Slide deck", Deck(() => markdownDeck("D3: Data Driven Documents", "markdown/d3.md")))
        ),
        "CSS and Pre-processors" -> site.add("css", 
          Alternative("Slide deck", Deck(() => markdownDeck("CSS, SASS, Less, and pre-processors", "markdown/css.md")))
        ),
      ),

      "3. Compile to JS" -> site.Toc(
        "Intro" -> site.addPage("compileToJS",
          markdownChapterPage(2, "Compile-to-JavaScript", "", "markdown/compileToJS.md")
        ),
        "Motivation" -> site.add("compileToJSDeck", 
          Alternative("Slide deck", Deck(() => markdownDeck("Compile to JavaScript", "markdown/compileToJSDeck.md")))
        ),     
      ),

    )
    
    site.home = () => site.renderPage(frontPage.layout())
    site.attachTo(n)

  }

}
