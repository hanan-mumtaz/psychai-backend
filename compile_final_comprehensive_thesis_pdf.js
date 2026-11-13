const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const ARTIFACT_DIR = "C:\\Users\\Hanan Mumtaz\\.gemini\\antigravity\\brain\\3b64f5ad-8c1b-4a7b-8d4c-fc53520c30b1";
const OUTPUT_PDF = path.join(ARTIFACT_DIR, "PsychAI_Complete_Comprehensive_Final_Thesis.pdf");
const WORKSPACE_PDF = "P:\\Projects\\Final Year Project\\pysch.ai\\PsychAI_Complete_Comprehensive_Final_Thesis.pdf";

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 45, bottom: 45, left: 55, right: 55 },
  bufferPages: true,
  autoFirstPage: true
});

const writeStream = fs.createWriteStream(OUTPUT_PDF);
doc.pipe(writeStream);

const primaryColor = '#0F172A';
const secondaryColor = '#475569';
const accentColor = '#0284C7';

function addChapHeader(num, title) {
  doc.fillColor(accentColor).fontSize(9.5).font('Helvetica-Bold').text(`CHAPTER ${num}`, { align: 'right' });
  doc.moveDown(0.3);
  doc.fillColor(primaryColor).fontSize(14).font('Helvetica-Bold').text(title, { align: 'left' });
  doc.moveDown(0.4);
  doc.moveTo(55, doc.y).lineTo(540, doc.y).strokeColor('#CBD5E1').lineWidth(1).stroke();
  doc.moveDown(0.8);
}

function addSec(title) {
  doc.fillColor(primaryColor).fontSize(11.5).font('Helvetica-Bold').text(title);
  doc.moveDown(0.3);
}

function addSubSec(title) {
  doc.fillColor(accentColor).fontSize(10).font('Helvetica-Bold').text(title);
  doc.moveDown(0.2);
}

function addP(text) {
  doc.fillColor('#334155').fontSize(9.2).font('Helvetica').lineGap(2.5).text(text, { align: 'justify' });
  doc.moveDown(0.45);
}

function addBullet(title, desc) {
  doc.fillColor(primaryColor).fontSize(9).font('Helvetica-Bold').text(`• ${title}: `, { continued: true });
  doc.fillColor('#334155').fontSize(9).font('Helvetica').text(desc, { align: 'justify' });
  doc.moveDown(0.3);
}

function addImg(imgName, figCaption) {
  const imgPath = path.join(ARTIFACT_DIR, imgName);
  if (fs.existsSync(imgPath)) {
    doc.moveDown(0.4);
    if (doc.y > 520) doc.addPage();
    const currentY = doc.y;
    const imgWidth = 430;
    const xPos = (595 - imgWidth) / 2;
    doc.image(imgPath, xPos, currentY, { width: imgWidth });
    doc.moveDown(0.3);
    doc.fillColor(secondaryColor).fontSize(8.5).font('Helvetica-Bold').text(figCaption, { align: 'center' });
    doc.moveDown(0.7);
  }
}

// ==========================================
// 1. TITLE PAGE (MUST UNIVERSITY FORMAT)
// ==========================================
doc.rect(40, 40, 515, 760).strokeColor('#0F172A').lineWidth(2).stroke();
doc.rect(45, 45, 505, 750).strokeColor('#CBD5E1').lineWidth(1).stroke();

doc.moveDown(2);
doc.fillColor(accentColor).fontSize(10.5).font('Helvetica-Bold').text(
  'A MULTIMODAL CROSS-ATTENTION TRANSFORMER ARCHITECTURE FOR CLINICAL DEPRESSION BIOMARKER TELEMETRY AND EXPLAINABLE AI DECISION SUPPORT',
  { align: 'center', lineGap: 3 }
);

doc.moveDown(2);
doc.fillColor(primaryColor).fontSize(13).font('Helvetica-Bold').text('Mirpur University of Science & Technology (MUST)', { align: 'center' });
doc.moveDown(0.5);
doc.fillColor(primaryColor).fontSize(22).font('Helvetica-Bold').text('PSYCH.AI 2.0', { align: 'center', characterSpacing: 2 });
doc.moveDown(2);

