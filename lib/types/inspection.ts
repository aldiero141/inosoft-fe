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
}

export interface SowInterface {
  template: string;
  template_name: string;
}

export interface InspectionItem {
  id_item: string;
  item_desc: string;
  item_code: string;
  item_quantity: number;
  lot_number: number;
  progress: number;
}
