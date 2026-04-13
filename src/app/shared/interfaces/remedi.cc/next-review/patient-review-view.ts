export interface PatientReviewView {
  review_Id?: number | null;
  emr_Doc_Id?: string | null;
  created_User?: string | null;

  review_Date?: string | null;        // ISO date from API
  doct_Review_Date?: string | null;   // ISO date from API

  remarks?: string | null;
  emp_Offl_Name?: string | null;
}