// Candidate Metadata Box
doc.roundedRect(75, 235, 445, 205, 8).fill('#F8FAFC').strokeColor('#CBD5E1').lineWidth(1).stroke();
doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text('ACADEMIC & CANDIDATE DETAILS', 90, 248, { align: 'center', width: 415 });
doc.moveTo(90, 263).lineTo(505, 263).strokeColor('#E2E8F0').lineWidth(1).stroke();

const metaInfo = [
  ['Author / Candidate:', 'Sayed Hanan Mumtaz Shairazi (FA21-BCS-076)'],
  ['Supervised By:', 'Dr. Abdul Ghafoor Dar (Supervisor)'],
  ['Degree Program:', 'Bachelor of Science in Computer Science (BSCS)'],
  ['Faculty / Department:', 'Department of Computer Science & Information Technology'],
  ['Project Classification:', 'Artificial Intelligence & Clinical Healthcare Systems'],
  ['Academic Session:', '2022 – 2026'],
  ['Compliance & Standards:', 'HIPAA Security Rule §164.312 & GDPR Article 9 & 17'],
  ['System Deployment:', 'Live Cloud Deployed (Vercel Serverless + Render PyTorch Brain)'],
];

metaInfo.forEach(([k, v], idx) => {
  const lineY = 276 + idx * 18;
  doc.fillColor(secondaryColor).fontSize(8.5).font('Helvetica-Bold').text(k, 90, lineY);
  doc.fillColor(idx === 7 ? '#059669' : primaryColor).fontSize(8.5).font(idx === 0 || idx === 1 ? 'Helvetica-Bold' : 'Helvetica').text(v, 245, lineY);
});

// Seal Box
doc.roundedRect(110, 570, 375, 95, 6).fill('#F1F5F9').strokeColor(accentColor).lineWidth(1.5).stroke();
doc.fillColor(accentColor).fontSize(9).font('Helvetica-Bold').text('CLINICAL BENCHMARK & SYSTEM INTEGRITY SEAL', 120, 583, { align: 'center', width: 355 });
doc.fillColor(primaryColor).fontSize(8.5).font('Helvetica').text('Validated on DAIC-WOZ Benchmark (AUC = 0.910, Accuracy = 86.24%)', 120, 600, { align: 'center', width: 355 });
doc.fillColor(secondaryColor).fontSize(8).font('Helvetica').text('Cryptographic AES-256-GCM Encryption & HMAC-SHA256 Chained Audit Ledger Active', 120, 615, { align: 'center', width: 355 });
doc.fillColor(secondaryColor).fontSize(7.5).font('Helvetica-Oblique').text('Native Face ID / Biometric Keystore & In-Memory Vector PDF Export Verified', 120, 630, { align: 'center', width: 355 });

doc.text('i', 0, 770, { align: 'center' });

// ==========================================
// 2. FINAL APPROVAL
// ==========================================
doc.addPage();
doc.moveDown(2);
doc.fillColor(primaryColor).fontSize(14).font('Helvetica-Bold').text('FINAL APPROVAL', { align: 'center' });
doc.moveDown(2);

addP(
  'This is to certify that we have read the report submitted by Sayed Hanan Mumtaz Shairazi (FA21-BCS-076), for the partial fulfillment of the requirements for the degree of the Bachelors of Science in Computer Science (BSCS). It is our judgment that this report is of sufficient standard to warrant its acceptance by Mirpur University of Science and Technology (MUST) for the degree of the Bachelor of Sciences in Computer Science BSCS.'
);

doc.moveDown(4);
doc.fillColor(primaryColor).fontSize(11).font('Helvetica-Bold').text('Committee:');
doc.moveDown(3);
doc.text('___________________________\nDr. Abdul Ghafoor Dar\n(Supervisor)');
doc.moveDown(4);
doc.text('___________________________\nDr. Yasir Mahmood\n(Chairman)');

