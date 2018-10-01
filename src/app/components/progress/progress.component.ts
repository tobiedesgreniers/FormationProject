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
      
      //Getting the userProfile to display on the page footer
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
      } 
      
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    })
  }
    
  //Function to count down from the time of a chosen template (currentSprint) to 0
  //Percentage calculation is also handled in this function
  //Redirection is handled at the end of the countdown
  
  /*
    Function not completed
  */
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

  //Function to cancel sprint and post it after update
  /* 
    Function not completed
  */
  cancelSprint(){
    clearInterval(this.interval);
    
  };
}
