# CharterX

CharterX is a premium yacht growth and management website for Collabrative Yatch Managemnet Limited.

The complete application lives in [`website/`](website/). GSAP core and ScrollTrigger are installed through the website package and are the only animation dependencies retained.

## Run locally

```bash
npm --prefix website install
npm run dev
```

Open `http://localhost:3000`. VS Code also includes a `CharterX: Start Website` task that starts automatically when this trusted workspace opens. If VS Code asks whether to allow automatic tasks, choose **Allow and Run**.

The Live Server extension cannot run the application itself because CharterX includes server routes, authentication, and a database. A root launcher is included so **Go Live** redirects to the correct application instead of displaying the repository folder.

For a fresh production preview:

```bash
npm run start
```

See [`website/README.md`](website/README.md) for content, animation, SEO, image, and integration guidance.
