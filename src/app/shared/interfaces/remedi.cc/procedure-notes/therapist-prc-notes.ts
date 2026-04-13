export interface TherapistPrcNote {
  noteId: number;
  startDate: string;          // or Date
  prcBkMachineId: number | null;
  createUser: string;
  createDate: string;         // or Date
  endDate: string | null;
  prcId: string;
  note: string;
  comments: string | null;
  billHdrId?: string;         // optional (not in DB)
}