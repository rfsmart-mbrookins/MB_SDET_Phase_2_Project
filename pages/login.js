exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page
        this.username_textbox = page.getByLabel('Username')
        this.password_textbox = page.getByLabel('Password')
        this.login_button = page.getByRole('button', {name: 'Login'})
    }

    async gotoLoginPage() {
        await this.page.goto('https://the-internet.herokuapp.com/login')
    }

 
//Methods

    // enterUsername(){

    // }
    // enterPassword(){

    // }
    // clickOnLogin(){

    // }
 
    async login(username, passowrd){
        await this.username_textbox.fill(username)
        await this.password_textbox.fill(passowrd)
        await this.login_button.click()
    }

}