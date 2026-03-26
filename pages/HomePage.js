// pages/HomePage.js
exports.HomePage = class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.logoButton = page.getByRole('link', { name: 'Sauce Demo' });
    this.aboutUsLink = page.getByRole('banner').getByRole('link', { name: 'About Us' });

    
    this.productCard = page.getByRole('link', { name: 'Grey jacket Grey jacket £' });

    this.blogLink = page.getByRole('link', { name: 'Blog' });

    this.searchButton = page.getByTitle('Search');
    this.searchTitle = page.getByRole('heading', { name: 'Search Results' });
    
    this.homeMenuLink = page.getByRole('link', { name: 'Home' }).first();
  }

  async visit() {
    await this.page.goto('https://sauce-demo.myshopify.com/', { waitUntil: 'networkidle' });
  }
};