import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  constructor(public authService: AuthService) { }
  ngOnInit(): void {}
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout(): void {
    this.authService.logout();
  }

  wrap(): void {
    this.onSidenavClose();
    this.logout();
  }
}
