export class PatientReviewDto {
  ReviewId?: number;
  EmrDocId?: string;
  ReviewDate?: Date | string;
  Remarks?: string;
  DoctorReviewDate?: Date | string;
}
