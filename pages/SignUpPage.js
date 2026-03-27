exports.SignUpPage = class SignUpPage {
  constructor(page) {
    this.page = page;

    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.createAccountHeading = page.getByRole('heading', { name: 'Create Account' });

    this.firstNameInput = page.locator('input[name="customer[first_name]"]');
    this.lastNameInput = page.locator('input[name="customer[last_name]"]');
    this.emailInput = page.locator('input[name="customer[email]"]');
    this.passwordInput = page.locator('input[name="customer[password]"]');

    this.createButton = page.locator('form#create_customer input[type="submit"], button:has-text("Create")').first();
  }

  async goToRegister() {
    await this.signUpLink.click();
    await this.registerLink.click();
  }

  async fillForm(firstName, lastName, email, password) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
};