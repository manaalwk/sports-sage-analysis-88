
import { VideoAnalysis } from '@/types';

export const mockAnalysis: VideoAnalysis = {
  id: 'analysis-1',
  duration: 90,
  events: [
    {
      id: 'event-1',
      time: 12.5,
      type: 'pass',
      description: 'Long pass from midfield to the right wing',
      player: 'Smith',
      team: 'home',
      coordinates: { x: 45, y: 50 }
    },
    {
      id: 'event-2',
      time: 14.2,
      type: 'dribble',
      description: 'Skillful dribble past two defenders',
      player: 'Johnson',
      team: 'home',
      coordinates: { x: 70, y: 70 }
    },
    {
      id: 'event-3',
      time: 18.7,
      type: 'shot',
      description: 'Powerful shot on target from outside the box',
      player: 'Johnson',
      team: 'home',
      coordinates: { x: 85, y: 50 }
    },
    {
      id: 'event-4',
      time: 19.1,
      type: 'save',
      description: 'Great save by the goalkeeper',
      player: 'Garcia',
      team: 'away',
      coordinates: { x: 95, y: 50 }
    },
    {
      id: 'event-5',
      time: 32.4,
      type: 'goal',
      description: 'Incredible goal from a corner kick',
      player: 'Williams',
      team: 'home',
      coordinates: { x: 92, y: 48 }
    },
    {
      id: 'event-6',
      time: 45.8,
      type: 'foul',
      description: 'Tactical foul in the midfield',
      player: 'Martinez',
      team: 'away',
      coordinates: { x: 55, y: 40 }
    },
    {
      id: 'event-7',
      time: 58.3,
      type: 'tackle',
      description: 'Clean tackle to win back possession',
      player: 'Lee',
      team: 'home',
      coordinates: { x: 35, y: 60 }
    },
    {
      id: 'event-8',
      time: 72.6,
      type: 'offside',
      description: 'Offside position during the attack',
      player: 'Brown',
      team: 'away',
      coordinates: { x: 88, y: 55 }
    }
  ],
  commentary: {
    '10': 'Teams are settling into their rhythm now as we see possession change hands in the midfield.',
    '12.5': 'Beautiful long pass from Smith, finding space on the right wing.',
    '14.2': 'Johnson with some fancy footwork, getting past two defenders with ease!',
    '18.7': 'Johnson strikes from distance! It\'s heading towards the goal!',
    '19.1': 'Spectacular save by Garcia! He\'s kept his team in the game there.',
    '30': 'The home team is dominating possession with their patient build-up play.',
    '32.4': 'GOAL! Williams rises highest from the corner and heads it into the net! What a moment!',
    '45': 'We\'re approaching half-time and the home team leads by one goal to nil.',
    '45.8': 'Martinez with a cynical foul to stop the counter-attack. The referee has a word with him.',
    '58.3': 'Excellent tackle from Lee! He timed that perfectly to regain possession.',
    '65': 'Both teams making tactical adjustments as we enter the final third of this match.',
    '72.6': 'The flag goes up! Brown was in an offside position as the ball was played through.',
    '85': 'Just five minutes of regular time remaining. Can the away team find an equalizer?'
  },
  frames: {
    '12.5': {
      players: [
        { id: 'p1', team: 'home', number: 10, position: { x: 45, y: 50 }, name: 'Smith', possession: true },
        { id: 'p2', team: 'home', number: 7, position: { x: 70, y: 70 }, name: 'Johnson' },
        { id: 'p3', team: 'home', number: 9, position: { x: 60, y: 30 }, name: 'Williams' },
        { id: 'p4', team: 'away', number: 5, position: { x: 55, y: 55 }, name: 'Martinez' },
        { id: 'p5', team: 'away', number: 1, position: { x: 95, y: 50 }, name: 'Garcia' }
      ],
      ballPosition: { x: 55, y: 60 }
    },
    '18.7': {
      players: [
        { id: 'p1', team: 'home', number: 10, position: { x: 65, y: 45 }, name: 'Smith' },
        { id: 'p2', team: 'home', number: 7, position: { x: 85, y: 50 }, name: 'Johnson', possession: true },
        { id: 'p3', team: 'home', number: 9, position: { x: 80, y: 30 }, name: 'Williams' },
        { id: 'p4', team: 'away', number: 5, position: { x: 80, y: 60 }, name: 'Martinez' },
        { id: 'p5', team: 'away', number: 1, position: { x: 95, y: 50 }, name: 'Garcia' }
      ],
      ballPosition: { x: 85, y: 50 }
    },
    '32.4': {
      players: [
        { id: 'p1', team: 'home', number: 10, position: { x: 80, y: 70 }, name: 'Smith' },
        { id: 'p2', team: 'home', number: 7, position: { x: 75, y: 40 }, name: 'Johnson' },
        { id: 'p3', team: 'home', number: 9, position: { x: 92, y: 48 }, name: 'Williams', possession: true },
        { id: 'p4', team: 'away', number: 5, position: { x: 90, y: 52 }, name: 'Martinez' },
        { id: 'p5', team: 'away', number: 1, position: { x: 95, y: 50 }, name: 'Garcia' }
      ],
      ballPosition: { x: 92, y: 48 }
    }
  }
};

export const generateRandomAnalysis = (duration: number): VideoAnalysis => {
  // This is a placeholder function to simulate real analysis
  // In a real implementation, this would be replaced by actual CV and AI analysis
  return {
    ...mockAnalysis,
    id: `analysis-${Math.random().toString(36).substr(2, 9)}`,
    duration
  };
};
