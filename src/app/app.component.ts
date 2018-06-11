import { Component, ViewEncapsulation } from '@angular/core';
import { AutocompleteComponent } from './editors/autocomplete.component';

import 'ag-grid-enterprise';
import { GridOptions, Grid } from 'ag-grid/main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowData;
  private columnTypes;
  public gridOptions: GridOptions;

  constructor() {
    this.gridOptions = <GridOptions> {
      rowData: this.createRowData(),
      columnDefs: this.createColumnDefs(),
      columnTypes: this.createColumnTypes(),
      frameworkComponents: {
        autoCompleteEditor: AutocompleteComponent
      }
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private createRowData() {
    return [
      { make: 'Toyota', model: 'Celica', price: 35000, customHeader: 1 },
      { make: 'Ford', model: 'Mondeo', price: 32000, customHeader: 2 },
      { make: 'Porsche', model: 'Boxter', price: 72000, customHeader: 3 }
    ];
  }

  private createColumnDefs() {
    return [
      {headerName: 'Make', field: 'make', type: 'editableHeader' },
      {headerName: 'Model', field: 'model' },
      {headerName: 'Price', field: 'price'},
      {headerName: 'CustomHeader', field: 'customHeader', type: 'editableHeader'},
      // tslint:disable-next-line:max-line-length
      {headerName: 'Rich Select Dropdown', field: 'dropdown', cellEditor: 'agRichSelectCellEditor', cellEditorParams: { values: ['Edit1', 'Edit2', 'Edit3'] }, editable: true},
      // tslint:disable-next-line:max-line-length
      {headerName: 'Custom Select Dropdown', field: 'custom-dropdown', cellEditor: 'autoCompleteEditor', cellEditorParams: { values: ['Alaska', 'Alabama', 'Washington', 'Arizona'] }, editable: true}
    ];
  }

  private createColumnTypes() {
    return {
      editableHeader: {
        width: 140,
        editable: true,
        headerComponentParams : {
          template:
              '<div style="background: red" class="ag-cell-label-container" role="presentation">' +
              '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
              '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
              '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
              '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
              '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
              '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
              '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
              '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
              '  </div>' +
              '</div>'
          }
      }
    };
  }
}
