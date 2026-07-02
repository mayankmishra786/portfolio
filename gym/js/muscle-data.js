/* Muscle knowledge base.
   Every id here must match a registered mesh group in body-model.js.
   Kept as a JS module (not fetched JSON) so the app works with zero requests
   beyond the page itself. */

export const MUSCLES = {
  neck: {
    id: 'neck',
    name: 'Neck',
    anatomical: 'Sternocleidomastoid / cervical extensors',
    region: 'front',
    function: 'Flexes, extends and rotates the head. Stabilises the cervical spine under load — important during heavy carries, deadlifts and bridging.',
    feelCues: [
      'Keep a "double chin" (packed neck) during big lifts instead of craning forward.',
      'Train it directly with slow neck curls/extensions — no jerking, ever.'
    ]
  },
  traps: {
    id: 'traps',
    name: 'Traps',
    anatomical: 'Trapezius (upper, middle, lower)',
    region: 'back',
    function: 'Elevates, retracts and depresses the shoulder blades. Upper fibres shrug; middle fibres pull the blades together; lower fibres pull them down.',
    feelCues: [
      'On shrugs, think "ears away from shoulders is the start — shoulders to ears is the rep", pause hard at the top.',
      'On rows, let the blades protract fully at the bottom, then drag them back before the arms bend.'
    ]
  },
  deltsFront: {
    id: 'deltsFront',
    name: 'Front Delts',
    anatomical: 'Anterior deltoid',
    region: 'front',
    function: 'Raises the arm forward (shoulder flexion) and assists all pressing. Heavily involved in bench and overhead press.',
    feelCues: [
      'On presses, think "push the elbows forward and up", not just "move the bar".',
      'They get lots of indirect work from pressing — direct front raises are rarely the priority.'
    ]
  },
  deltsSide: {
    id: 'deltsSide',
    name: 'Side Delts',
    anatomical: 'Lateral deltoid',
    region: 'front',
    function: 'Raises the arm out to the side (abduction). The key muscle for shoulder width.',
    feelCues: [
      'On lateral raises, lead with the ELBOW, pinky slightly up, as if pouring a jug.',
      'Lean slightly away from the working arm to keep tension at the bottom of the rep.'
    ]
  },
  deltsRear: {
    id: 'deltsRear',
    name: 'Rear Delts',
    anatomical: 'Posterior deltoid',
    region: 'back',
    function: 'Pulls the arm backward (horizontal abduction/extension). Balances the shoulder joint against all the pressing you do.',
    feelCues: [
      'Think "throw the knuckles at the wall behind you" — arms stay long, traps stay quiet.',
      'Use light weight; the moment you feel mid-back squeeze taking over, you have gone too heavy.'
    ]
  },
  pecs: {
    id: 'pecs',
    name: 'Chest',
    anatomical: 'Pectoralis major',
    region: 'front',
    function: 'Draws the arm across the body (horizontal adduction) and helps flex the shoulder. Prime mover in presses, dips and flyes.',
    feelCues: [
      'Think "squeeze the elbows toward each other", not "push the weight away".',
      'Pin the shoulder blades back and down first — if the shoulders roll forward, they steal the rep.'
    ]
  },
  biceps: {
    id: 'biceps',
    name: 'Biceps',
    anatomical: 'Biceps brachii / brachialis',
    region: 'front',
    function: 'Bends the elbow and turns the palm up (supination). Assists in all pulling movements.',
    feelCues: [
      'Keep the elbow pinned to your side — if it drifts forward the front delt takes over.',
      'Actively twist the pinky toward the ceiling at the top of a dumbbell curl.'
    ]
  },
  triceps: {
    id: 'triceps',
    name: 'Triceps',
    anatomical: 'Triceps brachii (long, lateral, medial heads)',
    region: 'back',
    function: 'Straightens the elbow. The long head also pulls the arm down toward the body. Two-thirds of your upper-arm size.',
    feelCues: [
      'Think "snap the elbow straight and squeeze" for a full second at lockout.',
      'For the long head, do overhead work — the stretch at the bottom is the stimulus.'
    ]
  },
  forearms: {
    id: 'forearms',
    name: 'Forearms',
    anatomical: 'Wrist flexors / extensors, brachioradialis',
    region: 'front',
    function: 'Grip, wrist movement and elbow flexion with a neutral or overhand grip. Your handshake and your deadlift both live here.',
    feelCues: [
      'Crush the bar on every pull — grip harder than you need to and the forearms train themselves.',
      'On hammer curls, imagine the thumb leading the weight up.'
    ]
  },
  abs: {
    id: 'abs',
    name: 'Abs',
    anatomical: 'Rectus abdominis',
    region: 'front',
    function: 'Flexes the spine (curls the ribcage toward the pelvis) and braces the trunk against load.',
    feelCues: [
      'Think "close the distance between ribs and hips", not "sit up higher".',
      'Exhale hard at the top of each crunch — the abs contract hardest on a full exhale.'
    ]
  },
  obliques: {
    id: 'obliques',
    name: 'Obliques',
    anatomical: 'External / internal obliques',
    region: 'front',
    function: 'Rotate and side-bend the trunk, and resist rotation — your anti-twist armour during carries and single-arm work.',
    feelCues: [
      'On side planks and carries, think "stay tall, do not let the hip sag".',
      'Resist rotation slowly on cable chops rather than swinging through them.'
    ]
  },
  lats: {
    id: 'lats',
    name: 'Lats',
    anatomical: 'Latissimus dorsi',
    region: 'back',
    function: 'Pulls the arm down and back toward the hip. The widest muscle of the back — drives pull-ups, pulldowns and rows.',
    feelCues: [
      'Think "drive the elbows down into your back pockets", not "pull with the hands".',
      'Before the pull, depress the shoulders (proud chest, blades down) to pre-load the lats.'
    ]
  },
  midBack: {
    id: 'midBack',
    name: 'Mid Back',
    anatomical: 'Rhomboids / mid trapezius',
    region: 'back',
    function: 'Squeezes the shoulder blades together (retraction). Keeps posture upright and shoulders healthy.',
    feelCues: [
      'Finish every row by "cracking a walnut between the shoulder blades" — hold it a beat.',
      'Keep the neck long; shrugging up means the upper traps are stealing the squeeze.'
    ]
  },
  lowerBack: {
    id: 'lowerBack',
    name: 'Lower Back',
    anatomical: 'Erector spinae',
    region: 'back',
    function: 'Keeps the spine extended and rigid under load. Isometric hero of squats, deadlifts and rows.',
    feelCues: [
      'Think "proud chest, long spine" — brace like you are about to be poked in the belly.',
      'On back extensions, move slowly and squeeze the glutes at the top instead of hyper-arching.'
    ]
  },
  glutes: {
    id: 'glutes',
    name: 'Glutes',
    anatomical: 'Gluteus maximus / medius',
    region: 'back',
    function: 'Extends the hip (drives it forward) and stabilises the pelvis. The most powerful muscle group in the body.',
    feelCues: [
      'Finish hip hinges by "pushing the ground away and squeezing a coin between the cheeks".',
      'Think "hips through, not back up" at the top of deadlifts and hip thrusts.'
    ]
  },
  quads: {
    id: 'quads',
    name: 'Quads',
    anatomical: 'Quadriceps femoris',
    region: 'front',
    function: 'Straightens the knee. Front-of-thigh powerhouse for squats, lunges and leg press.',
    feelCues: [
      'Push through the WHOLE foot but think "spread the floor with the knees out over the toes".',
      'Control the descent — quads grow from the slow way down.'
    ]
  },
  hamstrings: {
    id: 'hamstrings',
    name: 'Hamstrings',
    anatomical: 'Biceps femoris / semitendinosus / semimembranosus',
    region: 'back',
    function: 'Bends the knee AND extends the hip — they work at two joints, so they need both curls and hinges.',
    feelCues: [
      'On RDLs, think "push the hips to the wall behind you" until you feel a deep stretch behind the thigh.',
      'On leg curls, point the toes toward your shins to keep the calves out of it.'
    ]
  },
  adductors: {
    id: 'adductors',
    name: 'Adductors',
    anatomical: 'Adductor magnus / longus / brevis',
    region: 'front',
    function: 'Pull the thigh inward and assist hip extension from deep positions. Big, often-ignored contributors to squat strength.',
    feelCues: [
      'In a deep squat or sumo pull, think "squeeze the floor together between your feet" on the way up.',
      'On copenhagen planks, keep the body in one straight line — no hip sag.'
    ]
  },
  calves: {
    id: 'calves',
    name: 'Calves',
    anatomical: 'Gastrocnemius / soleus',
    region: 'back',
    function: 'Points the foot (plantar flexion). Gastroc works with a straight knee, soleus with a bent knee — train both.',
    feelCues: [
      'Pause two full seconds in the deep stretch at the bottom — no bouncing off the tendon.',
      'Rise onto the big toe, not the outside of the foot.'
    ]
  }
};

export const MUSCLE_IDS = Object.keys(MUSCLES);
