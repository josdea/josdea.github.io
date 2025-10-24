# Copilot Instructions

This file documents the setup, structure, and conventions of this Hugo-based personal site project.  
The intent is to help GitHub Copilot (and other tools or collaborators) understand how the project is organized and how content and configuration should work.

---

## 🧭 Project Overview

This site is built with **Hugo** using the **Anatole** theme.  
It is deployed from the `hugo` branch of the repository **josdea.github.io** and published to GitHub Pages under the custom domain **thejoshdean.com**.

The site serves two main purposes:
1. **Posts** — Occasional reflections, notes, and articles.
2. **Portfolio** — Technology projects, each with images and a short write-up.

---

## 📁 Project Structure

```text
.
├── archetypes/
│   └── default.md         # Template for new content files
├── assets/
│   └── css/custom.css     # Custom styles
├── content/
│   ├── about.md           # About page
│   ├── contact.md         # Contact page
│   ├── posts/             # Blog-style content
│   └── portfolio/         # Portfolio pieces
├── layouts/
│   └── _default/single.html  # Local override for featured image support
├── static/
│   └── images/            # All site images (referenced as /images/...)
├── themes/
│   └── anatole/           # Installed Hugo theme
└── config.toml            # Site configuration
🧱 Content Conventions
Posts
Created using hugo new posts/post-title.md

Use standard blog-style structure.

May include categories and tags.

# Copilot / Contributor Instructions

This file documents setup, structure, and conventions for this Hugo-based personal site. It helps collaborators and automation understand where content lives, how to add pages, and how to make small overrides safely.

---

## Project overview

- Hugo site using the Anatole theme.
- Source lives on the `hugo` branch; site publishes to GitHub Pages at `thejoshdean.com`.

## Repo layout (important locations)

```text
.
├── archetypes/                # content templates
├── assets/                    # build assets (scss/js)
├── content/                   # site content (posts, portfolio, pages)
│   ├── posts/
│   └── portfolio/
├── layouts/                   # site-level template overrides
│   ├── _default/single.html    # featured image support
│   └── partials/list-loop.html # shared list loop used by posts/portfolio
├── static/                    # copied to public/ (images, favicon, etc.)
│   └── images/
├── themes/                    # installed theme (anatole)
└── hugo.toml                  # site configuration (this repo uses hugo.toml)
```

## Content conventions

### Posts

Create a new post with:

```bash
hugo new posts/post-title.md
```

Use TOML front matter (the project convention is `+++` blocks). Include `date`, `draft`, `categories`, and `tags`.

Example:

```toml
++ 
title = "Post Title"
date = 2025-01-15T12:00:00-04:00
draft = false
categories = ["Thoughts"]
tags = ["python", "learning"]
++
```

### Portfolio items

Keep portfolio content in `content/portfolio/`. Treat these like posts, but set `categories = ["Portfolio"]` and include an `image` if you want a featured image shown on the single page.

Example:

```toml
++ 
title = "Accessible Math Content"
date = 2018-07-01T14:24:38-04:00
draft = false
categories = ["Portfolio"]
tags = ["math", "mathml", "latex"]
image = "/images/accessible-math-content.png"
++
```

Images should live in `static/images/` and be referenced in content as `/images/<name>`.

## Featured images

Anatole doesn't automatically render `.Params.image` on single pages here, so we added a small site override in `layouts/_default/single.html`. It outputs the image when `.Params.image` is present:

```go-html-template
{{`{{ with .Params.image }}`}}
  <figure class="post-image">
    <img src="{{ . }}" alt="{{ $.Title }}">
  </figure>
{{`{{ end }}`}}
```

## Lists and overrides

This repository prefers minimal site-level overrides rather than modifying the theme directly. Key files:

- `layouts/partials/list-loop.html` — shared paginator + item loop; centralizes list markup for homepage, posts, and portfolio.
- `layouts/posts/list.html` and `layouts/portfolio/list.html` — small wrappers that call the shared partial and render section content.

If you need to change how lists render across the site, edit `layouts/partials/list-loop.html` so the change applies everywhere.

## Live development

Run locally:

```powershell
hugo server -D
```

If you change folder structure or `hugo.toml`, restart the server. To clean old builds:

```powershell
hugo --cleanDestinationDir
```

## Deployment

Deployment is handled by the peaceiris/actions-hugo GitHub Action which builds `public/` and publishes to GitHub Pages.

## Contributor guidelines

- Prefer Hugo shortcodes and Markdown for content. Avoid large raw HTML blocks unless necessary.
- Store images in `static/images/` and reference them with `/images/<file>` in content.
- Use `categories = ["Portfolio"]` for portfolio items.
- Do not commit `public/` or `resources/_gen/` to the repository.
- Avoid editing files inside `themes/`; use `layouts/` overrides instead.
- Configuration for this project is in `hugo.toml`.

If you need help with list rendering, thumbnails, or moving content from an old Jekyll site, check the `layouts/partials/list-loop.html` partial and the `content/portfolio/` folder for examples.
