import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('tests main page', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('check navbar elements visibility', async ({ page }) => {
    await mainPage.checkElementsVisibility();
  });

  test('check name into navbar', async ({ page }) => {
    await mainPage.checkElementsText();
  });

  test.fixme('check href redirect', async ({ page }) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('check theme change', async ({ page }) => {
    await mainPage.clickSwitchThemeIcon();
    await mainPage.checkDataThemeAttributeValue();
  });

  test('check hero title', async ({ page }) => {
    await mainPage.checkHeroTitle();
  });

  test('check button get started', async ({ page }) => {
    await mainPage.checkGetStartedButton();
  });
  test(`check style with light mode`, async ({ page }) => {
    test.step(`click button light mode`, async () => {
      await mainPage.setLightMode();
    });
    test.step(`check layout with light mode`, async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`check style with dark mode`, async ({ page }) => {
    await mainPage.setDarkMode();
    await mainPage.checkLayoutWithDarkMode();
  });
});
