import { ICDSel } from "./ICDSel";
import { Vitals } from "./Vitals";

// UCHEMR.EMR_SP_PRESC_ADVICE
export class Complaint {
    PEMR_DOC_ID?: string | null = null;
    P_PRESC_ADV?: string | null = null;
    P_INVEST_ADV?: string | null = null;
    P_RADIO_ADV?: string | null = null;
    P_CREATED_USER?: string | null = null;
    P_TYPE?: number = 0; // assuming default value is 0 for integer types
    SYSTEM_EXAM?:string|null=null
    PHYSICAL_EXAM?:string|null=null
    SYSTEMIC?:string|null=null
    LOCALEX?:string|null=null
  // UCHEMR.SP_ONLINE_TAB_PMH_OTHER_SAVE
    PATIID?: string | null = null;
    p_mh_Other?: string | null = null;
    P_FAMILY_MED_HISTORY?: string | null = null;
    P_DOCID?: string | null = null;
    P_EMR_DOC_ID?: string | null = null;
  // UCHEMR.SP_ONLINE_COMP_IMMU_SAVE
    EDOCID?: string | null = null;
    DOCID?: string | null = null;
    COMPLNT?: string | null = null;
    HSTRY?: string | null = null;
    DOCT_REMARKS?: string | null = null;
    PRSNT_ILLNESS?: string | null = null;
    IMMUN?: string | null = null;
    GENRMRKS?: string | null = null;
    I_TREATMENT_REMARKS?: string | null = null;
    P_TREATMENT_REMARKS_NEW?: string | null = null;
    P_NOTES?: string | null = null;
    P_DOCT_NOTES?: string | null = null;
  // UCHEMR.SP_ONLINE_PATI_OPTN_NOTE_SAVE
    EDOC_ID?: string | null = null;
    P_OPERTN_NOTE?: string | null = null;
    USER_ID?: string | null = null;
  // UCHEMR.SP_ONLINE_DOC_ICDVISIT_INS
    CREATEUSR?: string | null = null;
    ICDSL_NO?: number = 0; // assuming default value is 0 for integer types
    ICDDIGNOSIS?: string | null = null;
    ICD_DIGNOSIS?: string | null = null;
    
    PATI?: string | null = null;
    PATI_ID?: string | null = null;
    BRANCHCODE?: string | null = null;
  // UCHEMR.EMR_BASIC_ASSESSMENT
    CURRENT_MEDICATION?: string | null = null;
   
 
    vital = new  Vitals()
    IcdList:ICDSel[]=[]

    // PATIID: string | null =null;
    ALLERGYDTLS: string | null =null;
    P_ALLERGY_STATUS: string | null =null;
    P_DOCT_ID: string | null =null;

    P_MEDI_SUR_HISTORY: string | null =null;
    P_PATI_ADVICE: string | null =null;
    P_PATI_EDU: string | null =null;
    P_PATI_COMORBIDITY: string | null =null;
    P_PSYCHO_SOCIAL: string | null =null;
    edu:string ='No'
    adv:string = 'No'

  }
  