import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sub-categories',
  templateUrl: './add-sub-categories.component.html',
  styleUrls: ['./add-sub-categories.component.css']
})
export class AddSubCategoriesComponent implements OnInit {
  subCategoriesForm!: FormGroup;
  selected: boolean = false;
  selectedFile!: File;
  categoryName: string;
  isEditMode: boolean = false;
  existingItems: string[]=[];
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSubCategoriesComponent>,
    private homeService: HomeService, private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.categoryName = data.categoryTitle;
    this.isEditMode = !!data.itemId;
    // console.log(this.isEditMode  = !!data.itemId);

  }

  ngOnInit() {
    this.homeService.getSubCategoryItems().subscribe({
      next:(res)=>{
        this.existingItems = res.map((items:any)=>items.itemName.toLowerCase());
      },
      error:(err)=>{
        console.log("Failed to fetch Items Data");
        
      }
    })
    this.subCategoriesForm = this.fb.group({
      itemName: ['', [Validators.required,this.validateItemAlreadyExisting.bind(this)]],
      itemPrice: ['', Validators.required],
      itemstatus: [true, Validators.required],
      file: ['']
    })
    this.subCategoriesForm.patchValue(this.data)
  }

  validateItemAlreadyExisting(control: AbstractControl){
    if(this.existingItems.includes(control.value?.toLowerCase())){
      return {itemExists:true}
    }
    return null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  addSubCategory() {
    if (this.subCategoriesForm.valid) {
      const formData = new FormData();
      formData.append('itemName', this.subCategoriesForm.get('itemName')?.value);
      formData.append('itemPrice', this.subCategoriesForm.get('itemPrice')?.value);
      formData.append('itemstatus', this.subCategoriesForm.get('itemstatus')?.value);
      formData.append('file', this.selectedFile);
      formData.append('categoryName', this.categoryName);
      formData.forEach((value,key) => {
        console.log(key+' '+value);
      });
      if (this.isEditMode) {
        formData.append('id', this.data.itemId);
        this.homeService.updateSubCategoryItems(this.data.itemId, formData).subscribe({
          next: (res) => {
            this.authService.openSnackBar("Item Updated Successfully");
            this.dialogRef.close(true);

          }
        })
      } else {
        this.homeService.addsubCategoryItems(formData).subscribe({
          next: (res) => {
            // console.log(res);

            this.authService.openSnackBar("Item Added Successfully", "Done")
            this.dialogRef.close(true)
          },
          error: (err) => {
            console.log(err);
            this.authService.openSnackBar("Failed to Add Item", "Error")
          }

        })
      }
    }
  }

}
