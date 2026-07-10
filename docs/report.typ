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

= Core React Concepts Implemented

== State and Side Effects

`useState` is used for two kinds of state: data that needs to be saved
between visits, and temporary UI state that doesn't.

For saved data, `RecipeContext` loads recipes from `localStorage` the
moment the app starts, so the user's saved recipes appear immediately
instead of flashing default data first. A `useEffect` then watches the
recipe list and automatically re-saves it to `localStorage` whenever a
recipe is added or favorited, so we don't have to manually save data
in multiple places.

For temporary state, `useState` tracks what the user types into the
`AddRecipe` form, and also controls whether the favorite button's
animation is currently playing. This animation state is kept separate
from whether a recipe is actually favorited; otherwise, the heart
animation would incorrectly play every time an already favorited recipe
loads on page refresh, since it would just be applying the same styling
as a real click.

== DOM Access

To enhance the home page experience, we implemented a recipe carousel. This
required two React hooks to handle performance and direct DOM reads:

- `useMemo`: Used to stabilize the random selection of featured recipes. By
  memoizing the randomized array, we prevent the recipes from re-shuffling on
  every local state change (such as the carousel's progress bar updating). The
  selection remains locked while users are actively interacting with the
  page.

- `useRef`: Attached directly to the carousel's scrollable container. This allows
  us to read native DOM properties (scrollLeft, scrollWidth, and clientWidth)
  to calculate the exact horizontal scroll percentage and map it to a visual
  progress bar.

= Technical Challenges and Solutions

While we did not encounter many critical challenges, a few design decisions
were shaped directly by constraints in our choosen tools.

== Image Storage via `localStorage`

Since our persistence layer is `localStorage`, which only stores string data
with limited storage (typically 5-10MB per browser), we could not accept
direct image file uploads for the `AddRecipe` form. Storing uploaded images
would require base64-encoding them, which inflates file size by roughly a
third and risks exceeding the limit after only a few recipes are added. To
work around this, recipes are added using an image URL field instead, so
`localStorage` only ever persists lightweight strings regardless of how many
recipes a user saves.
