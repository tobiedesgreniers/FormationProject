import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { SprintTemplate } from 'models/sprintTemplate.model';
import { Sprint } from 'models/sprint.model';
import { IfStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  uri = 'http://localhost:3000';
  sprintTemplates: SprintTemplate[];
  currentSprint: Sprint;

  constructor(private http: HttpClient, private auth: AuthService) { 
    this.getSprintsTemplate().subscribe((data: SprintTemplate[]) => {
      this.sprintTemplates = data;
    });

    this.currentSprint = {
      name: null,
      duration: null,
      status: null,
      progress: null,
      description: null,
      notify: null,
      user: null,
      createdAt: null,
      startedAt: null,
      finishedAt: null

    };
  }

  getSprints() {
    return this.http.get(`${this.uri}/sprints`);
  }

  getSprintsTemplate(){
    return this.http.get(`${this.uri}/templates`)
  };

  createSprint(Form){
    for(let key in this.currentSprint){
      this.currentSprint[key] = null;
    }

    for(let iter = 0; iter < this.sprintTemplates.length; iter++){
      if(Form.selectedSprint == this.sprintTemplates[iter]._id) {
        this.currentSprint.name = this.sprintTemplates[iter].name;
        this.currentSprint.duration = this.sprintTemplates[iter].duration;
        break;
      }
    }
  
    for(let key in this.currentSprint){
      if(this.currentSprint[key] == null || this.currentSprint[key] == undefined){
        this.currentSprint[key] = Form[key];
      }
    }

    Object.keys(this.currentSprint).forEach(objKey => {
      console.log('This is an objKey : ' + objKey + ' = ' + this.currentSprint[objKey]);
    })

    console.log(this.currentSprint);
  }


  updateSprint(Form) {
    Object.keys(this.currentSprint).forEach(key => {
      if(this.currentSprint[key] == null || this.currentSprint[key] == undefined){
        console.log(this.currentSprint[key]);
        this.currentSprint[key] = Form[key];
      };
    });
    return true;
  };
  

  postSprint(sprint){
    return this.http.post(`${this.uri}/sprints/add`, sprint, {responseType: 'text'});
  }

  getCurrentSprint(){
    return this.currentSprint;
  }

  deleteSprints() {
    return this.http.get(`${this.uri}/sprints/delete`, { responseType: 'text'});
  }
}
