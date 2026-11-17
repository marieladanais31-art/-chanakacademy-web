# -*- coding: utf-8 -*-
"""International Education and Regulatory Notice (solo inglés). Revisión legal PENDIENTE: el comentario HTML lo recuerda."""

TITLE = 'International Education and Regulatory Notice'
PARAS = [
    'Chanak International Academy is a U.S.-based private K–12 school registered with the Florida Department of Education (FLDOE School Code #134620), operated by Chanak TrainUp Education, Inc., a U.S. 501(c)(3) nonprofit organization.',
    'Chanak International Academy is accredited by the Middle States Association Commissions on Elementary and Secondary Schools (MSA-CESS).',
    'Chanak provides educational programs, academic guidance, individualized learning plans, student assessments, academic records, and diploma pathways according to each student’s enrollment status and applicable institutional policies.',
    'Families residing outside the United States remain responsible for complying with compulsory education, homeschooling, registration, and other educational requirements in their country of residence.',
    'Enrollment in Chanak does not automatically guarantee recognition, validation, or equivalency of academic credentials in another country.',
    'Microschool partnerships are established directly with Chanak through written agreements. Local partners are responsible for obtaining applicable authorizations and complying with local laws.',
    'State scholarship and ESA funds remain subject to student eligibility, authorized expenses, and applicable program rules.',
]


def section(soft=True, extra_attr=''):
    ps = ''.join(f'<p>{p}</p>' for p in PARAS)
    return (f'<!-- cx:aviso --><div class="cx"{extra_attr}><section class="cx-sec{" cx-soft" if soft else ""} cx-notice" id="regulatory-notice"><div class="cx-wrap" style="max-width:860px">'
            f'<!-- PENDIENTE_REVISION_LEGAL: texto del aviso normativo internacional pendiente de revisión legal -->'
            f'<h2 style="font-size:1.5rem">{TITLE}</h2>{ps}</div></section></div><!-- /cx:aviso -->')
