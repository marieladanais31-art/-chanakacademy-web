from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "dossiers"
OUT.mkdir(parents=True, exist_ok=True)

NAVY = colors.HexColor("#0C2D48")
TEAL = colors.HexColor("#1B9FAA")
GOLD = colors.HexColor("#E8A020")
PALE = colors.HexColor("#F3F7F2")
MUTED = colors.HexColor("#526577")

markets = {
    "es": {"country": "España", "contact": "Elias Vidal", "off": "Plan de colegiatura personalizado", "dual": "110 € a 167 €/mes según ruta · matrícula 210 € · diagnóstico de inglés 35 €", "local": "Dual Diploma es la ruta más elegida en España. Compatible con Bachillerato y Formación Profesional (FP)."},
    "mx": {"country": "México", "contact": "Karen Vidal", "off": "Plan de colegiatura personalizado", "dual": "$3,400 a $6,500 MXN/mes según ruta · matrícula $4,300 MXN · evaluación $850 MXN", "local": "Acompañamiento local y rutas adaptadas a Secundaria y Preparatoria."},
    "pa": {"country": "Panamá", "contact": "Mariela Andrade", "off": "US$70/mes · matrícula US$180", "dual": "Desde US$1,400/año según grado de entrada · matrícula US$250 · evaluación US$50", "local": "Plan académico estadounidense con atención a familias y centros de Panamá."},
    "co": {"country": "Colombia", "contact": "Equipo Chanak", "off": "$225.000 COP/mes · matrícula $575.000 COP", "dual": "Plan de colegiatura personalizado", "local": "Ruta internacional con expediente, seguimiento y orientación individual."},
    "us": {"country": "Estados Unidos", "contact": "Karen Pujols", "off": "K-5 $275/mes · 6-8 $320/mes · 9-12 $365/mes · matrícula $295", "dual": "Adult High School Completion desde $2,500 · vía acelerada de un año según diagnóstico", "local": "Florida private school · FLDOE #134620. State scholarship eligibility depends on each family's program and approval."},
}

programs = {
    "off-campus": {
        "title": "Off-Campus K-12",
        "promise": "Escuela estadounidense a distancia con estructura, flexibilidad y acompañamiento.",
        "features": ["Plan Educativo Individualizado (PEI)", "SIS, portal de familias y LMS", "Mentoría y seguimiento académico", "Expediente y transcripts oficiales", "Mastery Learning y ritmo flexible"],
    },
    "dual-diploma": {
        "title": "Dual Diploma",
        "promise": "Diploma de High School estadounidense en paralelo a los estudios locales.",
        "features": ["Revisión de expediente y Plan de Ruta", "Hasta 75% de créditos reconocibles, sujeto a evaluación", "3–5 horas semanales según ruta", "Mentoría, SIS y LMS", "Transcript oficial y orientación académica"],
    },
}

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=28, leading=32, textColor=colors.white, alignment=TA_CENTER, spaceAfter=12))
styles.add(ParagraphStyle(name="CoverSub", parent=styles["BodyText"], fontSize=13, leading=19, textColor=colors.white, alignment=TA_CENTER))
styles.add(ParagraphStyle(name="H1x", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=21, leading=25, textColor=NAVY, spaceAfter=12))
styles.add(ParagraphStyle(name="H2x", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13, leading=17, textColor=TEAL, spaceBefore=10, spaceAfter=6))
styles.add(ParagraphStyle(name="Bodyx", parent=styles["BodyText"], fontSize=10.5, leading=16, textColor=MUTED, spaceAfter=7))
styles.add(ParagraphStyle(name="Smallx", parent=styles["BodyText"], fontSize=8.5, leading=12, textColor=MUTED))

def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, A4[0], 12*mm, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(18*mm, 5*mm, "Chanak International Academy · chanakacademy.org")
    canvas.drawRightString(A4[0]-18*mm, 5*mm, f"Página {doc.page}")
    canvas.restoreState()

