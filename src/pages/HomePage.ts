import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import allLocators from '../resources/locators/locators.json'
import { CarBase } from './CarBase';

export class HomePage extends CarBase {

    constructor(page: Page) {
        super(page);
    }

    private locators = allLocators.HomePage;

    async navigateToHomePage(url: string) {
        //await this.navigateTo('/');
        await this.navigateTo(url);
    }

    async findNewCar() {
        await this.hover(this.locators.newCars);
        await this.click(this.locators.findNewCars);
    }

    async searchCar() {

    }

    async upcomingCars() {

    }
}