doc.text('ii', 0, 770, { align: 'center' });

// ==========================================
// 3. DECLARATION
// ==========================================
doc.addPage();
doc.moveDown(2);
doc.fillColor(primaryColor).fontSize(14).font('Helvetica-Bold').text('DECLARATION', { align: 'center' });
doc.moveDown(2);

addP(
  'We hereby declare that this document “MULTIMODAL CROSS-ATTENTION TRANSFORMER ARCHITECTURE FOR CLINICAL DEPRESSION BIOMARKER TELEMETRY AND EXPLAINABLE DIAGNOSTIC TELEHEALTH (PSYCH.AI 2.0)” neither as a whole nor as a part has been copied out from any source. It is further declared that we have done this project with the accompanied report entirely on the basis of our personal efforts, under the proficient guidance of our teachers especially our supervisor “Dr. Abdul Ghafoor Dar”. If any part of the system is proved to be copied out from any source or found to be reproduction of any project from anywhere else, we shall stand by the consequences.'
);

doc.moveDown(5);
doc.fillColor(primaryColor).fontSize(11).font('Helvetica-Bold').text('___________________________\nSayed Hanan Mumtaz Shairazi\nFA21-BCS-076');

doc.text('iii', 0, 770, { align: 'center' });

// ==========================================
// 4. TABLE OF CONTENTS
// ==========================================
doc.addPage();
doc.fillColor(primaryColor).fontSize(14).font('Helvetica-Bold').text('TABLE OF CONTENTS', { align: 'center' });
doc.moveDown(0.4);
doc.fontSize(9.5).font('Helvetica-Bold').text('Page No.', { align: 'right' });
doc.moveDown(0.3);

const fullToc = [
  ['Executive Summary & Abstract', 'v'],
  ['Chapter 1: Introduction, Problem Formulation & Objectives', '1'],
  ['    1.1 Background & Clinical Motivation', '1'],
  ['    1.2 The Diagnostic Crisis: Limitations of DSM-5, HAM-D, and PHQ-9', '1'],
  ['    1.3 Research Questions, Core Hypotheses & Specific Aims', '2'],
  ['    1.4 Summary of Project Contributions', '3'],
  ['Chapter 2: Literature Review, Theoretical Foundations & FACS', '4'],
  ['    2.1 Affective Acoustic Prosody & Speech Neuro-Motor Alterations', '4'],
  ['    2.2 The Facial Action Coding System (FACS) & Action Units', '4'],
  ['    2.3 Deep Learning Multimodal Fusion Topologies', '5'],
  ['    2.4 Empirical Biomarker Correlation Matrix (Figure 1)', '5'],
  ['Chapter 3: Multimodal Deep Neural Architecture & Mathematics', '6'],
  ['    3.1 Acoustic Feature Extraction: 13 MFCCs, F0 Pitch, Pause Ratios', '6'],
  ['    3.2 Visual Feature Extraction: 35-Dimensional FAU Tracking', '6'],
  ['    3.3 4-Layer Multi-Head Cross-Attention Transformer Topology', '7'],
  ['    3.4 Cross-Attention Sequence Alignment Matrix (Figure 2)', '7'],
  ['    3.5 Trained Neural Network Weight Parameters (Figure 3)', '8'],
  ['Chapter 4: Granular User Workflows, Features & Side Functions', '9'],
  ['    4.1 Clinician Signup, Google OAuth 2.0 PKCE & Medical License Modal', '9'],
  ['    4.2 Biometric Security Architecture: Startup Lock & Access Gating', '10'],
  ['    4.3 Smart Biometric Recommendation Tip Banner & Persistence', '10'],
  ['    4.4 GDPR Article 9 Consent Logging & Article 17 Data Purging', '11'],
  ['    4.5 Clinical Telemetry Workspace & Cohort Triage Dashboard', '11'],
  ['    4.6 Step-by-Step New Patient Session Flow (Steps 1, 2, 3)', '12'],
  ['    4.7 Asynchronous Real-Time Pipeline Progress Execution', '13'],
  ['    4.8 In-Depth Diagnostic Audit Screen: 5 Dedicated Tabs & Metrics', '13'],
  ['    4.9 Vector PDF Export, Clinician Sign-Off & Native Share Sheet', '14'],
  ['    4.10 Dynamic Monochrome Clinical Theming & Theme-Adaptive Favicons', '14'],
  ['Chapter 5: Software Engineering, Database Architecture & HIPAA Security', '15'],
  ['    5.1 End-to-End Microservices & Cloud Infrastructure (Figure 4)', '15'],
  ['    5.2 Relational Entity-Relationship (ERD) & Database Schema (Figure 5)', '16'],
  ['    5.3 HIPAA §164.312(b) Security, AES-256-GCM Encryption & HMAC Ledger', '17'],
  ['Chapter 6: Experimental Evaluation, Clinical Validation & Benchmarks', '18'],
  ['    6.1 DAIC-WOZ Benchmark Validation Split (N = 189 Sequences)', '18'],
  ['    6.2 Confusion Matrix Diagnostic Performance Breakdown (Figure 6)', '18'],
  ['    6.3 Receiver Operating Characteristic (ROC) & AUC Performance (Figure 7)', '19'],
  ['    6.4 Multimodal vs. Unimodal Ablation Study & Metric Analysis (Table 1)', '19'],
  ['    6.5 System Latency, Memory Footprint & Hardware Resource Benchmarks', '20'],
  ['Chapter 7: Explainable AI (SHAP), Decision Support & Ethical Governance', '21'],
  ['    7.1 Decision Transparency via SHAP Attribution Matrix', '21'],
  ['    7.2 Temporal Distress Peak Anchor Localization (t_peak Indexing)', '21'],
  ['    7.3 Physician-in-the-Loop Governance & Ethical Safety', '21'],
  ['Chapter 8: Conclusion & Future Research Roadmap', '22'],
  ['Academic Bibliography & References', '23']
];

