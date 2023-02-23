import { Index } from './operations/CreateIndex.js';
import { SearchTemplate } from './operations/CreateSearchTemplate.js';
import { getJson } from './utils/getJson.js';

type MigrationType = 'Index' | 'SearchTemplate';

const getMigrationType = (str: string): MigrationType => {
    const a = str;
    a.trim();
    return 'Index';
};

export const DSL = async (
    template: TemplateStringsArray,
    ...args: string[]
): Promise<string> => {
    const result = String.raw({ raw: template }, ...args);
    const { operation, options } = getJson(result);
    const migrationType = getMigrationType(result);
    switch (migrationType) {
        case 'Index':
            await Index(result);
            return result;
        case 'SearchTemplate':
            await SearchTemplate(result);
            return result;
        default:
            return '';
    }
    // get index mappings
    // generate
    // since search templates can be applied to any index, checking of index mappings should happen by overriding the id parameter
};
