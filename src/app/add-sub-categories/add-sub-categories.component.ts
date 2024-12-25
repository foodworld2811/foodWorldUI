import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sub-categories',
  templateUrl: './add-sub-categories.component.html',
  styleUrls: ['./add-sub-categories.component.css']
})
export class AddSubCategoriesComponent implements OnInit{
 subCategoriesForm!:FormGroup;
 selected: boolean=false;
 selectedFile!:File;
 categoryName:string;
 constructor(private fb:FormBuilder,
  private dialogRef:MatDialogRef<AddSubCategoriesComponent>,
  private homeService:HomeService,private authService:AuthService,
  @Inject(MAT_DIALOG_DATA) public data: {categoryTitle:string}){

    this.categoryName = data.categoryTitle;
    console.log(this.categoryName);
    
  }

 ngOnInit(){
  this.subCategoriesForm = this.fb.group({
    itemName:['',Validators.required],
    itemPrice:['',Validators.required],
    itemstatus:['',Validators.required],
    file:['']
  })

 }
 onFileSelected(event:any){
  this.selectedFile=event.target.files[0];
}
 addSubCategory(){
  if(this.subCategoriesForm.valid){
    const formData=new FormData();
    formData.append('itemName',this.subCategoriesForm.get('itemName')?.value);
    formData.append('itemPrice',this.subCategoriesForm.get('itemPrice')?.value);
    formData.append('itemstatus',this.subCategoriesForm.get('itemstatus')?.value);
    formData.append('file',this.selectedFile);
    formData.append('categoryName',this.categoryName)
    formData.forEach((value,key) => {
      console.log(key+' '+value);
    });
    this.homeService.addsubCategoryItems(formData).subscribe({
      next:(res)=>{
        console.log(res);

        this.authService.openSnackBar("Item Added Successfully","Done")
        this.dialogRef.close(true)
      },
      error:(err)=>{
        console.log(err);
        this.authService.openSnackBar("Failed to Add Item","Error")
      }

  })
}}
}
