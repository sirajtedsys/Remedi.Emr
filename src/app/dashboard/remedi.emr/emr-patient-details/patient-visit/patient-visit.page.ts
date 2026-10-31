
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {

  

  IonHeader,
  IonToolbar,

  IonButton,
  IonIcon,

  IonInput,
  IonTextarea,

  IonItem,
  IonLabel,
  IonCheckbox,

  IonSelect,
  IonSelectOption,
  IonModal,
  IonButtons,
  IonTitle

} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {

  saveOutline,
  refreshOutline,
  searchOutline,
  addCircleOutline,
  closeCircleOutline,
  chevronDownOutline,
  removeCircleOutline,
  eyeOutline,
  closeOutline,logoMicrosoft

} from 'ionicons/icons';


@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.page.html',
  styleUrls: ['./patient-visit.page.scss'],
  standalone: true,
  imports: [

    CommonModule,
    FormsModule,

  

    IonHeader,
    IonToolbar,
    
    IonButton,
    IonIcon,

    IonInput,
    IonTextarea,

    IonItem,
    IonLabel,
    IonCheckbox,

    IonSelect,
    IonSelectOption,
    IonModal,
    IonButtons,
    IonTitle
  ]
})
export class PatientVisitPage implements OnInit {



  // customer details

 
customerReg = {
  customerName: '',
  shortName: '',
  phoneNo: '',
  mobile: '',
  category: '',
  chargeType: '',
  place: '',
  email: '',
  payType: '',
  inpatientPayType: '',
  status: '',
  camp: false,
  makeInactive: false,
  startDate: '',
  endDate: ''
};

categoryList: string[] = [
  'General',
  'Corporate',
  'Insurance',
  'Government',
  'Staff'
];

chargeTypeList: string[] = [
  'Cash',
  'Credit',
  'Insurance',
  'Corporate'
];

placeList: string[] = [
  'Alappuzha',
  'Kochi',
  'Kottayam',
  'Thrissur',
  'Trivandrum'
];

payTypeList: string[] = [
  'Cash',
  'Credit',
  'Card',
  'UPI',
  'Insurance'
];

inpatientPayTypeList: string[] = [
  'Cash',
  'Insurance',
  'Corporate',
  'Government'
];


categoryList1: string[] = [
  'General',
  'Corporate',
  'Insurance',
  'Government',
  'Staff'
];

chargeTypeList1: string[] = [
  'Cash',
  'Credit',
  'Insurance',
  'Corporate'
];

placeList1: string[] = [
  'Alappuzha',
  'Kochi',
  'Kottayam',
  'Thrissur',
  'Trivandrum'
];

payTypeList1: string[] = [
  'Cash',
  'Credit',
  'Card',
  'UPI',
  'Insurance'
];

inpatientPayTypeList1: string[] = [
  'Cash',
  'Insurance',
  'Corporate',
  'Government'
];



resetCustomerDetails(): void {

  this.customerReg = {
    customerName: '',
    shortName: '',
    phoneNo: '',
    mobile: '',
    category: '',
    chargeType: '',
    place: '',
    email: '',
    payType: '',
    inpatientPayType: '',
    status: '',
    camp: false,
    makeInactive: false,
    startDate: '',
    endDate: ''
  };

}

//  customer details end


    // more detalis

    typeList: string[] = [
      'General',
      'Corporate',
      'Insurance',
      'Government',
      'Cash'
    ];
  
    providerList: string[] = [
      'None',
      'Aster',
      'Medi Assist',
      'Star Health',
      'ICICI',
      'HDFC Ergo'
    ];
  
    /*=========================================================
                        RIGHT PANEL CHECKBOXES
    =========================================================*/
  
