import { Sympt } from "./Sympt";

export class Symptoms{
    SymptomsName?:string | null=null;
    SE_ID?:string | null=null;
    SymptList:Sympt[]=[]
    Remarks?:string | null=null;
    EmrDocId?:string | null=null;
}