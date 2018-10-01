import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../data.service';
import { AuthService } from '../../services/auth.service'

import { Sprint } from '../../../../models/sprint.model';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  
  //Some are obsolete variables declared because of previous testings
  //Keeping those to remind me of old testing and learnings and for further testings if needed
  sprints: Sprint[];
  path: string[] = ['sprint'];
  order: number  = 1;
  displayedColumns = ['lenght', 'status', 'date', 'start', 'finish', 'description'];
  profile: any;
  
  constructor(private dataService: DataService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.fetchSprints();

    //Getting the userProfile to display on the page footer
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  //fetching sprints in the sprints array
  //Using interpolation in the HTML file to display the sprints
  fetchSprints(){
    this.dataService.getSprints()
    .subscribe((data: Sprint[]) => {
      this.sprints = data;
    });
  }

  //Delete function callin the dataService
  //Fetching after deletion not working... still needs to be tuned
  deleteSprints() {
    this.dataService.deleteSprints().subscribe(() => {
      this.fetchSprints();
    });
  }

  //Function using 
  sortTable(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }

}
