import { Page } from '@playwright/test';
import { CarBase } from './CarBase';
import { BasePage } from './BasePage';
import allLocators from '../resources/locators/locators.json'

export class HyundaiPage extends CarBase {

    constructor(page: Page) {
        super(page);
    }

    async searchCar() {

    }

    async upcomingCars() {

    }
}