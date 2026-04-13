 export interface CalendarDay {
  date: number | null;
  fullDate?: string;
  total?: number;
  booked?: number;
  available?: number;
  noConsultation?: boolean;
  DoctId?:string
  DoctName?:string
  BranchId?:string

  empId?:string
}