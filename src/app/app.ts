import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { UserProfileService } from 'shared-data';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  router = inject(Router);
  protected userService = inject(UserProfileService);
  protected readonly title = 'golf-shell';
   // NEW: A safe, computed signal just for the handicap
  public handicap = computed(() => {
    const profile = this.userService.userProfile();
    if (!profile) return 'Not set';

    // Safely check both places where handicap might live
    return profile.playerInfo?.handicap || profile.handicap || 'Not set';
  });

  constructor() {

    /*
    effect(() => {
      if (this.userService.currentUser()) {
        this.userService.seedDummyUsers().then(() => console.log('Dummy users added!'));
      }
    });
     */
  }

  updateHandicap() {
    this.userService.updateProfile({
      handicap: 10,
      defaultTees: 'Blue'
    });
  }
  goHome(){
   this.router.navigate(['/']);
  }
  goToDashboard(){
   this.router.navigate(['/dashboard']);
  }
}