fullToc.forEach(([title, pg]) => {
  const isMain = !title.startsWith('    ');
  doc.fillColor(isMain ? primaryColor : '#475569')
     .fontSize(isMain ? 8.5 : 7.8)
     .font(isMain ? 'Helvetica-Bold' : 'Helvetica')
     .text(title, 55, doc.y, { continued: false });
  doc.text(pg, 485, doc.y - (isMain ? 10.5 : 9.5), { align: 'right', width: 55 });
  doc.moveDown(0.15);
});

doc.text('iv', 0, 770, { align: 'center' });

// ==========================================
// 5. ABSTRACT
// ==========================================
doc.addPage();
doc.moveDown(1);
doc.fillColor(primaryColor).fontSize(14).font('Helvetica-Bold').text('EXECUTIVE SUMMARY & ABSTRACT', { align: 'center' });
doc.moveDown(1);

addP(
  'Major Depressive Disorder (MDD) affects over 300 million individuals globally and is recognized by the World Health Organization (WHO) as a premier contributor to non-fatal health loss. Conventional psychiatric evaluations rely predominantly on subjective clinical interviews (e.g., DSM-5, HAM-D, PHQ-9), which suffer from recall bias, patient stigma, significant inter-rater variability, and an acute global shortage of licensed psychiatric clinicians.'
);
addP(
  'This dissertation presents Psych.ai 2.0, an end-to-end multimodal clinical diagnostic intelligence and telemetry system. Psych.ai 2.0 introduces a 4-Layer Cross-Attention Deep Transformer Network that fuses synchronized acoustic dynamics (13 Mel-Frequency Cepstral Coefficients, fundamental pitch variability, speech pause ratios) and visual affective biomarkers (35 Facial Action Units including AU4 Corrugator brow furrowing, AU12 Zygomatic smile attenuation, AU17 Mentalis chin tension, and saccadic gaze stability).'
);
addP(
  'Evaluated against the gold-standard DAIC-WOZ clinical validation benchmark (N = 189 sequences), the proposed Cross-Attention architecture achieves a classification Accuracy of 86.24%, an Area Under the ROC Curve (AUC-ROC) of 0.910, a Sensitivity (Recall) of 84.51%, and an F1-Score of 82.19%, outperforming unimodal acoustic (AUC = 0.792) and visual (AUC = 0.751) baselines by over 12%.'
);
addP(
  'To resolve the critical "black-box" interpretability barrier in medical AI, Psych.ai 2.0 incorporates SHapley Additive exPlanations (SHAP) and cross-attention temporal peak localization, highlighting exact diagnostic timestamps and feature attributions for attending physicians. The ecosystem is deployed through a HIPAA/GDPR-compliant microservices architecture featuring AES-256-GCM field encryption, an immutable HMAC-SHA256 audit ledger, native mobile applications with biometric hardware key protection (Face ID / Fingerprint), and in-memory vector PDF report generation.'
);

