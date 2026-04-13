export interface MedicinesDto {
  mgeN_ID: string | null;

  id: string;                 // medicine ID
  gname: string | null;

  name: string;
  namE1: string;

  ratE_DISC: number;
  claiM_DISC: number;
  approvaL_TYPE_ID: number;

  meD_ROUTE_ID: string | null;
  freQ_NAME: string | null;
  meD_ROUTE_NAME: string | null;

  duniT_ID: string | null;
  duniT_NAME: string | null;

  salE_RATE: string;          // "-" or numeric string
  frequency: string;
  phC_ROUTE: string;

  stock: number;

  harD_GROUP: string;

  iteM_MS_TYPE: string;       // M / etc
  iteM_BREAKABLE: string;  
}