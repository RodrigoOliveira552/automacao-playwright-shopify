const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Suíte 01: Navegação Estratégica da Home', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.visit();
  });

  test('CT01 - Validar URL e Identidade Visual', async ({ page }) => {
    // 0. Validar se o site está correto (Usando RegEx para flexibilidade)
    await expect(page, 'Deveria estar na URL da loja Sauce Demo Shopify').toHaveURL(/.*sauce-demo.myshopify.com/);
    // 1. Topo: Validar logo "Sauce Demo"
    await expect(homePage.logoButton, 'O logo da marca Sauce Demo deveria estar visível').toBeVisible();
  });

  test('CT02 - Fluxo Institucional About Us', async ({ page }) => {
    // 1.1 e 1.2: Clicar em About Us e retornar via Logo
    await homePage.aboutUsLink.click();
    await expect(page, 'Deveria ter navegado para a página institucional About Us').toHaveURL(/.*about-us/);
    
    await homePage.logoButton.click();
    await expect(page, 'Deveria ter retornado à Home após clicar no logo').toHaveURL(/.*sauce-demo.myshopify.com/);
  });

  test('CT03 - Validar Exibição de Produtos (Meio)', async () => {
    // 2. Meio: Verificar se Imagens/Cards de catálogo estão sendo exibidas
    await expect(homePage.productCard, 'O card de produto deveria estar visível na vitrine principal').toBeVisible();
  });

  test('CT04 - Validar Redirecionamento do Blog', async ({ page }) => {
    // 3. Botões laterais: verificar se o botão "Blog" redireciona corretamente
    await homePage.blogLink.click();
    await expect(page, 'Deveria ter sido redirecionado para a página de Blogs').toHaveURL(/.*blogs/);
  });

  test('CT05 - Validar Busca no Footer e Retorno Home', async ({ page }) => {
    // 4. Footer: verificar se o botão "Search" é clicável e funcional
    await homePage.searchButton.scrollIntoViewIfNeeded();
    await homePage.searchButton.click();
    await expect(homePage.searchTitle, 'Deveria exibir o título de resultados da busca').toBeVisible();
    
    // 5. Clicar no botão home e validar se voltou para a home
    await homePage.homeMenuLink.click();
    await expect(page, 'Deveria ter retornado à URL Home principal').toHaveURL(/.*sauce-demo.myshopify.com/);
  });
});