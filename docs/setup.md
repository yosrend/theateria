# Setup

## Run locally

```bash
git clone https://github.com/yosrend/theateria.git
cd theateria
python3 -m http.server 8080
```

Open http://localhost:8080. If the port is busy, use another one such as 8090.

GSAP, ScrollTrigger, three.js and the fonts load from public CDNs, so the browser needs an internet connection.

## Check before pushing

```bash
node scripts/check.mjs
```

The script checks the syntax of every script and confirms that each local file used by `index.html` exists. It runs on every push through GitHub Actions.

## Deploy to Vercel

1. Push the repo to GitHub
2. In Vercel choose Add New, Project, and import the repo
3. Framework preset: Other. Leave build command and output directory empty
4. Name the project theateria to get theateria.vercel.app

## Update images

Replace files in `img/`. Event images are `ev1.jpg` to `ev4.jpg`, the twelfth gallery tile is `gal12.jpg`, and the other gallery tiles are in `img/t/`.
