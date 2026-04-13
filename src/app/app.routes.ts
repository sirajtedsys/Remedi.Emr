import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },


  {
    path: 'prescription',
    loadComponent: () => import('./reports/prescription/prescription.page').then(m => m.PrescriptionPage)
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then(m => m.DashboardPage),
    children: [
      {
        path: '',
        redirectTo: 'patient-list/0',
        pathMatch: 'full',
      },

      {
        path: 'procedure-list',
        loadComponent: () => import('./dashboard/remedi.cc/procedure-list/procedure-list.page').then(m => m.ProcedureListPage)
      },

      {
        path: 'patient-list/:patientId',
        loadComponent: () => import('./dashboard/patient-list/patient-list.page').then(m => m.PatientListPage)
      },

      {
        path: 'procedure-booking',
        loadComponent: () => import('./dashboard/remedi.cc/procedure-booking/procedure-booking.page').then(m => m.ProcedureBookingPage)
      },

      {
        path: 'doctor-wise-appointment',
        loadComponent: () => import('./dashboard/remedi.cc/doc-wise-appointment/doctor-wise-appointment/doctor-wise-appointment.page').then(m => m.DoctorWiseAppointmentPage)
      },
      {
        path: 'doc-daily-slots',
        loadComponent: () => import('./dashboard/remedi.cc/doc-wise-appointment/doc-daily-slots/doc-daily-slots.page').then(m => m.DocDailySlotsPage)
      },

      {
        path: 'appointment-details',
        loadComponent: () => import('./dashboard/remedi.cc/appointment-details/appointment-details.page').then(m => m.AppointmentDetailsPage)
      },


    ]
  },
  {
    path: 'sidebar',
    loadComponent: () => import('./dashboard/components/sidebar/sidebar.page').then(m => m.SidebarPage)
  },
  {
    path: 'sidebar',
    loadComponent: () => import('./dashboard/components/sidebar/sidebar.page').then(m => m.SidebarPage)
  },
  {
    path: 'dashboard-header',
    loadComponent: () => import('./dashboard/components/dashboard-header/dashboard-header.page').then(m => m.DashboardHeaderPage)
  },
  {
    path: 'patient-table',
    loadComponent: () => import('./dashboard/components/patient-table/patient-table.page').then(m => m.PatientTablePage)
  },
  {
    path: 'mobile-card',
    loadComponent: () => import('./dashboard/components/mobile-card/mobile-card.page').then(m => m.MobileCardPage)
  },
  {
    path: 'appointment-status',
    loadComponent: () => import('./dashboard/components/appointment-status/appointment-status.page').then(m => m.AppointmentStatusPage)
  },





  {
    path: 'config',
    loadComponent: () => import('./components/enter-url/enter-url.page').then(m => m.EnterUrlPage)
  },

  {
    path: 'procedure-booking',
    loadComponent: () => import('./dashboard/remedi.cc/procedure-booking/procedure-booking.page').then(m => m.ProcedureBookingPage)
  },
  {
    path: 'proc-booking-reg',
    loadComponent: () => import('./dashboard/remedi.cc/procedure-booking/proc-booking-reg/proc-booking-reg.page').then(m => m.ProcBookingRegPage)
  },
  {
    path: 'booking-actions',
    loadComponent: () => import('./dashboard/remedi.cc/procedure-booking/booking-actions/booking-actions.page').then(m => m.BookingActionsPage)
  },


  {
    path: 'no-data',
    loadComponent: () => import('./components/no-data/no-data.page').then(m => m.NoDataPage)
  },
  {
    path: 'procedure-note',
    loadComponent: () => import('./dashboard/remedi.cc/procedure-list/procedure-note/procedure-note.page').then(m => m.ProcedureNotePage)
  },


  {
    path: 'patient-booking-registration',
    loadComponent: () => import('./dashboard/remedi.cc/doc-wise-appointment/patient-booking-registration/patient-booking-registration.page').then(m => m.PatientBookingRegistrationPage)
  },
  {
    path: 'appointment-actions',
    loadComponent: () => import('./dashboard/remedi.cc/doc-wise-appointment/appointment-actions/appointment-actions.page').then(m => m.AppointmentActionsPage)
  },



];
