import {
  ActiveQuestion,
  DifficultyConfig,
  DifficultyId,
  QuestionItem,
  ShuffledOption,
} from '../types/game';

export const DIFFICULTY_CONFIGS: Record<DifficultyId, DifficultyConfig> = {
  EASY: {
    id: 'EASY',
    title: 'LEVEL 1 – EASY',
    subtitle: 'Basic Directions',
    checkpoints: 10,
    badgeText: '10 Checkpoints',
    description:
      'Simple imperatives and short everyday direction commands to get started.',
  },
  INTERMEDIATE: {
    id: 'INTERMEDIATE',
    title: 'LEVEL 2 – INTERMEDIATE',
    subtitle: 'Streets & Landmarks',
    checkpoints: 15,
    badgeText: '15 Checkpoints',
    description:
      'Longer navigation instructions involving streets, crossings, and city buildings.',
  },
  CHALLENGE: {
    id: 'CHALLENGE',
    title: 'LEVEL 3 – CHALLENGE',
    subtitle: 'Multi-Step & Negative',
    checkpoints: 20,
    badgeText: '20 Checkpoints',
    description:
      'Combined instructions, negative imperatives, and multi-action routes.',
  },
};

export const QUESTION_BANK: QuestionItem[] = [
  // =========================================================
  // CATEGORY A – BASIC DIRECTIONS (17 questions)
  // =========================================================
  {
    id: 'A01',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Camina hacia adelante.',
    correctEnglish: 'Walk straight ahead.',
    distractors: [
      'Turn left.',
      'Turn right.',
      'Cross the street.',
      'Go back.',
      'Stop at the corner.',
    ],
  },
  {
    id: 'A02',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Gira a la izquierda.',
    correctEnglish: 'Turn left.',
    distractors: [
      'Turn right.',
      'Walk straight ahead.',
      'Stop here.',
      'Go back.',
      'Cross the bridge.',
    ],
  },
  {
    id: 'A03',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Gira a la derecha.',
    correctEnglish: 'Turn right.',
    distractors: [
      'Turn left.',
      'Go straight on.',
      'Walk slowly.',
      'Turn around.',
      'Follow the path.',
    ],
  },
  {
    id: 'A04',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Sigue derecho.',
    correctEnglish: 'Go straight ahead.',
    distractors: [
      'Turn left at the corner.',
      'Stop right here.',
      'Walk backward.',
      'Enter the building.',
      'Wait at the traffic light.',
    ],
  },
  {
    id: 'A05',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Detente aquí.',
    correctEnglish: 'Stop here.',
    distractors: [
      'Keep walking.',
      'Run forward.',
      'Turn right here.',
      'Go back.',
      'Cross the street.',
    ],
  },
  {
    id: 'A06',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Regresa.',
    correctEnglish: 'Go back.',
    distractors: [
      'Walk forward.',
      'Turn right.',
      'Stop here.',
      'Follow the signs.',
      'Cross the road.',
    ],
  },
  {
    id: 'A07',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Camina despacio.',
    correctEnglish: 'Walk slowly.',
    distractors: [
      'Run fast.',
      'Walk straight ahead.',
      'Stop immediately.',
      'Turn left.',
      'Go upstairs.',
    ],
  },
  {
    id: 'A08',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Corre hacia adelante.',
    correctEnglish: 'Run forward.',
    distractors: [
      'Walk slowly.',
      'Step back.',
      'Turn around.',
      'Stop at the sign.',
      'Wait on the sidewalk.',
    ],
  },
  {
    id: 'A09',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Sigue el camino.',
    correctEnglish: 'Follow the path.',
    distractors: [
      'Leave the road.',
      'Cross the river.',
      'Turn around.',
      'Look at the map.',
      'Go inside the house.',
    ],
  },
  {
    id: 'A10',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Cruza la calle.',
    correctEnglish: 'Cross the street.',
    distractors: [
      'Follow the street.',
      'Stop on the corner.',
      'Walk along the park.',
      'Turn right.',
      'Go back home.',
    ],
  },
  {
    id: 'A11',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Date la vuelta.',
    correctEnglish: 'Turn around.',
    distractors: [
      'Walk straight ahead.',
      'Look to the left.',
      'Cross the avenue.',
      'Stand up.',
      'Follow me.',
    ],
  },
  {
    id: 'A12',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Camina rápido.',
    correctEnglish: 'Walk fast.',
    distractors: [
      'Walk slowly.',
      'Wait here.',
      'Turn left.',
      'Stay inside.',
      'Sit on the bench.',
    ],
  },
  {
    id: 'A13',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Mira a la izquierda.',
    correctEnglish: 'Look to the left.',
    distractors: [
      'Turn to the right.',
      'Look straight ahead.',
      'Walk to the right.',
      'Stop behind the tree.',
      'Cross the plaza.',
    ],
  },
  {
    id: 'A14',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Mira a la derecha.',
    correctEnglish: 'Look to the right.',
    distractors: [
      'Look to the left.',
      'Turn left now.',
      'Go straight on.',
      'Run across the street.',
      'Step backward.',
    ],
  },
  {
    id: 'A15',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Camina por la acera.',
    correctEnglish: 'Walk on the sidewalk.',
    distractors: [
      'Run in the middle of the road.',
      'Cross the bridge.',
      'Stop at the station.',
      'Turn around quickly.',
      'Enter the supermarket.',
    ],
  },
  {
    id: 'A16',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Da un paso atrás.',
    correctEnglish: 'Take a step back.',
    distractors: [
      'Walk two blocks.',
      'Move forward.',
      'Turn right here.',
      'Cross the crosswalk.',
      'Open the door.',
    ],
  },
  {
    id: 'A17',
    category: 'CATEGORY A – BASIC DIRECTIONS',
    tier: 'easy',
    spanish: 'Mantente a la derecha.',
    correctEnglish: 'Keep to the right.',
    distractors: [
      'Keep to the left.',
      'Stop at the corner.',
      'Walk backward.',
      'Go down the stairs.',
      'Cross the park.',
    ],
  },

  // =========================================================
  // CATEGORY B – MOVEMENT AND NAVIGATION (17 questions)
  // =========================================================
  {
    id: 'B01',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Camina dos cuadras.',
    correctEnglish: 'Walk two blocks.',
    distractors: [
      'Turn at the second street.',
      'Cross two bridges.',
      'Wait two minutes.',
      'Walk to the corner.',
      'Run one block.',
    ],
  },
  {
    id: 'B02',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Gira en la primera esquina.',
    correctEnglish: 'Turn at the first corner.',
    distractors: [
      'Turn at the second corner.',
      'Walk past the first block.',
      'Stop before the corner.',
      'Cross at the traffic light.',
      'Go straight to the end.',
    ],
  },
  {
    id: 'B03',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Gira en la segunda calle.',
    correctEnglish: 'Turn on the second street.',
    distractors: [
      'Turn on the first street.',
      'Walk three blocks.',
      'Cross the main avenue.',
      'Stop at the traffic sign.',
      'Go back two streets.',
    ],
  },
  {
    id: 'B04',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Cruza el puente.',
    correctEnglish: 'Cross the bridge.',
    distractors: [
      'Walk under the bridge.',
      'Cross the street.',
      'Turn before the river.',
      'Go up the stairs.',
      'Stop by the lake.',
    ],
  },
  {
    id: 'B05',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Sube las escaleras.',
    correctEnglish: 'Go up the stairs.',
    distractors: [
      'Go down the stairs.',
      'Cross the hallway.',
      'Enter the elevator.',
      'Walk along the corridor.',
      'Turn at the exit.',
    ],
  },
  {
    id: 'B06',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Baja las escaleras.',
    correctEnglish: 'Go down the stairs.',
    distractors: [
      'Go up the stairs.',
      'Walk up the hill.',
      'Stand near the stairs.',
      'Cross the pedestrian bridge.',
      'Wait at the entrance.',
    ],
  },
  {
    id: 'B07',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Sigue las señales.',
    correctEnglish: 'Follow the signs.',
    distractors: [
      'Ignore the traffic lights.',
      'Read the book.',
      'Cross at the corner.',
      'Stop at the sign.',
      'Look at the bridge.',
    ],
  },
  {
    id: 'B08',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Camina hasta el semáforo.',
    correctEnglish: 'Walk to the traffic light.',
    distractors: [
      'Turn before the traffic light.',
      'Cross the bridge quickly.',
      'Stop at the bus stop.',
      'Wait behind the school.',
      'Go around the roundabout.',
    ],
  },
  {
    id: 'B09',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Gira después del banco.',
    correctEnglish: 'Turn after the bank.',
    distractors: [
      'Turn before the bank.',
      'Enter the bank.',
      'Walk past the hospital.',
      'Stop in front of the bank.',
      'Cross behind the library.',
    ],
  },
  {
    id: 'B10',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Continúa hasta el final de la calle.',
    correctEnglish: 'Continue to the end of the street.',
    distractors: [
      'Turn at the middle of the street.',
      'Go back to the start.',
      'Stop on the first block.',
      'Cross the street now.',
      'Walk around the park.',
    ],
  },
  {
    id: 'B11',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Pasa por el paso de cebra.',
    correctEnglish: 'Cross at the crosswalk.',
    distractors: [
      'Run across the highway.',
      'Walk along the river.',
      'Turn at the roundabout.',
      'Stop on the sidewalk.',
      'Go up the ramp.',
    ],
  },
  {
    id: 'B12',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Camina tres cuadras hacia el norte.',
    correctEnglish: 'Walk three blocks north.',
    distractors: [
      'Walk two blocks south.',
      'Turn left at the third block.',
      'Drive three miles east.',
      'Cross three streets.',
      'Go back one block.',
    ],
  },
  {
    id: 'B13',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Rodea la rotonda.',
    correctEnglish: 'Go around the roundabout.',
    distractors: [
      'Cross through the fountain.',
      'Turn back at the bridge.',
      'Stop inside the park.',
      'Walk straight past the school.',
      'Go down the alley.',
    ],
  },
  {
    id: 'B14',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Toma la primera salida a la derecha.',
    correctEnglish: 'Take the first exit on the right.',
    distractors: [
      'Take the second exit on the left.',
      'Stay in the left lane.',
      'Stop at the intersection.',
      'Cross the street to the right.',
      'Walk past the station.',
    ],
  },
  {
    id: 'B15',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Pasa frente a la librería.',
    correctEnglish: 'Walk past the bookstore.',
    distractors: [
      'Go inside the library.',
      'Stop behind the restaurant.',
      'Turn right before the café.',
      'Cross next to the hospital.',
      'Wait outside the school.',
    ],
  },
  {
    id: 'B16',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Cruza la intersección con cuidado.',
    correctEnglish: 'Cross the intersection carefully.',
    distractors: [
      'Run across the intersection.',
      'Turn left before the corner.',
      'Walk along the sidewalk.',
      'Stay at the traffic light.',
      'Follow the river path.',
    ],
  },
  {
    id: 'B17',
    category: 'CATEGORY B – MOVEMENT AND NAVIGATION',
    tier: 'intermediate',
    spanish: 'Camina a lo largo del río.',
    correctEnglish: 'Walk along the river.',
    distractors: [
      'Cross the river bridge.',
      'Swim across the river.',
      'Turn away from the park.',
      'Stop near the train station.',
      'Go straight past the bank.',
    ],
  },

  // =========================================================
  // CATEGORY C – PLACES AND LOCATIONS (17 questions)
  // =========================================================
  {
    id: 'C01',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'easy',
    spanish: 'Ve al hospital.',
    correctEnglish: 'Go to the hospital.',
    distractors: [
      'Leave the hospital.',
      'Go to the school.',
      'Walk past the pharmacy.',
      'Enter the supermarket.',
      'Wait at the station.',
    ],
  },
  {
    id: 'C02',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'easy',
    spanish: 'Entra al restaurante.',
    correctEnglish: 'Enter the restaurant.',
    distractors: [
      'Exit the restaurant.',
      'Walk past the restaurant.',
      'Go to the café.',
      'Look for the supermarket.',
      'Stand near the door.',
    ],
  },
  {
    id: 'C03',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Sal del supermercado.',
    correctEnglish: 'Exit the supermarket.',
    distractors: [
      'Enter the supermarket.',
      'Go to the supermarket.',
      'Walk behind the market.',
      'Cross in front of the bank.',
      'Look for the bakery.',
    ],
  },
  {
    id: 'C04',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'easy',
    spanish: 'Camina hasta la escuela.',
    correctEnglish: 'Walk to the school.',
    distractors: [
      'Leave the school.',
      'Walk to the library.',
      'Turn right at the hospital.',
      'Run around the park.',
      'Enter the church.',
    ],
  },
  {
    id: 'C05',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Busca la biblioteca.',
    correctEnglish: 'Look for the library.',
    distractors: [
      'Leave the library.',
      'Walk past the bookstore.',
      'Go to the museum.',
      'Wait inside the school.',
      'Cross the park.',
    ],
  },
  {
    id: 'C06',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'easy',
    spanish: 'Ve al parque.',
    correctEnglish: 'Go to the park.',
    distractors: [
      'Exit the park.',
      'Go to the church.',
      'Walk to the station.',
      'Turn left at the bank.',
      'Stop by the house.',
    ],
  },
  {
    id: 'C07',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Entra en el edificio.',
    correctEnglish: 'Go inside the building.',
    distractors: [
      'Walk around the building.',
      'Exit the building.',
      'Wait outside the gate.',
      'Cross the main street.',
      'Look at the house.',
    ],
  },
  {
    id: 'C08',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Camina hacia la estación.',
    correctEnglish: 'Walk toward the station.',
    distractors: [
      'Walk away from the station.',
      'Stop inside the station.',
      'Go to the airport.',
      'Cross the park path.',
      'Turn toward the church.',
    ],
  },
  {
    id: 'C09',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Sigue hasta la iglesia.',
    correctEnglish: 'Continue to the church.',
    distractors: [
      'Turn before the church.',
      'Go to the library.',
      'Exit the building.',
      'Wait at the café.',
      'Cross behind the school.',
    ],
  },
  {
    id: 'C10',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Dirígete a la cafetería.',
    correctEnglish: 'Head to the café.',
    distractors: [
      'Leave the café.',
      'Head to the supermarket.',
      'Walk past the restaurant.',
      'Stop at the bank.',
      'Go back to the house.',
    ],
  },
  {
    id: 'C11',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Espera frente al banco.',
    correctEnglish: 'Wait in front of the bank.',
    distractors: [
      'Wait behind the bank.',
      'Go inside the bank.',
      'Walk past the hospital.',
      'Turn left at the corner.',
      'Cross the avenue now.',
    ],
  },
  {
    id: 'C12',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'easy',
    spanish: 'Detente cerca de la casa.',
    correctEnglish: 'Stop near the house.',
    distractors: [
      'Enter the house.',
      'Walk past the school.',
      'Run to the park.',
      'Turn right at the bridge.',
      'Cross the street quickly.',
    ],
  },
  {
    id: 'C13',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Camina detrás del supermercado.',
    correctEnglish: 'Walk behind the supermarket.',
    distractors: [
      'Wait in front of the supermarket.',
      'Enter the supermarket.',
      'Turn before the hospital.',
      'Cross the park bridge.',
      'Go straight to the station.',
    ],
  },
  {
    id: 'C14',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Cruza frente a la escuela.',
    correctEnglish: 'Cross in front of the school.',
    distractors: [
      'Walk behind the school.',
      'Stay inside the school.',
      'Turn left at the library.',
      'Go to the restaurant.',
      'Stop next to the church.',
    ],
  },
  {
    id: 'C15',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Pasa entre el banco y la cafetería.',
    correctEnglish: 'Walk between the bank and the café.',
    distractors: [
      'Stop opposite the bank.',
      'Turn after the restaurant.',
      'Wait inside the café.',
      'Cross in front of the library.',
      'Go around the supermarket.',
    ],
  },
  {
    id: 'C16',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'intermediate',
    spanish: 'Quédate en la plaza central.',
    correctEnglish: 'Stay in the central square.',
    distractors: [
      'Leave the central square.',
      'Walk to the train station.',
      'Cross the wooden bridge.',
      'Enter the hospital.',
      'Turn right at the school.',
    ],
  },
  {
    id: 'C17',
    category: 'CATEGORY C – PLACES AND LOCATIONS',
    tier: 'easy',
    spanish: 'Encuentra la farmacia en la esquina.',
    correctEnglish: 'Find the pharmacy on the corner.',
    distractors: [
      'Leave the pharmacy now.',
      'Walk past the library.',
      'Wait at the bus station.',
      'Go inside the restaurant.',
      'Turn left after the bridge.',
    ],
  },

  // =========================================================
  // CATEGORY D – MORE COMPLEX INSTRUCTIONS (17 questions)
  // =========================================================
  {
    id: 'D01',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Gira a la derecha después del restaurante.',
    correctEnglish: 'Turn right after the restaurant.',
    distractors: [
      'Turn left before the restaurant.',
      'Turn left after the restaurant.',
      'Stop in front of the restaurant.',
      'Enter the restaurant on the right.',
      'Walk straight past the supermarket.',
    ],
  },
  {
    id: 'D02',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Cruza la calle y gira a la izquierda.',
    correctEnglish: 'Cross the street and turn left.',
    distractors: [
      'Cross the street and turn right.',
      'Turn left before crossing the street.',
      'Walk two blocks and stop.',
      'Cross the bridge and go straight.',
      'Do not cross the street here.',
    ],
  },
  {
    id: 'D03',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Camina hasta el parque y detente.',
    correctEnglish: 'Walk to the park and stop.',
    distractors: [
      'Run through the park and turn right.',
      'Walk past the park and continue.',
      'Stop before the school and wait.',
      'Cross the park and turn left.',
      'Leave the park and go back.',
    ],
  },
  {
    id: 'D04',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Sigue derecho hasta el hospital.',
    correctEnglish: 'Go straight until you reach the hospital.',
    distractors: [
      'Turn right before the hospital.',
      'Walk past the hospital and turn back.',
      'Stop at the school across the street.',
      'Go around the hospital and exit.',
      'Cross the bridge near the station.',
    ],
  },
  {
    id: 'D05',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Cruza el puente y gira a la derecha.',
    correctEnglish: 'Cross the bridge and turn right.',
    distractors: [
      'Cross the bridge and turn left.',
      'Turn right before the bridge.',
      'Walk along the river and stop.',
      'Cross the street and go straight.',
      'Do not cross the bridge yet.',
    ],
  },
  {
    id: 'D06',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'No cruces la calle.',
    correctEnglish: 'Do not cross the street.',
    distractors: [
      'Cross the street quickly.',
      'Do not stop at the corner.',
      'Turn left across the street.',
      'Walk along the crosswalk.',
      'Cross the avenue carefully.',
    ],
  },
  {
    id: 'D07',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'No corras.',
    correctEnglish: 'Do not run.',
    distractors: [
      'Run straight ahead.',
      'Do not walk slowly.',
      'Walk faster now.',
      'Do not turn back.',
      'Stop running at the park.',
    ],
  },
  {
    id: 'D08',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'No te detengas aquí.',
    correctEnglish: 'Do not stop here.',
    distractors: [
      'Stop right here.',
      'Do not walk forward.',
      'Wait at this corner.',
      'Do not cross the bridge.',
      'Turn around right here.',
    ],
  },
  {
    id: 'D09',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Espera en la esquina.',
    correctEnglish: 'Wait at the corner.',
    distractors: [
      'Do not wait at the corner.',
      'Turn right at the corner.',
      'Cross the street immediately.',
      'Run past the intersection.',
      'Walk to the middle of the block.',
    ],
  },
  {
    id: 'D10',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Sigue caminando hasta llegar al banco.',
    correctEnglish: 'Keep walking until you get to the bank.',
    distractors: [
      'Stop walking before the bank.',
      'Turn left after leaving the bank.',
      'Wait inside the supermarket.',
      'Cross the street behind the library.',
      'Do not go near the bank.',
    ],
  },
  {
    id: 'D11',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'No gires a la izquierda en el semáforo.',
    correctEnglish: 'Do not turn left at the traffic light.',
    distractors: [
      'Turn left at the traffic light.',
      'Do not stop at the traffic light.',
      'Turn right before the crosswalk.',
      'Cross the street at the green light.',
      'Walk straight past the school.',
    ],
  },
  {
    id: 'D12',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Camina dos cuadras y gira a la derecha.',
    correctEnglish: 'Walk two blocks and turn right.',
    distractors: [
      'Walk two blocks and turn left.',
      'Turn right and walk three blocks.',
      'Cross two streets and stop.',
      'Do not turn at the second block.',
      'Go back two blocks immediately.',
    ],
  },
  {
    id: 'D13',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Sal de la biblioteca y cruza la plaza.',
    correctEnglish: 'Leave the library and cross the square.',
    distractors: [
      'Enter the library and sit down.',
      'Walk past the library and turn back.',
      'Stay in the square and wait.',
      'Cross the bridge and enter the school.',
      'Do not leave the library yet.',
    ],
  },
  {
    id: 'D14',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'No entres al edificio todavía.',
    correctEnglish: 'Do not enter the building yet.',
    distractors: [
      'Enter the building right now.',
      'Leave the building immediately.',
      'Walk around the building twice.',
      'Do not wait outside the door.',
      'Go up the stairs inside.',
    ],
  },
  {
    id: 'D15',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Gira a la izquierda en la esquina y sigue hasta la escuela.',
    correctEnglish: 'Turn left at the corner and continue to the school.',
    distractors: [
      'Turn right at the corner and stop.',
      'Walk past the school and turn left.',
      'Cross the street and enter the café.',
      'Do not turn until you see the hospital.',
      'Go back to the corner and wait.',
    ],
  },
  {
    id: 'D16',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'Sube las escaleras y gira a la derecha.',
    correctEnglish: 'Go up the stairs and turn right.',
    distractors: [
      'Go down the stairs and turn left.',
      'Do not use the stairs here.',
      'Walk straight past the elevator.',
      'Go up the stairs and stop.',
      'Cross the hallway and go back.',
    ],
  },
  {
    id: 'D17',
    category: 'CATEGORY D – MORE COMPLEX INSTRUCTIONS',
    tier: 'challenge',
    spanish: 'No olvides mirar a ambos lados antes de cruzar.',
    correctEnglish: 'Do not forget to look both ways before crossing.',
    distractors: [
      'Cross the street without stopping.',
      'Look straight ahead while running.',
      'Do not cross at the crosswalk.',
      'Wait until the bus passes you.',
      'Turn around before reaching the corner.',
    ],
  },
];

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function buildActiveQuestion(item: QuestionItem): ActiveQuestion {
  // Ensure strict uniqueness of 6 options (1 correct + 5 distinct distractors)
  const uniqueDistractors: string[] = [];
  for (const d of item.distractors) {
    if (d !== item.correctEnglish && !uniqueDistractors.includes(d)) {
      uniqueDistractors.push(d);
    }
  }

  const rawOptions = [
    { text: item.correctEnglish, isCorrect: true },
    ...uniqueDistractors.slice(0, 5).map((text) => ({
      text,
      isCorrect: false,
    })),
  ];

  const shuffled = shuffleArray(rawOptions);
  const options: ShuffledOption[] = shuffled.map((opt, idx) => ({
    label: OPTION_LETTERS[idx],
    text: opt.text,
    isCorrect: opt.isCorrect,
  }));

  return { item, options };
}

