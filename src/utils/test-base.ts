// import { test as baseTest, expect, Page } from '@playwright/test';
// import { PageFixture } from '../fixtures/page-fixtures';
// import path from 'path';
// import fs from 'fs';



// export type OrderData = { username: string; password: string; productName: string };

// type Fixtures = {
//     pages: PageFixture;
//     dataProvider: { get: (key: string) => OrderData | undefined };
// };

// export const test = baseTest.extend<Fixtures>({
//     pages: async ({ page }, use) => {
//         await use(new PageFixture(page));
//     },
//     // worker-scoped loader: read JSON once per worker
//     // NOTE:
//     // 1) first arg uses object destructuring pattern "{}" to satisfy Playwright/linter
//     // 2) typed as `any` to avoid TypeScript circular inference issues
//     // 3) cast the whole tuple to `any` to avoid strict tuple typing problems
//     dataProvider: ([
//         async ({ }: any, use: (value: { get: (key: string) => OrderData | undefined }) => Promise<void>) => {
//             const filePath = path.resolve(__dirname, '../data/orders.json');
//             const raw = fs.readFileSync(filePath, 'utf8');
//             const map = JSON.parse(raw) as Record<string, OrderData>;
//             await use({
//                 get: (key: string) => map[key]
//             });
//         },
//         { scope: 'worker' }
//     ] as any)
// });

// export { expect };