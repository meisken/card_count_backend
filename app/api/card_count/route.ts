
import { NextRequest, NextResponse } from 'next/server'

import { readJson } from '@/server_function/readJson';
import { updateJsonData } from '@/server_function/updateJsonData';
import { checkJsonFileExist } from '@/server_function/checkJsonFileExist';
import { initializeJson } from '@/server_function/initializeJson';
import { /*unstable_noStore as noStore,*/ revalidatePath, revalidateTag } from 'next/cache';
import { acceptHeader } from '@/server_function/acceptHeader';
import { cookies } from "next/headers"
export const preferredRegion = 'hkg1'; 
export const dynamic = "force-dynamic";
export const fetchCache = 'force-no-store';
export const dynamicParams = true 
export const revalidate = 0

let card_count = {"playedCard":0,"multiplication":0};
const  serverVision = "6"


export async function GET(request: NextRequest){
   
    //noStore()
    //const cardCountData = await import("@/public/cardCountData.json", {assert: {type: "json"}});
    try{
        await acceptHeader()
        //revalidatePath(request.nextUrl.basePath)
        revalidatePath("/api/card_count")
        //revalidateTag("card_count")
        console.log(cookies())
        // if(!checkJsonFileExist()){
        //     await initializeJson()
        // }
        // const data = await readJson()
        // console.log("card count get")
        
        return NextResponse.json({...card_count, status: 200, revalidated: true, serverVision })
    }catch(err){
        return NextResponse.json({ status: 404, errorMessage: err, revalidated: true, serverVision })
    }
}

export async function POST(request: NextRequest){
    //noStore()
    try{
        // if(!checkJsonFileExist()){
        //     await initializeJson()
        // }
        await acceptHeader()

        const body = await request.json()

        card_count = body
        // const  isUpdated = await updateJsonData(request);
        setTimeout(() => {
            revalidatePath("/api/card_count")
        }, 1000)
        //revalidatePath(request.nextUrl.basePath)
        //revalidatePath("/api/card_count")
        //revalidateTag("card_count")
        console.log(cookies())
        //console.log("card count post")
        return NextResponse.json({ ...card_count, status: 200, revalidated: true, serverVision })
    }catch(err){
        console.log(err)
        return NextResponse.json({ /*isUpdated:false,*/ status: 404, errorMessage: err, revalidated: true, serverVision })
    }
 


}