
export interface ItemInterface {
    id_item:string;
    item_code:string;
    item_desc:string;
    item_quantity:number;
    qty:number;
    available_qty:number;
    lot:LotInterface[];
}

export interface LotInterface {
    id:string;
    value:string;
    allocation:string;
    owner:string;
}

export const responseItems: ItemInterface[] = [{
      id_item:"62972983244a9372244224ff",
      item_code:"ITM001278",
      item_desc:
        'Casing 13 3/8", 68 PPF, L80, JFELION, R3, Coated',
      item_quantity: 2,
      qty: 300,
      available_qty: 200,
      lot: [
        {
            id: "LOT-001-011",
            value: "LOT-001-011",
            allocation:"PT Sumber Bima Energi",
            owner:"Petrodrill"
        },
         {
            id: "LOT-002-012",
            value: "LOT-002-012",
            allocation:"PT Sumber Setya Makmur",
            owner:"Regisnaviera",
        },
         {
            id: "LOT-003-013",
            value: "LOT-003-013",
            allocation:"PT Merdeka Energia",
            owner:"Sentrolux",
        },
      ],
      
    },
  ];