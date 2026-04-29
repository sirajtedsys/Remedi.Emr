import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },

  {
    path: 'prescription',
    loadComponent: () =>
      import('./reports/prescription/prescription.page').then(
        (m) => m.PrescriptionPage
      ),
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
    children: [
      {
        path: '',
        redirectTo: 'patient-list/0',
        pathMatch: 'full',
      },

      {
        path: 'procedure-list',
        loadComponent: () =>
          import(
            './dashboard/remedi.cc/procedure-list/procedure-list.page'
          ).then((m) => m.ProcedureListPage),
      },

      {
        path: 'patient-list/:patientId',
        loadComponent: () =>
          import('./dashboard/patient-list/patient-list.page').then(
            (m) => m.PatientListPage
          ),
      },

      {
        path: 'procedure-booking',
        loadComponent: () =>
          import(
            './dashboard/remedi.cc/procedure-booking/procedure-booking.page'
          ).then((m) => m.ProcedureBookingPage),
      },

      {
        path: 'doctor-wise-appointment',
        loadComponent: () =>
          import(
            './dashboard/remedi.cc/doc-wise-appointment/doctor-wise-appointment/doctor-wise-appointment.page'
          ).then((m) => m.DoctorWiseAppointmentPage),
      },
      {
        path: 'doc-daily-slots',
        loadComponent: () =>
          import(
            './dashboard/remedi.cc/doc-wise-appointment/doc-daily-slots/doc-daily-slots.page'
          ).then((m) => m.DocDailySlotsPage),
      },

      {
        path: 'appointment-details',
        loadComponent: () =>
          import(
            './dashboard/remedi.cc/appointment-details/appointment-details.page'
          ).then((m) => m.AppointmentDetailsPage),
      },
      {
        path: 'patientmsg-request',
        loadComponent: () =>
          import(
            './dashboard/remedi.cc/patientmsg-request/patientmsg-request.page'
          ).then((m) => m.PatientmsgRequestPage),
      },
      {
        path: 'patient-data',
        loadComponent: () =>
          import('./dashboard/remedi.cc/patient-data/patient-data.page').then(
            (m) => m.PatientDataPage
          ),
        children: [
          { path: '', redirectTo: 'digital-intake', pathMatch: 'full' },
          {
            path: 'digital-intake',
            loadComponent: () =>
              import(
                './dashboard/remedi.cc/digital-intake/digital-intake.page'
              ).then((m) => m.DigitalIntakePage),
          },
          {
            path: 'npassessment',
            loadComponent: () => import('./dashboard/remedi.cc/npassessment/npassessment.page').then(m => m.NpassessmentPage)
          },
          {
            path: 'treatment-summary',
            loadComponent: () => import('./dashboard/remedi.cc/treatment-summary/treatment-summary.page').then(m => m.TreatmentSummaryPage)
          },
          {
            path: 'patient-message',
            loadComponent: () => import('./dashboard/remedi.cc/patient-message/patient-message.page').then(m => m.PatientMessagePage)
          },
          {
            path: 'progress-note',
            loadComponent: () => import('./dashboard/remedi.cc/progress-note/progress-note.page').then(m => m.ProgressNotePage)
          },
          {
            path: 'orders',
            loadComponent: () => import('./dashboard/remedi.cc/orders/orders.page').then(m => m.OrdersPage)
          },
          {
            path: 'next-review',
            loadComponent: () => import('./dashboard/remedi.cc/next-review/next-review.page').then(m => m.NextReviewPage)
          },

        ],
      },


      {
        path: 'emr-patient-details',
        loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/emr-patient-details.page').then(m => m.EmrPatientDetailsPage),
        children: [
          { path: '', redirectTo: 'prescription', pathMatch: 'full' },
          {
            path: 'prescription',
            loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/prescription/prescription.page').then(m => m.PrescriptionPage)
          },
          {
            path: 'complaints',
            loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/complaints/complaints.page').then(m => m.ComplaintsPage)
          },
          {
            path: 'psychiatric-assesment',
            loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/psychiatric-assesment.page').then(m => m.PsychiatricAssesmentPage),
            children: [
              { path: '', redirectTo: 'psychiatry-adult', pathMatch: 'full' },
          
              {
                path: 'psychiatry-adult',
                loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/psychiatry-adult/psychiatry-adult.page').then(m => m.PsychiatryAdultPage)
              },
              {
                path: 'psychiatry-child',
                loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/psychiatry-child/psychiatry-child.page').then(m => m.PsychiatryChildPage)
              },
              {
                path: 'complaints',
                loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/complaints/complaints.page').then(m => m.ComplaintsPage)
              },
              {
                path: 'order-test',
                loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/order-test/order-test.page').then(m => m.OrderTestPage)
              },
              {
                path: 'medicine-prescription',
                loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/medicine-prescription/medicine-prescription.page').then(m => m.MedicinePrescriptionPage)
              },
              {
                path: 'treatment-plan',
                loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/treatment-plan/treatment-plan.page').then(m => m.TreatmentPlanPage)
              },
              {
                path: 'psychiatry-summary',
                loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/psychiatry-summary/psychiatry-summary.page').then(m => m.PsychiatrySummaryPage)
              },
            ]
          }



        ]
      },
    ],
  },
  {
    path: 'sidebar',
    loadComponent: () =>
      import('./dashboard/components/sidebar/sidebar.page').then(
        (m) => m.SidebarPage
      ),
  },
  {
    path: 'sidebar',
    loadComponent: () =>
      import('./dashboard/components/sidebar/sidebar.page').then(
        (m) => m.SidebarPage
      ),
  },
  {
    path: 'dashboard-header',
    loadComponent: () =>
      import(
        './dashboard/components/dashboard-header/dashboard-header.page'
      ).then((m) => m.DashboardHeaderPage),
  },
  {
    path: 'patient-table',
    loadComponent: () =>
      import('./dashboard/components/patient-table/patient-table.page').then(
        (m) => m.PatientTablePage
      ),
  },
  {
    path: 'mobile-card',
    loadComponent: () =>
      import('./dashboard/components/mobile-card/mobile-card.page').then(
        (m) => m.MobileCardPage
      ),
  },
  {
    path: 'appointment-status',
    loadComponent: () =>
      import(
        './dashboard/components/appointment-status/appointment-status.page'
      ).then((m) => m.AppointmentStatusPage),
  },

  {
    path: 'config',
    loadComponent: () =>
      import('./components/enter-url/enter-url.page').then(
        (m) => m.EnterUrlPage
      ),
  },

  {
    path: 'procedure-booking',
    loadComponent: () =>
      import(
        './dashboard/remedi.cc/procedure-booking/procedure-booking.page'
      ).then((m) => m.ProcedureBookingPage),
  },
  {
    path: 'proc-booking-reg',
    loadComponent: () =>
      import(
        './dashboard/remedi.cc/procedure-booking/proc-booking-reg/proc-booking-reg.page'
      ).then((m) => m.ProcBookingRegPage),
  },
  {
    path: 'booking-actions',
    loadComponent: () =>
      import(
        './dashboard/remedi.cc/procedure-booking/booking-actions/booking-actions.page'
      ).then((m) => m.BookingActionsPage),
  },

  {
    path: 'no-data',
    loadComponent: () =>
      import('./components/no-data/no-data.page').then((m) => m.NoDataPage),
  },
  {
    path: 'procedure-note',
    loadComponent: () =>
      import(
        './dashboard/remedi.cc/procedure-list/procedure-note/procedure-note.page'
      ).then((m) => m.ProcedureNotePage),
  },
  {
    path: 'patient-booking-registration',
    loadComponent: () =>
      import(
        './dashboard/remedi.cc/doc-wise-appointment/patient-booking-registration/patient-booking-registration.page'
      ).then((m) => m.PatientBookingRegistrationPage),
  },
  {
    path: 'appointment-actions',
    loadComponent: () =>
      import(
        './dashboard/remedi.cc/doc-wise-appointment/appointment-actions/appointment-actions.page'
      ).then((m) => m.AppointmentActionsPage),
  },


  {
    path: 'item-list-table',
    loadComponent: () => import('./shared/item-list-table/item-list-table.page').then(m => m.ItemListTablePage)
  },
  {
    path: 'know-case',
    loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/complaints/know-case/know-case.page').then(m => m.KnowCasePage)
  },
  {
    path: 'symptoms',
    loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/complaints/symptoms/symptoms.page').then(m => m.SymptomsPage)
  },


  
  {
    path: 'p-a-history',
    loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/psychiatry-adult/p-a-history/p-a-history.page').then( m => m.PAHistoryPage)
  },
  {
    path: 'p-a-examination',
    loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/psychiatry-adult/p-a-examination/p-a-examination.page').then( m => m.PAExaminationPage)
  },
  {
    path: 'p-a-formulation',
    loadComponent: () => import('./dashboard/remedi.emr/emr-patient-details/psychiatric-assesment/psychiatry-adult/p-a-formulation/p-a-formulation.page').then( m => m.PAFormulationPage)
  },






];
