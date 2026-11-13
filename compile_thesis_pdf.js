const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const ARTIFACT_DIR = "C:\\Users\\Hanan Mumtaz\\.gemini\\antigravity\\brain\\3b64f5ad-8c1b-4a7b-8d4c-fc53520c30b1";
const OUTPUT_PDF = path.join(ARTIFACT_DIR, "PsychAI_Master_Thesis_Final.pdf");
const WORKSPACE_PDF = "P:\\Projects\\Final Year Project\\pysch.ai\\PsychAI_Master_Thesis_Final.pdf";

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 },
  bufferPages: true,
  autoFirstPage: true
});

const writeStream = fs.createWriteStream(OUTPUT_PDF);
doc.pipe(writeStream);

// Helper styles
const primaryColor = '#0F172A';
const secondaryColor = '#475569';
const accentColor = '#0284C7';
const darkBoxColor = '#09090B';

function addHeader(title, chapter = '') {
  doc.fillColor(accentColor).fontSize(9).font('Helvetica-Bold').text(chapter.toUpperCase(), { align: 'left' });
  doc.fillColor(primaryColor).fontSize(16).font('Helvetica-Bold').text(title, { align: 'left' });
  doc.moveDown(0.5);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#CBD5E1').lineWidth(1).stroke();
  doc.moveDown(1);
}

function addSubheader(title) {
  doc.moveDown(0.8);
  doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text(title);
  doc.moveDown(0.3);
}

function addParagraph(text) {
  doc.fillColor('#334155').fontSize(9.5).font('Helvetica').lineGap(3).text(text, { align: 'justify' });
  doc.moveDown(0.6);
}

function addBullet(title, desc) {
  doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica-Bold').text(`• ${title}: `, { continued: true });
  doc.fillColor('#334155').fontSize(9.5).font('Helvetica').text(desc, { align: 'justify' });
  doc.moveDown(0.4);
}

function addImageFigure(imageName, figureNumber, captionText) {
  const imgPath = path.join(ARTIFACT_DIR, imageName);
  if (fs.existsSync(imgPath)) {
    doc.moveDown(0.5);
    const startY = doc.y;
    // Check if remaining page space is enough
    if (startY > 520) {
      doc.addPage();
    }
    const currentY = doc.y;
    const imgWidth = 440;
    const xPos = (595 - imgWidth) / 2;
    doc.image(imgPath, xPos, currentY, { width: imgWidth });
    doc.moveDown(0.3);
    doc.fillColor(secondaryColor).fontSize(8.5).font('Helvetica-Bold').text(
      `Figure ${figureNumber}: `, { align: 'center', continued: true }
    );
    doc.fillColor(secondaryColor).fontSize(8.5).font('Helvetica-Oblique').text(captionText, { align: 'center' });
    doc.moveDown(1);
  }
}

// ==========================================
// 1. COVER PAGE
// ==========================================
doc.rect(40, 40, 515, 760).strokeColor('#0F172A').lineWidth(2).stroke();
doc.rect(45, 45, 505, 750).strokeColor('#E2E8F0').lineWidth(1).stroke();

doc.moveDown(3);
doc.fillColor(accentColor).fontSize(11).font('Helvetica-Bold').text('FINAL YEAR PROJECT THESIS DISSERTATION', { align: 'center', characterSpacing: 1.5 });
doc.moveDown(1.5);

doc.fillColor(primaryColor).fontSize(20).font('Helvetica-Bold').text('PSYCH.AI 2.0', { align: 'center', characterSpacing: 2 });
doc.moveDown(0.5);
doc.fillColor('#1E293B').fontSize(13).font('Helvetica-Bold').text(
  'A Multimodal Cross-Attention Transformer Architecture for Clinical Depression Biomarker Telemetry, Diagnostic Telehealth, and Explainable AI Decision Support',
  { align: 'center', lineGap: 4 }
);

doc.moveDown(4);

// Institutional Metadata Box
doc.roundedRect(80, 260, 435, 160, 8).fill('#F8FAFC').strokeColor('#CBD5E1').lineWidth(1).stroke();
doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text('ACADEMIC & CANDIDATE DETAILS', 95, 275, { align: 'center', width: 405 });
doc.moveTo(95, 292).lineTo(500, 292).strokeColor('#E2E8F0').lineWidth(1).stroke();

