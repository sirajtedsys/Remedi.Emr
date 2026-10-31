export class HomeCareSave {
  HCS_ID: number = 0;

  PATIENT_NAME:string=''
  opno:string=''
  Address:string=''
  DocName:string=''
  CareGiverContact:string=''

  PATI_ID: string = '';
  EMR_DOC_ID: string = '';
  USER_ID: string = '';


  VISIT_TYPE: string | null = null;
  PRIMARY_CAREGIVER: string | null = null;
  SERVICE_REASON_VISIT: string | null = null;
  MAIN_CONCERNS: string | null = null;
  RED_FLAGS: string | null = null;
  CURRENT_ILLNESS: string | null = null;
  PAST_MEDICAL: string | null = null;
  ALLERGIES: string | null = null;

  MA_MEDICATION_ONE: string | null = null;
  MA_MEDICATION_TWO: string | null = null;
  MA_MEDICATION_THREE: string | null = null;

  MA_ADHERENCE_ONE: string | null = null;
  MA_ADHERENCE_TWO: string | null = null;
  MA_ADHERENCE_THREE: string | null = null;

  MA_ACTION_ONE: string | null = null;
  MA_ACTION_TWO: string | null = null;
  MA_ACTION_THREE: string | null = null;

  BP: string | null = null;
  PULSE: string | null = null;
  RESP_RATE: string | null = null;
  SPO2: string | null = null;
  TEMPERATURE: string | null = null;
  WEIGHT_KG: string | null = null;
  BMI: string | null = null;
  OXYGEN: string | null = null;

  ORIENTATION: string | null = null;
  NUTRITION: string | null = null;
  EQUIPMENT_AVAILABLE: string | null = null;

  CAREGIVER_AVAILABILITY: string | null = null;
  UNDERSTANDING: string | null = null;
  CAREGIVER_CONCERNS: string | null = null;

  SOCIAL: string | null = null;
  PROBLEM_LIST: string | null = null;
  OVERALL_RISK: string | null = null;
  CLINICAL_OUTLOOK: string | null = null;

  TREATMENT_CARE_PLAN: string | null = null;
  INVESTIGATIONS_ORDERS: string | null = null;
  PATIENT_CAREGIVER: string | null = null;

  NEXT_HOME_VISIT: Date | null = null;
  TELEPHONE_FOLLOW_UP: Date | null = null;

  ASSIGNED_HOME_CARE: string | null = null;
  WARNING_SIGNS: string | null = null;
  EMERGENCY_REFERRAL: string | null = null;

  PATIENT_GOALS: string | null = null;
  DECISION_MAKER: string | null = null;
  ESCALATION: string | null = null;

  HOME_CARE_CLINICIAN: string | null = null;
  HOME_CARE_DATE: Date | null = null;

  ACKNOWLEDGEMENT: string | null = null;
  SysData: string | null = null;
  FunctionalData: string | null = null;
  MasterData: string | null = null;
}