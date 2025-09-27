# Playwright Test Execution Guide

## Running Tests with Specific Project

We have grouped certain spec files into a **project** in `playwright.config.ts`.For example, the project **`car-app`** includes:

- `01-homepage.spec.ts`
- `02-findnewcar.spec.ts`

### Run All Tests in This Project

Use the following command:

```bash
npx playwright test --project=car-app
```
