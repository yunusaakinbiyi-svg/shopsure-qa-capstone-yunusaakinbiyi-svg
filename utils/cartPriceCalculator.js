function parsePriceText(priceText) {
  const match = String(priceText).match(/\d[\d,]*(\.\d+)?/);
  if (!match) {
    throw new Error(`No price number found in: "${priceText}"`);
  }
  return Number(match[0].replace(/,/g, ''));
}

function calculateLineTotal(unitPrice, quantity) {
  if (!Number.isFinite(unitPrice) || !Number.isFinite(quantity)) {
    throw new Error('unitPrice and quantity must be numbers');
  }
  if (quantity < 1) {
    throw new Error('quantity must be at least 1');
  }
  return unitPrice * quantity;
}

function calculateCartTotal(cartItemList) {
  if (!Array.isArray(cartItemList)) {
    throw new Error('cartItemList must be an array');
  }
  let total = 0;
  for (const item of cartItemList) {
    total += calculateLineTotal(item.unitPrice, item.quantity);
  }
  return total;
}

module.exports = { parsePriceText, calculateLineTotal, calculateCartTotal };