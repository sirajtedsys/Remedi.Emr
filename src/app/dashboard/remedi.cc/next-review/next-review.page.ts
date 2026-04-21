import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonTextarea,
  IonInput,
} from '@ionic/angular/standalone';
// import { NextReviewService } from 'src/app/shared/services/next-review/next-review.service';
import { PatientListDatewiseItem } from 'src/app/shared/interfaces/patient-list/patient-list-date-wise-item';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { PatientReviewDto } from 'src/app/shared/class/next-review/next-review-dto';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { PatientReviewView } from 'src/app/shared/interfaces/next-review/patient-review-view';
import { NextReviewService } from 'src/app/shared/services/next-review/next-review.service';

@Component({
  selector: 'app-next-review',
  templateUrl: './next-review.page.html',
  styleUrls: ['./next-review.page.scss'],
  standalone: true,
   imports: [
    IonItem,
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonLabel,
    ReactiveFormsModule,
    IonTextarea,
    IonInput
  ],
})
export class NextReviewPage implements OnInit {

  reviewForm!: FormGroup;

  paitentData!: PatientListDatewiseItem
  reviewList: PatientReviewView[] = []

  emrDocid: any
  // doctorId: any
  patId: any
  constructor(
    private fb: FormBuilder,
    private nextReviewService: NextReviewService,
    private shared: SharedDataService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) { 
    this.getPatientDataFromShared()
  }

  ngOnInit() {
    this.initForm();
  }

  getPatientDataFromShared() {
    this.paitentData = this.shared.getPatient()
    console.log(this.paitentData)
    this.emrDocid = this.paitentData.emR_DOC_ID;
    this.patId = this.paitentData.patI_ID;
    this.getExistingReviewDetails(this.emrDocid)

  }


  initForm() {
    this.reviewForm = this.fb.group({
      reviewDays: [''],
      reviewDate: [''],
      remarks: [''],
      reviewId: ['']
    });
  }


  calculateDate() {
    const days = this.reviewForm.value.reviewDays;

    if (!days) return;

    const dateString = this.datePipe.transform(this.paitentData.creatE_DATE, 'yyyy-MM-dd') ?? '';
    const today = dateString ? new Date(dateString) : new Date();
    today.setDate(today.getDate() + Number(days));

    const formatted =
      today.getFullYear() + '-' +
      String(today.getMonth() + 1).padStart(2, '0') + '-' +
      String(today.getDate()).padStart(2, '0');

    this.reviewForm.patchValue({
      reviewDate: formatted
    });
  }

  calculateDaysBetween(fromDate: any, toDate: any) {

  if (!fromDate || !toDate) return 0;

  const d1 = new Date(fromDate);
  const d2 = new Date(toDate);

  // remove time part (important)
  d1.setHours(0,0,0,0);
  d2.setHours(0,0,0,0);

  const diffTime = d2.getTime() - d1.getTime();

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}



  async submit() {
    const reviewData: PatientReviewDto = {
      EmrDocId: this.emrDocid,
      ReviewId:this.reviewForm.value.reviewId,
      // : this.patId,
      ReviewDate: this.reviewForm.value.reviewDate,
      Remarks: this.reviewForm.value.remarks,
      DoctorReviewDate: this.reviewForm.value.reviewDate,
    };
    console.log(reviewData,this.reviewForm);
    
    if(reviewData.ReviewDate!=null && reviewData.ReviewDate!='')    {
      // const reviewDate = new Date(reviewData.ReviewDate);
      // const today = new Date();
         (await this.nextReviewService.SavePatientReviewAsync(reviewData)).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status == 200) {
          this.notificationService.showNotification(res.message, 'success')
          this.getExistingReviewDetails(this.emrDocid)
          this.reviewForm.reset();
        }
        else
        {
          this.notificationService.showNotification(res.message, 'error')
        }


      },
      error: (err) => {
        console.error(err);
      }
    });
    }
    else
    {
      this.notificationService.showNotification('Please select a review date.', 'error');
    }
 

  }


  async getExistingReviewDetails(emrDocId: string) {
    (await this.nextReviewService.GetPatientReviewDetailsAsync(emrDocId)).subscribe({
      next: (res: any) => {
        console.log(res);
        this.reviewList = res ?? []

      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  editReview(review: PatientReviewView) {
    console.log(review);
    
    this.reviewForm.patchValue({
      reviewId: review.review_Id,
      reviewDays: this.calculateDaysBetween(this.paitentData.creatE_DATE, review.review_Date),
      reviewDate: review.review_Date ? new Date(review.review_Date).toISOString().split('T')[0] : '',
      remarks: review.remarks
    });
  }

  clearForm() {
    this.reviewForm.reset();
  }

  // patch

}
