# Widgets layer (`widgets/`)

_A reusable **UI section** that stitches **≥ 2 features** (and entities) together._

Examples: `article-comments`, `cart-sidebar`, `dashboard-header`, `page-step-bar`.

| Guideline                                                                                  | Rationale |
| ------------------------------------------------------------------------------------------ | --------- |
| **Create a widget** when at least two features + some layout repeat at least in two pages. |
| **Can import:** `features`, `entities`, `shared`.                                          |
| **Cannot import:** other `widgets`, `pages`, `app`.                                        |
| **Naming:** business area (`cart-sidebar`), or what it visually is (`page-bar`).           |
| **Segments:** same rule – start flat, add `ui/`, `model/`, `lib/` once it grows.           |

What belongs in a widget?

1. Layout markup (grid, flex, card frame, etc.)
2. Composition of features (`<AddToCartButton/>`, `<CartList/>`)
3. Local presentation helpers (formatters, hooks)
4. Zero routing – leave that to pages
