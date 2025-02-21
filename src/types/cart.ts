
export interface AddCart{
   cnt : number;
   itemId : number;
   userId : string;
}

export interface MyCart{
   id : number;
   mainImg : string; //url
   itemName : string; //item name
   cnt :  number;
   price : number;
   date : string;
   itemId : number;
}