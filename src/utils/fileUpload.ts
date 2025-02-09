import { randomUUID } from "crypto";
import fs from 'fs';
import path from "path"


export const saveFile = async (file:File, directory: string , ) => {
    
    //경로
    const uploadDir = path.join(process.cwd() , 'public' , directory);
    
    const extension = path.extname(file.name); // .png 또는 .jpg 등을 가져옴
    const uniqueFileName = `${randomUUID()}${extension}`;
    const filePath = path.join(uploadDir,uniqueFileName) //path결합 

    //파일저장
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath , buffer)
    

    return { filePath: `/${directory}/${uniqueFileName}`, fileName: uniqueFileName };

}