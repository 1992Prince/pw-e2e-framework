import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import allLocators from '../resources/locators/locators.json'

// This page is reflection of ApplicationPage - where all common functionalities to all pages and locators are kept
export class CarBase extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private appBaselocators = allLocators.CarBase;

    async isAt() {
        await this.page.locator(this.appBaselocators.carHomePageTitle).isVisible();
    }

    async searchCar() {
        await this.fill(this.appBaselocators.searchCar, "Tata Nexon");
        await this.click(this.appBaselocators.searchSubmit);
        await this.page.locator(this.appBaselocators.tataNexonLoc).isVisible();
    }

    async findLocation() {
        await this.click(this.appBaselocators.location);
        //await this.click(this.appBaselocators.closePopup);
    }
}