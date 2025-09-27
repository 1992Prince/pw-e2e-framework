// import { Page } from '@playwright/test';
// import { HomePage } from '../pages/HomePage';
// import { NewCarPage } from '../pages/NewCarsPage';
// import { BMWPage } from '../pages/BMWPage';
// import { HyundaiPage } from '../pages/HyundaiPage';
// import { ToyotaPage } from '../pages/ToyotaPage';
// import { SkodaPage } from '../pages/SkodaPage';
// import { CarBase } from '../pages/CarBase';

// // This is class PageFixture where we will be keeping all fixtures
// // here we have created CarBase called as ApplicationBase page to have all app common mehtods
// // and pushing it to tests via fixtures but we can do also like SkodaPage extends CarBase extends BasePage
// // i.e. multilevel inheritance

// // not using it now
// //
// export class PageFixture {

//     readonly homePage: HomePage;
//     readonly newCarPage: NewCarPage;
//     readonly bmwPage: BMWPage;
//     readonly hyundaiPage: HyundaiPage;
//     readonly toyotaPage: ToyotaPage;
//     readonly skodaPage: SkodaPage;
//     readonly page: Page
//     readonly carBase: CarBase

//     constructor(page: Page) {
//         this.page = page;
//         this.homePage = new HomePage(page);
//         this.newCarPage = new NewCarPage(page);
//         this.bmwPage = new BMWPage(page);
//         this.hyundaiPage = new HyundaiPage(page);
//         this.toyotaPage = new ToyotaPage(page);
//         this.skodaPage = new SkodaPage(page);
//         this.carBase = new CarBase(page);
//     }

//     get basePage(): Page {
//         return this.page;
//     }

// }
