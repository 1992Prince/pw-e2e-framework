import logger from '../../loggers/LoggerUtil';
import { test, expect } from '../../utils/test-fixture';


test.describe('Find New Car', () => {

    test('Find New Car', async ({ pm }, testInfo) => {

        logger.info("------------ Find New Car scenario execution begins------------------")
        logger.info("Find New Car - click on find new car");

        await test.step('Navigate to Find-New-Car Page', async () => {
            await pm.homePage.findNewCar();
        });

        logger.debug("Find New Car - validate url");

        await test.step('Verify page url', async () => {
            await expect(pm.getPage()).toHaveURL(/.*new-cars/);
        });
        console.log(await pm.newCarPage.getHeaderText());
        logger.warn("Find New Car - Warning message");

        await test.step('Verify page heading', async () => {
            expect(await pm.newCarPage.getHeaderText()).toContain('New Cars');
        });

        await pm.newCarPage.goToBMWCar();
        await expect(pm.getPage()).toHaveURL(/.*bmw-cars/);
        logger.info("------------ Find New Car scenario is completed------------------")
        //testInfo.annotations.push({ type: 'info', description: 'Test Execution is completed' });
    });




    test('Parametrized Find New Car', async ({ pm }) => {

        await pm.homePage.findNewCar();
        logger.info("Parametrized Find New Car");
        await pm.newCarPage.goToBMWCar();
        await pm.homePage.findNewCar()
        await pm.newCarPage.goToHyundaiCar();
        await pm.homePage.findNewCar();
        await pm.newCarPage.goToSkodaCar();

    });

});
