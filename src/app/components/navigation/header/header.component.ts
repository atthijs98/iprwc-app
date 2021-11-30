import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
