import { computed, Injectable, signal } from '@angular/core';
import { GolfRound, GolfTeam } from './models/golf-course';

@Injectable({
  providedIn: 'root',
})
export class RoundStateService {
  // 1. The State (Writable Signals)
  // This replaces BehaviorSubject. It holds the current value synchronously.
  readonly activeRounds = signal<GolfRound[]>([]);
  readonly activeTeams = signal<GolfTeam[]>([]);

  // 2. Derived State (Computed Signals)
  readonly playerCount = computed(() => this.activeRounds().length);

  readonly isBalanced = computed(() => {
    const teams = this.activeTeams();
    if (teams.length === 0) return true;
    // logic to check variance
    return true;
  });

  // 3. Actions
  updateRounds(rounds: GolfRound[]) {
    this.activeRounds.set(rounds);
  }

  updateTeams(teams: GolfTeam[]) {
    this.activeTeams.set(teams);
  }

  reset() {
    this.activeRounds.set([]);
    this.activeTeams.set([]);
  }
}
