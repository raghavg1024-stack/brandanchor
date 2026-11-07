# BrandAnchor · Inkloom AI submission brief

**Project:** BrandAnchor  
**Live site:** https://brandanchor-gules.vercel.app/  
**Guided demo:** https://brandanchor-gules.vercel.app/desk.html  
**Source bundle:** BrandAnchor.zip

## What we built

Marketing teams need a way to catch claims that drift beyond their evidence between writing and launch. BrandAnchor gives creators and reviewers a workspace for checking campaign captions and banners against approved wording, recording what changed, and seeing which evidence a launch depends on.

- **Claim Scope Check** flags unsupported wording, including a missing qualifier, expanded audience, or contradicted numeric claim. The sample claim drops the Pro-plan scope, pilot context, and “up to” qualifier.
- **Cross-Modal Claim Reconciliation** reads text from a real banner image with browser OCR. It marks detected text and compares the transcription with the caption and approved claims. Reviewers can verify a manual transcription if OCR is uncertain.
- **Evidence-Pinned Approval** records the reviewed draft, reviewer, planned launch, and cited evidence versions. A date beyond the evidence expiry blocks simulated launch readiness.

## 90-second walkthrough

1. Open the landing page, select **Explore the proof desk**, and open the campaign demo. Choose **Reset demo** for a clean run.
2. Choose **Review sample draft**. Show the C-014 finding and the difference between “every team” and the approved pilot claim.
3. Select **Use approved wording**, then **Submit for review**. Switch to the demo reviewer and approve the reviewed version. Show the receipt and **Ready**.
4. Select **Test expired evidence**. The guided demo moves launch one day past the evidence validity date. Show **Re-review required** and the C-014 explanation.
5. If time permits, download the sample banner, upload it, and select **Read image text**. Point out the detected text boxes and the manual verification path.

## Architecture and tools

| Component | Implementation |
| --- | --- |
| Hosting | Vercel serves the landing page and proof desk as static assets. |
| Review engine | JavaScript compares caption and banner text with seeded evidence and checks terminology, alt text presence, and declared visual rules. |
| OCR | Tesseract.js 6.0.1 runs English OCR in the browser. The OCR runtime and language data are downloaded as needed. Uploaded image bytes stay in the browser. |
| Draft and approval records | Browser local storage holds the demo draft, revisions, receipts, and activity. Image fingerprints use SHA-256. |
| Optional model | The hosted demo sends the first sentence of the chosen field and the approved example to a user-configured HTTPS chat completions provider with browser access enabled. The token lives in the current tab. The local Node server can use Ollama or a compatible provider. |
| Landing artwork | The supplied animated reference provides the background video motion. A generated sky layer covers embedded lettering. FFmpeg encoded the supplied frames for web playback. |
| AI-assisted development | Codex assisted with code, tests, and documentation. Image generation was used for the landing sky artwork. |

## Testing evidence

Automated Chrome checks covered the guided sample through approval and expired evidence, the downloadable banner, mobile overflow, caption import, image upload, reviewer transcription verification, and revision history. The landing page checks covered video playback, pause, reduced motion, and navigation to the proof desk. A real English OCR run on a synthetic banner was also verified during development. Human usability sessions and participant feedback should be listed separately if the team has conducted them.

## Scope to disclose

This is a working hackathon MVP. Reviewer and owner roles are simulated. The evidence library is seeded and records are stored locally in the current browser. Launch readiness is a simulated check. Visual checks use declared fonts and colors, with automatic palette sampling and logo matching outside the current demo. Hosted AI requires a compatible provider with browser access enabled. The seeded review can be demonstrated with the built-in evidence rules.

## Complete before submitting

- Enter a judge-accessible source repository URL. The source bundle is available to upload or commit to your repository.
- Add the team’s actual names, roles, and contribution summaries. Include any human testing feedback you collected.
- Record or attach a backup walkthrough if the submission form requires one.
- Confirm that the team has permission to use the supplied reference animation in the submission. If needed, substitute an original motion asset.
