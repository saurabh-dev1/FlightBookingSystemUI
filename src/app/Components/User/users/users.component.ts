import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/Users/users.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { UserModule } from 'src/app/models/user/user/user.module';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  constructor(private authService: AuthService,private userService: UsersService){}

  users: UserModule[] = [];
  ngOnInit(): void {

    this.userService.getUser()
    .subscribe({
      next: (users) =>{
        this.users = users;
      },
      error:(res) =>{
        console.log(res);
      }
    })
  }

  deleteUser(userId : number){

    if(userId !== null){
      debugger
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter(user => user.userId !== userId);
        },
        (error) => {
          console.error('Error deleting booking:', error);
        }
      );

    }else{

    }
  }

  logout(){
    this.authService.signOut();
  }
}
