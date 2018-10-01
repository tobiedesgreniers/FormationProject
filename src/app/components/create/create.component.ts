import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DataService } from '../../data.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  profile: any;

  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder, private auth: AuthService) { 
    this.createForm = this.fb.group({
      'selectedSprint' : [null, Validators.required],
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200)])],
      'notify':  '',
      'user': this.auth.userProfile.sub,
      'createdAt': new Date(),
      'startedAt': new Date()
    })
  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  submitForm(createForm) {
    this.dataService.createSprint(createForm);
    this.router.navigate(['/progress']);
  
  };
}
