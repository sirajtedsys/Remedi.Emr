export interface NeuroPsychobiologicalAssessment {

  /* ===================== MASTER ===================== */
  npA_ID: number;
  patI_ID: string;
  emR_DOC_ID: string;
  creatE_USER: string;
  creatE_DATE: string;   // ISO date string
  updatE_USER: string | null;
  updatE_DATE: string | null;

  /* ===================== SECTION 1 ===================== */
  seekinG_SUPPORT: string | null;
  duratioN_CONCERN: string | null;
  intensity: string | null;
  frequency: string | null;
  triggers: string | null;
  impact: string | null;
  owN_WORDS: string | null;
  changE_IMPROVE: string | null;
  joB_SATISFACTION: string | null;
  sociaL_SUPPORT: string | null;
  livinG_ENVIRONMENT: string | null;
  currenT_LIFE: string | null;

  /* ===================== SECTION 2 ===================== */
  durinG_TASKS: string | null;
  dissociation: string | null;
  feeL_CONNECTED: string | null;
  consciouS_NOTES: string | null;
  appearance: string | null;
  speech: string | null;
  mood: string | null;
  affect: string | null;
  thoughT_PROCESS: string | null;
  thoughT_CONTENT: string | null;
  mentaL_NOTES: string | null;
  perception: string | null;
  perceptioN_RMK: string | null;
  orientation: string | null;
  memory: string | null;
  attention: string | null;
  insight: string | null;

  /* ===================== SECTION 3 ===================== */
  prenatal: string | null;
  prenataL_RMK: string | null;
  attachment: string | null;
  developmental: string | null;
  developmentaL_RMK: string | null;
  early: string | null;
  trauma: string | null;
  traumA_RMK: string | null;
  academics: string | null;
  childhood: string | null;
  childhooD_RMK: string | null;
  identity: string | null;
  major: string | null;
  relationship: string | null;
  role: string | null;

  /* ===================== SECTION 4 ===================== */
  cortisol: string | null;
  thyroid: string | null;
  seX_HORMONES: string | null;
  insulin: string | null;
  oxytocin: string | null;
  melatonin: string | null;
  inflammatory: string | null;
  inflammatorY_NOTES: string | null;
  digestive: string | null;
  digestivE_RMK: string | null;
  antibiotic: string | null;
  food: string | null;
  emotional: string | null;
  family: string | null;
  familY_RMK: string | null;
  neurodevelopmental: string | null;
  genetic: string | null;
  familY_HISTORY: string | null;
  temperament: string | null;
  sectioN4_EARLY: string | null;
  genetiC_TEST: string | null;

  /* ===================== SECTION 5 ===================== */
  amygdala: string | null;
  amygdalA_NOTES: string | null;
  hippocampus: string | null;
  hippocampuS_NOTES: string | null;
  prefrontal: string | null;
  prefrontaL_NOTES: string | null;
  anterior: string | null;
  anterioR_NOTES: string | null;
  insula: string | null;
  insulA_NOTES: string | null;

  /* ===================== SECTION 6 ===================== */
  describE_YOURSELF: string | null;
  core: string | null;
  beliefs: string | null;
  introversion: string | null;
  openness: string | null;
  sectioN6_EMOTIONAL: string | null;
  self: string | null;
  empathy: string | null;
  risk: string | null;
  copinG_STYLES: string | null;
  copinG_STYLES_CHK: string | null;
  copinG_STYLES_RMK: string | null;

  /* ===================== SECTION 7 ===================== */
  main: string | null;
  bodY_SYMPTOMS: string | null;
  history: string | null;
  historY_RMK: string | null;
  emotions: string | null;
  anger: string | null;
  sadness: string | null;
  fear: string | null;
  style: string | null;
  sensitivity: string | null;
  overload: string | null;
  calming: string | null;

  /* ===================== SECTION 8 ===================== */
  morning: string | null;
  evening: string | null;
  screen: string | null;
  caffeine: string | null;
  alcohol: string | null;
  sleeP_HOURS: string | null;
  sleeP_QUALITY: string | null;
  dreams: string | null;
  meal: string | null;
  protein: string | null;
  sectioN8_EMOTIONAL: string | null;
  restriction: string | null;
  activity: string | null;
  exercise: string | null;
  bodY_CONNECTION: string | null;

  /* ===================== SECTION 9 ===================== */
  abouT_YOURSELF: string | null;
  likE_FOR_YOU: string | null;
  preferred: string | null;
  previous: string | null;
  readiness: string | null;
  life: string | null;
}
