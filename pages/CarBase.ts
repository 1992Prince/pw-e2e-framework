import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import allLocators from '../resources/locators/locators.json'

export class CarBase extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private locators = allLocators.CarBase;

    async getCartTitle(): Promise<string | null> {
        return await this.getText(this.locators.carTitle);
    }
}