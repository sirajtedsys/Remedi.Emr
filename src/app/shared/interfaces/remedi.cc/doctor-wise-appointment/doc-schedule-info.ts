export interface DoctorScheduleInfo {
  schedule_Day: string;                 // ISO date
  doct_Id: string;
  emp_Offl_Name: string;
  duty_Sess_Desc: string;

  total_Minute: number;
  sess1_Minute: number;
  sess2_Minute: number;
  sess3_Minute: number;
  total: number;
  token: number;

  start_Time: string;                   // ISO datetime
  end_Time: string;                     // ISO datetime

  token_Sess_1_Start_Time: string;
  token_Sess_2_Start_Time: string | null;
  token_Sess_3_Start_Time: string | null;

  token_Sess_1_End_Time: string;
  token_Sess_2_End_Time: string | null;
  token_Sess_3_End_Time: string | null;

  visit_Duration: number;
  nd_Minute: number;
}
