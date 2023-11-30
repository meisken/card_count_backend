
import { NextRequest, NextResponse } from 'next/server'
import fs from "fs/promises"



export type CARD_COUNT_JSON = {

    playedCard: number;
    multiplication: number;
}

export const jsonFilePath = "./cardCountData.json"

export async function GET(){

    //const cardCountData = await import("@/data.json", {assert: {type: "json"}});
    try{
        const rawData = await fs.readFile(jsonFilePath, 'utf8');
        const parsedData = JSON.parse(rawData)
        return NextResponse.json({...parsedData, status: 200 })
    }catch(err){
        return NextResponse.json({ status: 404, errorMessage: err })
    }
}

export async function POST(request: NextRequest){

    try{
        const previousRawData = await fs.readFile(jsonFilePath, 'utf8');
        
        const body = await request.json()
     
        let isUpdated = JSON.stringify(body) !== previousRawData
        if(isUpdated){
            await fs.writeFile(jsonFilePath, JSON.stringify(body))

        }
    
  
        return NextResponse.json({ isUpdated, status: 200 })
    }catch(err){
        console.log(err)
        return NextResponse.json({ isUpdated:false, status: 404, errorMessage: err })
    }
 


}