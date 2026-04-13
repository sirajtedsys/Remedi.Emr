export interface GenericDto {
  gid: string;
  gname: string;
  gnamE2: string;

  mnamE2: string;
  mname: string;

  stock: number;
  mid: string;

  cname: string | null;
  cid: string | null;

  ratE_DISC: number;
  claiM_DISC: number;
  approvaL_TYPE_ID: number;

  salE_RATE: string;      // "-" or numeric string
  frequency: string;      // comes as string
  phC_ROUTE: string;

  harD_GROUP: string;
}