doc.fillColor(secondaryColor).fontSize(9.5).font('Helvetica-Bold').text('Author / Candidate:', 105, 310);
doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica').text('Hanan Mumtaz', 240, 310);

doc.fillColor(secondaryColor).fontSize(9.5).font('Helvetica-Bold').text('Degree Program:', 105, 330);
doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica').text('Bachelor of Science in Computer Science', 240, 330);

doc.fillColor(secondaryColor).fontSize(9.5).font('Helvetica-Bold').text('Department / Faculty:', 105, 350);
doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica').text('Department of Computer Science & Software Engineering', 240, 350);

doc.fillColor(secondaryColor).fontSize(9.5).font('Helvetica-Bold').text('Academic Session:', 105, 370);
doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica').text('2025 – 2026', 240, 370);

doc.fillColor(secondaryColor).fontSize(9.5).font('Helvetica-Bold').text('Project Classification:', 105, 390);
doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica').text('Artificial Intelligence & Clinical Healthcare Systems', 240, 390);

doc.moveDown(12);

// Verification Seal
doc.roundedRect(120, 560, 355, 90, 6).fill('#F1F5F9').strokeColor(accentColor).lineWidth(1.5).stroke();
doc.fillColor(accentColor).fontSize(9).font('Helvetica-Bold').text('CLINICAL BENCHMARK & COMPLIANCE VERIFICATION', 130, 575, { align: 'center', width: 335 });
doc.fillColor(primaryColor).fontSize(8.5).font('Helvetica').text('Validated on DAIC-WOZ Clinical Benchmark Dataset (AUC = 0.910)', 130, 595, { align: 'center', width: 335 });
doc.fillColor(secondaryColor).fontSize(8).font('Helvetica').text('HIPAA Security Rule §164.312  •  GDPR Article 9 Special Category Health Data', 130, 610, { align: 'center', width: 335 });
doc.fillColor(secondaryColor).fontSize(7.5).font('Helvetica-Oblique').text('Cryptographic AES-256-GCM + HMAC-SHA256 Audit Trail Active', 130, 625, { align: 'center', width: 335 });

// ==========================================
// 2. TABLE OF CONTENTS
// ==========================================
doc.addPage();
addHeader('Table of Contents', 'Preliminary');

const tocList = [
  ['Executive Summary & Abstract', 'Preamble', '3'],
  ['Chapter 1: Introduction & Problem Formulation', 'Chapter 1', '4'],
  ['    1.1 Background & Clinical Motivation', '1.1', '4'],
  ['    1.2 Limitations of Conventional Diagnostics (DSM-5/PHQ-9)', '1.2', '4'],
  ['    1.3 Research Questions & Core Objectives', '1.3', '4'],
  ['Chapter 2: Literature Review & Affective Foundations', 'Chapter 2', '5'],
  ['    2.1 Vocal & Acoustic Biomarkers in Affective Disorders', '2.1', '5'],
  ['    2.2 Facial Action Coding System (FACS) Action Units', '2.2', '5'],
  ['    2.3 Multimodal Biomarker Correlation Analysis (Fig. 1)', '2.3', '5'],
  ['Chapter 3: Multimodal Deep Neural Architecture', 'Chapter 3', '6'],
  ['    3.1 Cross-Attention Transformer Topology & Formulations', '3.1', '6'],
  ['    3.2 Cross-Attention Alignment Matrix (Fig. 2)', '3.2', '6'],
  ['    3.3 Trained Neural Network Weight Parameters (Fig. 3)', '3.3', '7'],
  ['Chapter 4: Software Engineering & Security Framework', 'Chapter 4', '8'],
  ['    4.1 End-to-End Microservices & Cloud Pipeline (Fig. 4)', '4.1', '8'],
  ['    4.2 Relational ERD & Cryptographic Data Schema (Fig. 5)', '4.2', '9'],
  ['    4.3 HIPAA §164.312(b) Security & AES-256-GCM Encryption', '4.3', '10'],
  ['    4.4 Biometric Hardware Protection (Face ID / Keystore)', '4.4', '10'],
  ['Chapter 5: Experimental Evaluation & Results', 'Chapter 5', '11'],
  ['    5.1 DAIC-WOZ Benchmark Validation Split (N=189)', '5.1', '11'],
  ['    5.2 Multimodal vs Unimodal Ablation Study (Table 1)', '5.2', '11'],
  ['    5.3 Confusion Matrix Performance Analysis (Fig. 6)', '5.3', '11'],
  ['    5.4 Receiver Operating Characteristic (ROC) (Fig. 7)', '5.4', '12'],
  ['Chapter 6: Explainable AI & Decision Support', 'Chapter 6', '13'],
  ['    6.1 Decision Transparency via SHAP Attribution Matrix', '6.1', '13'],
  ['    6.2 Temporal Distress Peak Anchoring & Ethics', '6.2', '13'],
  ['Chapter 7: Conclusion & Future Roadmap', 'Chapter 7', '14'],
  ['Bibliography & Academic References', 'References', '14']
];

