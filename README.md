# Ritabrata-Geodynamics.github.io
git clone https://github.com/Ritabrata-Geodynamics/Ritabrata-Geodynamics.github.io
cd Ritabrata-Geodynamics.github.io
your-repository/
├── _config.yml          # Site configuration
├── index.md            # Homepage
├── _pages/
│   ├── publications.md
│   ├── research.md
│   ├── teaching.md
│   └── cv.md
├── _posts/             # Blog posts
├── assets/
│   ├── images/
│   └── pdfs/
└── _layouts/
    └── default.html
title: "Your Name"
email: "your.email@university.edu"
description: "Assistant Professor at University"
baseurl: ""
url: "https://username.github.io"
github_username: username
twitter_username: yourhandle

theme: minima  # Or choose another Jekyll theme

# Build settings
markdown: kramdown
plugins:
  - jekyll-feed
