# Features layer (`features/`)

_An independent **user scenario** that may appear on multiple pages._

Examples: `comment`, `login`, `add-to-cart`, `page-step-context-menu`.

| Guideline                                                                                                | Rationale |
| -------------------------------------------------------------------------------------------------------- | --------- |
| **Extract only when reused** – keep the code in the page slice until you need it twice.                  |
| **One scenario per slice.** If adding a second unrelated action, start a new feature.                    |
| **Can import:** `entities`, `shared`.                                                                    |
| **Cannot import:** other features, `widgets`, `pages`, `app`.                                            |
| **Naming:** noun or short verb that describes the scenario (`comment`, `upload-avatar`, `toggle-theme`). |
| **Segments:** `ui/`, `model/`, `api/`, `lib/`, `config/` are optional – flatten small slices.            |

Checklist for a good feature slice:

- ☐ UI component(s) that deliver the action
- ☐ Local state or side-effects if needed
- ☐ No direct knowledge of routing or layout
- ☐ Unit tests colocated if the slice is non-trivial
