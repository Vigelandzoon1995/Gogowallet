import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the BudgetItemPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'budget-item-popover',
  templateUrl: 'budget-item-popover.html'
})
export class BudgetItemPopoverComponent {

  items: any

  constructor(private viewCtrl: ViewController) {
    this.items = [
      { item: "View" },
      { item: "Delete" }
    ];
  }
  
  itemClick(item) {
    try {
      this.viewCtrl.dismiss(item);
    } catch (Nullpointerexception) {
      console.log(Nullpointerexception);
    }

  }

}
