export class DigitalIntakeDto {

  DigitalId?: number=0;
  PatiId?: string;
  EmrDocId?: string;
  CreateUser?: string;

  PrimaryComplaint?: string;
  Duration?: string;
  SubjectiveSeverity?: string;
  IdentifiedTriggers?: string;
  IdentifiedTriggersRmk?: string;
  FunctionalImpact?: string;

  Appearance?: string;
  Speech?: string;
  Mood?: string;
  Affect?: string;
  ThoughtProcess?: string;
  Perception?: string;
  Cognition?: string;
  Insight?: string;
  Judgment?: string;

  SuicidalIdeation?: string;
  HomicidalIdeation?: string;
  OverallRiskLevel?: string;
  ProtectiveFactorsPresent?: string;

  NeuroendocrineRegulation?: string;
  InflammatoryIndicators?: string;
  GutBrainAxisIndicators?: string;

  AverageSleepDuration?: string;
  SleepQuality?: string;
  DietPattern?: string;
  PhysicalActivity?: string;
  Substances?: string;
  DailyScreenExposure?: string;

  InteroceptiveAwarenessIssues?: string;
  SensorySensitivity?: string;
  CommonTensionAreas?: string;

  ClientStatedGoal?: string;
  PreferredRegulation?: string;
  PreferredRegulationRmk?: string;
  ReadinessForChange?: string;

  ClinicalImpression?: string;
  InitialRegulationPlan?: string;
  FollowupInterval?: string;

}
