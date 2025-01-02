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
  isLoading: boolean = false;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSubCategoriesComponent>,
    private homeService: HomeService, private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.categoryName = data.categoryTitle;
    this.isEditMode = !!data.itemId;
    // console.log(this.isEditMode  = !!data.itemId);

  }

  ngOnInit() {
    this.isLoading = true;
    this.homeService.getSubCategoryItems().subscribe({
      next:(res)=>{
        this.isLoading=false;
        this.existingItems = res.map((items:any)=>items.itemName.toLowerCase());
      },
      error:(err)=>{
        console.log("Failed to fetch Items Data");
        
      }
    })
    this.subCategoriesForm = this.fb.group({
      itemName: ['', [Validators.required,this.validateItemAlreadyExisting.bind(this)]],
      itemPrice: ['', Validators.required],
      itemStatus: [true, Validators.required],
      file: ['']
    })
    if(this.data){
      console.log("subCategoriesForm.patchValue(this.data)",this.data);
      this.subCategoriesForm.patchValue(this.data);
    }

    
    
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
      formData.append('itemStatus', this.subCategoriesForm.get('itemStatus')?.value);
      formData.append('file', this.selectedFile);
      formData.append('categoryName', this.categoryName);
      formData.forEach((value,key) => {
        console.log(key+' '+value);
      });
      if (this.isEditMode) {
        formData.append('id', this.data.itemId);
        console.log("Edit Mode");
        this.isLoading= true;
        this.homeService.updateSubCategoryItems(this.data.itemId, formData).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.authService.openSnackBar("Item Updated Successfully");
            this.dialogRef.close(true);

          }
        })
      } else {
        this.isLoading = true;
        this.homeService.addsubCategoryItems(formData).subscribe({
          next: (res) => {
            // console.log(res);
            this.isLoading=false;

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
