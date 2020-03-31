import {Selector, t} from 'testcafe';

export default class Panel {
  searchInput: any;
  deleteIcon: any;
  editIcon: any;
  panelTitle: any;
  clearIcon: any;
  addIcon: any;

  constructor () {
    this.searchInput = Selector('#standard-search', {visibilityCheck: true});
    this.deleteIcon = Selector('#deleteIcon', {visibilityCheck: true});
    this.editIcon = Selector('#editIcon', {visibilityCheck: true});
    this.panelTitle = Selector('[data-test-id="panelTitle"]', {visibilityCheck: true});
    this.clearIcon = Selector('#clearIcon', {visibilityCheck: true});
    this.addIcon = Selector('#addIcon', {visibilityCheck: true});
  }

  async typeSearchText(text: string) {
    await t.typeText(this.searchInput, text);
  }

  async resetSearchText() {
    await t
      .selectText(this.searchInput)
      .pressKey('delete')
  }
}
