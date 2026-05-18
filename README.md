AOSC Portal
===

[简体中文自述文件 >>](/README.zh-cn.md)

The Portal website for AOSC since 2024, built using [Nuxt](https://nuxt.com/).

At a glance
---

The main design goal for this new website is to maximise information density
on a single screen space, utilising both multi-column and conventional
navigation systems. It also seeks to depart from a conventional "FOSS
community" aesthetic by emphasizing vivid and product-oriented presentation
for prospective and current users.

In terms of visual styling, this website intentionally seeks to re-create a
2000s Web 1.0 aesthetic (whilst adopting modern technological frameworks and
layout optimisations). Inspiration for the site layout comes from Microsoft's
Windows home page from 2001 - 2004:

- [Reference 1, Windows XP home from late 2001](https://web.archive.org/web/20011211230629/http://microsoft.com/windowsxp/default.asp)
- [Reference 2, Windows XP mid-cycle home from 2004](https://web.archive.org/web/20040204080626/http://www.microsoft.com/china/windows/default.mspx)

This website is not yet optimised for mobile, legacy (Afterglow-targeted),
and functionally-limited browsers. We are currently evaluating plans to
implement a purpose-specific site to help with these scenarios.

Deployment and testing
---

This website is deployed to our Web server using a GitHub workflow. The paste
backend is deployed to paste.aosc.io using [paste-server-rs](https://github.com/AOSC-Dev/website-utils/tree/master/paste-server-rs).

To test the website locally, you would need a Node.js + NPM toolchain. To
install Node.js + NPM on AOSC OS:

```sh
oma install nodejs
```

Install dependencies:
```sh
npm install
```

Then, build and preview the website locally:

```sh
npm run generate
npm run preview
```

If you need to test nginx related configuration or test the complete preview in
an independent environment, please use:
```sh
docker compose down --volumes
docker compose up --build
```

If you need to test clipboard or search features separately with `npm run dev`,
run the related containers individually, for example:
```sh
# Search
docker compose up meilisearch meilisearch-indexer meilisearch-keyupdater
# Paste
docker compose up paste-server-rs paste-server-db
```

Submitting news
---

All news articles are written in Markdown and stored in `/content/{language}/news`, with
extra assets (images, etc.) stored in `/public/...`. All assets should be
referenced from the site (`/...`, not `https://...`).

News articles should contain a header:

```
---
categories:
  - journals
title: "安记冰室・九月上"
date: 2024-09-19T23:00:00+08:00
important: false
home: true
---
```

- `categories` (enum):
    - `advisories`: User advisories (usually AOSC OS-related).
    - `news`: Community news about events, sponsorships, etc.
    - `journals`: Community journals (entitled *Coffee Break*).
    - `minutes`: Contributor meeting records.
- `title` (string): News title.
- `date` (string): Publication date to be presented as-is.
- `important` (boolean): Highlight as important.
- `home` (boolean): Whether to list in the news highlight section at the Portal home.

### Localising news articles

To localize a news article, just add a file with the same name to the
corresponding language folder such as `/content/zh-cn/`, i.e.:

```
/content/zh-cn/news/2024-09-18-aosc-os-relnote.md
```
