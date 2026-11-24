export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(pagePath) {
    await this.page.goto(pagePath);
  }

  async blockAds() {
    // Ad pop-ups can cover buttons and make clicks fail, so we cancel ad requests.
    await this.page.route(/googlesyndication|doubleclick|googleadservices|adservice\.google|pagead/, (route) => route.abort());
  }
}