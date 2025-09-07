import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import allLocators from '../resources/locators/locators.json'

export class ToyotaPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async searchCar() {

    }

    async upcomingCars() {

    }
}