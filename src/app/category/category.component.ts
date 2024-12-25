

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(private fb:FormBuilder,private homeService:HomeService, private dialogRef:MatDialogRef<CategoryComponent>,
      private authService:AuthService) { }

  ngOnInit(){
    this.categoryForm = this.fb.group({
      categoryStatus:[''],
      categoryTitle:[''],
      img:[''],
    })
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
      this.homeService.addItems(formData).subscribe({
        next:(res)=>{
          console.log(res);
          this.authService.openSnackBar("Category Added Successfully","Done")
          this.dialogRef.close(true)
        },
        error:(err)=>{
          console.log(err);
          this.authService.openSnackBar("Failed to Add Category","Error")
        }

    })
  }}
}