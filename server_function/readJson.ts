
import { promises as fs } from 'fs';
import { jsonFilePath } from './jsonPath';
import { CARD_COUNT_JSON } from './jsonDataType';



export const readJson = () => {
    return new Promise<CARD_COUNT_JSON >(async (resolve,reject) => {
        try{
            const rawData = await fs.readFile(jsonFilePath, 'utf8');
            const parsedData: CARD_COUNT_JSON  = JSON.parse(rawData)
            resolve(parsedData)
        }catch(err){
            reject(err)
        }
    })
}