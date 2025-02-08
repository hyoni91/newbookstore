import { CreateItemRequest } from "@/types/item"
import { saveFile } from "@/utils/fileUpload";
import { devNull } from "os";
import { useState } from "react"

export default function ItemForm ( ){

    const [itemFormData, setItemFormData] = useState<CreateItemRequest>({
        name: '',
        price: 0,
        intro: '',
        categoryId: 0,
        mainImg: undefined,
        subImg: undefined,
    });

    const handleFileChange = () =>{

    }

    return(
        <div>

        </div>
    )
}