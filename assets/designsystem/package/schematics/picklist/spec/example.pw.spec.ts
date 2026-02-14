import { test, expect } from '@playwright/test';

/**
 * In order to work, Playwright needs to be installed in configured
 * - install via 'npm init playwright@latest'
 * - apply your custom options in playwright.config.ts
 * - invoke the component in a page that you can access via a route (i.e. /picklist)
 * - run the test via 'npx playwright test --ui'
 * @see https://playwright.dev/docs/intro
 */

test.describe('Picklist example spec', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('add two items to itemlist', async ({ page }) => {
    const table = page.getByTestId('picklist-table');
    const addBtn = page.getByTestId('picklist-add').locator('button');
    const firstRow = table.locator('tr', { has: page.locator('td', { hasText: 'Raffarty' }) });
    const fourthRow = table.locator('tr', { has: page.locator('td', { hasText: 'Nicolai' }) });
    const firstCheckboxLabel = firstRow.locator('.drv-checkbox__label');
    const fourthCheckboxLabel = fourthRow.locator('.drv-checkbox__label');
    const listitems = page.getByTestId('picklist-itemlist').getByRole('listitem');

    await expect(addBtn).toBeDisabled();
    await expect(listitems).toHaveCount(0);

    await firstCheckboxLabel.click();
    await fourthCheckboxLabel.click();

    await firstRow.locator('input[type="checkbox"]').isChecked();
    await fourthRow.locator('input[type="checkbox"]').isChecked();

    await expect(addBtn).toBeEnabled();

    await addBtn.click();

    await expect(firstRow).toHaveCount(0);
    await expect(fourthRow).toHaveCount(0);
    await expect(listitems).toHaveCount(2);
    await expect(listitems.nth(0)).toContainText('Raffarty');
    await expect(listitems.nth(1)).toContainText('Nicolai');
  });

  test('add all items to itemlist and remove one', async ({ page }) => {
    const table = page.getByTestId('picklist-table');
    const addBtn = page.getByTestId('picklist-add').locator('button');
    const headerRow = table.locator('tr', { has: page.locator('th', { hasText: 'Alle Einträge selektieren' }) });
    const allCheckboxLabel = headerRow.locator('.drv-checkbox__label');
    const listitems = page.getByTestId('picklist-itemlist').getByRole('listitem');

    await allCheckboxLabel.click();
    await expect(headerRow.locator('input[type="checkbox"]')).toBeChecked();

    await addBtn.click();
    await expect(listitems).toHaveCount(7);
    await expect(headerRow.locator('input[type="checkbox"]')).not.toBeChecked();

    const oneListitem = listitems.locator('button', { hasText: 'Barney' });

    await oneListitem.click();

    const deletedItem = table.locator('tr', { has: page.locator('td', { hasText: 'Barney' }) });

    await expect(deletedItem).toHaveCount(1);
    await expect(listitems).toHaveCount(6);
  });
});