    settingsList = [
      {
        label: 'Verification Mandatory',
        checked: false
      },
      {
        label: 'Registration Fee Needed',
        checked: false
      },
      {
        label: 'Bill Amount Round Off',
        checked: false
      },
      {
        label: 'Print Bill Summary',
        checked: false
      },
      {
        label: 'Show Outstanding',
        checked: false
      },
      {
        label: 'Enable Credit',
        checked: false
      },
      {
        label: 'Allow Refund',
        checked: false
      },
      {
        label: 'Allow Manual Discount',
        checked: false
      },
      {
        label: 'Print Consultation',
        checked: false
      },
      {
        label: 'Need Approval',
        checked: false
      },
      {
        label: 'Enable GST',
        checked: false
      },
      {
        label: 'Print Barcode',
        checked: false
      }
    ];  
   
    /*=========================================================
                            FORM MODEL
    =========================================================*/
  
    form = {
  
      address: '',
  
      contactPerson: '',
      contactPhone: '',
      contactMobile: '',
      fax: '',
  
      email: '',
      gstin: '',
  
      type: 'General',
      provider: 'None',
  
      discount: 0,
      creditLimit: 0,
      tds: 0,
  
      needDiscount: false,
      creditAllowed: false,
      custCreditAllowed: false,
  
      description: '',
      classification: '',
  
      revisitCaption: '',
      rateGroup: '',
  
      tpaDiscount: '',
  
      freeConsolidation: false,
  
      avoidConsultationFee: false,
      avoidRegistrationFee: false
  
    };
  
    /*=========================================================
                          SAVE
    =========================================================*/
  
    saveDetails2(): void {
  
      console.log('Patient Details');
  
      console.log(this.form);
  
      console.log(this.settingsList);
  
      
    }
  
    /*=========================================================
                        REFRESH / RESET
    =========================================================*/
  
    refreshForm(): void {
  
      this.form = {
  
        address: '',
  
        contactPerson: '',
        contactPhone: '',
        contactMobile: '',
        fax: '',
  
        email: '',
        gstin: '',
  
        type: 'General',
        provider: 'None',
  
        discount: 0,
        creditLimit: 0,
        tds: 0,
  
        needDiscount: false,
        creditAllowed: false,
        custCreditAllowed: false,
  
        description: '',
        classification: '',
  
        revisitCaption: '',
        rateGroup: '',
  
        tpaDiscount: '',
  
        freeConsolidation: false,
  
        avoidConsultationFee: false,
        avoidRegistrationFee: false
  
      };
  
      this.settingsList.forEach((item) => {
        item.checked = false;
      });
  
      console.log('Form Reset');
  
    }
    // more detalis end



    // export
 //=========================================
  // Search
  //=========================================

  searchText: string = '';

  //=========================================
  // Customer List
  //=========================================

  customers = [

    {
      customerName: 'BAJAJ FINANCE EMI',
      shortName: 'ACSC',
      category: 'Camp',
      chargeType: 'General ward',
      status: 'In Active'
    },

    {
      customerName: 'ROYAL SUNDARAM GENERAL INSURANCE CO LIMITED',
      shortName: 'AO',
      category: 'Club',
      chargeType: 'ICU',
      status: 'In Active'
    },

    {
      customerName: 'BAJAJ FINANCE',
      shortName: 'CCH',
      category: 'Branch',
      chargeType: 'General ward',
      status: 'In Active'
    },

    {
      customerName: 'ROYAL SUNDARAM GENERAL INSURANCE CO LIMITED',
      shortName: 'CS',
      category: 'Staff',
      chargeType: 'General ward',
      status: 'In Active'
    },

    {
      customerName: 'ROYAL SUNDARAM GENERAL INSURANCE CO LIMITED',
      shortName: 'CM',
      category: 'General',
      chargeType: 'General ward',
      status: 'In Active'
    }

  ];

  filteredCustomers = [...this.customers];

  //=========================================
  // Search Filter
  //=========================================

  filterTable(): void {

    const keyword = this.searchText
      .toLowerCase()
      .trim();

    if (!keyword) {

      this.filteredCustomers = [...this.customers];
      return;

    }

    this.filteredCustomers = this.customers.filter(customer =>

      customer.customerName.toLowerCase().includes(keyword) ||

      customer.shortName.toLowerCase().includes(keyword) ||

      customer.category.toLowerCase().includes(keyword) ||

      customer.chargeType.toLowerCase().includes(keyword) ||

      customer.status.toLowerCase().includes(keyword)

    );

  }

