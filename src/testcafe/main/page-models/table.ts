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

  /**
   * Получение колонки td по ее номеру и номеру строки tr в tbody
   * @param rowNumber Номер tr в родителе tbody
   * @param columnNumber Номер td в строке tr
   */
  getColumn(rowNumber: number, columnNumber: number) {
    return this.tableBody.child(rowNumber).find('td').nth(columnNumber);
  };
}
