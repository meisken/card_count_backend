import { NextRequest } from "next/server";
import { promises as fs } from 'fs';
import { jsonFilePath } from "./jsonPath";




export const updateJsonData = (request: NextRequest) => {
    return new Promise<boolean>(async (resolve,reject) => {

        try{
            const previousRawData = await fs.readFile(jsonFilePath, 'utf8');
            const body = await request.json()
            let isUpdated = JSON.stringify(body) !== previousRawData

            if(isUpdated){
                await fs.writeFile(jsonFilePath, JSON.stringify(body))
                resolve(isUpdated)
            }else{
                reject("data same as previous")
            }
        }catch(err){
            reject(err)
        }
        
    })
}