  //=========================================
  // Edit Button
  //=========================================

  editCustomer(customer: any): void {

    console.log('Edit Customer : ', customer);

    // Example:
    // this.router.navigate(['/customer-edit', customer.id]);

  }

  //=========================================
  // Export
  //=========================================

  exportExcel(): void {

    console.log('Export to Excel');

    // Integrate xlsx library here if required.

  }
    // export end







  fromDate = '2025-03-01';

  toDate = '2025-03-25';
  
  isReportModalOpen = false;


  openReportModal(): void {

    if (!this.fromDate || !this.toDate) {
      return;
    }
  
    this.isReportModalOpen = true;
  
  }
  
  closeReportModal(): void {
  
    this.isReportModalOpen = false;
  
  }






  
  patientReg = {

    // Left Column
    type: '',
    idCard: '',
    salutation: '',
    initial: '',
    dob: '',
    bloodGroup: '',
    mobile: '',

    // Center Column
    firstName: '',
    lastName: '',
    address: '',
    patientType: '',
    status: '',
    nationality: '',

    // Age
    approx: false,
    ageDay: '',
    ageMonth: '',
    ageYear: '',

    // Right Column
    customer: '',
    gender: '',
    payType: '',
    pincode: '',
    reference: ''

  };




  
  
  constructor() {

    addIcons({

      saveOutline,
      refreshOutline,
      searchOutline,
      addCircleOutline,
      closeCircleOutline,
      chevronDownOutline,
      removeCircleOutline,
      eyeOutline,
      closeOutline,
      logoMicrosoft
    });

  } 


  submitRegistration() {
    console.log('Registration Data', this.patientReg);
  }

  resetRegistration() {

    this.patientReg = {

      type: '',
      idCard: '',
      salutation: '',
      initial: '',
      dob: '',
      bloodGroup: '',
      mobile: '',

      firstName: '',
      lastName: '',
      address: '',
      patientType: '',
      status: '',
      nationality: '',

      approx: false,
      ageDay: '',
      ageMonth: '',
      ageYear: '',

      customer: '',
      gender: '',
      payType: '',
      pincode: '',
      reference: ''

    };

  }


  //==========================================
  // Contact Details
  //==========================================

  contact = {
    mobile: '',
    phone: '',
    email: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    relativeName: '',
    relationship: ''
  };

  //==========================================
  // Emergency Contact Person
  //==========================================

  contactPerson = {
    name: '',
    relationship: '',
    telephone: ''
  };

  //==========================================
  // Relationship Dropdown
  //==========================================

  relationshipList: string[] = [
    'Father',
    'Mother',
    'Brother',
    'Sister',
    'Spouse',
    'Relative',
    'Friend',
    'Guardian',
    'Others'
  ];

  //==========================================
  // Reset Form
  //==========================================

  resetForm(): void {

    this.contact = {
      mobile: '',
      phone: '',
      email: '',
      fatherName: '',
      motherName: '',
      spouseName: '',
      relativeName: '',
      relationship: ''
    };

    this.contactPerson = {
      name: '',
      relationship: '',
      telephone: ''
    };

  }

  //==========================================
  // Save
  //==========================================

  saveDetails(): void {

    const payload = {
      contact: this.contact,
      contactPerson: this.contactPerson
    };

    console.log('Saved Data', payload);

    

  }




  ngOnInit(): void {}

  /*====================================================
                    TOP TABS
  ====================================================*/

  selectedTab = 'patient';

  tabs = [

    {
      id: 'patient',
      name: 'Patient Visit'
    },

    {
      id: 'registration',
      name: 'New Registration'
    },

    {
      id: 'master',
      name: 'Patient Master'
    },

    {
      id: 'customer',
      name: 'Customer Registration'
    }

  ];

