export class LoginPage {

    constructor(page) {
        this.page = page
        this.username_textbox = page.getByPlaceholder('Username')
        this.password_textbox = page.getByPlaceholder('Password')
        this.login_button = page.getByRole('button', {name: 'Login'})
    }
    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/')
    }
    async login(username, passowrd) {
        await this.username_textbox.fill(username)
        await this.password_textbox.fill(passowrd)
        await this.login_button.click()
    }

}