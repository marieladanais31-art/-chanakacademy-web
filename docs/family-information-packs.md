# Family information flow — 2026–2027

1. An information inquiry remains separate from a SIS admission application.
2. The backend selects the initial two-page PDF by program and language.
3. The reply includes the initial download link, a country fee sheet where verified (Spain, Mexico, Panama), and an English program dossier where available.
4. State-program information forms show the download link after a successful response. Their SIS enrollment forms and URLs are preserved.
5. Off-Campus, Florida, Alabama, assessment and Life Skills inquiries go to offcampus@chanakacademy.org. Dual Diploma inquiries go to dualdiploma@chanakacademy.org. General inquiries retain both recipients.

## Price maintenance

Run `python tools/generate_initial_dossiers.py` from the repository root with Node, ReportLab and DejaVu fonts installed. The generator reads `js/regional-pricing.js` directly, refreshes the derived fee catalog, and generates Spanish/English initial packs, current English program dossiers and Spain/Mexico/Panama fee sheets. It does not modify site prices. Unknown or unpublished prices require a written quote. Florida's separate USD 295 assessment/setup requires service-specific funding verification; it is not school enrollment.

Use the catalog to select the initial pack. Existing country dossiers for other markets have not been replaced in this update. Never assume mail-provider acceptance proves inbox delivery: check both the internal notification and the family reply in a controlled live inquiry before declaring delivery verified.
