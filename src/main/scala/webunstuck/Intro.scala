package willscala

import com.wbillingsley.veautiful.html.{<, ^}
import willscala.templates.{FrontPage}

val frontPage = new FrontPage(
  <.div(
    <.h1("The Web, Unstuck")
  ),
  <.div(^.cls := "lead",
    Common.marked(
      """
        | Periodically, I need to teach things about web-programming - mostly client-side SPA stuff.
        |
        | This site is an evolving collection of materials I have written for doing this.
        |""".stripMargin
    ),
  ),
  Seq(
  )
)
