import { Page, Locator, test, expect } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'MCP', exact: true }),
        name: 'MCP link',
        text: 'MCP',
        attribute: {
          type: 'href',
          value: '/mcp/introduction',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'CLI', exact: true }),
        name: 'CLI link',
        text: 'CLI',
        attribute: {
          type: 'href',
          value: '/agent-cli/introduction',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'API link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js',
        text: 'Node.js',
        attribute: {
          type: 'text',
          value: 'Node.js',
        },
      },
    ];
  }
  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }
  async checkElementsVisibility() {
    for (const { locator, name } of this.elements) {
      test.step(`check visibility ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }
  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        test.step(`check text ${name}`, async () => {
          await expect(locator(this.page)).toContainText(text);
        });
      }
    }
  }
  async checkElementsHrefAttribute() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        test.step(`check href ${name}`, async () => {
          await expect(locator(this.page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    }
  }
  async clickSwitchThemeIcon() {
    await this.page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await this.page.getByRole('button', { name: 'Switch between dark and light' }).click();
  }
  async checkDataThemeAttributeValue() {
    await expect(this.page.locator('html')).toHaveAttribute('data-theme', 'dark');
  }
  async checkHeroTitle() {
    await expect(
      this.page.getByRole('heading', { name: 'Playwright enables reliable' }),
    ).toBeVisible();
    await expect(
      this.page.getByRole('heading', { name: 'Playwright enables reliable' }),
    ).toContainText(
      'Playwright enables reliable web automation for testing, scripting, and AI agents.',
    );
  }
  async checkGetStartedButton() {
    await expect.soft(this.page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect
      .soft(this.page.getByRole('link', { name: 'Get Started' }))
      .toContainText('Get started');
    await expect
      .soft(this.page.getByRole('link', { name: 'Get Started' }))
      .toHaveAttribute('href', '/docs/intro');
  }
  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }
  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }
  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot(`pageWithLightMode.png`);
  }
  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot(`pageWithDarkMode.png`);
  }
}
