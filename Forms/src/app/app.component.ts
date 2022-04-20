import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    //can use two way data binding to do this as well
    const suggestedName = 'Superuser';

    //this overrides content
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: this.signupForm.value.userData.email
    //   },
    //   questionData: {
    //     secret: this.signupForm.form.value.questionData.secret,
    //     questionAnswer: this.signupForm.value.questionData.questionAnswer
    //   },
    //   gender: this.signupForm.value.gender
    // });

    //This is better
    this.signupForm.form.patchValue({userData: {
      username: suggestedName
    }});
  }

  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  onSubmit(){
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.questionData.secret;
    this.user.answer = this.signupForm.value.questionData.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.submitted = true;
  }
}
