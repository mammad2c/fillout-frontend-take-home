# Entities layer (`entities/`)

> **Definition** – A slice that answers **“What is it?”** in the business domain  
> (user, product, page-step, order, …).  
> It is the single source of truth for that noun—types, state, API, read-only UI.

---

## 1. Responsibilities

| ✅ Must contain                                                                                                                                                                                                                                                | 🚫 Must _not_ contain                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| • Domain **types & interfaces** (`types.ts`) <br>• **Store / atom / cache** for global state (e.g. `useUserStore`) <br>• **API adapters** that CRUD this entity (`userApi.ts`) <br>• **Pure UI** that _shows_ the entity (`UserAvatar.tsx`, `ProductCard.tsx`) | • Multi-step scenarios or mutations used on several pages (those live in **features/**) <br>• Composition of multiple entities (that’s a **widget** or **page**) <br>• Routing or layout concerns |

---

## 2. Import rules

_Entities may only look **down** to shared._  
The linter (`@feature-sliced/eslint-plugin`) will scream otherwise.

---

## 3. Recommended folder layout

<details>
<summary>Typical medium slice</summary>

</details>

### Optional segments (add when the slice grows)

| Segment       | Purpose                              |
| ------------- | ------------------------------------ |
| **`ui/`**     | Small read-only components           |
| **`model/`**  | Stores & hooks                       |
| **`api/`**    | REST / GraphQL calls                 |
| **`lib/`**    | Pure helpers specific to this entity |
| **`config/`** | Configuration                        |

---

## 4. Naming conventions

- **Singular business term**: `user`, `product` – never plural or “helpers”.
- Folder names are lowercase-kebab; files use PascalCase for components, camelCase for hooks.

---

## 5. Promotion rules

| Situation                                                    | Action                                        |
| ------------------------------------------------------------ | --------------------------------------------- |
| A mutation/UI is needed on **one page only**                 | Keep it inside that page slice (`pages/...`). |
| The same scenario is needed on **two pages**                 | Extract to `features/<scenario>/`.            |
| You need to **compose ≥2 features** with layout and reuse it | Create a `widgets/<section>/` slice.          |

---

## 6. Quick checklist

- ☐ Slice name is a **business noun**, singular.
- ☐ No upward or sideways imports.
- ☐ UI here is **read-only** (no multi-step flows).
- ☐ API calls are colocated.
- ☐ Exports barrelled via `index.ts` for concise imports.

Stick to these rules and the dependency pyramid stays rock-solid 🌟
