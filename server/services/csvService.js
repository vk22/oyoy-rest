import { parse } from "csv-parse";
import * as fs from 'fs';

class CSVService {
    constructor() {
    }
    async readFile (filepath) {
        return new Promise((resolve, reject) => {
            const data = []
            fs.createReadStream(filepath)
                .pipe(parse({ delimiter: ',' }))
                .on('data', (r) => {
                    // console.log(r);
                    data.push(r);
                })
                .on('end', async () => {
                    resolve(data)
                })
        })
    
    }
    async fetchFile(url) {
        try {
            const data = []
            const response = await $fetch(url);
            const lines = response.split("\n");
            lines.forEach(line => {
                const arr = line.split(',');
                const arrNoQuotes = arr.map(el => el.replace(/"/g, ""))
                data.push(arrNoQuotes)
            });
            return data;
        } catch (error) {
            console.error('Error fetching CSV:', error);
     
        } 
    }        
}
export default new CSVService();