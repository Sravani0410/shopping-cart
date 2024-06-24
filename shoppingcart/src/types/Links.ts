export type Links = {
    _id: string;
    name: string;
    price: number; // Optional price field
    description: string;
    image?: string; // Optional image field
    filter: (callback: (item: any) => boolean) => any[];
    quantity: number;
    id:string;
  };