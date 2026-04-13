export interface AppointmentCallLogHistory {
  called_By: string;
  called_On: string;        // ISO datetime string
  called_Remarks: string;   // Y / N or remarks
  connect_Status: string;   // Picked / Not Picked
}
