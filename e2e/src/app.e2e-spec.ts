import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Getting Started in title', () => {
    page.navigateToRoot();
    expect(page.getContentTitle()).toEqual('Getting Started');
  });
});
