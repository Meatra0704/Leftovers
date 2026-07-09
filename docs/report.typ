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

= Approach and Workflow

To manage development efficiently and prevent merge conflicts, we divided the
project into two distinct areas of responsibility based on architectural
boundaries.

- *Routing and Global State:* One member was responsible for setting up
  `react-router-dom`, defining the global `RecipeContext`, scaffolding the core
  layouts (like the navigation), and abstracting reusable UI elements.
- *Data Integration and Interface:* The other member handled data entry and
  rendering, which involved managing local component state for the `AddRecipe`
  form, passing that data to the global context, and writing the logic to map,
  filter, and render the recipe arrays on the Catalog and Favorites pages.

All features, fixes, and, refactors are done separately in their own respective
branch (e.g., `feat/routing` created from the `main` branch) in order to
eliminate the risk of version control issues. To further reduce conflicts, we
try to minimize editing the same file simultaneously. Code was only merged into
`main` at the end of each development phase to ensure that the codebase was
stable before starting new features.
