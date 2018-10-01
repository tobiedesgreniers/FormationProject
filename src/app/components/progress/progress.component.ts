import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { DataService } from '../../data.service'
import { AuthService } from '../../services/auth.service'

import { Sprint } from 'models/sprint.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  profile: any;
  sprint: Sprint;
  percent: number;
  counter: number;
  interval: any;


  
  constructor(private dataService: DataService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.dataService.getSprintsTemplate()
      .subscribe(() => {
      this.sprint = this.dataService.getCurrentSprint();
  
      this.startCountdown(this.sprint.duration);
      
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
      } 
      
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    })
  }
    

  startCountdown(seconds){
    this.counter = 0
    this.interval = setInterval(() => {
      this.counter++;
      this.percent = this.counter / seconds*100
      console.log(this.counter);
      console.log(this.percent);
      if(this.counter >= seconds){

        this.router.navigate(['/sprint']);
        clearInterval(this.interval);
        console.log('Progress timer is finished');
      };
    }, 1000);
  };

  cancelSprint(){
    clearInterval(this.interval);
    
  };
}