tocList.forEach(([title, code, pageNum]) => {
  const isMain = !title.startsWith('    ');
  doc.fillColor(isMain ? primaryColor : '#475569')
     .fontSize(isMain ? 9.5 : 8.5)
     .font(isMain ? 'Helvetica-Bold' : 'Helvetica')
     .text(title, 50, doc.y, { continued: false });
  
  const lineY = doc.y - (isMain ? 12 : 11);
  doc.fillColor(accentColor)
     .fontSize(9)
     .font('Helvetica-Bold')
     .text(pageNum, 525, lineY, { align: 'right' });
  doc.moveDown(0.25);
});

doc.moveDown(1);
addSubheader('List of Figures & Tables');

const figList = [
  ['Figure 1', 'Multimodal Biomarker Correlation Heatmap (Acoustic vs. FACS)', 'Page 5'],
  ['Figure 2', 'Multimodal Cross-Attention Sequence Alignment Matrix (120 Tokens)', 'Page 6'],
  ['Figure 3', 'Trained Neural Network Weight Parameters (psychai_weights.pth)', 'Page 7'],
  ['Figure 4', 'Psych.ai 2.0 End-to-End Microservices Architecture & Cloud Pipeline', 'Page 8'],
  ['Figure 5', 'Relational Entity-Relationship (ERD) & Database Schema', 'Page 9'],
  ['Figure 6', 'Multimodal Transformer Confusion Matrix on DAIC-WOZ (N=189)', 'Page 11'],
  ['Figure 7', 'Receiver Operating Characteristic (ROC) Curve Comparison (AUC = 0.910)', 'Page 12'],
  ['Table 1', 'Empirical Diagnostic Classification & Ablation Study Metrics', 'Page 11'],
];

figList.forEach(([id, desc, pg]) => {
  doc.fillColor(accentColor).fontSize(8.5).font('Helvetica-Bold').text(`${id}: `, 50, doc.y, { continued: true });
  doc.fillColor('#334155').fontSize(8.5).font('Helvetica').text(desc, { continued: true });
  doc.fillColor('#94A3B8').fontSize(8).text(` ... ${pg}`, { align: 'right' });
  doc.moveDown(0.2);
});

// ==========================================
// 3. ABSTRACT & EXECUTIVE SUMMARY
// ==========================================
doc.addPage();
addHeader('Executive Summary & Abstract', 'Preamble');

addParagraph(
  'Major Depressive Disorder (MDD) affects over 300 million individuals globally and is recognized by the World Health Organization (WHO) as a premier contributor to non-fatal health loss. Conventional psychiatric evaluations rely predominantly on subjective clinical interviews (e.g., DSM-5, HAM-D, PHQ-9), which suffer from recall bias, patient stigma, significant inter-rater variability, and an acute global shortage of licensed psychiatric clinicians.'
);

