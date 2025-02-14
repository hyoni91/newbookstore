import prisma from "@/lib/prisma";
import { CreateItemRequest } from "@/types/item";
import { saveFile } from "@/utils/fileUpload";
// import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
// import path from "path";

export async function POST(request:Request) {

    //리퀘스트 바디로 요청받은 값 저장
    const fromData = await request.formData();

    //각각의 값을 변수에 저장 
    const data:CreateItemRequest = {
        name : fromData.get('name') as string,
        price : Number(fromData.get('price')),
        intro : fromData.get('intro') as string,
        categoryId : Number(fromData.get('categoryId')),
        mainImg: fromData.get('mainImg') as File,
        subImg: fromData.get('subImg') as File
    };



    //필수 데이터 검증
    if(!data.name || isNaN(data.price) || isNaN(data.categoryId) || !data.mainImg){
        return new NextResponse(JSON.stringify({error : 'Invalid data'}), {status:400});
    }

    try {
        //item 테이블에 상품정보 저장
        const newItem = await prisma.item.create({
            data:{
                name : data.name,
                price : data.price,
                intro : data.intro,
                categoryId : data.categoryId
            },
        });

            const { filePath : mainImgPath , fileName : mainImgName} = await saveFile(data.mainImg, 'uploads');

        //Img 테이블에 mainImg 저장
        await prisma.itemImg.create({
            data: {
                originFileName: data.mainImg.name,
                attachedFileName: mainImgName,
                isMain: "true",
                itemId: newItem.id,
            }
        });

        // subImg가 있는 경우에만 생성
        if (data.subImg instanceof File) {
            const { filePath : subImgPath , fileName : subImgName} = await saveFile(data.subImg, 'uploads');
       
            await prisma.itemImg.create({
                data: {
                    originFileName: data.subImg.name,
                    attachedFileName: subImgName,
                    isMain: "false",
                    itemId: newItem.id,
                }
            });
        }

        return new NextResponse(JSON.stringify({message : 'Item created successfully'}), {status:200})
        
    } catch (error) {

        console.error(error)
        return new NextResponse(JSON.stringify({error : 'Internal server error'}), {status:500})
        
    }
    
}