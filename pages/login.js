// pages/login.js
export class LoginPage {
    constructor(page) {
      this.page = page;
    }
  
    // LOCATORS
    loginBtn = () => this.page.locator("#login-button"); 
    usernameInput = () => this.page.locator("#user-name");
    passwordInput = () => this.page.locator("#password");
    loginErrorMsg = () => this.page.locator("#error");
    errorBtn = () => this.page.locator('#error-buton')
  
    // ACTIONS
    async goto() {
      await this.page.goto("https://www.saucedemo.com/");
    }
  
    async inputValidLoginCredentials() {
      await this.usernameInput().fill('standard_user');
      await this.passwordInput().fill('secret_sauce');
    }
  
    async inputInvalidLoginCredentials() {
      await this.usernameInput().fill('standard_user');
      await this.passwordInput().fill('invalidPassword');
    }
  
    async submitLoginCredentials() {
      await this.loginBtn().click();
    }
  
    async assertInvalidLoginErrorMsg() {
      await expect(this.loginErrorMsg()).toBeVisible();
    }
  }
  