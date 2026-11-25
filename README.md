# layeredlabs.ai

The Layered Labs website: a one-page Next.js site.

```bash
npm install
npm run dev   # http://localhost:3000
```

## Where things live

- `app/page.tsx`: the home page, composed from the sections in `components/landing/`.
- `app/work/[slug]/page.tsx`: every write-up page, rendered by `components/writeup/writeup-page.tsx`.
- `app/globals.css`: the only stylesheet. Brand rules are in the comment at the top.
- `content/work/`: one folder per work item. `content/work/index.ts` sets the order on the site.
- `lib/content/formats.ts`: the three write-up formats and their sections.
- `components/landing/logos.tsx`: model logos for the strip and cards (LobeHub Icons).
- `components/landing/mark.tsx`: the three-bar mark, also used as the work-type glyph.

## Work items and write-ups

Each item is a folder in `content/work/<slug>/`:

```
index.ts               type, claim, summary, external link
writeup.ts             format, dates, links; ties the parts below together
sections/<key>.mdx     the text of each section (Markdown, <ModelPill>, <Table>)
data/tables.ts         table data (TableData, with a caption shown after an automatic "Table N."); every table renders through <Table>
animations/<key>.tsx   a Remotion animation for each section
animations/index.tsx   registers the animations
```

The format follows what the work is:

| Format | For | Sections |
|---|---|---|
| `paper` | findings (Applied) | Abstract, Introduction, Methods, Results, Discussion, Limitations, Availability |
| `software` | tools, and products for now | Summary, Statement of need, Design, Usage, Validation, Limitations, Availability |
| `datasheet` | datasets | Summary, Motivation, Composition, Collection, Cleaning and labels, Uses, Distribution, Maintenance |
| `app` | applications people can open | Summary, How it works, Privacy, Limitations (no animations) |

Every section needs an `.mdx` file, and every animated section needs an animation: a missing one fails the typecheck. A section is animated unless `formats.ts` marks it `animated: false` (the abstract is).

### Add an item

1. Create `content/work/<slug>/index.ts` with `defineItem({ slug, type, claim, summary, href })`.
2. Add it to the list in `content/work/index.ts`.

### Applications

An item people can open and use gets an `app` field in its `index.ts` (`AppInfo` in `lib/content/types.ts`): name, square icon under `public/`, the app's URL, and its brand colours. The list then shows the app's icon with an Open link beside Read, and the write-up uses the `app` format and wears the app's colours (accent for links and the Open button, soft for highlights, ink for text) instead of the site's. See `content/work/wellspring/`.

### Start its write-up

```bash
npm run new-writeup -- <slug>            # format from the item's type
npm run new-writeup -- <slug> software   # or name one
```

This creates every section file with a note on what belongs there, a branded starter animation per animated section, and adds the write-up to the item. It starts as a draft: visible at `/work/<slug>` in `npm run dev`, hidden in production, where the item keeps linking to its `href`. Remove `draft: true` in `writeup.ts` to publish.

### Animations

Each animation is a Remotion composition (a React component that reads `useCurrentFrame()`), played live in the page with `@remotion/player`, so it stays sharp at any size. It loops while on screen (holding the last frame for `hold` seconds, 2 by default, before restarting) and pauses when scrolled away. With Reduce Motion on, only the last frame shows. Set `seconds`, and optionally `width`, `caption` (shown under the box after an automatic "Figure N."; keep explanatory text out of the animation itself), `wide` (span 960px instead of the 700px text column, for bars, races and flows) and `description`, in `animations/index.tsx`. Build on `<Stage>`: it is laid out at the figure box's real width and the box takes its height, so text stays true size on any screen and there is no size to set (only a fixed-size SVG sets `width` and `height`, and scales) so text in an animation matches the text around it, and use the write-up's look: Satoshi, ink on white, grey tracks, model colours, lime for one number. Animations run at 60fps; write their timing in seconds with `useTime()` and `tween()` from `components/writeup/anim/kit.tsx`. The ortho write-up's introduction, methods and results animations are ports of the figures on fast-and-slow-ortho.vercel.app. Model logos and colours come from `lib/content/models.ts`. Remotion is free for individuals and teams of up to 3 people. Past 3 people, a site using the Player needs a Remotion Company License ("Remotion for Automators"); see remotion.dev/docs/license.
