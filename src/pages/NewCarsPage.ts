import { Page } from '@playwright/test';
import { CarBase } from './CarBase';
import { BasePage } from './BasePage';
import allLocators from '../resources/locators/locators.json'

export class NewCarPage extends CarBase {

    constructor(page: Page) {
        super(page);
    }

    private locators = allLocators.NewCarsPage;

    async getHeaderText(): Promise<string | null> {
        return await this.getText(this.locators.newCarsHeading);
    }

    async goToBMWCar() {
        await this.click(this.locators.bmwCar);
    }

    async goToToyotaCar() {
        await this.click(this.locators.toyotaCar);
    }

    async goToSkodaCar() {
        await this.click(this.locators.skodaCar);
    }

    async goToHyundaiCar() {
        await this.click(this.locators.hyundaiCar);
    }


}