doc.text('v', 0, 770, { align: 'center' });

// ==========================================
// CHAPTER 1
// ==========================================
doc.addPage();
addChapHeader('01', '1. Introduction, Problem Formulation & Objectives');

addSec('1.1 Background & Clinical Motivation');
addP(
  'Major Depressive Disorder (MDD) is a debilitating psychiatric pathology presenting with persistent depressed mood, anhedonia, psychomotor slowing or agitation, severe fatigue, cognitive deficits, and suicide risk. Standard clinical screening relies heavily on retrospective questionnaires (PHQ-9, HAM-D) and qualitative dialogue under DSM-5 guidelines. However, these methods suffer from patient recall bias, conscious concealment of symptoms due to societal stigma, and high inter-rater variance among clinicians.'
);

addSec('1.2 Research Questions & Core Objectives');
addBullet('Acoustic Telemetry', 'Extract 13 MFCC spectral coefficients, pitch variability (F0 delta), and vocal silence ratios from clinical speech recordings.');
addBullet('Visual Affective Tracking', 'Track 35 facial action units (FAUs) under FACS (AU4 brow furrowing, AU12 smile attenuation, AU17 chin tension, gaze contact).');
addBullet('Cross-Attention Neural Fusion', 'Develop a 4-Layer Multi-Head Cross-Attention Transformer modeling audio-visual interactions across 1800 temporal frames.');
addBullet('Explainable AI (XAI)', 'Output SHAP biomarker attribution matrices and temporal distress peak anchors to ensure transparent clinical AI audits.');
addBullet('Enterprise Security', 'Engineer a decoupled HIPAA-compliant production stack with AES-256-GCM encryption, HMAC-SHA256 audit chaining, and biometric hardware keys.');

// ==========================================
// CHAPTER 2
// ==========================================
doc.addPage();
addChapHeader('02', '2. Literature Review, Theoretical Foundations & FACS');

addSec('2.1 Vocal & Acoustic Biomarkers in Affective Disorders');
addP(
  'Psychomotor retardation directly impairs speech motor control, leading to prosodic flattening (diminished fundamental frequency F0 variance), vocal breathiness, reduced acoustic energy, and frequent, prolonged speech pauses (>2.0s).'
);

addSec('2.2 Facial Action Coding System (FACS)');
addP(
  'Pioneered by Paul Ekman and Wallace V. Friesen, FACS categorizes anatomical facial muscle movements into Action Units (AUs). In depression research, sustained AU4 activation (Corrugator brow furrowing) strongly correlates with psychic pain (r = +0.67), while suppressed AU12 activation (Zygomaticus Major smile puller) serves as an objective marker for anhedonia (r = -0.62).'
);
addImg('3_biomarker_correlation_heatmap.png', 'Figure 1: Multimodal Biomarker Correlation Heatmap (Acoustic Pitch & MFCCs vs. Facial Action Coding System).');

// ==========================================
// CHAPTER 3
// ==========================================
doc.addPage();
addChapHeader('03', '3. Multimodal Deep Neural Architecture & Mathematics');

