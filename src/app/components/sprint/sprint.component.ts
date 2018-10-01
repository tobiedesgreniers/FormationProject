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
  sprints: Sprint[];
  path: string[] = ['sprint'];
  order: number  = 1;
  displayedColumns = ['lenght', 'status', 'date', 'start', 'finish', 'description'];
  profile: any;
  
  constructor(private dataService: DataService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.fetchSprints();

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  fetchSprints(){
    this.dataService.getSprints()
    .subscribe((data: Sprint[]) => {
      this.sprints = data;
    });
  }

  deleteSprints() {
    this.dataService.deleteSprints().subscribe(() => {
      this.fetchSprints();
    });
  }

  sortTable(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }

}
