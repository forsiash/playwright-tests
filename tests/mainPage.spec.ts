import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
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

const lightMode = ['light', 'dark'];

test.describe('tests main page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('check navbar elements visibility', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`check visibility ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('check name into navbar', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`check text ${name}`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    });
  });

  test.fixme('check href redirect', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`check href ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test('check theme change', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('check hero title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
      'Playwright enables reliable web automation for testing, scripting, and AI agents.',
    );
  });

  test('check button get started', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get Started' })).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get Started' }))
      .toHaveAttribute('href', '/docs/intro');
  });
  lightMode.forEach((value) => {
    test(`check style active ${value} mode`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });
});
