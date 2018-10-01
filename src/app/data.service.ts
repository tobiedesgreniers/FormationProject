import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { SprintTemplate } from 'models/sprintTemplate.model';
import { Sprint } from 'models/sprint.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  uri = 'http://localhost:3000';
  sprintTemplates: SprintTemplate[];
  currentSprint: Sprint;

  constructor(private http: HttpClient, private auth: AuthService) {

    //Storing locally the Sprint Templates from the database
    this.getSprintsTemplate().subscribe((data: SprintTemplate[]) => {
      this.sprintTemplates = data;
    });
    
    //Initialization of interface : Sprint
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

  //Get all the sprints stored in the database
  getSprints() {
    return this.http.get(`${this.uri}/sprints`);
  }

  //Get all the sprints templates stored in the database
  getSprintsTemplate(){
    return this.http.get(`${this.uri}/templates`)
  };

  //Temporary function to create a sprint when a form is submitted
  //in createComponent
  createSprint(Form){
    //Reseting the current sprint on creation
    for(let key in this.currentSprint){
      this.currentSprint[key] = null;
    }

    //assigning the values of the corresponding template to the current sprint
    //Loop breaking when the good template is found
    for(let iter = 0; iter < this.sprintTemplates.length; iter++){
      if(Form.selectedSprint == this.sprintTemplates[iter]._id) {
        this.currentSprint.name = this.sprintTemplates[iter].name;
        this.currentSprint.duration = this.sprintTemplates[iter].duration;
        break;
      }
    }
  
    //Assigning the values of the Form to the corresponding keys in the currentSprint variable
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

  //Temporary function to update Sprint when ProgressComponent complete a sprint or a sprint is cancelled
  updateSprint(Form) {
    Object.keys(this.currentSprint).forEach(key => {
      if(this.currentSprint[key] == null || this.currentSprint[key] == undefined){
        console.log(this.currentSprint[key]);
        this.currentSprint[key] = Form[key];
      };
    });
    return true;
  };
  
  //Post the current sprint to the database
  postSprint(sprint){
    return this.http.post(`${this.uri}/sprints/add`, sprint, {responseType: 'text'});
  }

  //Get the current running sprint
  getCurrentSprint(){
    return this.currentSprint;
  }

  //Delete all the sprints stored in the database
  deleteSprints() {
    return this.http.get(`${this.uri}/sprints/delete`, { responseType: 'text'});
  }
}
