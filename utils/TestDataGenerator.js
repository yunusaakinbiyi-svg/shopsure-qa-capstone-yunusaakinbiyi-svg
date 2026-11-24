let emailCounter = 0;

function randomBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
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
}

module.exports = TestDataGenerator;