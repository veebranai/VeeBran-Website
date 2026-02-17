import { test, expect } from '@playwright/test';

test('homepage has title and critical elements', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Check title
    await expect(page).toHaveTitle(/VeeBran/);

    // Check Hero Text
    await expect(page.getByText('Building Digital Solutions That Matter')).toBeVisible();

    // Check Chatbot
    await expect(page.locator('button:has-text("VeeBran Assistant")').or(page.locator('.fixed.bottom-6.right-6 button'))).toBeVisible();
});

test('services page has FAQ', async ({ page }) => {
    await page.goto('http://localhost:3000/services');

    // Check FAQ Section with increased timeout for animations
    await expect(page.getByRole('heading', { name: 'Common Questions' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('How can AI help my small business without breaking the budget?')).toBeVisible();
});

