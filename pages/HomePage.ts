import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import allLocators from '../resources/locators/locators.json'

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private locators = allLocators.HomePage;

    async navigateToHomePage() {
        await this.navigateTo('/');
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