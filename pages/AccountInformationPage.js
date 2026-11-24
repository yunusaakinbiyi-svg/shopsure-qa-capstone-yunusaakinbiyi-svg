import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class AccountInformationPage extends BasePage {
  constructor(page) {
    super(page);

    this.formHeading = page.getByRole('heading', { name: 'Enter Account Information' });
    this.passwordInput = page.getByTestId('password');
    this.dayDropdown = page.getByTestId('days');
    this.monthDropdown = page.getByTestId('months');
    this.yearDropdown = page.getByTestId('years');
    this.firstNameInput = page.getByTestId('first_name');
    this.lastNameInput = page.getByTestId('last_name');
    this.companyInput = page.getByTestId('company');
    this.addressInput = page.getByTestId('address');
    this.countryDropdown = page.getByTestId('country');
    this.stateInput = page.getByTestId('state');
    this.cityInput = page.getByTestId('city');
    this.zipcodeInput = page.getByTestId('zipcode');
    this.mobileNumberInput = page.getByTestId('mobile_number');
    this.createAccountButton = page.getByTestId('create-account');
  }

  async chooseTitle(title) {
    // The radio labels on the site are "Mr." and "Mrs."
    await this.page.getByRole('radio', { name: `${title}.`, exact: true }).check();
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async selectBirthDay(day) {
    await this.dayDropdown.selectOption(day);
  }

  async selectBirthMonth(month) {
    await this.monthDropdown.selectOption(month);
  }

  async selectBirthYear(year) {
    await this.yearDropdown.selectOption(year);
  }

  async enterFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async enterCompany(company) {
    await this.companyInput.fill(company);
  }

  async enterAddress(address) {
    await this.addressInput.fill(address);
  }

  async selectCountry(country) {
    await this.countryDropdown.selectOption(country);
  }

  async enterState(state) {
    await this.stateInput.fill(state);
  }

  async enterCity(city) {
    await this.cityInput.fill(city);
  }

  async enterZipcode(zipcode) {
    await this.zipcodeInput.fill(zipcode);
  }

  async enterMobileNumber(mobileNumber) {
    await this.mobileNumberInput.fill(mobileNumber);
  }

  async submitForm() {
    await this.createAccountButton.click();
  }

  // The one combining method of this page: fills the whole form from one profile
  async fillAccountForm(userProfile) {
    await this.chooseTitle(userProfile.title);
    await this.enterPassword(userProfile.password);
    await this.selectBirthDay(userProfile.birthDay);
    await this.selectBirthMonth(userProfile.birthMonth);
    await this.selectBirthYear(userProfile.birthYear);
    await this.enterFirstName(userProfile.firstName);
    await this.enterLastName(userProfile.lastName);
    await this.enterCompany(userProfile.company);
    await this.enterAddress(userProfile.address);
    await this.selectCountry(userProfile.country);
    await this.enterState(userProfile.state);
    await this.enterCity(userProfile.city);
    await this.enterZipcode(userProfile.zipcode);
    await this.enterMobileNumber(userProfile.mobileNumber);
  }

  async verifyFormIsVisible() {
    await expect(this.formHeading).toBeVisible();
  }
}