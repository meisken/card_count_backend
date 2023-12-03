
import { NextRequest, NextResponse } from 'next/server'

import { readJson } from '@/server_function/readJson';
import { updateJsonData } from '@/server_function/updateJsonData';
import { checkJsonFileExist } from '@/server_function/checkJsonFileExist';
import { initializeJson } from '@/server_function/initializeJson';

export const dynamic = "force-dynamic";
export const fetchCache = 'force-no-store';

let data = {"playedCard":0,"multiplication":0};

export async function GET(){


    //const cardCountData = await import("@/public/cardCountData.json", {assert: {type: "json"}});
    try{
        // if(!checkJsonFileExist()){
        //     await initializeJson()
        // }
        // const data = await readJson()
        // console.log("card count get")
        return NextResponse.json({...data, status: 200 })
    }catch(err){
        return NextResponse.json({ status: 404, errorMessage: err })
    }
}

export async function POST(request: NextRequest){
   
    try{
        // if(!checkJsonFileExist()){
        //     await initializeJson()
        // }
        const body = await request.json()

        data = body
        // const  isUpdated = await updateJsonData(request);
    
        //console.log("card count post")
        return NextResponse.json({ ...data, status: 200 })
    }catch(err){
        console.log(err)
        return NextResponse.json({ /*isUpdated:false,*/ status: 404, errorMessage: err })
    }
 


}