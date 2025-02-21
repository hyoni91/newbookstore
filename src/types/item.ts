export interface Item {
    id: number;
    name: string;
    price: number;
    intro?: string | null;
    stock: number;
    status: string;
    categoryId: number;
    category: Category;
    itemImgs?: ItemImg[];
}

export interface Category {
    id: number;
    name: string;
}


export interface ItemImg {
    id: number;
    originFileName: string;
    attachedFileName: string;
    isMain: string;
    itemId: number;
}

//아이템 저장
export interface CreateItemRequest{
    name : string;
    price : number;
    intro? : string;
    categoryId : number;
    mainImg: File | undefined;
    subImg?: File | undefined;
}

//item delete
export interface DeleteItemRequest{
    id : number[];
}
