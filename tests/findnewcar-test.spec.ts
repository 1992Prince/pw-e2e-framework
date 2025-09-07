import { test, expect } from '../utils/test-base'



test.describe('Find New Car', () => {

    test.beforeEach(async ({ pages }) => {
        await pages.homePage.navigateToHomePage();
    });

    test('Find New Car', async ({ pages }) => {
        await pages.homePage.findNewCar();
        await expect(pages.page).toHaveURL(/.*new-cars/);
        console.log(await pages.newCarPage.getHeaderText());
        expect(await pages.newCarPage.getHeaderText()).toContain('New Cars');

        await pages.newCarPage.goToBMWCar();
        await expect(pages.page).toHaveURL(/.*bmw-cars/);
    });


    test('Parametrized Find New Car', async ({ pages }) => {

        await pages.homePage.findNewCar();

        console.log(await pages.newCarPage.getHeaderText());

        await pages.newCarPage.goToBMWCar();
        console.log(await pages.carBase.getCartTitle());

        await pages.homePage.findNewCar();
        await pages.newCarPage.goToHyundaiCar();
        console.log(await pages.carBase.getCartTitle());

        await pages.homePage.findNewCar();
        await pages.newCarPage.goToSkodaCar();
        console.log(await pages.carBase.getCartTitle());

    });



});
