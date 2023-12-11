
import { NextRequest, NextResponse } from 'next/server'

import { readJson } from '@/server_function/readJson';
import { updateJsonData } from '@/server_function/updateJsonData';
import { checkJsonFileExist } from '@/server_function/checkJsonFileExist';
import { initializeJson } from '@/server_function/initializeJson';
import { /*unstable_noStore as noStore,*/ revalidatePath } from 'next/cache';
import { acceptHeader } from '@/server_function/acceptHeader';
import { cookies } from "next/headers"
export const preferredRegion = 'hkg1'; 
export const dynamic = "force-dynamic";
export const fetchCache = 'force-no-store';
export const dynamicParams = true 
export const revalidate = 0

let data = {"playedCard":0,"multiplication":0};
const  serverVision = "2"


export async function GET(request: NextRequest){
   
    //noStore()
    //const cardCountData = await import("@/public/cardCountData.json", {assert: {type: "json"}});
    try{
        await acceptHeader()
        revalidatePath(request.url)
        revalidatePath("/api/card_count")
        console.log(cookies())
        // if(!checkJsonFileExist()){
        //     await initializeJson()
        // }
        // const data = await readJson()
        // console.log("card count get")
        
        return NextResponse.json({...data, status: 200, revalidated: true, now: Date.now(), serverVision })
    }catch(err){
        return NextResponse.json({ status: 404, errorMessage: err, revalidated: true, now: Date.now(), serverVision })
    }
}

export async function POST(request: NextRequest){
    //noStore()
    try{
        // if(!checkJsonFileExist()){
        //     await initializeJson()
        // }
        await acceptHeader()
        revalidatePath(request.url)
        revalidatePath("/api/card_count")
        console.log(cookies())
        const body = await request.json()

        data = body
        // const  isUpdated = await updateJsonData(request);
    
        //console.log("card count post")
        return NextResponse.json({ ...data, status: 200, revalidated: true, now: Date.now(), serverVision })
    }catch(err){
        console.log(err)
        return NextResponse.json({ /*isUpdated:false,*/ status: 404, errorMessage: err, revalidated: true, now: Date.now(), serverVision })
    }
 


}