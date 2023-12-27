import { promises as fs } from 'fs';
import path from 'path';
import XlsxTemplate from 'xlsx-template';

export default class XLSPrinter {

    static async print(template: string, values: Record<string, any>, sheet?: number): Promise<string> {
        try {
            const filename = path.join(process.cwd(), 'public/templates', template);
            const file = await fs.readFile(filename);

            const xlsTemplate = new XlsxTemplate(file);

            xlsTemplate.substitute(sheet || 1, values);
            return xlsTemplate.generate({ type: 'base64' }); // Pass the GenerateOptions object
        } catch (error) {
            console.error('Error occurred while generating Excel:', error);
            throw error; // re-throw the error to handle it in the calling function
        }
    }

    static async printMultipleSheet(template: string, values: Record<string, any>): Promise<string> {
        const filename = path.join(path.resolve('./'), 'templates', template);
        const file = await fs.readFile(filename);

        const xlsTemplate = new XlsxTemplate(file);

        await Promise.all(Object.keys(values).map(async (key, index) => {
            await xlsTemplate.substitute(index + 1, values[key]);
        }));
        return xlsTemplate.generate({ type: 'base64' });
    }

}
