import { Page } from '@playwright/test';

// key-word driven approach - we have defined keywords below like click(), fill() etc.

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async click(locator: string) {
        await this.page.locator(locator).click();
    }

    async fill(locator: string, value: string) {
        await this.page.locator(locator).fill(value);
    }

    async getText(locator: string): Promise<string | null> {
        return await this.page.locator(locator).textContent();
    }

    async hover(locator: string) {
        await this.page.locator(locator).hover();
    }
}