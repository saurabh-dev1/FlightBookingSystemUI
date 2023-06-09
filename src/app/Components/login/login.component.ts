import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { UserStoreService } from 'src/app/Services/UserStore/user-store.service';
import { UserModule } from 'src/app/models/user/user/user.module';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;


  constructor(private fb: FormBuilder, private auth: AuthService,
    private router :Router,
    private toast:NgToastService,
    private userStore: UserStoreService){}




  result: any;
  ngOnInit(): void {
    this.loginform = this.fb.group({
      userName: ['',Validators.required],
      password:['', Validators.required],
      token:[''],
      roles:['']
    })
    // Javascript file
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

  onLogin(){
    if (this.loginform.valid){
      console.log(this.loginform.value);
      this.auth.login(this.loginform.value)
      .subscribe({
        next: (res) =>{
          this.result = res
          console.log(res);
          this.auth.storeToken(res.token);

        let tokenPayload = this.auth.decodedToken();
          this.userStore.setNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);

          sessionStorage.setItem('userId', res.userId);
          console.log(res.message);
          debugger

          sessionStorage.setItem('email', res.email);
          sessionStorage.setItem('role', res.message);

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

          this.toast.error({detail:"ERROR", summary:"Something went wrong!", duration: 5000})
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
