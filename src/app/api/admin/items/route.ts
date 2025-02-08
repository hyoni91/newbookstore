import prisma from "@/lib/prisma";
import { CreateItemRequest } from "@/types/item";
import { saveFile } from "@/utils/fileUpload";
import { NextResponse } from "next/server";

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

        // mainImg와 subImg가 null이 아닌 경우만 저장 처리
            const mainImgPath = await saveFile(data.mainImg, 'uploads');

        if (data.subImg instanceof File) {
            const subImgPath = await saveFile(data.subImg, 'uploads');
        }


        //Img 테이블에 mainImg 저장
        await prisma.itemImg.create({
            data: {
                originFileName: data.mainImg.name,
                attachedFileName: `uploads/${data.mainImg.name}`,
                isMain: "true",
                itemId: newItem.id,
            }
        });

        // subImg가 있는 경우에만 생성
        if (data.subImg) {
            await prisma.itemImg.create({
                data: {
                    originFileName: data.subImg.name,
                    attachedFileName: `uploads/${data.subImg.name}`,
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