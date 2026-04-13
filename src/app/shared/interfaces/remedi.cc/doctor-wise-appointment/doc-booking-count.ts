export interface DoctorBookingCount {
  booked: number;
  branch_Id: string;
  bk_Visit_Date: string; // ISO date string from API
  doct_Id: string;
}