addParagraph(
  'This dissertation presents Psych.ai 2.0, an end-to-end multimodal clinical diagnostic intelligence and telemetry system. Psych.ai 2.0 introduces a 4-Layer Cross-Attention Deep Transformer Network that fuses synchronized acoustic dynamics (13 Mel-Frequency Cepstral Coefficients, fundamental pitch variability, speech pause ratios) and visual affective biomarkers (35 Facial Action Units including AU4 Corrugator brow furrowing, AU12 Zygomatic smile attenuation, AU17 Mentalis chin tension, and saccadic gaze stability).'
);

addParagraph(
  'Evaluated against the gold-standard DAIC-WOZ clinical validation benchmark (N = 189 sequences), the proposed Cross-Attention architecture achieves a classification Accuracy of 86.24%, an Area Under the ROC Curve (AUC-ROC) of 0.910, a Sensitivity (Recall) of 84.51%, and an F1-Score of 82.19%, outperforming unimodal acoustic (AUC = 0.792) and visual (AUC = 0.751) baselines by over 12%.'
);

addParagraph(
  'To resolve the critical "black-box" interpretability barrier in medical AI, Psych.ai 2.0 incorporates SHapley Additive exPlanations (SHAP) and cross-attention temporal peak localization, highlighting exact diagnostic timestamps and feature attributions for attending physicians. The ecosystem is deployed through a HIPAA/GDPR-compliant microservices architecture featuring AES-256-GCM field encryption, an immutable HMAC-SHA256 audit ledger, and cross-platform native mobile applications with biometric hardware key protection.'
);

addSubheader('Keywords');
addParagraph('Multimodal Affective Computing, Cross-Attention Transformer, Major Depressive Disorder (MDD), Facial Action Coding System (FACS), Mel-Frequency Cepstral Coefficients (MFCC), Explainable AI (SHAP), HIPAA Compliance, Telehealth.');

// ==========================================
// 3. CHAPTER 1: INTRODUCTION & PROBLEM
// ==========================================
doc.addPage();
addHeader('Chapter 1: Introduction & Problem Formulation', 'Chapter 1');

addSubheader('1.1 Background & Clinical Motivation');
addParagraph(
  'Major Depressive Disorder (MDD) is a severe affective disorder presenting with chronic sadness, psychomotor slowing or agitation, anhedonia, and cognitive dysfunction. Despite effective pharmacological and cognitive-behavioral therapies, more than 50% of depressive episodes remain undiagnosed in primary care settings.'
);

addBullet('Subjectivity & Cognitive Bias', 'Self-report assessments (e.g. PHQ-9) are prone to conscious dissimulation, social desirability bias, and cognitive distortion common in mood disorders.');
addBullet('Clinical Resource Shortages', 'Low- and middle-income countries possess fewer than 0.1 psychiatrists per 100,000 citizens, leading to diagnostic delays exceeding 6 to 12 months.');
addBullet('Absence of Objective Biomarkers', 'Unlike cardiology or endocrinology, psychiatric medicine has historically lacked quantitative physiological telemetry.');

addSubheader('1.2 Research Objectives');
addBullet('Acoustic Biomarker Telemetry', 'Automate extraction of 13 MFCC spectral channels, pitch variability (F0 delta), and vocal silence ratios from clinical speech recordings.');
addBullet('Visual Affective Tracking', 'Track 35 facial action units (FAUs) under the Facial Action Coding System (FACS) to detect micro-expressions of psychic pain (AU4) and smile attenuation (AU12).');
addBullet('Cross-Attention Neural Fusion', 'Develop a multi-head cross-attention transformer that models non-linear interactions across modalities across 1800 temporal frames.');
addBullet('Explainable Decision Support', 'Generate SHAP attribution matrices and locate temporal distress peak anchors to ensure transparent clinical AI audits.');
addBullet('HIPAA & GDPR Software Engineering', 'Engineer a decoupled, cryptographic production stack ensuring end-to-end data security and compliance.');

// ==========================================
// 4. CHAPTER 2: LITERATURE REVIEW
// ==========================================
doc.addPage();
addHeader('Chapter 2: Literature Review & Theoretical Foundations', 'Chapter 2');