export function generateMissionQuestions(
  difficulty: DifficultyId,
  previousIds: string[] = []
): ActiveQuestion[] {
  const count = DIFFICULTY_CONFIGS[difficulty].checkpoints;

  let primaryPool: QuestionItem[] = [];
  let secondaryPool: QuestionItem[] = [];

  if (difficulty === 'EASY') {
    primaryPool = QUESTION_BANK.filter((q) => q.tier === 'easy');
    secondaryPool = QUESTION_BANK.filter((q) => q.tier === 'intermediate');
  } else if (difficulty === 'INTERMEDIATE') {
    primaryPool = QUESTION_BANK.filter((q) => q.tier === 'intermediate');
    secondaryPool = QUESTION_BANK.filter((q) => q.tier === 'easy');
  } else {
    primaryPool = QUESTION_BANK.filter((q) => q.tier === 'challenge');
    secondaryPool = QUESTION_BANK.filter((q) => q.tier === 'intermediate');
  }

  // Prefer questions not used at the exact same positions or in the previous run when possible
  const freshPrimary = shuffleArray(
    primaryPool.filter((q) => !previousIds.includes(q.id))
  );
  const seenPrimary = shuffleArray(
    primaryPool.filter((q) => previousIds.includes(q.id))
  );
  const combinedPrimary = [...freshPrimary, ...seenPrimary];

  let selected = combinedPrimary.slice(0, count);

  if (selected.length < count) {
    const needed = count - selected.length;
    const freshSecondary = shuffleArray(
      secondaryPool.filter((q) => !selected.some((s) => s.id === q.id))
    );
    selected = [...selected, ...freshSecondary.slice(0, needed)];
  }

  // Shuffle final mission sequence so order is fresh every attempt
  const finalOrder = shuffleArray(selected);

  // Guard against identical sequence to previous run when pool allows
  if (
    previousIds.length === finalOrder.length &&
    finalOrder.every((q, idx) => q.id === previousIds[idx]) &&
    finalOrder.length > 1
  ) {
    [finalOrder[0], finalOrder[finalOrder.length - 1]] = [
      finalOrder[finalOrder.length - 1],
      finalOrder[0],
    ];
  }

  return finalOrder.map(buildActiveQuestion);
}
