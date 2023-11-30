
import { NextRequest, NextResponse } from 'next/server'

import { readJson } from '@/server_function/readJson';
import { updateJsonData } from '@/server_function/updateJsonData';
import { checkJsonFileExist } from '@/server_function/checkJsonFileExist';
import { initializeJson } from '@/server_function/initializeJson';





export async function GET(){


    //const cardCountData = await import("@/public/cardCountData.json", {assert: {type: "json"}});
    try{
        if(!checkJsonFileExist()){
            await initializeJson()
        }
        const data = await readJson()
        return NextResponse.json({...data, status: 200 })
    }catch(err){
        return NextResponse.json({ status: 404, errorMessage: err })
    }
}

export async function POST(request: NextRequest){
   
    try{
        if(!checkJsonFileExist()){
            await initializeJson()
        }
        
        const  isUpdated = await updateJsonData(request);
    
  
        return NextResponse.json({ isUpdated, status: 200 })
    }catch(err){
        console.log(err)
        return NextResponse.json({ isUpdated:false, status: 404, errorMessage: err })
    }
 


}