import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  selectedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userSelected.subscribe(
      (user: User) => {
        this.selectedUser = user;
      }
    )
  }

}
