import { NpaSection1 } from "./npa-section1";
import { NpaSection2 } from "./npa-section2";
import { NpaSection3 } from "./npa-section3";
import { NpaSection4 } from "./npa-section4";
import { NpaSection5 } from "./npa-section5";
import { NpaSection6 } from "./npa-section6";
import { NpaSection7 } from "./npa-section7";
import { NpaSection8 } from "./npa-section8";
import { NpaSection9 } from "./npa-section9";

export class NpaSubmission {
  npaId!: number| null;
  patiId!: string;
  emrDocId!: string;
//   CreateUser!: string;

  Section1!: NpaSection1;
  Section2!: NpaSection2;
  Section3!: NpaSection3;
  Section4!: NpaSection4;
  Section5!: NpaSection5;
  Section6!: NpaSection6;
  Section7!: NpaSection7;
  Section8!: NpaSection8;
  Section9!: NpaSection9;

//   constructor(init?: Partial<NpaSubmission>) {
//     Object.assign(this, init);
//   }
}