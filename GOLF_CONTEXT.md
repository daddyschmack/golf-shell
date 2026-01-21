# Golf Stats App Context
- **Architecture**: Native Federation (Angular 21 + esbuild)
- **Host**: golf-shell (Port 4200)
- **Remote**: mfe-scorecard (Port 4201)
- **Core Stack**: Firebase (Firestore/Auth), Angular Signals (Zoneless)

## Immediate Goals
1.  **Refactor/Reuse**: I have existing golf code. We need to evaluate it for Signal compatibility.
2.  **Shared State**: We need to share the "Active Round" state from the Shell to the Scorecard.
3.  **Firebase**: Initialize @angular/fire in the Shell and provide it to remotes.
