import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/Users/users.service';
import { UserModule } from 'src/app/models/user/user/user.module';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  constructor(private userService: UsersService){}

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

}
