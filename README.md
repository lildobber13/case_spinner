# AI Case Spinner

A consulting-style kickoff tool for AI hackathons. Spin a random industry, a fictional client, a problem, constraints, and a twist. Work through six consultant questions, then get a ready-to-paste kickoff prompt and `CLAUDE.md` for Claude Code.

No API keys. No installs. No build step. It is plain HTML, CSS, and JavaScript.

## For students

Open the page your facilitator shared, or download this repo and double-click `index.html`.

1. **Spin** for a case. Lock the reels you like, re-roll the ones you don't.
2. **Interview the client**: ask up to 4 questions (what happens today, what they've tried, tools, sign-off, what a win looks like) and save useful answers to your worksheet.
3. **Work the case**: answer the six questions and say your idea in one sentence.
4. **Build brief**: download `CLAUDE.md`, put it in an empty folder, open Claude Code there, and paste the kickoff prompt.
5. **Race the clock** with the sprint timer. A sealed curveball opens halfway through the 45-minute build.
6. **Pitch**: download the pitch card for your share-out.

Your answers are saved in your browser only. Nothing is sent anywhere.

## Modes

| Mode | Constraints | Twist | AI role |
| --- | --- | --- | --- |
| Warm-up | 1 | none | you choose |
| Consultant | 1 | yes | you choose |
| Chaos | 2 | yes | assigned to you |

## Host it on GitHub Pages (about 2 minutes)

1. Create a new public repo (for example `ai-case-spinner`) and upload everything in this folder.
2. Go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute your site is live at `https://YOUR-USERNAME.github.io/ai-case-spinner/`.
4. For a shorter link on your slide, put that URL into a shortener (bit.ly, tinyurl) or point a custom domain at the repo.

Every case has its own link. The **Copy case link** button gives you a URL that opens the exact same case, which is handy if a facilitator wants every team on one case.

## Customize it

All content lives in `js/data.js`:

- **industries**: each has 3 clients, 5 `cases` (a problem, the user who feels it, and a matching success metric), and 3 industry constraints.
- **js/interview.js**: the client's answers. For each industry: `volume`, `tools`, `signoff`, plus `today` and `tried` lists that line up with that industry's `cases` in order.
- **js/guidance.js**: scenario guidance for each case, used by the AI role Hint button and the idea chips under "Say it in one sentence" (best-fit AI roles, a topic word, goal ideas, outcome ideas).
- **globalConstraints**, **twists**, **curveballs**: used across every industry.
- **aiRoles**: the eight capabilities from the workshop deck.

Copy an industry block, change the text, save, and refresh. The build brief wording is in `js/app.js` (`genKickoff` and `genClaudeMd`).

## About the "AI" in student projects

Because the goal is that solutions open from a single HTML file with no keys, the generated `CLAUDE.md` tells Claude Code to build a **simulated** AI step: one clearly labelled function that uses sample data and rules, written so a real model call can replace it later. If a team wants real AI calls afterward, they can ask Claude Code how to do it safely.

## Files

```
index.html     page structure
css/style.css  look and feel
js/data.js     industries, clients, problems, twists
js/interview.js  the client's interview answers
js/guidance.js   hints and idea chips for each case
js/app.js      spinner, worksheet, brief generator, timer, pitch card
.nojekyll      tells GitHub Pages to serve files as-is
```

All clients, people, and data are fictional.
