import {Selector} from 'testcafe';

export default class Table {
  tableBody: any;
  searchAscSortedInput: any;
  searchDescSortedInput: any;
  emptyTableRowListText: string;

  constructor () {
    this.tableBody = Selector('tbody', {visibilityCheck: true});
    this.searchAscSortedInput = Selector('.MuiTableSortLabel-iconDirectionAsc', {visibilityCheck: true});
    this.searchDescSortedInput = Selector('.MuiTableSortLabel-iconDirectionDesc', {visibilityCheck: true});
    this.emptyTableRowListText = 'No records to display';
  }
}
