export interface DigitalIntakeDtoInterface {

  digitalId: number;
  patiId: string;
  emrDocId: string;
  createUser: string;

  primaryComplaint: string | null;
  duration: string | null;
  subjectiveSeverity: string | null;
  identifiedTriggers: string | null;
  identifiedTriggersRmk: string | null;
  functionalImpact: string | null;

  appearance: string | null;
  speech: string | null;
  mood: string | null;
  affect: string | null;
  thoughtProcess: string | null;
  perception: string | null;
  cognition: string | null;
  insight: string | null;
  judgment: string | null;

  suicidalIdeation: string | null;
  homicidalIdeation: string | null;
  overallRiskLevel: string | null;
  protectiveFactorsPresent: string | null;

  neuroendocrineRegulation: string | null;
  inflammatoryIndicators: string | null;
  gutBrainAxisIndicators: string | null;

  averageSleepDuration: string | null;
  sleepQuality: string | null;
  dietPattern: string | null;
  physicalActivity: string | null;
  substances: string | null;
  dailyScreenExposure: string | null;

  interoceptiveAwarenessIssues: string | null;
  sensorySensitivity: string | null;
  commonTensionAreas: string | null;

  clientStatedGoal: string | null;
  preferredRegulation: string | null;
  preferredRegulationRmk: string | null;
  readinessForChange: string | null;

  clinicalImpression: string | null;
  initialRegulationPlan: string | null;
  followupInterval: string | null;
}