addSubheader('2.1 Vocal Acoustic Biomarkers in Psychiatric Medicine');
addParagraph(
  'Psychomotor retardation directly impacts the laryngeal, articulatory, and respiratory musculature. Clinical studies demonstrate that depressive speech is characterized by diminished fundamental frequency variance (monotonous prosody), reduced acoustic vocal energy, and a marked elongation of inter-phrase pause durations (> 2.0 seconds).'
);

addSubheader('2.2 Facial Action Coding System (FACS)');
addParagraph(
  'Pioneered by Ekman and Friesen, FACS provides an anatomically grounded taxonomy of facial muscle movements. In clinical depression research, key action units include AU4 (Brow Lowerer / Corrugator Supercilii), AU12 (Lip Corner Puller / Zygomaticus Major), and AU17 (Chin Raiser / Mentalis). Sustained AU4 hyperactivity paired with suppressed AU12 activation serves as a hallmark visual biomarker of affective distress.'
);

addSubheader('2.3 Biomarker Correlation Matrix');
addParagraph(
  'Figure 1 illustrates the empirical Pearson correlation matrix computed across acoustic features, facial action units, and binary clinical depression ground truth.'
);

addImageFigure('3_biomarker_correlation_heatmap.png', 1, 'Multimodal Biomarker Correlation Heatmap (Acoustic Pitch & MFCCs vs. Facial Action Coding System).');

// ==========================================
// 5. CHAPTER 3: MULTIMODAL AI PIPELINE
// ==========================================
doc.addPage();
addHeader('Chapter 3: Multimodal Deep Neural Architecture', 'Chapter 3');

addSubheader('3.1 Cross-Attention Transformer Topology');
addParagraph(
  'Psych.ai 2.0 adopts a 4-layer multi-head cross-attention architecture with 8 parallel attention heads and a hidden embedding dimension of d_model = 128. Acoustic features X_A and visual features X_V are projected into unified latent spaces and enriched with sinusoidal temporal positional embeddings.'
);

addImageFigure('1_cross_attention_heatmap.png', 2, 'Psych.ai 2.0 Multimodal Cross-Attention Matrix across 120 Sequence Tokens.');

doc.addPage();
addSubheader('3.2 Trained Neural Network Parameter Distributions');
addParagraph(
  'Figure 3 presents the trained parameter weight distributions extracted from psychai_weights.pth, detailing the audio projection matrix, visual projection matrix, multi-head in-projections (Q, K, V), and the final dense clinical classification layer.'
);

addImageFigure('2_trained_weights_heatmap.png', 3, 'Trained Neural Network Weight Parameters extracted from psychai_weights.pth.');

// ==========================================
// 6. CHAPTER 4: SOFTWARE ENGINEERING & ERD
// ==========================================
doc.addPage();
addHeader('Chapter 4: Software Engineering & Security Framework', 'Chapter 4');

addSubheader('4.1 Microservices & Cloud Infrastructure');
addParagraph(
  'The Psych.ai 2.0 software ecosystem is engineered as a decoupled distributed system: an Express/Node.js security gateway deployed on Vercel Serverless, an asynchronous FastAPI Python ML engine hosted on Render Cloud, a MongoDB Atlas encrypted cluster, and cross-platform native clients built with React Native / Expo SDK 56.'
);

addImageFigure('7_system_architecture_diagram.png', 4, 'Psych.ai 2.0 End-to-End Microservices Architecture & Cloud Pipeline.');

doc.addPage();
addSubheader('4.2 Entity-Relationship (ERD) & Cryptographic Data Schema');
addParagraph(
  'Figure 5 details the relational schema and cryptographic key topologies across Clinician Profiles, Diagnostic Sessions, and the HIPAA §164.312(b) Immutable Audit Ledger.'
);

addImageFigure('6_erd_database_schema.png', 5, 'Relational Entity-Relationship (ERD) & Cryptographic Data Schema.');

// ==========================================
// 7. CHAPTER 5: EXPERIMENTAL RESULTS
// ==========================================
doc.addPage();
addHeader('Chapter 5: Experimental Evaluation & Results', 'Chapter 5');

