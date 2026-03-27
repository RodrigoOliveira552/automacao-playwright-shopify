const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Suíte 03: Validação de Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('https://sauce-demo.myshopify.com/', { waitUntil: 'domcontentloaded' });
    await loginPage.goToLogin();
  });

  test('CT01 - Realizar login com credenciais válidas', async ({ page }) => {
    await loginPage.doLogin('rodrigoteste@email.com', '12345');
    await loginPage.signInButton.click();

    // Valida se foi redirecionado para a página da conta
    await expect(page).toHaveURL(/.*account/);
  });

  test('CT02 - Validar erro com credenciais inválidas (Mock de Segurança)', async ({ page }) => {
    await page.route('**/account/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'text/html',
        body: `<div class="errors"><ul><li>Incorrect email or password.</li></ul></div>`
      });
    });

    await loginPage.doLogin('rodrigoteste@email.com', 'senhaerrada');
    await loginPage.signInButton.click();

    const errorContainer = page.locator('.errors');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toContainText('Incorrect email or password');
  });

  test('CT03 - Validar obrigatoriedade de campos nativa (Front-end)', async () => {
    await loginPage.signInButton.click();

    const isEmailValid = await loginPage.emailInput.evaluate(el => el.validity.valid);
    const isPasswordValid = await loginPage.passwordInput.evaluate(el => el.validity.valid);

    expect(isEmailValid).toBeFalsy();
    expect(isPasswordValid).toBeFalsy();
  });
});