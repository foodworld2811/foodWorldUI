import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categoryForm!:FormGroup;
  previewUrl: any;
  constructor(private fb:FormBuilder,private homeService:HomeService){

  }

  ngOnInit(){
    this.categoryForm = this.fb.group({
      categoryid:[''],
      title:[''],
      img:[''],
    })
  }
  addCategory(){
    if(this.categoryForm.valid){
      this.homeService.addItems(this.categoryForm.value).subscribe({
        next:(res)=>{
          console.log(res);
        }
      })
    }
  }

  onUploadButtonClick(event : MouseEvent){
    event.preventDefault();
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event):void{
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e) =>{
        this.previewUrl = e.target?.result;
        // this.categoryForm.patchValue({categoryimg:file})
      };
      reader.readAsDataURL(file)
    }
  }
}
