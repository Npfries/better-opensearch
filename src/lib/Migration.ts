export abstract class Migration {
    abstract up(): Promise<string>;
    abstract down(): Promise<string>;
}
