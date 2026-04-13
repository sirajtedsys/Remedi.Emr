import { DoctorTokenList } from "src/app/shared/interfaces/remedi.cc/doctor-wise-appointment/doc-daily-slot/doc-token-list"

export class Slots{
    tokenNo:number=0
    slot:string=''
    breakSlot:boolean=false

    tokenRange:string=''
    merged:boolean=false

    tokenDetils?:DoctorTokenList
}