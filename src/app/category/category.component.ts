

import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categoryTitle !: string;
  categoryStatus : boolean = false;
  file!:File;
  selected !: string;
  categoryForm!:FormGroup;
  existingCategoryItems: string[] =[];
  categoryId:number = 0;
  isEditMode:any;
  constructor(private fb:FormBuilder,private homeService:HomeService, private dialogRef:MatDialogRef<CategoryComponent>,
      private authService:AuthService, @Inject(MAT_DIALOG_DATA) public data:any) {
        this.isEditMode = !!data?.categoryId;
       }

  ngOnInit(){
    
    this.homeService.getItems().subscribe({
      next:(categories)=>{
        this.existingCategoryItems = categories.map((category:any)=> category.categoryTitle.toLowerCase());
      },
      error:(err)=>{
        console.error("Failed to fetch categories",err);
        
      }
    })
    if (this.data) {
      this.categoryForm.patchValue(this.data)
}
    this.categoryForm = this.fb.group({
      categoryStatus:[true ,Validators.required],
      categoryTitle:['',[Validators.required,this.validateAlreadyExistingcategory.bind(this)]],
      img:[''],
    })
  }

  validateAlreadyExistingcategory(control: AbstractControl){
    if(this.existingCategoryItems.includes(control.value?.toLowerCase())){
      return {categoryExists:true}
    }
    return null;
  }
  onFileSelected(event:any){
    this.file=event.target.files[0];
  }

  addCategory(){
    if(this.categoryForm.valid){
      const formData=new FormData();
      formData.append('categoryTitle',this.categoryForm.get('categoryTitle')?.value);
      formData.append('categoryStatus',this.categoryForm.get('categoryStatus')?.value);
      formData.append('img',this.file);
      formData.forEach((value,key) => {
        console.log(key+' '+value);
      });

      if(this.isEditMode){
        formData.append('categoryId',this.data.categoryId);
        this.homeService.updateItems(this.data.categoryId,formData).subscribe({
          next:(res)=>{
            if(res){
              this.authService.openSnackBar("Category Updated Successfully");
            }
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      }else{
        this.homeService.addItems(formData).subscribe({
          next:(res)=>{
            this.authService.openSnackBar("Category Added Successfully","Done")
            this.dialogRef.close(true)
          },
          error:(err)=>{
            console.log(err);
            this.authService.openSnackBar("Failed to Add Category","Error")
          }
      });
      }
  }}
}