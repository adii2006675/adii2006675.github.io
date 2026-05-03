# Adi Sharma Portfolio

## File Structure
```
portfolio/
├── index.html        ← Home page
├── work.html         ← Projects page
├── contact.html      ← Contact page
├── style.css         ← All shared styles (edit colors/fonts here)
├── script.js         ← Background animation + nav menu
└── assets/
    ├── profile.jpg   ← Your profile photo (replace with your image)
    ├── resume.pdf    ← Your resume (replace with updated version)
    └── img/          ← Add project screenshots here
```

## How to add a new project
1. Open `work.html`
2. Find the comment `<!-- TO ADD A NEW PROJECT: copy this entire .project-card div -->`
3. Copy one of the `.project-card` blocks and paste it in the grid
4. Give it a new `data-project="yourprojectname"` attribute
5. Scroll down to the `PROJECTS` JS object and add a new entry with the same key

## Deploy to GitHub Pages
1. Create repo named `yourusername.github.io`
2. Push all files
3. Go to Settings → Pages → Deploy from main branch
4. Your site will be live at `https://yourusername.github.io`
