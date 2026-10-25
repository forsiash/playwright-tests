import { test, expect } from '../fixtures/mainPage';
import { MainPage } from '../models/MainPage';

test.describe('tests main page', () => {
  test('check navbar elements visibility', async ({ mainPage }) => {
    await mainPage.checkElementsVisibility();
  });

  test('check name into navbar', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test.fixme('check href redirect', async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('check theme change', async ({ mainPage }) => {
    await mainPage.clickSwitchThemeIcon();
    await mainPage.checkDataThemeAttributeValue();
  });

  test('check hero title', async ({ mainPage }) => {
    await mainPage.checkHeroTitle();
  });

  test('check button get started', async ({ mainPage }) => {
    await mainPage.checkGetStartedButton();
  });
  test(`check style with light mode`, async ({ mainPage }) => {
    test.step(`click button light mode`, async () => {
      await mainPage.setLightMode();
    });
    test.step(`check layout with light mode`, async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`check style with dark mode`, async ({ mainPage }) => {
    await mainPage.setDarkMode();
    await mainPage.checkLayoutWithDarkMode();
  });
});
