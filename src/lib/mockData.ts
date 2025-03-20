
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
    // Enhanced commentary with more frequent updates and detailed analysis
    '5': 'The match has started with high intensity. Both teams showing their intent to control the midfield early on.',
    '8': 'Home team establishing a good passing rhythm. Their formation is looking solid with the defenders pushing up to support the midfield.',
    '10': 'Teams are settling into their rhythm now as we see possession change hands in the midfield. The away team trying to counter-press effectively.',
    '12.5': 'Beautiful long pass from Smith, finding space on the right wing. That\'s the kind of vision that can unlock defenses!',
    '14.2': 'Johnson with some fancy footwork, getting past two defenders with ease! His close control is truly exceptional today.',
    '16': 'The home team maintaining pressure in the final third. Their positional play has been impressive so far.',
    '18.7': 'Johnson strikes from distance! It\'s heading towards the goal! Powerful technique and perfect connection with the ball there.',
    '19.1': 'Spectacular save by Garcia! He\'s kept his team in the game there. Excellent reflexes to get down quickly to his right.',
    '22': 'That was a critical moment in the game. The home team building confidence from that chance while the away side looks to reorganize.',
    '25': 'Away team now trying to gain some control. They\'re shifting to a more compact defensive shape.',
    '28': 'Tactical battle developing in midfield. The home team\'s number 10 is finding pockets of space between the lines.',
    '30': 'The home team is dominating possession with their patient build-up play. They\'ve completed 85% of their passes in the last 10 minutes.',
    '32.4': 'GOAL! Williams rises highest from the corner and heads it into the net! What a moment! Perfect timing on the jump and a powerful connection!',
    '34': 'The stadium erupts! What a crucial goal that could be. The away team now needs to respond quickly to stay in this match.',
    '38': 'Away team pushing forward now, trying to find an equalizer before half-time. They\'ve switched to a more attacking formation.',
    '42': 'Increased pressure from the away side. The home team dropping deeper to protect their lead.',
    '45': 'We\'re approaching half-time and the home team leads by one goal to nil. Three minutes of added time signaled by the fourth official.',
    '45.8': 'Martinez with a cynical foul to stop the counter-attack. The referee has a word with him. That could have easily been a yellow card.',
    '47': 'Half-time whistle blows. The home team takes a deserved lead into the break after controlling much of the first half.',
    '50': 'Second half underway. The away team has made a tactical substitution, bringing on a more creative midfielder.',
    '54': 'Tempo increasing as both teams look to assert themselves early in this second half. More direct play from the away side.',
    '58.3': 'Excellent tackle from Lee! He timed that perfectly to regain possession. Textbook defending - all ball, no player.',
    '62': 'The game opening up now with end-to-end action. Both managers animated on the sidelines giving instructions.',
    '65': 'Both teams making tactical adjustments as we enter the final third of this match. The home side looking to protect their lead while still threatening on the counter.',
    '68': 'Key period of the game now. The next goal could be decisive for how this match plays out.',
    '72.6': 'The flag goes up! Brown was in an offside position as the ball was played through. Frustration for the away team as that looked promising.',
    '76': 'Fifteen minutes remaining and the intensity is increasing. The away team committing more players forward in search of an equalizer.',
    '80': 'Home team manager making defensive substitutions to shore up the backline. They\'re looking to see this game out now.',
    '85': 'Just five minutes of regular time remaining. Can the away team find an equalizer? They\'re throwing everything at the home defense now.',
    '88': 'Desperate defending from the home side as they clear their lines repeatedly. The pressure is mounting.',
    '90': 'Four minutes of added time announced. The home fans urging their team to hold on.',
    '92': 'Corner kick to the away team. This could be their last chance to salvage something from this match.',
    '94': 'Final whistle! The home team has held on for a hard-fought victory. Outstanding defensive resilience in those closing stages.'
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
    },
    '58.3': {
      players: [
        { id: 'p1', team: 'home', number: 10, position: { x: 40, y: 45 }, name: 'Smith' },
        { id: 'p2', team: 'home', number: 7, position: { x: 50, y: 60 }, name: 'Johnson' },
        { id: 'p3', team: 'home', number: 9, position: { x: 65, y: 30 }, name: 'Williams' },
        { id: 'p4', team: 'away', number: 5, position: { x: 38, y: 58 }, name: 'Martinez' },
        { id: 'p5', team: 'home', number: 4, position: { x: 35, y: 60 }, name: 'Lee', possession: true }
      ],
      ballPosition: { x: 35, y: 60 }
    },
    '72.6': {
      players: [
        { id: 'p1', team: 'home', number: 10, position: { x: 65, y: 40 }, name: 'Smith' },
        { id: 'p2', team: 'home', number: 7, position: { x: 70, y: 65 }, name: 'Johnson' },
        { id: 'p3', team: 'home', number: 9, position: { x: 75, y: 50 }, name: 'Williams' },
        { id: 'p4', team: 'away', number: 5, position: { x: 80, y: 45 }, name: 'Martinez' },
        { id: 'p5', team: 'away', number: 9, position: { x: 88, y: 55 }, name: 'Brown', possession: true }
      ],
      ballPosition: { x: 88, y: 55 }
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

// Enhanced commentary generation function
export const generateCommentaryForTime = (time: number, analysis: VideoAnalysis): string => {
  if (!analysis) return '';
  
  // Find the closest commentary to the current time
  const times = Object.keys(analysis.commentary).map(Number);
  
  // If we have an exact match, return it
  if (analysis.commentary[time.toString()]) {
    return analysis.commentary[time.toString()];
  }
  
  // Find the closest time that is less than or equal to current time
  const closestTime = times.reduce((prev, curr) => {
    return (Math.abs(curr - time) < Math.abs(prev - time) && curr <= time) ? curr : prev;
  }, 0);
  
  // Check if there's an event exactly at this time
  const eventAtTime = analysis.events.find(event => Math.abs(event.time - time) < 0.5);
  
  if (eventAtTime) {
    // Generate special commentary for the event
    switch (eventAtTime.type) {
      case 'goal':
        return `GOAL! ${eventAtTime.player} scores for the ${eventAtTime.team} team! ${eventAtTime.description}`;
      case 'shot':
        return `Shot by ${eventAtTime.player}! ${eventAtTime.description}`;
      case 'save':
        return `Incredible save by ${eventAtTime.player}! ${eventAtTime.description}`;
      case 'pass':
        return `${eventAtTime.player} with a ${eventAtTime.description.toLowerCase()}`;
      case 'dribble':
        return `${eventAtTime.player} showcasing great skill! ${eventAtTime.description}`;
      case 'tackle':
        return `Strong challenge from ${eventAtTime.player}. ${eventAtTime.description}`;
      case 'foul':
        return `Foul committed by ${eventAtTime.player}. ${eventAtTime.description}`;
      case 'offside':
        return `Flag goes up! ${eventAtTime.player} caught offside. ${eventAtTime.description}`;
      default:
        return eventAtTime.description;
    }
  }
  
  return analysis.commentary[closestTime.toString()] || '';
};
