#let template(
  title: "",
  date: "",
  project-name: none,
  project-url: none,
  live-url: none,
  authors: (),
  body,
) = {
  set document(title: title, author: authors.map(a => a.name))

  set page(
    paper: "a4",
    margin: 1in,
    header: align(right, emph(title)),
    numbering: "1",
  )

  set text(font: "Libertinus Serif", size: 12pt)
  set par(justify: true)
  set heading(numbering: "1.1.")

  show heading.where(level: 1): set text(size: 14pt)
  show heading.where(level: 2): set text(size: 12pt)

  show heading.where(level: 1): set block(above: 1em, below: 0.75em)
  show heading.where(level: 2): set block(above: 1em, below: 0.75em)

  show link: underline

  align(center)[
    #text(size: 18pt, weight: "bold", title) \
    #text(size: 12pt, emph(date))

    #v(1em)
    *Team Members:* #authors.map(author => author.name).join(" & ") \
    *Project Repository:* #link("https://" + project-url)[#project-name] \
    *Live Deployment:* #link("https://" + live-url)
  ]

  v(2em)

  body
}

#show: template.with(
  title: "Interactive Recipe Book Project: Technical Report",
  project-name: "Recipe Book",
  project-url: "github.com/Meatra0704/",
  live-url: "github",
  authors: (
    (
      name: "Sakphea Seng",
    ),
    (
      name: "Someatra Pum",
    ),
  ),
)
