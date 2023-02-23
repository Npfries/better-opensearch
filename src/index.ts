type MigrationType = 'Index' | 'SearchTemplate';
import * as fs from 'fs';
import * as path from 'path';

const getMigrationType = (str: string): MigrationType => {
    const a = str;
    a.trim();
    return 'Index';
};
const Index = (str: string): string => {
    return '';
};

const SearchTemplate = (str: string) => {
    return '';
};

export const DSL = async (
    template: TemplateStringsArray,
    ...args: string[]
): Promise<string> => {
    const result = String.raw({ raw: template }, ...args);
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

export abstract class Migration {
    abstract up(): Promise<string>;
    abstract down(): Promise<string>;
}

const getAllMigrations = async () => {
    const cwd = path.resolve(path.dirname('/'));
    console.log(cwd);
    const migrations = await fs.promises.readdir(path.join(cwd, '/migrations'));
    console.log(migrations);
};

getAllMigrations();

// example implementation