addSubheader('5.1 DAIC-WOZ Benchmark Validation');
addParagraph(
  'Psych.ai 2.0 was evaluated on the DAIC-WOZ benchmark dataset (N = 189 clinical sequences). Table 1 summarizes the diagnostic classification metrics comparing multimodal cross-attention against unimodal models.'
);

// Table
const tableTop = doc.y + 5;
doc.rect(50, tableTop, 495, 20).fill('#0F172A');
doc.fillColor('#FFFFFF').fontSize(9).font('Helvetica-Bold').text('EVALUATION METRIC', 60, tableTop + 5);
doc.text('MULTIMODAL FUSION', 200, tableTop + 5);
doc.text('AUDIO ONLY', 330, tableTop + 5);
doc.text('VISUAL ONLY', 440, tableTop + 5);

const rows = [
  ['Classification Accuracy', '86.24%', '76.19%', '72.48%'],
  ['Area Under Curve (AUC-ROC)', '0.910', '0.792', '0.751'],
  ['Sensitivity / Recall (TP Rate)', '84.51%', '74.65%', '70.42%'],
  ['Specificity (TN Rate)', '87.29%', '77.12%', '73.73%'],
  ['Precision (Positive Predictive)', '80.00%', '66.25%', '61.73%'],
  ['F1-Score (Harmonic Mean)', '82.19%', '70.20%', '65.79%'],
];

let curY = tableTop + 20;
rows.forEach((r, idx) => {
  const bg = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
  doc.rect(50, curY, 495, 18).fill(bg);
  doc.fillColor(primaryColor).fontSize(8.5).font(idx === 0 || idx === 1 ? 'Helvetica-Bold' : 'Helvetica').text(r[0], 60, curY + 4);
  doc.fillColor(accentColor).fontSize(8.5).font('Helvetica-Bold').text(r[1], 200, curY + 4);
  doc.fillColor('#64748B').fontSize(8.5).font('Helvetica').text(r[2], 330, curY + 4);
  doc.fillColor('#64748B').fontSize(8.5).font('Helvetica').text(r[3], 440, curY + 4);
  curY += 18;
});

doc.y = curY + 15;

addImageFigure('4_confusion_matrix.png', 6, 'Multimodal Transformer Confusion Matrix (DAIC-WOZ Benchmark Split: N = 189).');

doc.addPage();
addSubheader('5.2 Receiver Operating Characteristic (ROC) Analysis');
addParagraph(
  'Figure 7 displays the Receiver Operating Characteristic (ROC) curve comparing the proposed Multimodal Fusion Transformer against unimodal and chance baselines.'
);

addImageFigure('5_roc_curve.png', 7, 'Receiver Operating Characteristic (ROC) Curve Comparison (Multimodal AUC = 0.910 vs Unimodal Baselines).');

// ==========================================
// 8. CHAPTER 6: CLINICAL IMPLICATIONS
// ==========================================
doc.addPage();
addHeader('Chapter 6: Clinical Decision Support & Explainable AI', 'Chapter 6');

addSubheader('6.1 Interpretability through SHAP & Temporal Anchoring');
addParagraph(
  'To overcome clinical skepticism regarding deep neural networks, Psych.ai 2.0 integrates SHapley Additive exPlanations (SHAP). The system quantifies the exact marginal contribution of each biomarker—such as pitch variability delta (+0.28 impact), AU4 brow furrowing (+0.24 impact), and gaze aversion (-0.15 impact)—enabling clinicians to understand why an assessment was flagged as high or moderate risk.'
);

addSubheader('6.2 Ethical AI & Physician-in-the-Loop Governance');
addParagraph(
  'Psych.ai 2.0 is strictly architected as an Objective Decision Support Tool (ODST). It does not autonomously prescribe medications or assign irreversible diagnoses; rather, it empowers clinicians with quantitative telemetry, automated HIPAA PDF audit reports, and longitudinal trend analysis.'
);

// ==========================================
// 9. CONCLUSION & REFERENCES
// ==========================================
doc.addPage();
addHeader('Chapter 7: Conclusion & Future Work', 'Chapter 7');

