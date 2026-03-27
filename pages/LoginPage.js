exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;

    this.loginIcon = page.locator('a[href="/account/login"]');
    this.loginHeading = page.getByRole('heading', { name: 'Login' });

    this.emailInput = page.locator('input[name="customer[email]"]');
    this.passwordInput = page.locator('input[name="customer[password]"]');
    this.signInButton = page.locator('form#customer_login button:has-text("Sign in"), form#customer_login input[type="submit"]').first();
  }

  async goToLogin() {
    await this.loginIcon.click();
  }

  async doLogin(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
};