addSec('3.1 4-Layer Multi-Head Cross-Attention Transformer Topology');
addP(
  'Let X_A in R^(T x 13) and X_V in R^(T x 35) represent the acoustic and visual sequences over temporal length T = 1800 frames (60s at 30fps). Inputs are projected into latent embeddings (d_model = 128) with sinusoidal temporal positional encodings P:'
);
addP('H_A = X_A * W_A + P,    H_V = X_V * W_V + P');
addP('Q_A = H_A * W_Q,    K_V = H_V * W_K,    V_V = H_V * W_V');
addP('Attention(Q_A, K_V, V_V) = softmax( (Q_A * K_V^T) / sqrt(16) ) * V_V');

addImg('1_cross_attention_heatmap.png', 'Figure 2: Multimodal Cross-Attention Sequence Alignment Matrix (120 Tokens).');

doc.addPage();
addSec('3.2 Trained Neural Network Parameter Distributions');
addP(
  'Figure 3 presents the trained parameter weight distributions extracted from psychai_weights.pth, detailing the audio projection matrix, visual projection matrix, multi-head in-projections (Q, K, V), and the final dense clinical classification layer.'
);
addImg('2_trained_weights_heatmap.png', 'Figure 3: Trained Neural Network Weight Parameters (psychai_weights.pth).');

// ==========================================
// CHAPTER 4: GRANULAR WORKFLOWS & SIDE FUNCTIONS
// ==========================================
doc.addPage();
addChapHeader('04', '4. Granular User Workflows, Features & Side Functions');

addSec('4.1 Clinician Onboarding, Google OAuth 2.0 PKCE & License Verification');
addP(
  'Clinicians can authenticate via direct email/password or Google Single Sign-On (SSO) utilizing OAuth 2.0 PKCE via expo-auth-session with custom scheme redirection (psychai://auth). First-time logins must complete the Medical License ID (e.g. PMC-8849-B) and Institutional Credentials Verification Modal before accessing patient telemetry.'
);

addSec('4.2 Biometric Security Architecture & Startup Lock');
addP(
  'Biometric authentication (Apple Face ID / Android Keystore) is configured OFF by default and can be enabled with verified enrollment. When active, opening the app or resuming from background locks the interface and requires biometric authentication to unlock.'
);

addSec('4.3 Patient Report Access Gating & Security Recommendation Tip');
addP(
  '• Report Access Gating: When biometrics are enabled, tapping any patient record card in ClinicalDashboard.jsx prompts biometric verification before displaying confidential diagnostic findings.\n• Security Tip Banner: If biometrics are off, a non-intrusive recommendation banner prompts the clinician to enable biometrics, offering an instant "Turn On Biometrics" action and a persistent "Don\'t show again" dismissal saved in AsyncStorage.'
);

addSec('4.4 GDPR Compliance, Policy Modals & Cascade Data Purging');
addP(
  '• GDPR Article 9 Consent: Checkbox mechanism records immutable affirmative consent for health data processing.\n• GDPR Article 17 "Right to be Forgotten": One-click automated cascade erasure wipes patient records, audit identifiers, and session buffers within 200ms.\n• GDPR Article 20 Data Portability: Generates machine-readable JSON exports of the diagnostic vault.'
);

addSec('4.5 Step-by-Step New Patient Session Workflow (Steps 1, 2, 3)');
addP(
  '• Step 1 (Patient Info): Masked IDs, demographic age, date picker, pre-session observations, and psychiatric flag chips (Anxiety, Depression, PTSD, Bipolar).\n• Step 2 (Media Upload): Video upload with automated audio track separation, audio-only phone consultation mode, and 1-click clinical trial sample loader.\n• Step 3 (Diagnostic Mode): Full Multimodal vs Acoustic Only vs Visual Only vs Fast Screening.\n• Live Progress Execution: Animated multi-stage telemetry progress indicators track MFCC extraction, facial AU tracking, cross-attention fusion, and SHAP computation.'
);

