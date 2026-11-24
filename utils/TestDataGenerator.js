const signupOptions = require('../test-data/signup-options.json');

let emailCounter = 0;

function randomBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomDigits(count) {
  let digits = '';
  for (let i = 0; i < count; i++) {
    digits += randomBetween(0, 9);
  }
  return digits;
}

class TestDataGenerator {
  static generateUniqueEmail(prefix = 'user') {
    emailCounter += 1;
    return `${prefix}${Date.now()}-${process.pid}-${emailCounter}@testmail.com`;
  }

  static pickRandomItem(itemList) {
    if (!Array.isArray(itemList) || itemList.length === 0) {
      throw new Error('pickRandomItem needs a non-empty array');
    }
    return itemList[randomBetween(0, itemList.length - 1)];
  }

  static buildIdentity() {
    const stamp = Date.now();
    return {
      name: `Tester${stamp}`,
      email: TestDataGenerator.generateUniqueEmail('shopsure'),
      password: `Pw@${stamp}`,
      title: TestDataGenerator.pickRandomItem(signupOptions.titles),
      birthDay: String(randomBetween(1, 28)),
      birthMonth: String(randomBetween(1, 12)),
      birthYear: String(randomBetween(1950, 2000)),
      firstName: 'Test',
      lastName: 'User',
    };
  }

  static buildAddress() {
    return {
      company: 'ShopSure Test',
      address: '12 Test Street',
      country: TestDataGenerator.pickRandomItem(signupOptions.countries),
      state: 'Lagos',
      city: 'Ikeja',
      zipcode: randomDigits(6),
      mobileNumber: `080${randomDigits(8)}`,
    };
  }

  static generateUserProfile() {
    return {
      ...TestDataGenerator.buildIdentity(),
      ...TestDataGenerator.buildAddress(),
    };
  }
}

module.exports = TestDataGenerator;