def make(program_key, code, market):
    p = programs[program_key]
    filename = OUT / f"dossier-{program_key}-{code}.pdf"
    doc = SimpleDocTemplate(str(filename), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=18*mm, bottomMargin=20*mm)
    story = []
    cover = Table([[Paragraph("CHANAK INTERNATIONAL ACADEMY", styles["CoverSub"])], [Paragraph(p["title"], styles["CoverTitle"])], [Paragraph(f"Dossier informativo · {market['country']} · Ciclo 2026–2027", styles["CoverSub"])], [Spacer(1, 8*mm)], [Paragraph(p["promise"], styles["CoverSub"])]], colWidths=[174*mm], rowHeights=[18*mm, 38*mm, 18*mm, 12*mm, 42*mm])
    cover.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,-1), NAVY), ("BOX", (0,0), (-1,-1), 0, NAVY), ("VALIGN", (0,0), (-1,-1), "MIDDLE"), ("LEFTPADDING", (0,0), (-1,-1), 14*mm), ("RIGHTPADDING", (0,0), (-1,-1), 14*mm)]))
    story += [cover, Spacer(1, 10*mm), Paragraph("Escuela privada registrada en Florida · FLDOE #134620", styles["H2x"]), Paragraph("Candidato oficial a acreditación de Middle States Association (MSA-CESS). La candidatura no equivale todavía a acreditación concedida.", styles["Bodyx"]), Paragraph(market["local"], styles["Bodyx"]), PageBreak()]
    story += [Paragraph(f"{p['title']} en {market['country']}", styles["H1x"]), Paragraph(p["promise"], styles["Bodyx"]), Paragraph("Qué incluye", styles["H2x"])]
    for item in p["features"]:
        story.append(Paragraph(f"• {item}", styles["Bodyx"]))
    price = market["off"] if program_key == "off-campus" else market["dual"]
    story += [Spacer(1, 3*mm), Table([[Paragraph("INVERSIÓN", styles["H2x"])], [Paragraph(price, styles["H1x"])]], colWidths=[174*mm], style=TableStyle([("BACKGROUND", (0,0), (-1,-1), PALE), ("BOX", (0,0), (-1,-1), 1, TEAL), ("LEFTPADDING", (0,0), (-1,-1), 8*mm), ("RIGHTPADDING", (0,0), (-1,-1), 8*mm), ("TOPPADDING", (0,0), (-1,-1), 5*mm), ("BOTTOMPADDING", (0,0), (-1,-1), 5*mm)])), Spacer(1, 6*mm)]
    if code == "es" and program_key == "dual-diploma":
        story += [Paragraph("Bachillerato y Formación Profesional", styles["H2x"]), Paragraph("El estudiante puede cursar la ruta americana mientras continúa Bachillerato o un ciclo de FP de Grado Medio. Los módulos técnicos y prácticos pueden evaluarse para una posible transferencia como electivas y, cuando corresponda, áreas técnicas o prácticas. La equivalencia final no es automática: se define tras revisar el expediente, los contenidos, la carga horaria y el calendario.", styles["Bodyx"])]
    if code == "us" and program_key == "dual-diploma":
        story += [Paragraph("Programa para adultos en Florida", styles["H2x"]), Paragraph("Un solo programa desde $2,500, diseñado como vía acelerada de un año. La duración, las asignaturas requeridas y el precio final dependen de la evaluación diagnóstica y de los créditos previos.", styles["Bodyx"])]
    story += [Paragraph("Siguiente paso", styles["H2x"]), Paragraph("Solicita una revisión inicial. Nuestro equipo confirma la ruta, documentación e inversión por escrito antes de formalizar.", styles["Bodyx"]), Spacer(1, 4*mm), Paragraph(f"Contacto en {market['country']}: {market['contact']}", styles["Bodyx"]), Paragraph("offcampus@chanakacademy.org · dualdiploma@chanakacademy.org", styles["Bodyx"]), Paragraph("Nota: los requisitos legales, becas, ayudas, homologaciones o convalidaciones dependen de la jurisdicción y del caso individual. Este dossier es informativo y no constituye garantía de elegibilidad.", styles["Smallx"])]
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)

for code, market in markets.items():
    for program in programs:
        make(program, code, market)

print("Generated", len(markets) * len(programs), "country dossiers")
