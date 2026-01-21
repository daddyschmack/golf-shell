1. The Dashboard (Shell vs. Remote)
Recommendation: Put it in the Shell.
•
Why? The Dashboard (DashboardComponent) is effectively the "Home Page" of the application. It lists historical rounds and lets you start a new one.
•
Functionality:
◦
List Rounds: Fetches scores from Firestore (filtered by the logged-in user).
◦
Navigation: When you click a round, it navigates to the mfe-scorecard remote, passing the roundId.
◦
New Round: Opens the "Setup" flow (Select Course -> Select Tees -> Add Players) which eventually routes to the scorecard.
•
Benefit: The Shell already has the UserProfileService and Auth state. It loads instantly. The "Heavy" scorecard remote is only loaded when the user actually decides to play or view a specific round.
2. The Scorecard Component (The Container)
This will be the Root Component of the mfe-scorecard remote.
•
Responsibilities:
◦
State Management: It holds the "Master State" for the entire round (Course Info, Date, and the Array of Players).
◦
Player Management: It manages the list of players (e.g., Player[]).
◦
Mode Switching: It holds the state for isDetailedMode (Boolean).
◦
Saving: It listens for changes in the models and handles the auto-save to Firebase.
•
Layout:
◦
Displays the Course Header (Name, Date).
◦
Loops through the players.
◦
The Switch: A toggle button (e.g., "Simple / Detailed") that swaps which child component is rendered.
3. The Simple Score Line Component
Requirement: A simplified view that only captures the totalScore.
•
Input: Same holes model as the detailed version.
•
Behavior:
◦
Instead of 8 rows of stats, it renders 1 Row (Total Score).
◦
User enters "5".
◦
Logic: Updates hole.totalScore = 5. All other stats (putts, fairway, etc.) remain null.
•
Visuals:
◦
Uses the same Flexbox grid system so the columns align perfectly with the header.
◦
Still calculates "Net Score" (pops) if a handicap is present.
◦
Still applies the styling (Birdie/Bogey colors) based on totalScore vs Par.
4. The Data Strategy (Switching Back and Forth)
This is the critical part you mentioned.
•
Scenario A (Simple -> Detailed):
◦
User enters "4" in Simple Mode.
◦
User switches to Detailed.
◦
The "Total Score" row shows "4".
◦
The "Putts", "Fairway", etc., are empty (null).
◦
User Action: User fills in "2 Putts", "1 Chip". The Total Score might recalculate based on the detailed logic, or stay as is until fully overridden.
•
Scenario B (Detailed -> Simple):
◦
User enters detailed stats (Tee, Putts, etc.) which sum to "5".
◦
User switches to Simple.
◦
The Simple component reads hole.totalScore (which is 5) and displays it.
◦
The detailed data is preserved in the model (hidden, not deleted), so if they switch back, it's still there.
Proposed Plan of Attack
1.
Migrate Dashboard to Shell: Move the dashboard folder logic to golf-shell. Wire it up to the UserProfileService.
2.
Create ScorecardComponent (Remote): Build the container in mfe-scorecard.
3.
Create SimpleScoreLineComponent: Build the lightweight version.
4.
Implement the Toggle: Add the logic in the Container to swap between <app-score-line> and <app-simple-score-line> based on user preference.
