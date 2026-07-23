import { Component, inject, signal } from '@angular/core';
import { UserProfileService, GHIN_Info } from 'shared-data';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY, pipe } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email, form, required, FormField } from '@angular/forms/signals';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [ReactiveFormsModule, FormField],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
})
export class AuthPage {
 ghinLookup = false; //when lookup is active, will set to true
 userService = inject(UserProfileService);
 router = inject(Router);
 loginModel = signal({
    email: '',
    password: ''
  });

 loginForm = form(this.loginModel, (path) => {
    // Navigate using the 'path' object provided by Angular
    required(path.email, { message: 'Required' });
    email(path.email, { message: 'Invalid format' });

    required(path.password);
  });


 authService = inject(AuthService)
  GHIN = signal<number | null>(null)
  GHIN_Info = signal<GHIN_Info | null>(null)
  public registrationForm = new FormGroup({
    email: new FormControl<string | null>(null, {validators:[Validators.required]}),
    password: new FormControl<string | null>(null, { validators: [Validators.required]}),
    confirmPassword: new FormControl<string | null>(null,{validators:[Validators.required]}),
    handicap: new FormControl<number | null>(null),
    handicapIndex: new FormControl<number | null>(null),
    GHIN: new FormControl<number | null>(null)

  })
  computed = signal(() => {

});
 getMyHandicapIndex(Ghin: number){ // we cant lookup the GHIN yet
   return false;
 }
 register(){
   this.authService.register(this.registrationForm.value)
   console.log(this.registrationForm.value);
 }
  async login(){
   await this.authService.loginWithGoogle();
   this.router.navigate(['/dashboard']);
  }

 loginWithEmail(event:Event){
  event.preventDefault();
   const login = this.loginModel()
   this.authService.login(login.email, login.password)
   .then(() => this.router.navigate(['/dashboard']))
  }
}
