import { test, expect } from '@playwright/test';

test.describe('VeeBran Integration Tests', () => {

    test('Home page should load with correct title', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await expect(page).toHaveTitle(/VeeBran/);
        await expect(page.getByAltText('VeeBran Logo')).toBeVisible();
    });

    test('Company page should load', async ({ page }) => {
        await page.goto('http://localhost:3000/company');
        // Check for specific content on the company page
        await expect(page.getByText('Who We Are')).toBeVisible();
    });

    test('Payload Admin Panel should load login page', async ({ page }) => {
        await page.goto('http://localhost:3000/admin');
        // Payload v3 login page usually has an email input
        await expect(page.getByLabel('Email')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });

    test('API should return JSON', async ({ request }) => {
        const response = await request.get('http://localhost:3000/api/pages');
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(data.docs).toBeDefined(); // Payload lists have 'docs'
    });

});
