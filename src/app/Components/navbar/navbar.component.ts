import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { UserStoreService } from 'src/app/Services/UserStore/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  name: string ="";
  role: string ="";
  check! :boolean
  constructor(private authService: AuthService,
    private userStore : UserStoreService){}

    ngOnInit(): void {



      this.userStore.getNameFromStore().subscribe(
        val =>{
          const getNameFromToken = this.authService.getNameFromToken();
          this.name = val || getNameFromToken

        }
      )

      if(this.authService.isLoggedIn())
      {
        this.check=true;
      }
      else{
        this.check=false;
      }

      this.userStore.getRoleFromStore().subscribe(
        val =>{
          const getRoleFromToken = this.authService.getRoleFromToken();
          this.role = val || getRoleFromToken;
        }
      )
    }

  logout(){
    this.authService.signOut();
  }


}
