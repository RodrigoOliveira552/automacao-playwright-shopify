const { test, expect } = require('@playwright/test');
const { SignUpPage } = require('../pages/SignUpPage');

test.describe('Suíte 02: Validação de Cadastro de Usuário', () => {
  let signUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await page.goto('https://sauce-demo.myshopify.com/', { waitUntil: 'domcontentloaded' });
    await signUpPage.goToRegister();
  });

  test('CT01 - Validar abertura do formulário de cadastro', async () => {
    await expect(signUpPage.createAccountHeading).toBeVisible();
  });

  test('CT02 - Preencher formulário com dados válidos', async () => {
    const uniqueEmail = `rodrigo.teste${Date.now()}@email.com`;
    await signUpPage.fillForm('Rodrigo', 'Oliveira', uniqueEmail, 'Senha123!');
    
    await expect(signUpPage.createButton).toBeEnabled();
    await signUpPage.createButton.click();
  });

  test('CT03 - Validar erro ao tentar cadastrar e-mail já existente (Mock)', async ({ page }) => {
    await page.route('**/account', async (route) => {
      await route.fulfill({
        status: 422,
        contentType: 'text/html',
        body: `<div class="errors"><ul><li>Email has already been taken</li></ul></div>`
      });
    });

    await signUpPage.fillForm('Rodrigo', 'Again', 'rodrigoteste@email.com', 'Senha123!');
    await signUpPage.createButton.click();

    const errorContainer = page.locator('.errors');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toContainText('already been taken');
  });

  test('CT04 - Validar obrigatoriedade de campos - Tentativa vazia (Mock)', async ({ page }) => {
    await page.route('**/account', async (route) => {
      await route.fulfill({
        status: 422,
        contentType: 'text/html',
        body: `<div class="errors"><ul><li>Email can't be blank</li><li>Password can't be blank</li></ul></div>`
      });
    });

    await signUpPage.createButton.click();

    const errorContainer = page.locator('.errors');
    await expect(errorContainer).toBeVisible();
    await expect(page.locator('.errors li')).toContainText(["Email can't be blank", "Password can't be blank"]);
  });
  
  test('CT05 - Validar senha muito curta (Mock)', async ({ page }) => {
    await page.route('**/account', async (route) => {
      await route.fulfill({
        status: 422,
        contentType: 'text/html',
        body: `<div class="errors"><ul><li>Password is too short</li></ul></div>`
      });
    });

    const uniqueEmail = `erro.senha${Date.now()}@email.com`;
    await signUpPage.fillForm('Rodrigo', 'Curto', uniqueEmail, '123');
    await signUpPage.createButton.click();

    const errorContainer = page.locator('.errors');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toContainText('Password is too short');
  });
});