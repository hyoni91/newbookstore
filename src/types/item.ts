export interface Item {
    id: number;
    name: string;
    price: number;
    intro?: string;
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