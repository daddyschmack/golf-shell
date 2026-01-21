import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { UserProfileService } from 'shared-data';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected userService = inject(UserProfileService);
  protected readonly title = 'golf-shell'

  updateHandicap() {
    this.userService.updateProfile({
      handicap: 10,
      defaultTees: 'Blue'
    });
  }
}
