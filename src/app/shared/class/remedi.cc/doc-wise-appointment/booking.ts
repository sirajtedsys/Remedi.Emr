export class Booking {
    BkId?: string;
    BkDate?: Date;
    BktypId?: string;
    PatiId?: string;
    BkVisitDate?: Date;
    SessId?: string;
    DoctId?: string;
    EmpId?: string;
    BkTokenNo?: number;
    BkFeeColl?: string;
    BkPaytype?: string;
    CutId?: string;
    BkAdvbookFee?: number;
    BkSpecialFee?: number;
    BkOpvisitDate?: Date;
    OpvisitId?: string;
    BkOpvisitId?: string;
    CreateUser?: string;
    CreateDate?: Date;
    UpdateUser?: string;
    UpdateDate?: Date;
    ActiveYear?: number;
    BranchCode?: string;
    BkTotal?: number;
    BkCancel?: string = "N";
    BkPrintStatus?: string;
    BkVisitTime?: Date;
    BkOpvisitStatus?: string;
    SctId?: string;
    BkNewReg?: string;
    BkPatName?: string;
    BkPatAddr1?: string;
    BkPatAddr2?: string;
    BkPatAddr3?: string;
    BkPatAddr4?: string;
    BkContactNo?: string;
    BkPlaceId?: string;
    BktsId?: string;
    BkCancelReason?: string;
    DenoSaved?: string;
    OpcdId?: string;
    BkAllotType: string = "B";
    BkBlockDesc?: string;
    FinYearId?: string;
    GLedgerId?: string;
    FYearId?: number;
    TokenPrefix?: string;
    BktsSlot?: string;
    BktsSlotType?: string;
    BkPatAge?: string;
    BkPatSaltId?: string;
    BkPatTypeId?: string;
    BkTokenType: string = 'B';
    BkPatAgeMonth?: number;
    BkPatAgeDay?: number;
    BkPatGender?: string;
    BkCancelDate?: Date;
    CancelUser?: string;
    DoctProc?: string;
    IssueMark?: string = 'N';
    ChartPrint?: string = 'N';
    AppConfirm?: string;
    AppConfirmedBy?: string;
    AppConfirmedOn?: Date;
    AppConfirmRemark?: string;
    ChatSessionId?: string;
    PatientActive?: string;
    IsTeleAppointment?: string;
    OnlineAppointment?: string;
    AppointmentConfirm?: string;
    ConfirmedBy?: string;
    ConfirmedOn?: Date;
    BrIdType?: number;
    BrIdNo?: string;
    BrEmailId?: string;
    BrRemarks?: string;
    BrPayType?: string;
    BrMessages?: string;
    PatientArrived?: string;
    ArrMarkedBy?: string;
    ArrMarkedOn?: Date;
    ReallStatus: string = 'N';
    BkPatiPassportNo?: string;
    BkPatiPassportIssue?: Date;
    BkPatiPassportExpiry?: Date;
    BkPatiDob?: Date;
    BkPatiNationalityId?: string;
    BkReasonId?: number;
    BkTypeId?: number;
    WaitingList: string = 'N';
    OpnSmsAllow?: string = 'N';
    MergeToken: string = 'Y';
    InternetToken: string = 'N';
    BookPayId?: number;
    BookId?: number;
    AppCnlStatusId?: number;
    BranchId!: number; // Non-nullable in C#
    BkAdvanceSts: string = 'N';
    OpnAdvBookType?: string;
    TeleCallApp?: string;
    AttId?: number;
    AdminBkId?: string;
    DutyReschedule?: string;

    TokenNos: BkDateDetails[] = []

    TokenNosSelected: number[] = [];

}

export class BkDateDetails {
    // BookDate?: string;
    BookTime?: any;
    // Exac
    TokenNo?: number
}