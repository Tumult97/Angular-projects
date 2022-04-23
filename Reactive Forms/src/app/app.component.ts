import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PromiseType } from 'protractor/built/plugins';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenusernames = ['chris', 'tess', 'fuck'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails.bind(this)]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    // let match = this.forbiddenusernames.find(element => {
    //   if (element.includes(control.value)) {
    //     return true;
    //   }
    // });

    if(this.forbiddenusernames.indexOf(control.value) !== -1){
      return { 'nameIsForbidden': true };
    }

    // if(match) 
    //   return { 'Invalid string detected in username': true };
    
    return null;
  }

  forbiddenEmails(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        }
        else{
          resolve(null);
        }
      }, 1567);
    });

    return promise;
  }

}
