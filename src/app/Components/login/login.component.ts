import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router :Router, private toast:NgToastService){}

  result: any;
  ngOnInit(): void {
    this.loginform = this.fb.group({
      userName: ['',Validators.required],
      password:['', Validators.required],
      token:[''],
      roles:['']
    })
  }

  onLogin(){
    if (this.loginform.valid){
      console.log(this.loginform.value);
      this.auth.login(this.loginform.value)
      .subscribe({
        next: (res) =>{
          this.result = res
          console.log(res);
          this.auth.storeToken(res.token);
          this.toast.success({detail:"SUCCESS", duration: 5000});

          if(this.result.message == "Admin")
          {
          this.router.navigate(['Admin']);
          }
          else{
            this.router.navigate(['dashboard']);
          }
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


}
