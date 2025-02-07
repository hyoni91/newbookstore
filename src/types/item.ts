interface Item {
    id: number;
    name: string;
    price: number;
    intro: string;
    stock: number;
    status: string;
    categoryId: number;
    category: Category;
    itemImgs: ItemImg[];
}

interface Category {
    id: number;
    name: string;
}


interface ItemImg {
    id: number;
    originFileName: string;
    attachedFileName: string;
    isMain: boolean;
    itemId: number;
}