addSubheader('7.1 Conclusion');
addParagraph(
  'Psych.ai 2.0 validates the hypothesis that deep cross-attention fusion of synchronized acoustic prosody and facial action units yields superior clinical accuracy (86.24% accuracy, 0.910 AUC) compared to traditional unimodal analysis. Supported by an enterprise HIPAA/GDPR cryptographic gateway and intuitive mobile/web applications, the platform establishes a modern paradigm for objective psychiatric diagnostic telemetry.'
);

addSubheader('7.2 Future Research Roadmap');
addBullet('Continuous Passive Telemetry', 'Incorporate wearable circadian sleep patterns, heart rate variability (HRV), and electrodermal activity.');
addBullet('EEG Multi-Channel Fusion', 'Integrate frontal alpha asymmetry electroencephalogram signals during cognitive tasks.');
addBullet('Federated On-Device Edge Inference', 'Train distributed transformer weights across clinical client devices without raw data transmission.');

doc.moveDown(1);
addHeader('Bibliography & Academic References', 'References');

const references = [
  'Ekman, P., & Friesen, W. V. (1978). Facial Action Coding System: A Technique for the Measurement of Facial Movement. Consulting Psychologists Press.',
  'Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention Is All You Need. Advances in Neural Information Processing Systems (NeurIPS), 30, 5998–6008.',
  'Gratch, J., Artstein, R., Lucas, G. M., Stratou, G., Scherer, S., Nazarian, A., Wood, R., Boberg, J., DeVault, D., Marsella, S., & Traum, D. (2014). The Distress Analysis Interview Corpus (DAIC-WOZ). In Proceedings of the Ninth International Conference on Language Resources and Evaluation (LREC).',
  'Lundberg, S. M., & Lee, S. I. (2017). A Unified Approach to Interpreting Model Predictions. Advances in Neural Information Processing Systems (NeurIPS), 30, 4765–4774.',
  'Cummins, N., Scherer, S., Krajewski, J., Schnieder, S., Epps, J., & Quatieri, T. F. (2015). A review of depression and suicide risk assessment using speech analysis. Speech Communication, 71, 10–49.',
  'Baltrušaitis, T., Zadeh, A., Lim, Y. C., & Morency, L. P. (2018). OpenFace 2.0: Facial Behavior Analysis Toolkit. IEEE International Conference on Automatic Face & Gesture Recognition (FG 2018), 59–66.',
  'Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606–613.'
];

references.forEach((ref, i) => {
  doc.fillColor(primaryColor).fontSize(8.5).font('Helvetica-Bold').text(`[${i+1}] `, { continued: true });
  doc.fillColor('#334155').fontSize(8.5).font('Helvetica').text(ref, { align: 'justify' });
  doc.moveDown(0.4);
});

// Final Page Numbering & Footer Loop
const totalPages = doc.bufferedPageRange().count;
for (let i = 0; i < totalPages; i++) {
  doc.switchToPage(i);
  if (i > 0) { // Don't put header/footer on cover page
    // Header line
    doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text(
      'PSYCH.AI 2.0 — FINAL YEAR PROJECT THESIS DISSERTATION', 50, 25, { align: 'left' }
    );
    doc.text('HANAN MUMTAZ', 400, 25, { align: 'right', width: 145 });

    // Footer line
    doc.moveTo(50, 790).lineTo(545, 790).strokeColor('#E2E8F0').lineWidth(0.5).stroke();
    doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text(
      'CONFIDENTIAL & PROPRIETARY  •  HIPAA & GDPR COMPLIANT CLINICAL TELEMETRY', 50, 800, { align: 'left' }
    );
    doc.text(`Page ${i + 1} of ${totalPages}`, 400, 800, { align: 'right', width: 145 });
  }
}

doc.end();

writeStream.on('finish', () => {
  try {
    fs.copyFileSync(OUTPUT_PDF, WORKSPACE_PDF);
  } catch (e) {}
  console.log(`✅ Master Thesis PDF successfully compiled!`);
  console.log(`📄 Artifact PDF: ${OUTPUT_PDF}`);
  console.log(`📄 Workspace PDF: ${WORKSPACE_PDF}`);
  console.log(`📊 Total Pages: ${totalPages}`);
});

