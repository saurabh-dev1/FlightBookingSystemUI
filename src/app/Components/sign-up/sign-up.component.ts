import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  signUpform!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router : Router, private toast:NgToastService){}

  ngOnInit(): void {
    this.signUpform = this.fb.group({
      userName: ['',[Validators.required, Validators.minLength(4)]],
      emailAddress: ['',[Validators.required, this.emailValidator]],
      password:['',[Validators.required, Validators.minLength(8)]],
      phoneNo: ['',[Validators.required, this.phoneNoValidator]],

    })

    const inputs = document.querySelectorAll(".input");

    const addClass = (event: Event) => {
      const parent = (event.target as HTMLElement).parentNode?.parentNode as HTMLElement;
      if (parent) {
        parent.classList.add("focus");
      }
    };

    const removeClass = (event: Event) => {
      const parent = (event.target as HTMLElement).parentNode?.parentNode as HTMLElement;
      if (parent && !(event.target as HTMLInputElement).value) {
        parent.classList.remove("focus");
      }
    };

    inputs.forEach(input => {
      input.addEventListener("focus", addClass);
      input.addEventListener("blur", removeClass);
    });

  }

  //sign up
  onSignUp(){
    if (this.signUpform.valid){
      console.log(this.signUpform.value);

      this.auth.signUp(this.signUpform.value)
      .subscribe({
        next: (res) =>{
          console.log(res.message);
          this.signUpform.reset();
          this.toast.success({detail:"SUCCESS", summary:"please Login now!" ,duration: 5000});
          debugger
          this.router.navigate(['Login'])
        },
        error: (err) =>{

          this.toast.success({detail:"ERROR", summary:"Something went wrong!", duration: 5000})
          console.log(err);
        },

      });
    }


    else{
    }
  }


  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }

  emailValidator(control: FormControl) {
    const email = control.value;
    if (email && !email.endsWith('@gmail.com')) {
      return { invalidEmail: true };
    }
    return null;
  }


  phoneNoValidator(control: FormControl) {
    const phoneNo = control.value;
    if (phoneNo && !(/^[9876]/).test(phoneNo.charAt(0))) {
      return { invalidPhoneNo: true };
    }
    return null;
  }
}