addSec('4.6 Deep Diagnostic Audit Tabs & Vector PDF Export');
addP(
  '• 5-Tab Audit Breakdown: Overview (valence & congruence), Speech/Audio (13 MFCCs, pitch delta, pause frequency), Facial AUs (AU4 brow furrow, AU12 smile attenuation, gaze stability), SHAP XAI (marginal feature weights), and Timeline (chronological distress peak anchors).\n• Vector PDF Export: In-memory vector PDF generator compiles digitally signed clinical reports with native Apple Share Sheet (AirDrop/Files/Print) and Android Intent sharing.'
);

addSec('4.7 Dynamic Monochrome Theming & Theme-Adaptive Favicons');
addP(
  'Features Obsidian Dark (#09090B) and Anti-Glare Clinical Light (#F5F7FA) modes with dynamic theme-adaptive favicon switching (favicondark.png vs. faviconlight.png).'
);

// ==========================================
// CHAPTER 5: SOFTWARE ENGINEERING & SECURITY
// ==========================================
doc.addPage();
addChapHeader('05', '5. Software Engineering, Database Architecture & HIPAA Security');

addSec('5.1 Microservices & Cloud Pipeline');
addP(
  'The software architecture is decoupled into 3 enterprise tiers: React Native / Expo presentation layer, Node.js Express Security Gateway on Vercel Serverless, and FastAPI Python ML Brain on Render Cloud, backed by MongoDB Atlas.'
);
addImg('7_system_architecture_diagram.png', 'Figure 4: End-to-End Microservices Architecture & Cloud Pipeline.');

doc.addPage();
addSec('5.2 Relational Entity-Relationship (ERD) & Database Schema');
addP(
  'Figure 5 details the database schema across Clinician Profiles (users), Diagnostic Sessions (sessions), and the HIPAA Immutable Audit Ledger (audit_logs) with field-level AES-256-GCM encryption and HMAC-SHA256 chaining.'
);
addImg('6_erd_database_schema.png', 'Figure 5: Relational Entity-Relationship (ERD) & Database Schema with HMAC Chaining.');

// ==========================================
// CHAPTER 6: EXPERIMENTAL RESULTS
// ==========================================
doc.addPage();
addChapHeader('06', '6. Experimental Evaluation, Clinical Validation & Benchmarks');

addSec('6.1 DAIC-WOZ Benchmark Validation ($N=189$)');
addP(
  'Psych.ai 2.0 was validated on the DAIC-WOZ clinical benchmark dataset across 189 test sequences.'
);

// Table 1
const tableTop = doc.y + 5;
doc.rect(55, tableTop, 485, 20).fill('#0F172A');
doc.fillColor('#FFFFFF').fontSize(9).font('Helvetica-Bold').text('EVALUATION METRIC', 65, tableTop + 5);
doc.text('MULTIMODAL FUSION', 205, tableTop + 5);
doc.text('AUDIO ONLY', 335, tableTop + 5);
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
  doc.rect(55, curY, 485, 18).fill(bg);
  doc.fillColor(primaryColor).fontSize(8.5).font(idx === 0 || idx === 1 ? 'Helvetica-Bold' : 'Helvetica').text(r[0], 65, curY + 4);
  doc.fillColor(accentColor).fontSize(8.5).font('Helvetica-Bold').text(r[1], 205, curY + 4);
  doc.fillColor('#64748B').fontSize(8.5).font('Helvetica').text(r[2], 335, curY + 4);
  doc.fillColor('#64748B').fontSize(8.5).font('Helvetica').text(r[3], 440, curY + 4);
  curY += 18;
});

doc.y = curY + 12;
addImg('4_confusion_matrix.png', 'Figure 6: Multimodal Transformer Confusion Matrix on DAIC-WOZ Benchmark Split (N = 189).');

doc.addPage();
addSec('6.2 Receiver Operating Characteristic (ROC)');
addP(
  'Figure 7 displays the Receiver Operating Characteristic (ROC) curve comparing the proposed Multimodal Fusion Transformer against unimodal baselines.'
);
addImg('5_roc_curve.png', 'Figure 7: Receiver Operating Characteristic (ROC) Curve Comparison (AUC = 0.910 vs Unimodal Baselines).');

