export interface InspectionInterface {
  _id: string;
  no: string;
  status: string;
  unit: string;
  yard: string;
  appvwhen: number;
  appvwho: string;
  postingdate: number;
  createdate: number;
  type: string;
  insp_type: string;
  id_transfer: string;
  idtrans: string | null;
  screening_number: number;

  items: unknown[];
  carrier: string | null;
  arrivaldate: number | null;
  operatorName: string | null;
  operatorSign: string | null;
  action: string | null;

  notes: Notes;

  stages: unknown[];
  batchaction: string | null;
  id_si: string | null;
  transfer_condition: string | null;

  works: unknown[];

  tpi: string;
  rack: string | null;
  template: string | null;
  useSow: boolean | null;

  drift_inspections: unknown[];

  cancelReason: string | null;
  cancelDate: number | null;

  reserved_stock: ReservedStock[];

  createid: string;
  createwho: string;

  updateid: string | null;
  updatewho: string;

  customer: Customer;

  revision_no: number;
  revision_date: number;

  imei: string | null;

  items_raw: ItemRaw[];

  released_stock: ReleasedStock[];

  iwo: string | null;

  sow: Sow[];

  journaled: unknown[];

  invoiced: string | null;
  invoicedwhen: number | null;
  invoicedwho: string | null;

  progress: number;

  yardName: string;
  linkTo: string;

  tpiName: string;

  total_lisi: number;

  lisi: Lisi[];

  qty: number;
}

export interface Notes {
  initial: {
    msg: string;
    by: string;
  };
}

export interface ReservedStock {
  locked: string;
  allocation: string;
  tag: string | null;
  qty: number;
}

export interface Customer {
  customer: string;
  customer_ref: string;
  name: string;
}

export interface ItemRaw {
  id_item: string;
  item_code: string;
  item_desc: string;
  batch: string;
  original_batch: string;
  condition: string;
  owned: string;
  locked: string;
  allocation: string;
  tag: string | null;
  qty: number;
  id_quarantine: string | null;
  customer_item_no: string;
  owned_name: string;
  locked_name: string;
  item_type: string;
  item_type_name: string;
  item_pipe_family: string;
  inspected_qty: number;
  balance: number;
  inprogress_qty: number;
}

export interface ReleasedStock {
  id_item: string;
  batch: string;
  original_condition: string;
  condition: string;
  owned: string;
  locked: string;
  allocation: string;
  tag: string | null;
  qty: number;
  id_screening: string;
}

export interface Sow {
  template: string;
  works: Work[];
  template_name: string;
  items: SowItem[];
}

export interface Work {
  _id: string;
  subscope: string;
  subscope_name: string;
  fields: WorkField[];
}

export interface WorkField {
  _id: string;
  name: string;
  type: string;
  selected: boolean;
  value: string;
  editableDescription: boolean;
  requiredDescription: boolean;
  drift_inspection: boolean;
}

export interface SowItem {
  id_item: string;
}

export interface Lisi {
  id: string;
  no: string;
  url: string;
  type: string;
}