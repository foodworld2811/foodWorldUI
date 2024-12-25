import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(private dialog:MatDialogRef<ConfirmDialogComponent>){}

  onCancel(){
    this.dialog.close(false);
  }

  onConfirm(){
    this.dialog.close(true);
  }
}