  changeTab(tab: string): void {

    this.selectedTab = tab;

  }

  /*====================================================
                  HEADER DETAILS
  ====================================================*/

  regDate = '20/07/2026';

  tokenNo = '23-4';

  observation = false;

  emergency = false;

  /*====================================================
                  RIGHT SIDE
  ====================================================*/

  reference = '';

  knowUs = 'News Paper';

  /*====================================================
                  PATIENT DATA
  ====================================================*/

  patient = {

    name: 'Bindu K T',

    age: 47,

    gender: 'Female',

    dob: '08/09/1978',

    mobile: '9847654437',

    email: 'fddsdsf@fddf.com',

    address:
      'Avinissery House Arattupuzha Palussery, Thrissur',

    payType: 'Cash',

    patientType: 'General',

    customer: '-'

  };

  /*====================================================
              VISIT ENTRY DETAILS
  ====================================================*/

  session = 'General';

  department = 'Gynaecology';

  doctorCode = '23000000011';

  doctor = 'LIP (GYNAC)';

  tokenType = 'Token';

  token = 34;

  /*====================================================
                    FEES
  ====================================================*/

  regFees = '';

  discPercent = '';

  discAmount = '';

  consultationFee = '';

  consultationDiscPercent = '';

  consultationDiscAmount = '';

  billAmount = '';

  /*====================================================
                    DETAILS
  ====================================================*/

  consPackage = false;

  cpp = false;

  followUp = false;

  claimForm = '';

  remarks = '';


