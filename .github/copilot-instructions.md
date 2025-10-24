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

Example front matter:

toml
Copy code
+++
title = "Post Title"
date = 2025-01-15T12:00:00-04:00
draft = false
categories = ["Thoughts"]
tags = ["python", "learning"]
+++
Portfolio Items
Created using hugo new portfolio/project-name.md

Treated like posts but focused on projects or builds.

Usually have an image and tags for technology used.

Example front matter:

toml
Copy code
+++
title = "Accessible Math Content"
date = 2018-07-01T14:24:38-04:00
draft = false
categories = ["Portfolio"]
tags = ["math", "mathml", "latex"]
image = "/images/accessible-math-content.png"
+++
Images should live in static/images/.

🖼️ Featured Images
Anatole does not natively render .Params.image, so we added a custom override:

Local layout: layouts/_default/single.html

Code snippet:

html
Copy code
{{ with .Params.image }}
  <figure class="post-image">
    <img src="{{ . }}" alt="{{ $.Title }}">
  </figure>
{{ end }}
This snippet ensures that posts and portfolio items display a featured image if one is defined.

🧩 Live Development Notes
Run locally with:

bash
Copy code
hugo server -D
Notes:

Most content or layout changes auto-refresh.

If you add new folders, change config.toml, or switch themes, restart the server.

To clean old builds:

bash
Copy code
hugo --cleanDestinationDir
🚀 Deployment
The site is deployed to GitHub Pages using the peaceiris/actions-hugo GitHub Action.

Hugo builds the site into the public/ directory.

The Action pushes that output to the gh-pages branch.

The main source branch is hugo.

🧠 Guidelines for Copilot and Contributors
Prefer Hugo shortcodes and Markdown for content, not HTML blocks.

Use relative image paths under /images/.

Use categories = ["Portfolio"] to distinguish project pages.

Don’t commit the public/ or resources/_gen/ directories.

When adding new features, override layouts in layouts/ rather than editing the theme directly.

Keep configuration in config.toml organized and commented for clarity.