import { test, expect } from '@playwright/test';

test('check navbar elements visibility', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'MCP', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'CLI', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
});

test('check name into navbar', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText(
    'Playwright',
  );
  await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
  await expect(page.getByRole('link', { name: 'MCP', exact: true })).toContainText('MCP');
  await expect(page.getByRole('link', { name: 'CLI', exact: true })).toContainText('CLI');
  await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
  await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
});

test('check href redirect', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute(
    'href',
    '/',
  );
  await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/intro');
  await expect(page.getByRole('link', { name: 'MCP', exact: true })).toHaveAttribute(
    'href',
    '/mcp/introduction',
  );
  await expect(page.getByRole('link', { name: 'CLI', exact: true })).toHaveAttribute(
    'href',
    '/agent-cli/introduction',
  );
  await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute(
    'href',
    '/docs/api/class-playwright',
  );
  await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
});

test('check theme change', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('check hero title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
    'Playwright enables reliable web automation for testing, scripting, and AI agents.',
  );
});

test('check button get started', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Get Started' })).toContainText('Get started');
  await expect
    .soft(page.getByRole('link', { name: 'Get Started' }))
    .toHaveAttribute('href', '/docs/intro');
});
