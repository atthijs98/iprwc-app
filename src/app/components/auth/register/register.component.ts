import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpService} from "../../../shared/services/http.service";
import {GeneralStateService} from "../../../shared/services/general-state.service";

// @ts-ignore
export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  // @ts-ignore
  if (formGroup.get('password').value === formGroup.get('repeatPassword').value) {
    return null;
  } else {
    return {passwordMismatch: true};
  }
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public BACKGROUND_IMAGE: BackgroundImages = 'register-bg.jpg';
  regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    username: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.regex), Validators.maxLength(255)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.pattern(this.regex), Validators.maxLength(255)])
  }, {validators: passwordMatchValidator});

  constructor(private router: Router, private snackbar: MatSnackBar, private httpService: HttpService, private generalStateService: GeneralStateService) {
    this.setBackgroundImage();
  }

  ngOnInit(): void {
  }

  get password(): AbstractControl {return <AbstractControl>this.registerForm.get('password'); }
  get repeatPassword(): AbstractControl {return <AbstractControl>this.registerForm.get('repeatPassword'); }

  onPasswordInput(): void {
    if (this.registerForm.hasError('passwordMismatch')) {
      this.repeatPassword.setErrors([{passwordMismatch: true}]);
    } else {
      this.repeatPassword.setErrors(null);
    }
  }

  onSubmit(): void {
    const formCopy = Object.assign({}, this.registerForm.getRawValue());
    delete formCopy.repeatPassword;
    if (this.registerForm.valid) {
      this.httpService.post({
        public: true,
        endpoint: '/register',
        body: formCopy,
      }).subscribe(() => {
        this.router.navigateByUrl('/login');
      }, error => {
        this.snackbar.open(error.message, '',{
          duration: 4000
        });
      });
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
