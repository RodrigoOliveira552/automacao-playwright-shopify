const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Suíte 01: Navegação Estratégica da Home', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.visit();
  });

  test('CT01 - Validar URL e Identidade Visual', async ({ page }) => {
    await expect(page, 'Deveria estar na URL da loja Sauce Demo Shopify').toHaveURL(/.*sauce-demo.myshopify.com/);
    // 1. Topo: Validar logo "Sauce Demo"
    await expect(homePage.logoButton, 'O logo da marca Sauce Demo deveria estar visível').toBeVisible();
  });

  test('CT02 - Fluxo Institucional About Us', async ({ page }) => {
    await homePage.aboutUsLink.click();
    await expect(page, 'Deveria ter navegado para a página institucional About Us').toHaveURL(/.*about-us/);
    
    await homePage.logoButton.click();
    await expect(page, 'Deveria ter retornado à Home após clicar no logo').toHaveURL(/.*sauce-demo.myshopify.com/);
  });

  test('CT03 - Validar Exibição de Produtos (Meio)', async () => {
    await expect(homePage.productCard, 'O card de produto deveria estar visível na vitrine principal').toBeVisible();
  });

  test('CT04 - Validar Redirecionamento do Blog', async ({ page }) => {
    await homePage.blogLink.click();
    await expect(page, 'Deveria ter sido redirecionado para a página de Blogs').toHaveURL(/.*blogs/);
  });

  test('CT05 - Validar Busca no Footer e Retorno Home', async ({ page }) => {
    await homePage.searchButton.scrollIntoViewIfNeeded();
    await homePage.searchButton.click();
    await expect(homePage.searchTitle, 'Deveria exibir o título de resultados da busca').toBeVisible();
    
    await homePage.homeMenuLink.click();
    await expect(page, 'Deveria ter retornado à URL Home principal').toHaveURL(/.*sauce-demo.myshopify.com/);
  });
});