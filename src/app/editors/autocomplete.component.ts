import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular/main';
import {FormControl} from '@angular/forms';
import {MatAutocompleteTrigger} from '@angular/material';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements ICellEditorAngularComp {
    @ViewChild('group', {read: ViewContainerRef})
    public group;
    @ViewChild('dropdown', {read: MatAutocompleteTrigger})
    public dropdown: MatAutocompleteTrigger;

    valueControl: FormControl = new FormControl();
    private params: any;
    private paramValues: any;
    private currentValue: string;
    private selectedIndex: number;

    constructor() { }

    agInit(params: any): void {
        this.params = params;
        this.paramValues = this.params.values;

    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        setTimeout(() => {
            this.group.element.nativeElement.focus();
        });
        this.dropdown.openPanel();
        this.selectValueBasedOnIndex();
    }

    private selectValueBasedOnIndex() {
        this.currentValue = this.paramValues[this.selectedIndex];
    }

    getValue() {
        return this.currentValue;
    }

    isPopup(): boolean {
        return true;
    }

    onKeyDown(event): void {
        // tslint:disable-next-line:prefer-const
        let key = event.which || event.keyCode;
        if (key === 38 || key === 40) {
            event.preventDefault();
            event.stopPropagation();

            if (key === 38) {
                this.selectedIndex = this.selectedIndex === 0 ? this.paramValues.length - 1 : this.selectedIndex - 1;
            } else if (key === 40) {
                this.selectedIndex = this.selectedIndex === this.paramValues.length - 1 ? 0 : this.selectedIndex + 1;
            }
            this.selectValueBasedOnIndex();
        }
    }
}
