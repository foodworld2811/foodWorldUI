import { ChangeDetectorRef, Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Rest-App';
  
  constructor(private router:Router,
    private homeService:HomeService,
  private cdr: ChangeDetectorRef){
  
  }
    
    
}
