export interface InspectionInterface {
  id:string;
  code: string;
  location: string;
  sow_code: string;
  sow: SowInterface[];
  type: string;
  date_submitted: number;
  ecd: number;
  related_to: string;   
  third_party: number;
  status: string;
  inspection_status_progress: string;
  items: InspectionItem[];
  service_type:string;
  dc_code: string;
  customer: string;
  charges: ChargesInterface[];
}

export interface ChargesInterface {
  order_number: string;
  service_desc: string;
  qty: string;
  unit_price: number;
}

export interface SowInterface {
  template: string;
  template_name: string;
  scope: ScopeInterface[];
}

export interface ScopeInterface {
  scope_name: string;
  scope_type: string;
  scope_description: string;
}

export interface InspectionItem {
  id_item: string;
  item_desc: string;
  item_code: string;
  item_quantity: number;
  lot_number: number;
  progress: number;
  item_number:string;
  ownership: string;
  condition: string;
  alocation:string;
  requested:StockInterface
  pending:StockInterface
  completed:StockInterface
}

export interface StockInterface {
  pcs: number;
  mt: number;
}