export interface PatientVisitInfo {
  Type: string | null;
  DoctorId: string | null;
  RowNumber: string | null;
  CreateDate: string | null;
  RegistrationType: string | null;
  RegistrationTime: string | null;
  VisitTime: string | null;
  DocumentId: string | null;
  CPRId: string | null;
  ClaimId: string | null;
  VisitId: string | null;
  VisitType: string | null;
  VIPStatus: string | null;
  PatientId: string | null;
  PatientOpNo: string | null;
  Observation: string | null;
  PendingPayment: string | null;
  PatientFirstName: string | null;
  PatientName: string | null;
  DoctorName: string | null;
  Gender: string | null;
  DepartmentId: string | null;
  DepartmentName: string | null;
  CaseSheetGender: string | null;
  VisitStatus: string | null;
  AllergyDetails: string | null;
  Remarks: string | null;
  Age: string | null;
  TokenNumber: string | null;
  TokenType: string | null;
  Address: string | null;
  Mobile: string | null;
  BookingTokenType: string | null;
  DetailsId: string | null;
  NextTokenStatus: string | null;
  TokenWarning: string | null;
  TokenCallStatus: string | null;
  BookingVisitDate: string | null;
  VitalsSaved: string | null;
  GroupStatus: string | null;
  PatientTypeId: string | null;
  TeleAppointment: string | null;
  ChatSessionId: string | null;
  PatientActive: string | null;
  EndTime: string | null;
  InsuranceStatus: string | null;
  VitalsImage: string | null;
  LuxuryPackageImage: string | null;
  ClinicTriageImage: string | null;
  EmergencyTriageColor: string | null;
  NewVisitImage: string | null;
}


export interface PatientGeneralDetails {
  PATI_OPNO: string;
  PatientName: string;
  VISIT_STATUS: string;
  AGE: string; // from Oracle string output
  DOB: string; // use string format like 'dd/MM/yyyy' from backend
  PATI_GENDER: string;
  TRD_TERRITORY: string;
  PATI_FIRST_NAME: string;
  CPRNO: string;
  PATI_MOBILE: string;
  EMR_DOC_DATE: string; // 'dd/MM/yyyy hh:mm AM/PM'
  IDCARD_NAME: string;
  IDCARD_NO: string;
  ADDRESS: string;
  Location: string;
  FULL_AGE: string;
}


export interface PatientMedicalHistory {
  MAJOR_EVENTS: string;
  ALLERGIES: string;
  ONGOING_MED_PROBLEMS: string;
  FAMILY_MED_HISTORY: string;
  PREVENTATIVE_CARE: string;
  SOCIAL_HISTORY: string;
  NUTRI_HISTORY: string;
  DEVELOPMENTAL_HISTORY: string;
  MENSTRUALHIS: string;
  OBSTETRACTRICHIS: string;
  MEDICATIONS: string;
  BIRTH_HISTORY: string;
  OTHERHABIT: string;
  SMOKINGHABIT: string;
  MH_HEARTDISEASE: string;
  MH_DIABETES: string;
  MH_HYPERTENSION: string;
  MH_ALLERGY: string;
  MH_G6PD: string;
  MH_PREGNANCY: string;
  MH_BLEEDING: string;
  MH_LIVERDISEASE: string;
  MH_RHEUMATIC_FEVER: string;
  MH_ASTHMA: string;
  MH_OTHER: string;
  MH_SICKLCELL: string;
  MH_DRUGS: string;
  MH_THALASSEMIA: string;
  ALLERGY_STATUS: string;
}

export interface DocumentInfo {
  SIGNED_STATUS: string;
  DOCT_ID: string;
  EMP_OFFL_NAME: string; // Doctor's official name
  VISIT_STATUS: string;
  DOCT_REMARKS: string;
  DOCT_IMMUN: string;
  PRSNT_ILLNESS: string;
  GEN_REMARKS: string;
}


