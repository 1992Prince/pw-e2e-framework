// fixtures/test-fixture.ts
import { test as baseTest, expect, Page } from '@playwright/test';
import { PageFixture } from '../fixtures/page-fixtures';
import path from 'path';
import fs from 'fs';

export type AnyData = Record<string, any>;

type Fixtures = {
    pages: PageFixture;
    dataProvider: {
        get: (key: string, specName?: string) => AnyData | undefined;
        getForTest: (key: string, testFilePath: string) => AnyData | undefined;
        all: Record<string, Record<string, AnyData>>;
    };
};

export const test = baseTest.extend<Fixtures>({
    // ✅ keep your PageFixture
    pages: async ({ page }, use) => {
        await use(new PageFixture(page));
    },

    // ✅ worker-scoped data loader
    dataProvider: ([
        async ({ }: any, use: (d: Fixtures['dataProvider']) => Promise<void>) => {
            const dataDir = path.resolve(__dirname, '../data');
            const files = fs.existsSync(dataDir) ? fs.readdirSync(dataDir) : [];

            const all: Record<string, Record<string, AnyData>> = {};

            for (const file of files) {
                if (!file.endsWith('.json')) continue;
                const full = path.join(dataDir, file);
                try {
                    const raw = fs.readFileSync(full, 'utf8');
                    const parsed = JSON.parse(raw) as Record<string, AnyData>;
                    const name = path.basename(file, '.json');
                    all[name] = parsed;
                } catch (err) {
                    console.warn(`❌ Failed to load data file ${file}:`, (err as Error).message);
                }
            }

            const mergedIndex: Record<string, AnyData> = {};
            for (const fname of Object.keys(all)) {
                for (const key of Object.keys(all[fname])) {
                    if (!(key in mergedIndex)) mergedIndex[key] = all[fname][key];
                }
            }

            await use({
                all,
                get: (key: string, specName?: string) => {
                    if (specName) {
                        const k = specName.replace(/\.json$/, '');
                        return all[k]?.[key];
                    }
                    return mergedIndex[key];
                },
                getForTest: (key: string, testFilePath: string) => {
                    const base = path.basename(testFilePath, path.extname(testFilePath));
                    return all[base]?.[key];
                }
            });
        },
        { scope: 'worker' }
    ] as any)

});

export { expect };
