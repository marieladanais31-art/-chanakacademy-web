# Family information and enrollment flow — 2026–2027

- Each family receives exactly one dossier selected by program, country or state program, and language.
- The dossier contains the program overview, applicable published fees or an explicit written-quote requirement, and next steps. It does not link to other countries' fee pages.
- Website enquiries go to one department: Dual Diploma to dualdiploma@chanakacademy.org; Off-Campus, assessment, Life Skills, Florida EMA, Alabama CHOOSE and general guidance to offcampus@chanakacademy.org.
- State-program selection overrides a generic program name. A country alone never implies Dual Diploma.
- The homepage uses the server's dossier response; it does not maintain a second dossier list or repeat universal euro/USD prices.
- Enrollment emails use the selected dossier and no hardcoded international price references.
- Known enrollment buttons preserve program, country, currency, grade band and funding context. A generic enrollment button opens the country/program chooser first.
- Run `python tools/generate_family_dossiers.py` to regenerate the 44 active contextual PDFs and routing catalog directly from the unchanged website pricing catalog.
- Run `php tests/information_flow.php` to check program/country/language selection and department routing without emails, CRM or SIS writes.
- Server acceptance and mailbox arrival are distinct checks. Test enquiries must be clearly marked as technical tests.
