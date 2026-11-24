function parsePriceText(priceText) {
  const match = String(priceText).match(/\d[\d,]*(\.\d+)?/);
  if (!match) {
    throw new Error(`No price number found in: "${priceText}"`);
  }
  return Number(match[0].replace(/,/g, ''));
}

module.exports = { parsePriceText };