  /*====================================================
  BUTTON ACTIONS
====================================================*/

save(): void {

console.log('Patient Saved');

console.log({
patient: this.patient,

visit: {

session: this.session,

department: this.department,

doctorCode: this.doctorCode,

doctor: this.doctor,

tokenType: this.tokenType,

token: this.token

},

fees: {

regFees: this.regFees,

discPercent: this.discPercent,

discAmount: this.discAmount,

consultationFee: this.consultationFee,

consultationDiscPercent: this.consultationDiscPercent,

consultationDiscAmount: this.consultationDiscAmount,

billAmount: this.billAmount

},

details: {

consPackage: this.consPackage,

cpp: this.cpp,

followUp: this.followUp,

claimForm: this.claimForm,

payType: this.patient.payType,

remarks: this.remarks

}

});

}

refresh(): void {

console.log('Refresh Clicked');

/*==========================================
VISIT DETAILS
==========================================*/

this.session = 'General';

this.department = 'Gynaecology';

this.doctorCode = '23000000011';

this.doctor = 'LIP (GYNAC)';

this.tokenType = 'Token';

this.token = 34;

/*==========================================
FEES
==========================================*/

this.regFees = '';

this.discPercent = '';

this.discAmount = '';

this.consultationFee = '';

this.consultationDiscPercent = '';

this.consultationDiscAmount = '';

this.billAmount = '';

/*==========================================
DETAILS
==========================================*/

this.consPackage = false;

this.cpp = false;

this.followUp = false;

this.claimForm = '';

this.remarks = '';




}


/*====================================================
            ADDITIONAL DETAILS
====================================================*/

regAdditionalDetails = {

  religion: '',

  occupation: '',

  organization: '',

  jobPlace: '',

  officialPhone: '',

  officialAddress: '',

  presentAddress: '',

  permanentAddress: '',

  fax: '',

  block: '',

  maritalStatus: '',

  patientCategory: '',

  employee: '',

  language: ''

};

/*====================================================
            DROPDOWNS
====================================================*/

religionList: string[] = [
  'Select',
  'Hindu',
  'Christian',
  'Muslim',
  'Sikh',
  'Buddhist',
  'Jain',
  'Others'
];

occupationList: string[] = [
  'Select',
  'Government',
  'Private',
  'Business',
  'Self Employed',
  'Student',
  'House Wife',
  'Retired',
  'Others'
];

organizationList: string[] = [
  'Select',
  'Company',
  'Hospital',
  'School',
  'College',
  'NGO',
  'Others'
];

jobPlaceList: string[] = [
  'Select',
  'Alappuzha',
  'Ernakulam',
  'Kottayam',
  'Thrissur',
  'Kozhikode',
  'Kannur',
  'Outside Kerala'
];

maritalStatusList: string[] = [
  'Select',
  'Single',
  'Married',
  'Divorced',
  'Widowed'
];

patientCategoryList: string[] = [
  'Select',
  'General',
  'Corporate',
  'Insurance',
  'VIP'
];

languageList: string[] = [
  'Select',
  'Malayalam',
  'English',
  'Tamil',
  'Hindi',
  'Kannada'
];

/*====================================================
            SAVE ADDITIONAL DETAILS
====================================================*/

saveAdditionalDetails(): void {

  console.log(this.regAdditionalDetails);

}

/*====================================================
            RESET ADDITIONAL DETAILS
====================================================*/

resetAdditionalDetails(): void {

  this.regAdditionalDetails = {

    religion: '',

    occupation: '',

    organization: '',

    jobPlace: '',

    officialPhone: '',

    officialAddress: '',

    presentAddress: '',

    permanentAddress: '',

    fax: '',

    block: '',

    maritalStatus: '',

    patientCategory: '',

    employee: '',

    language: ''

  };

}














/*====================================================
                  INSURANCE
====================================================*/

insuranceExpanded = true;

insuranceRows = [
  this.createInsuranceRow()
];

createInsuranceRow() {
  return {
    default: false,

    tpa: '',

    company: '',

    cardHolder: '',

    scheme: '',

    policy: '',

    validFrom: '',

    validTo: '',

    ded: '',

    dedAmt: '',

    coIns: '',

    phCo: '',

    dnCo: '',

    limit: ''
  };
}

toggleInsurance(): void {

  this.insuranceExpanded = !this.insuranceExpanded;

}

addInsuranceRow(): void {

  this.insuranceRows.push(
    this.createInsuranceRow()
  );

}

removeInsuranceRow(index: number): void {

  this.insuranceRows.splice(index, 1);

  if (!this.insuranceRows.length) {

    this.addInsuranceRow();

  }

}

insuranceFront(): void {

  console.log('Insurance Card Front');

}

insuranceBack(): void {

  console.log('Insurance Card Back');

}

saveInsurance(): void {

  console.log(this.insuranceRows);

}

closeInsurance(): void {

  console.log('Insurance Closed');

}

previousVisits = [
  {
    doctor: 'Anu Raveendran',
    date: '25/03/2025',
    type: 'Re-visit',
    image: 'assets/images/man.png'
  },
  {
    doctor: 'Anu Raveendran',
    date: '25/03/2025',
    type: 'Re-visit',
    image: 'assets/images/man.png'
  },
  {
    doctor: 'Anu Raveendran',
    date: '25/03/2025',
    type: 'Re-visit',
    image: 'assets/images/man.png'
  },
  {
    doctor: 'Anu Raveendran',
    date: '25/03/2025',
    type: 'Re-visit',
    image: 'assets/images/woman.png'
  },
  {
    doctor: 'Anu Raveendran',
    date: '26/03/2025',
    type: 'New Visit',
    image: 'assets/images/woman.png'
  },
  {
    doctor: 'Joseph',
    date: '28/03/2025',
    type: 'Follow Up',
    image: 'assets/images/man.png'
  },
  {
    doctor: 'John',
    date: '30/03/2025',
    type: 'Review',
    image: 'assets/images/man.png'
  },
  {
    doctor: 'David',
    date: '02/04/2025',
    type: 'Emergency',
    image: 'assets/images/woman.png'
  }
];

showMore = false;

get visibleVisits() {
  return this.previousVisits.slice(0, 4);
}

get remainingVisits() {
  return this.previousVisits.slice(4);
}

toggleMoreVisits() {
  this.showMore = !this.showMore;
}



}