import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../../auth/auth.service";
import {GeneralStateService} from "../../../shared/services/general-state.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public BACKGROUND_IMAGE: BackgroundImages = 'login-bg.jpg';
  @ViewChild('formGroup', {static: false}) formGroup: any;

  constructor(private router: Router, private authService: AuthService, private generalStateService: GeneralStateService) {
    this.setBackgroundImage();
  }

  ngOnInit(): void {
    // if (localStorage.getItem('name') !== null) {
    //   this.router.navigate(['home']);
    // }
    this.initForm();
  }

  initForm(): void {

  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formValues = this.formGroup.form.value;
      this.authService.login(formValues);
    }
  }
  setBackgroundImage(): void {
    this.generalStateService.emitBackgroundImageChangeEvent(this.BACKGROUND_IMAGE);
  }

  ngOnDestroy(): void {
    this.BACKGROUND_IMAGE = 'none';
    this.setBackgroundImage();
  }
}
