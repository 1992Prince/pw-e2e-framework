import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NewCarPage } from '../pages/NewCarsPage';
import { BMWPage } from '../pages/BMWPage';
import { HyundaiPage } from '../pages/HyundaiPage';
import { ToyotaPage } from '../pages/ToyotaPage';
import { SkodaPage } from '../pages/SkodaPage';
import { CarBase } from '../pages/CarBase';

import { AdvantageHomePage } from '../pages/AdvantageHomePage';
import { AdvantageRegisterPage } from '../pages/AdvantageRegisterPage';

export class PageManager {
    readonly page: Page; // 👈 keep this public readonly

    // private backing fields — initially undefined
    private _page?: Page;
    private _homePage?: HomePage;
    private _newCarPage?: NewCarPage;
    private _bmwPage?: BMWPage;
    private _hyundaiPage?: HyundaiPage;
    private _toyotaPage?: ToyotaPage;
    private _skodaPage?: SkodaPage;
    private _carBase?: CarBase;

    private _advantageHomePage?: AdvantageHomePage;
    private _advantageRegisterPage?: AdvantageRegisterPage;

    constructor(page: Page) {
        this.page = page;
        // no eager instantiation here — keep constructor tiny
    }

    // expose the raw Playwright Page if needed
    getPage(): Page {
        return this.page;
    }

    // Lazy getters — instantiate on first access
    get homePage(): HomePage {
        if (!this._homePage) {
            this._homePage = new HomePage(this.page);
        }
        return this._homePage;
    }

    get newCarPage(): NewCarPage {
        if (!this._newCarPage) {
            this._newCarPage = new NewCarPage(this.page);
        }
        return this._newCarPage;
    }

    get bmwPage(): BMWPage {
        if (!this._bmwPage) {
            this._bmwPage = new BMWPage(this.page);
        }
        return this._bmwPage;
    }

    get hyundaiPage(): HyundaiPage {
        if (!this._hyundaiPage) {
            this._hyundaiPage = new HyundaiPage(this.page);
        }
        return this._hyundaiPage;
    }

    get toyotaPage(): ToyotaPage {
        if (!this._toyotaPage) {
            this._toyotaPage = new ToyotaPage(this.page);
        }
        return this._toyotaPage;
    }

    get skodaPage(): SkodaPage {
        if (!this._skodaPage) {
            this._skodaPage = new SkodaPage(this.page);
        }
        return this._skodaPage;
    }

    get carBase(): CarBase {
        if (!this._carBase) {
            this._carBase = new CarBase(this.page);
        }
        return this._carBase;
    }

    get advantageHomePage(): AdvantageHomePage {
        if (!this._advantageHomePage) {
            this._advantageHomePage = new AdvantageHomePage(this.page);
        }
        return this._advantageHomePage;
    }

    get advantageRegisterPage(): AdvantageRegisterPage {
        if (!this._advantageRegisterPage) {
            this._advantageRegisterPage = new AdvantageRegisterPage(this.page);
        }
        return this._advantageRegisterPage;
    }
}