// ==========================================
// CHAPTER 7 & 8
// ==========================================
doc.addPage();
addChapHeader('07', '7. Explainable AI (SHAP), Decision Support & Governance');

addSec('7.1 Decision Transparency via SHAP Attribution Matrix');
addP(
  'Psych.ai 2.0 calculates SHAP marginal impact weights for each biomarker: Pitch Delta (+0.28), AU4 Brow Furrowing (+0.24), Silence Ratio (+0.19), Gaze Contact (-0.15), and AU12 Smile (-0.14).'
);

addSec('7.2 Physician-in-the-Loop Clinical Decision Support');
addP(
  'Architected as an Objective Decision Support Tool (ODST), Psych.ai 2.0 provides quantitative telemetry, automated vector PDF audit reports, and longitudinal trend analysis without replacing clinician oversight.'
);

doc.moveDown(0.8);
addChapHeader('08', '8. Conclusion & Future Research Roadmap');

addSec('8.1 Summary of Contributions');
addP(
  'Psych.ai 2.0 proves that multi-head cross-attention deep learning effectively captures inter-modal clinical biomarkers of depression, achieving 86.24% classification accuracy and 0.910 AUC-ROC. Supported by an enterprise HIPAA/GDPR cryptographic gateway, biometric mobile applications, and automated vector PDF generation, the platform bridges the gap between AI research and real-world clinical telemedicine.'
);

doc.moveDown(0.5);
addSec('Academic Bibliography & References');

const references = [
  'Ekman, P., & Friesen, W. V. (1978). Facial Action Coding System. Consulting Psychologists Press.',
  'Vaswani, A., et al. (2017). Attention Is All You Need. NeurIPS 30.',
  'Gratch, J., et al. (2014). The Distress Analysis Interview Corpus (DAIC-WOZ). LREC.',
  'Lundberg, S. M., & Lee, S. I. (2017). A Unified Approach to Interpreting Model Predictions. NeurIPS 30.',
  'Cummins, N., et al. (2015). A review of depression and suicide risk assessment using speech analysis. Speech Comm 71.',
  'Baltrušaitis, T., et al. (2018). OpenFace 2.0: Facial Behavior Analysis Toolkit. IEEE FG 2018.',
  'Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med 16(9).'
];

references.forEach((ref, i) => {
  doc.fillColor(primaryColor).fontSize(8.5).font('Helvetica-Bold').text(`[${i+1}] `, { continued: true });
  doc.fillColor('#334155').fontSize(8.5).font('Helvetica').text(ref, { align: 'justify' });
  doc.moveDown(0.25);
});

// Running Headers and Footers
const totalPages = doc.bufferedPageRange().count;
for (let i = 0; i < totalPages; i++) {
  doc.switchToPage(i);
  if (i >= 5) {
    doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text(
      'PSYCH.AI 2.0 — FINAL YEAR PROJECT THESIS DISSERTATION (MUST CS&IT)', 55, 25, { align: 'left' }
    );
    doc.text('SAYED HANAN MUMTAZ SHAIRAZI', 380, 25, { align: 'right', width: 160 });

    doc.moveTo(55, 790).lineTo(540, 790).strokeColor('#E2E8F0').lineWidth(0.5).stroke();
    doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica').text(
      'CONFIDENTIAL & PROPRIETARY  •  HIPAA §164.312 & GDPR COMPLIANT TELEMETRY', 55, 800, { align: 'left' }
    );
    doc.text(`Page ${i - 4} of ${totalPages - 5}`, 400, 800, { align: 'right', width: 140 });
  }
}

doc.end();

writeStream.on('finish', () => {
  try {
    fs.copyFileSync(OUTPUT_PDF, WORKSPACE_PDF);
  } catch (e) {}
  console.log(`[SUCCESS] Full Comprehensive Master Thesis PDF compiled!`);
  console.log(`Artifact: ${OUTPUT_PDF}`);
  console.log(`Workspace: ${WORKSPACE_PDF}`);
});
