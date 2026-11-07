# BrandAnchor

**[Live website](https://brandanchor-gules.vercel.app/)** · **[Guided campaign demo](https://brandanchor-gules.vercel.app/desk.html)** · **[Submission brief](SUBMISSION.md)**

BrandAnchor helps marketing teams review campaign captions and banners against approved evidence before launch. It highlights claims that go beyond what the evidence supports, lets creators review suggested wording, and records the draft and evidence used for approval.

## Try the demo

1. Open the guided demo and select **Review sample draft**. The sample claims a 40% improvement for every team. Evidence C-014 supports a reduction of **up to** 40% for Pro-plan teams in the 2025 pilot.
2. Select **Use approved wording**, then **Submit for review**.
3. Select **Switch to demo reviewer** and approve the reviewed version. The receipt shows the draft and cited evidence.
4. Select **Test expired evidence**. The simulated launch moves past the evidence validity date, and the desk shows **Re-review required** with the reason.
5. To try OCR, reset the demo, download the sample banner, upload it, and select **Read image text**. Reviewers can verify a manual transcription if the scan is uncertain.

## Features

| Feature | What it does |
| --- | --- |
| Claim Scope Check | Compares claims with seeded evidence and flags missing qualifiers, expanded audience, and contradictory numbers. |
| Cross-Modal Claim Reconciliation | Reads text from uploaded PNG, JPEG, and WebP banners, marks detected text, and compares it with the caption and approved claims. |
| Evidence-Pinned Approval | Ties approval to a reviewed draft and evidence versions. Expired or withdrawn evidence can block simulated launch readiness. |
| Review workspace | Supports text imports, campaign details, terminology and declared design checks, alt text checks, comments, disputes, and revision history. |
| Optional model assistant | Previews suggested edits and applies them only when the creator confirms. The guided flow works with the built-in evidence rules. |

## Run locally

Install Node.js 20 or newer. From the repository root run:

```sh
node server.js
```

Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) and select **Try the campaign demo**. The Node server has no npm dependencies. OCR downloads its runtime and English language data on demand.

To connect a model, open **Model assistant → Connect your LLM**. For local Ollama, choose an installed model and leave the endpoint blank to use the loopback default. The Vercel site supports a compatible HTTPS chat completions endpoint that allows browser requests from its origin. Connection testing sends a synthetic sample. Later requests send the first sentence of the selected field and the approved example. Hosted provider tokens stay in the current tab.

## How it works

- [index.html](index.html), [landing.css](landing.css), and [hero-video.js](hero-video.js) provide the landing page and video playback.
- [desk.html](desk.html) and [app.js](app.js) provide the campaign review, role switching, receipt, and launch check.
- [review.js](review.js) holds the seeded evidence and review rules.
- [server.js](server.js) serves the local app and supports the local model connection. Vercel serves the hosted site as static assets.
- Tesseract.js 6.0.1 runs English OCR in the browser. Uploaded image bytes stay in the browser. Demo drafts, revisions, receipts, and activity use browser storage.

## Testing and scope

Chrome checks covered claim review, approval, expiry, caption import, image upload, transcription verification, OCR, revision history, mobile layout, and reduced-motion playback. See the [submission brief](SUBMISSION.md) for the walkthrough and scope.

This is a hackathon MVP with seeded evidence, simulated roles and launch checks, and browser-local records. Visual checks use declared colors and fonts. The landing motion uses the supplied reference animation with generated sky artwork, encoded with FFmpeg. Codex assisted with code, tests, and documentation.
