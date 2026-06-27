# Drop Drop – Project Handoff

## Project Overview

**Project Name:** Drop Drop

**Type:** AI Assisted Portfolio Builder

**Status:** Active Prototype

**Repository:** GitHub

**Deployment:** Vercel

---

# Vision

Drop Drop enables designers to build professional portfolios by simply dragging creative work onto a canvas.

The application automatically creates portfolio cards from uploaded images and will eventually use AI to generate titles, descriptions, tags, categories, and complete case studies.

The long term goal is to eliminate the manual work required to build and maintain a design portfolio.

---

# Current Technology

Frontend

* Next.js
* React
* TypeScript
* HTML
* CSS

Version Control

* Git
* GitHub

Hosting

* Vercel

Storage

* localStorage

Future

* OpenAI
* Supabase
* Cloud Storage

---

# Current Workflow

Development occurs using small, independent features.

Each feature should:

1. Be implemented independently.
2. Preserve existing functionality.
3. Build successfully.
4. Be committed separately.
5. Be deployed through GitHub to Vercel.

---

# Development Process

For every feature:

1. Read ROADMAP.md.
2. Implement only the requested feature.
3. Preserve existing functionality.
4. Test locally.
5. Run:

npm run build

6. Fix all build errors.
7. Commit using the feature number.
8. Push to origin/main.

Deployment is automatic through Vercel.

---

# Design Principles

The application should feel:

* Minimal
* Fast
* Elegant
* Professional
* Modern
* Focused on visual work

Avoid unnecessary UI.

Avoid clutter.

Every interaction should reduce friction.

---

# Architecture Principles

Prefer reusable components.

Keep business logic separated from UI.

Use TypeScript interfaces.

Avoid duplicated code.

Prefer composition over large components.

---

# Current Feature Status

## Foundation

Completed

✓ Core Architecture

✓ Masonry Grid

✓ Card Hover States

✓ Card Actions

✓ Inline Editing

✓ Delete Confirmation

✓ Empty State

---

## Portfolio Management

Planned

Export JSON

Import JSON

Search

Filters

Drag Reordering

---

## AI

Planned

AI Metadata

AI Case Studies

AI Tagging

---

# Coding Standards

Write readable code.

Prefer descriptive names.

Keep components small.

Document complex logic.

Do not introduce unnecessary dependencies.

Preserve backwards compatibility whenever possible.

---

# Testing Requirements

Every completed feature must:

✓ Run locally.

✓ Build successfully.

✓ Preserve responsiveness.

✓ Preserve localStorage.

✓ Not break previous features.

---

# Git Standards

Every feature should have its own commit.

Commit example:

Feature 12: Add drag reordering

Avoid generic commits such as:

fix

updates

changes

final

---

# AI Development Rules

When implementing a feature:

Do not redesign unrelated UI.

Do not refactor unrelated files.

Implement only the requested feature.

Preserve existing behavior.

If uncertain, ask before making architectural changes.

---

# Long Term Vision

Drop Drop should evolve into an AI powered portfolio operating system capable of:

* Organizing creative work
* Generating metadata
* Writing case studies
* Publishing portfolios
* Managing assets
* Exporting portfolio websites
* Supporting multiple designers
* Becoming the fastest way to build and maintain a professional design portfolio.
