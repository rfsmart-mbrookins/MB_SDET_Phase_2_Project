import { expect } from "@playwright/test";
// import exp from "constants";

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  loginBtn = () => this.page.locator("#login-button");
  usernameInput = () => this.page.locator("#user-name");
  passwordInput = () => this.page.locator("#password");
  loginErrorMsg = () => this.page.locator(".error").nth(2);

  //Login
  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  //Enter valid login credentials
  async inputValidLoginCredentials() {
    await this.usernameInput().fill("standard_user");
    await this.passwordInput().fill("secret_sauce");
  }

  //Enter invalid login credentials
  async inputInvalidLoginCredentials() {
    await this.usernameInput().fill("invalid_user");
    await this.passwordInput().fill("invalidPassword");
  }

  //Login button
  async submitLoginCredentials() {
    await this.loginBtn().click();
  }

  //Validate error message returned
  async validateInvalidLoginErrorMsg() {
    await expect(this.loginErrorMsg()).toBeVisible();
    await expect(this.loginErrorMsg()).toHaveText("Epic sadface: Username and password do not match any user in this service"
    );
  }

  //Login page URL validation
  async validateLoginPageURL() {
    const baseURL = "https://www.saucedemo.com";
    const extension = "/";
    const currentURL = await this.page.url();
    await expect(currentURL).toBe(`${baseURL}${extension}`);
  }



}
