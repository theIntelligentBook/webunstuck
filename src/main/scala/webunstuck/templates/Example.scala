package willscala.templates

import com.wbillingsley.veautiful.html.{Styling, VHtmlNode, VHtmlComponent, <, ^}
import scala.concurrent.{Future, ExecutionContext}
import ExecutionContext.Implicits.global

import willscala.given


case class FileLoader(f:String) extends VHtmlComponent {

  private def loadText():Future[String] =
    import scalajs.js.Thenable.Implicits._ 
    for 
      response <- org.scalajs.dom.experimental.Fetch.fetch(f)
      text <- response.text
    yield text

  def render = <.div(
    f,
    FutureComp[String](loadText()) { text => println(text); <.pre(text) }
  )

}

case class Example(pwd:String, path:String, sources:Seq[String]) extends VHtmlComponent {

  def filePath(fileName:String) = (if pwd.isEmpty || pwd.endsWith("/") then pwd + fileName else pwd + "/" + fileName)

  case class FileViewer(pwd:String, sources:Seq[String]) extends VHtmlComponent {
    var selected = 0

    def select(i:Int):Unit = 
      selected = i
      rerender()

    def render = <.div(^.cls := "sources",
      <.div(^.cls := "fileList", 
        for (f, i) <- sources.zipWithIndex yield <.button(^.on("click") --> select(i), f)
      ),
      <.div(^.cls := "viewer",
        if sources.indices.contains(selected) then FileLoader(filePath(sources(selected))) else <.div()
      )
    )

  }

  def render = <.div(^.cls := Example.styling.className, 
      <.div(^.cls := "embed",
        <.iframe(^.src := filePath(path))
      ),
      FileViewer(pwd, sources)
  )

}

object Example {
  val styling = Styling(
    """
      |""".stripMargin
  ).modifiedBy(
    " .embed" -> "border: 1px solid #aaa;",
    " iframe" -> "border: none; width: 100%; height: 60vh;",
    " .sources" -> "display: grid; grid-template-columns: 150px auto;",
    " .fileList button" -> "width: 100%; border: none; background: none",
    " .viewer" -> "width: 100%; max-height: 90vh; margin-left: 15px; overflow: auto;",
  ).register()
}