// pages/HomePage.js
exports.HomePage = class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // 1. Topo & Identidade (Bússola de navegação)
    // O Codegen identificou o logo como o link "Sauce Demo"
    this.logoButton = page.getByRole('link', { name: 'Sauce Demo' });
    this.aboutUsLink = page.getByRole('banner').getByRole('link', { name: 'About Us' });

    // 2. Meio (Catálogo de Produtos)
    // Seletor específico capturado no seu teste manual para o Card de Produto
    this.productCard = page.getByRole('link', { name: 'Grey jacket Grey jacket £' });

    // 3. Menu / Navegação Lateral
    this.blogLink = page.getByRole('link', { name: 'Blog' });

    // 4. Rodapé (Footer) e Busca
    // O Codegen validou o uso do atributo 'title' para evitar conflitos de duplicidade
    this.searchButton = page.getByTitle('Search');
    this.searchTitle = page.getByRole('heading', { name: 'Search Results' });
    
    // Botão Home no Menu (Geralmente o primeiro link de navegação)
    this.homeMenuLink = page.getByRole('link', { name: 'Home' }).first();
  }

  async visit() {
    // Acessa a URL e espera até que não haja mais de 2 conexões de rede ativas (estabilidade)
    await this.page.goto('https://sauce-demo.myshopify.com/', { waitUntil: 'networkidle' });
  }
};