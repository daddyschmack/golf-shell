export interface HoleStat {
  holeDateTime: Date;
  totalScore: number;
  driveInFairway: boolean;
  greenInRegulation: boolean;
  putts: Shot[];
  teeShots: number;
  penaltyStrokes: number;
  totalPutts: number;
  totalChips: number;
  fairwayStrokes: number
  driveDistance: number;
  approachDistance: number;
  fairwayDistance: number;
  holePosition: string; // lat/long
}

export interface Shot {
  distance: number,
  distanceRemaining: number;
  distanceUnit: string;
  positionOnGreen: string; // lat/long
  clubUsed: GolfClub;
}
export interface GolfClub {
 clubName: string;
 inBag?: boolean;
}

export const GolfClubList = [
  'putter',
  '60w',
  '58w',
  '54w',
  '52w',
  '50w',
  'LW',
  'SW',
  'GW',
  'PW',
  '9i',
  '9h',
  '8i',
  '8h',
  '7i',
  '7h',
  '6i',
  '6h',
  '5i',
  '5h',
  '4i',
  '4h',
  '3i',
  '3h',
  '2i',
  '2h',
  '1i',
  '1h',
  '1w',
  '2w',
  '3w',
  '4w',
  '5w',
  '6w',
  '7w',
  '8w',
]
export const DistanceUnits = [
  'Yds',
  'Ft',
  'In'
]

export const statDisplayMap: any =  {
 totalScore: {
   cardPosition: 0,
   title: 'Total'
 } ,
  teeShots: {
   cardPosition: 1,
    title: 'Tee Shots'
  },
  fairwayStrokes: {
   cardPosition: 2,
    title: 'Fairway Strokes',
  },
  totalPutts: {
    cardPosition: 3,
    title: 'Putts',
  },
    totalChips: {
   cardPosition: 4,
    title: 'Chips',
 },
  penaltyStrokes: {
   cardPosition: 5,
    title: 'Penalty Strokes'
  },
  driveInFairway: {
   cardPosition: 6,
    title: 'In Fairway',
  },
  greenInRegulation: {
   cardPosition: 7,
    title: 'Green In Regulation',
  }
}
