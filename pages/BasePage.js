export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(pagePath) {
    // 'commit' returns once the server starts answering. The web-first assertions then wait
    // for the elements, which is more reliable on a slow connection than waiting for the whole page.
    await this.page.goto(pagePath, { waitUntil: 'commit' });
  }

  async blockAds() {
    // Ad pop-ups can cover buttons and make clicks fail, so we cancel ad requests.
    await this.page.route(/googlesyndication|doubleclick|googleadservices|adservice\.google|pagead/, (route) => route.abort());
  }
}