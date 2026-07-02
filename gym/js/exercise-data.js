/* Exercise library + training splits.
   primaryMuscles / secondaryMuscles reference ids from muscle-data.js —
   main.js validates every reference at load time. */

export const EXERCISES = [
  /* ---------- Chest ---------- */
  {
    id: 'bench-press', name: 'Barbell Bench Press', equipment: 'barbell',
    primaryMuscles: ['pecs'], secondaryMuscles: ['deltsFront', 'triceps'],
    formCues: [
      'Feet planted, slight arch, shoulder blades squeezed back and down into the bench.',
      'Bar touches around the nipple line; forearms vertical at the bottom.',
      'Press up and slightly back toward the rack, elbows ~45–60° from the torso.'
    ],
    tensionTips: [
      'Lower for 2–3 seconds and pause a beat an inch off the chest.',
      'Think "bend the bar into a U" to keep the pecs loaded, not the shoulders.'
    ],
    mistakes: [
      'Flaring elbows to 90° — shoulder joint takes the hit.',
      'Bouncing the bar off the chest and losing upper-back tightness.'
    ]
  },
  {
    id: 'incline-db-press', name: 'Incline Dumbbell Press', equipment: 'dumbbells',
    primaryMuscles: ['pecs'], secondaryMuscles: ['deltsFront', 'triceps'],
    formCues: [
      'Bench at 30° — steeper turns it into a shoulder press.',
      'Start with dumbbells over the upper chest, palms slightly turned in.',
      'Lower until you feel a deep stretch across the upper chest.'
    ],
    tensionTips: [
      'Squeeze the dumbbells "together" at the top without letting them touch.',
      'Keep constant tension: stop just short of full lockout.'
    ],
    mistakes: [
      'Setting the incline too steep and turning it into front-delt work.',
      'Letting the elbows drift down toward the hips as you fatigue.'
    ]
  },
  {
    id: 'dip', name: 'Chest Dip', equipment: 'bodyweight',
    primaryMuscles: ['pecs'], secondaryMuscles: ['triceps', 'deltsFront'],
    formCues: [
      'Lean the torso forward ~30° and let the elbows travel back.',
      'Descend until the upper arm is roughly parallel to the floor.',
      'Drive up thinking "hands toward each other".'
    ],
    tensionTips: [
      'Pause in the stretched bottom position for a full second.',
      'Stay leaned forward at the top — going vertical shifts load to triceps.'
    ],
    mistakes: [
      'Shrugging the shoulders up toward the ears at the bottom.',
      'Cutting depth so the pecs never reach a stretch.'
    ]
  },
  {
    id: 'cable-fly', name: 'Cable Fly', equipment: 'cable',
    primaryMuscles: ['pecs'], secondaryMuscles: ['deltsFront'],
    formCues: [
      'Slight, fixed elbow bend — the movement is at the shoulder only.',
      'Step forward into a staggered stance, chest proud.',
      'Sweep the hands together in a wide hugging arc.'
    ],
    tensionTips: [
      'Cross the hands slightly at the end range and squeeze for 2 seconds.',
      'Control the negative until you feel the stretch through the chest.'
    ],
    mistakes: [
      'Turning it into a press by bending and extending the elbows.',
      'Letting the shoulders roll forward at the end of the squeeze.'
    ]
  },
  {
    id: 'push-up', name: 'Push-Up', equipment: 'bodyweight',
    primaryMuscles: ['pecs'], secondaryMuscles: ['deltsFront', 'triceps', 'abs'],
    formCues: [
      'One straight line from head to heels; glutes and abs braced.',
      'Hands just outside shoulder width, fingers spread.',
      'Chest touches first — not the hips, not the chin.'
    ],
    tensionTips: [
      'Push the floor "apart" between your hands to load the chest.',
      'Elevate the feet or add a pause at the bottom to keep them hard.'
    ],
    mistakes: [
      'Sagging hips — a plank fault, not a pressing fault.',
      'Half reps that never bring the chest near the floor.'
    ]
  },

  /* ---------- Shoulders ---------- */
  {
    id: 'overhead-press', name: 'Overhead Press', equipment: 'barbell',
    primaryMuscles: ['deltsFront'], secondaryMuscles: ['deltsSide', 'triceps', 'traps', 'abs'],
    formCues: [
      'Bar on the front delts, forearms vertical, glutes and abs squeezed.',
      'Press up and slightly back; move the head "through the window" at the top.',
      'Finish with biceps by the ears, bar over mid-foot.'
    ],
    tensionTips: [
      'Brace as if taking a punch — a soft trunk leaks pressing power.',
      'Lower under full control to the collarbone each rep.'
    ],
    mistakes: [
      'Leaning way back and turning it into an incline press.',
      'Pressing the bar forward around the face instead of moving the head back.'
    ]
  },
  {
    id: 'arnold-press', name: 'Arnold Press', equipment: 'dumbbells',
    primaryMuscles: ['deltsFront'], secondaryMuscles: ['deltsSide', 'triceps'],
    formCues: [
      'Start palms facing you at chin height.',
      'Rotate the palms outward as you press overhead.',
      'Reverse the rotation on the way down.'
    ],
    tensionTips: [
      'Slow the rotation — it is where the extra delt stimulus lives.',
      'Stop the descent at chin level to keep tension on the delts.'
    ],
    mistakes: [
      'Rushing the twist and turning it into a normal press.',
      'Arching the lower back as fatigue sets in.'
    ]
  },
  {
    id: 'lateral-raise', name: 'Dumbbell Lateral Raise', equipment: 'dumbbells',
    primaryMuscles: ['deltsSide'], secondaryMuscles: ['traps', 'deltsFront'],
    formCues: [
      'Slight forward lean, soft elbows, dumbbells beside the thighs.',
      'Lead with the elbows out and up to shoulder height.',
      'Pinky slightly higher than the thumb at the top — "pouring the jug".'
    ],
    tensionTips: [
      'Lower on a 3-count; the negative is most of the exercise.',
      'Stop shy of the bottom so the delt never fully rests.'
    ],
    mistakes: [
      'Swinging with the hips and shrugging the traps to move heavy weight.',
      'Raising the hands above shoulder height where traps take over.'
    ]
  },
  {
    id: 'cable-lateral-raise', name: 'Cable Lateral Raise', equipment: 'cable',
    primaryMuscles: ['deltsSide'], secondaryMuscles: ['traps'],
    formCues: [
      'Cable set at the lowest position, handle in the far hand.',
      'Stand tall, raise the arm out to shoulder height.',
      'Keep the wrist neutral and the elbow just slightly bent.'
    ],
    tensionTips: [
      'The cable loads the bottom of the rep — do not rush through it.',
      'Lean slightly away from the stack to lengthen the range.'
    ],
    mistakes: [
      'Standing too close to the pulley and losing bottom-range tension.',
      'Letting the shoulder hike toward the ear on each rep.'
    ]
  },
  {
    id: 'upright-row', name: 'Cable Upright Row (wide grip)', equipment: 'cable',
    primaryMuscles: ['deltsSide'], secondaryMuscles: ['traps', 'biceps'],
    formCues: [
      'Grip wider than shoulders — elbows travel out, not straight up.',
      'Pull to the lower chest, elbows always above the wrists.',
      'Stand tall; no leaning back.'
    ],
    tensionTips: [
      'Think "elbows to the ceiling" rather than "hands to the chin".',
      'Stop at sternum height — higher adds shoulder pinch, not muscle.'
    ],
    mistakes: [
      'Narrow grip pulled to the chin — a common shoulder-impingement recipe.',
      'Heaving with the hips to start each rep.'
    ]
  },
  {
    id: 'reverse-fly', name: 'Reverse Dumbbell Fly', equipment: 'dumbbells',
    primaryMuscles: ['deltsRear'], secondaryMuscles: ['midBack', 'traps'],
    formCues: [
      'Hinge to nearly flat back, dumbbells hanging below the chest.',
      'Sweep the arms out wide, soft elbows, thumbs slightly down.',
      'Stop when the arms reach shoulder height.'
    ],
    tensionTips: [
      'Go light and pause 1 second at the top of every rep.',
      'Think "long arms" — the moment the elbows bend, it becomes a row.'
    ],
    mistakes: [
      'Bouncing the torso up and down to swing the weight.',
      'Squeezing the shoulder blades hard together — that shifts work to the mid back.'
    ]
  },
  {
    id: 'face-pull', name: 'Cable Face Pull', equipment: 'cable',
    primaryMuscles: ['deltsRear'], secondaryMuscles: ['midBack', 'traps'],
    formCues: [
      'Rope at upper-chest height; grip with thumbs pointing back.',
      'Pull toward the bridge of the nose, elbows high and wide.',
      'Finish in a "double biceps" position with knuckles by the ears.'
    ],
    tensionTips: [
      'Pause in the finish position and feel the rear delts, not the arms.',
      'Step back for constant cable tension through the whole rep.'
    ],
    mistakes: [
      'Pulling to the chest with elbows down — that is just a row.',
      'Using so much weight the torso jerks backward.'
    ]
  },
  {
    id: 'rear-delt-row', name: 'Rear-Delt Cable Row', equipment: 'cable',
    primaryMuscles: ['deltsRear'], secondaryMuscles: ['midBack', 'biceps'],
    formCues: [
      'Cable at chest height; pull with elbows flared to shoulder level.',
      'Elbows travel straight back and wide, hands finish beside the shoulders.',
      'Torso stays still and upright.'
    ],
    tensionTips: [
      'Imagine dragging the elbows along a high shelf behind you.',
      'Slow negatives — let the arms reach fully forward each rep.'
    ],
    mistakes: [
      'Dropping the elbows and turning it into a lat row.',
      'Rocking the body backward for momentum.'
    ]
  },

  /* ---------- Traps & neck ---------- */
  {
    id: 'barbell-shrug', name: 'Barbell Shrug', equipment: 'barbell',
    primaryMuscles: ['traps'], secondaryMuscles: ['forearms', 'neck'],
    formCues: [
      'Stand tall, bar at arm\'s length, shoulders rolled back.',
      'Shrug straight up toward the ears — no rolling.',
      'Pause at the top, lower all the way down to a full stretch.'
    ],
    tensionTips: [
      'Hold the top squeeze for 2 seconds; most people hold it for zero.',
      'Use straps if grip dies before the traps do.'
    ],
    mistakes: [
      'Rolling the shoulders in circles — it adds nothing and irritates joints.',
      'Bending the elbows to cheat the weight up.'
    ]
  },
  {
    id: 'db-shrug', name: 'Dumbbell Shrug', equipment: 'dumbbells',
    primaryMuscles: ['traps'], secondaryMuscles: ['forearms', 'neck'],
    formCues: [
      'Dumbbells at the sides let the shoulders travel freely.',
      'Slight forward lean hits more mid trap.',
      'Shrug up and slightly back; pause, then stretch fully at the bottom.'
    ],
    tensionTips: [
      'Think "touch the ears with the shoulders" and hold.',
      'Finish a set with slow 5-second negatives.'
    ],
    mistakes: [
      'Tiny bouncy reps with a weight you cannot pause.',
      'Craning the head forward on each rep.'
    ]
  },
  {
    id: 'farmer-carry', name: 'Farmer Carry', equipment: 'dumbbells',
    primaryMuscles: ['forearms', 'traps'], secondaryMuscles: ['abs', 'obliques', 'calves', 'neck'],
    formCues: [
      'Heavy dumbbells at the sides, chest proud, packed neck.',
      'Walk in short, quick, controlled steps.',
      'Shoulders stay square — no leaning or waddling.'
    ],
    tensionTips: [
      'Crush the handles the entire walk; grip is the exercise.',
      'Go heavy enough that 30–40 metres is genuinely hard.'
    ],
    mistakes: [
      'Letting the shoulders slump forward as you fatigue.',
      'Speed-walking with floppy steps instead of braced ones.'
    ]
  },
  {
    id: 'neck-curl', name: 'Weighted Neck Curl', equipment: 'plate',
    primaryMuscles: ['neck'], secondaryMuscles: [],
    formCues: [
      'Lie face-up on a bench, head off the end, light plate on the forehead (towel under it).',
      'Curl the chin to the chest slowly.',
      'Lower under control to a comfortable stretch.'
    ],
    tensionTips: [
      'Move slowly in both directions — 2 seconds up, 2 down.',
      'Start with very light weight; the neck adapts fast but hates surprises.'
    ],
    mistakes: [
      'Jerky reps or bouncing at either end of the range.',
      'Loading heavy before the movement feels smooth and painless.'
    ]
  },
  {
    id: 'neck-extension', name: 'Weighted Neck Extension', equipment: 'plate',
    primaryMuscles: ['neck'], secondaryMuscles: ['traps'],
    formCues: [
      'Lie face-down on a bench, head off the end, plate held to the back of the head.',
      'Look down, then extend the head up until the neck is neutral-to-slightly-extended.',
      'Keep the torso pinned to the bench.'
    ],
    tensionTips: [
      'Pause at the top; no momentum anywhere in the rep.',
      'Higher reps (15–20) suit the neck better than heavy fives.'
    ],
    mistakes: [
      'Hyper-extending and staring at the wall in front of you.',
      'Lifting the chest off the bench to cheat.'
    ]
  },

  /* ---------- Arms ---------- */
  {
    id: 'barbell-curl', name: 'Barbell Curl', equipment: 'barbell',
    primaryMuscles: ['biceps'], secondaryMuscles: ['forearms'],
    formCues: [
      'Elbows pinned to the sides, grip just outside the hips.',
      'Curl the bar in an arc without the elbows drifting forward.',
      'Lower all the way to straight arms every rep.'
    ],
    tensionTips: [
      'Squeeze hard at the top as if flexing for a photo.',
      '3-second negatives beat heavier cheat reps.'
    ],
    mistakes: [
      'Rocking the torso to heave the bar up.',
      'Half-repping the bottom and never reaching a stretch.'
    ]
  },
  {
    id: 'incline-db-curl', name: 'Incline Dumbbell Curl', equipment: 'dumbbells',
    primaryMuscles: ['biceps'], secondaryMuscles: ['forearms'],
    formCues: [
      'Bench at ~45°, arms hanging straight down behind the torso.',
      'Curl both dumbbells without the elbows moving forward.',
      'Turn the pinky up as you approach the top.'
    ],
    tensionTips: [
      'The stretched start position is the point — settle into it each rep.',
      'Lower slowly and feel the biceps lengthen all the way.'
    ],
    mistakes: [
      'Letting the elbows creep up toward the shoulders.',
      'Shortening the negative to escape the (productive) stretch.'
    ]
  },
  {
    id: 'hammer-curl', name: 'Hammer Curl', equipment: 'dumbbells',
    primaryMuscles: ['biceps', 'forearms'], secondaryMuscles: [],
    formCues: [
      'Neutral grip (palms facing each other) the whole rep.',
      'Curl across to the opposite shoulder or straight up — both work.',
      'Elbows stay glued to the ribs.'
    ],
    tensionTips: [
      'Imagine the thumb leading the weight up.',
      'Slow eccentrics load the brachialis, the width-builder under the biceps.'
    ],
    mistakes: [
      'Swinging both dumbbells with a hip pop.',
      'Rotating to a palms-up grip and turning it into a normal curl.'
    ]
  },
  {
    id: 'preacher-curl', name: 'Preacher Curl', equipment: 'machine',
    primaryMuscles: ['biceps'], secondaryMuscles: ['forearms'],
    formCues: [
      'Armpits snug over the top of the pad, upper arms flat on it.',
      'Curl up without the elbows lifting off the pad.',
      'Lower to just shy of fully straight.'
    ],
    tensionTips: [
      'The bottom half of the rep is the money — own it slowly.',
      'Pause one second at the top squeeze.'
    ],
    mistakes: [
      'Bouncing out of the fully stretched bottom position.',
      'Lifting the hips and shoulders to cheat the weight up.'
    ]
  },
  {
    id: 'triceps-pushdown', name: 'Cable Triceps Pushdown', equipment: 'cable',
    primaryMuscles: ['triceps'], secondaryMuscles: [],
    formCues: [
      'Elbows pinned at the sides, slight forward lean.',
      'Push down until the arms are dead straight.',
      'Let the forearms come up past parallel on the return.'
    ],
    tensionTips: [
      'Squeeze the lockout for a full second each rep.',
      'Keep the shoulders down; the elbow is the only joint moving.'
    ],
    mistakes: [
      'Flaring the elbows and pressing with the chest.',
      'Leaning the bodyweight onto the cable to move a heavier stack.'
    ]
  },
  {
    id: 'skullcrusher', name: 'EZ-Bar Skullcrusher', equipment: 'barbell',
    primaryMuscles: ['triceps'], secondaryMuscles: [],
    formCues: [
      'Lie back, bar over the face, elbows pointing at the ceiling.',
      'Lower the bar to the forehead or just behind the head.',
      'Extend back up without the upper arms tipping toward the hips.'
    ],
    tensionTips: [
      'Lowering behind the head stretches the long head — more growth.',
      'Keep the elbows in; do not let them wing outward.'
    ],
    mistakes: [
      'Turning it into a close-grip press by moving the shoulders.',
      'Going so heavy that the bar drops rather than lowers.'
    ]
  },
  {
    id: 'overhead-triceps-extension', name: 'Overhead Cable Triceps Extension', equipment: 'cable',
    primaryMuscles: ['triceps'], secondaryMuscles: ['abs'],
    formCues: [
      'Face away from the pulley, rope behind the head, elbows by the ears.',
      'Extend the arms fully overhead.',
      'Control the return until you feel a deep stretch in the back of the arm.'
    ],
    tensionTips: [
      'The stretched position is the stimulus — sink into it each rep.',
      'Keep the ribs down; do not arch to fake range of motion.'
    ],
    mistakes: [
      'Elbows flaring wide and drifting forward.',
      'Cutting the stretch short at the bottom.'
    ]
  },
  {
    id: 'close-grip-bench', name: 'Close-Grip Bench Press', equipment: 'barbell',
    primaryMuscles: ['triceps'], secondaryMuscles: ['pecs', 'deltsFront'],
    formCues: [
      'Grip at shoulder width — not thumbs touching.',
      'Elbows track close to the body, bar touches the lower chest.',
      'Press up thinking "hands through the bar".'
    ],
    tensionTips: [
      'Pause on the chest to remove the bounce and load the triceps.',
      'Squeeze the bar hard — irradiation wakes the whole arm up.'
    ],
    mistakes: [
      'Excessively narrow grip that wrecks the wrists.',
      'Letting the elbows flare, which shifts the work back to the chest.'
    ]
  },
  {
    id: 'wrist-curl', name: 'Wrist Curl', equipment: 'dumbbells',
    primaryMuscles: ['forearms'], secondaryMuscles: [],
    formCues: [
      'Forearms resting on a bench or your thighs, wrists just off the edge.',
      'Let the weight roll to the fingertips, then curl the wrist up.',
      'Small movement — the range is only a few centimetres.'
    ],
    tensionTips: [
      'High reps (15–25) and slow tempo suit the forearms.',
      'Pause at the top of every rep.'
    ],
    mistakes: [
      'Lifting the forearms off the pad to heave the weight.',
      'Racing through reps with a bouncing wrist.'
    ]
  },
  {
    id: 'dead-hang', name: 'Dead Hang', equipment: 'bodyweight',
    primaryMuscles: ['forearms'], secondaryMuscles: ['lats', 'abs'],
    formCues: [
      'Full grip on the bar, arms straight, shoulders pulled slightly down.',
      'Body still — no swinging.',
      'Breathe normally and hang for time.'
    ],
    tensionTips: [
      'Work toward 60 seconds; add weight only after that is easy.',
      'Grip the bar hard rather than hanging off the fingertips passively.'
    ],
    mistakes: [
      'Fully relaxed "hanging off the joints" with shrugged shoulders.',
      'Kicking and swinging to pass the time.'
    ]
  },

  /* ---------- Back ---------- */
  {
    id: 'pull-up', name: 'Pull-Up', equipment: 'bodyweight',
    primaryMuscles: ['lats'], secondaryMuscles: ['biceps', 'midBack', 'forearms', 'deltsRear'],
    formCues: [
      'Grip just outside shoulders; start from a dead hang with blades down.',
      'Drive the elbows down toward the back pockets.',
      'Chin over the bar with a proud chest, no kicking.'
    ],
    tensionTips: [
      'Start each rep by depressing the shoulder blades before the arms bend.',
      'Lower on a 3-count all the way to straight arms.'
    ],
    mistakes: [
      'Kipping and half reps that skip the lats.',
      'Leading with the chin and rounding the shoulders at the top.'
    ]
  },
  {
    id: 'lat-pulldown', name: 'Lat Pulldown', equipment: 'machine',
    primaryMuscles: ['lats'], secondaryMuscles: ['biceps', 'midBack', 'deltsRear'],
    formCues: [
      'Grip a bit wider than shoulders, slight backward lean, chest tall.',
      'Pull the bar to the collarbone by driving the elbows down.',
      'Let the arms fully lengthen and the blades rise at the top.'
    ],
    tensionTips: [
      'Think "elbows into the back pockets", hands are just hooks.',
      'Pause the bar at the chest for a one-count squeeze.'
    ],
    mistakes: [
      'Leaning way back and rowing the weight with momentum.',
      'Pulling behind the neck.'
    ]
  },
  {
    id: 'barbell-row', name: 'Barbell Row', equipment: 'barbell',
    primaryMuscles: ['lats', 'midBack'], secondaryMuscles: ['biceps', 'deltsRear', 'lowerBack', 'forearms'],
    formCues: [
      'Hinge to ~45° or lower, flat back, bar hanging under the shoulders.',
      'Pull the bar to the lower ribs, elbows tracking back not out.',
      'Lower under control without the torso rising.'
    ],
    tensionTips: [
      'Squeeze the blades together at the top of every rep.',
      'Pause each rep on the floor or at full stretch to kill momentum.'
    ],
    mistakes: [
      'Standing up 30° every rep and heaving with the hips.',
      'Rounding the lower back as fatigue builds.'
    ]
  },
  {
    id: 'single-arm-db-row', name: 'Single-Arm Dumbbell Row', equipment: 'dumbbells',
    primaryMuscles: ['lats'], secondaryMuscles: ['midBack', 'biceps', 'deltsRear', 'obliques'],
    formCues: [
      'Knee and hand on the bench, back flat, neck neutral.',
      'Row the dumbbell to the hip, not the armpit.',
      'Full stretch at the bottom — let the blade slide forward.'
    ],
    tensionTips: [
      'Think "elbow to the hip pocket" for lats; rowing high hits mid back instead.',
      'One-second pause at the top; no twisting to fake range.'
    ],
    mistakes: [
      'Rotating the torso open to yank the weight up.',
      'Short choppy reps that skip the stretch.'
    ]
  },
  {
    id: 'seated-cable-row', name: 'Seated Cable Row', equipment: 'cable',
    primaryMuscles: ['midBack'], secondaryMuscles: ['lats', 'biceps', 'deltsRear', 'lowerBack'],
    formCues: [
      'Sit tall, knees soft, chest up.',
      'Pull the handle to the belly button, blades squeezing together.',
      'Let the arms fully lengthen forward without slumping the spine.'
    ],
    tensionTips: [
      'Finish each rep by "cracking a walnut between the shoulder blades".',
      'Torso stays within ~10° of vertical the whole set.'
    ],
    mistakes: [
      'Rowing with the lower back like a rowing machine.',
      'Shrugging the shoulders up toward the ears on the squeeze.'
    ]
  },
  {
    id: 'chest-supported-row', name: 'Chest-Supported Row', equipment: 'machine',
    primaryMuscles: ['midBack'], secondaryMuscles: ['lats', 'biceps', 'deltsRear'],
    formCues: [
      'Chest glued to the pad — it stays there the entire set.',
      'Row the handles back, elbows at ~45°.',
      'Squeeze the blades, then let them fully protract forward.'
    ],
    tensionTips: [
      'Because the torso is supported, every kilo goes through the back — slow down and feel it.',
      'Hold the contraction one second per rep.'
    ],
    mistakes: [
      'Pushing off the chest pad to heave heavier weight.',
      'Half-range reps that never let the blades separate.'
    ]
  },
  {
    id: 'straight-arm-pulldown', name: 'Straight-Arm Pulldown', equipment: 'cable',
    primaryMuscles: ['lats'], secondaryMuscles: ['triceps', 'abs'],
    formCues: [
      'High cable, slight hinge, arms almost straight.',
      'Sweep the bar down to the thighs in an arc.',
      'Control the return until the arms point up at ~45°.'
    ],
    tensionTips: [
      'Great mind-muscle drill: think only "armpits down", nothing else.',
      'Keep the elbows locked in a soft bend — no pressing.'
    ],
    mistakes: [
      'Bending the elbows and turning it into a pushdown.',
      'Bouncing the torso to swing the bar down.'
    ]
  },
  {
    id: 'deadlift', name: 'Conventional Deadlift', equipment: 'barbell',
    primaryMuscles: ['glutes', 'hamstrings', 'lowerBack'], secondaryMuscles: ['quads', 'traps', 'forearms', 'lats', 'abs'],
    formCues: [
      'Bar over mid-foot, shins close, hips higher than knees.',
      'Wedge in: long spine, lats "protecting the armpits", slack pulled out of the bar.',
      'Push the floor away and finish tall by squeezing the glutes — no lean-back.'
    ],
    tensionTips: [
      'Brace hard before every pull; reset the brace between reps.',
      'Keep the bar dragging up the legs the whole way.'
    ],
    mistakes: [
      'Rounding the lower back off the floor.',
      'Yanking the bar with the arms instead of pushing the floor.'
    ]
  },
  {
    id: 'back-extension', name: 'Back Extension (45°)', equipment: 'machine',
    primaryMuscles: ['lowerBack'], secondaryMuscles: ['glutes', 'hamstrings'],
    formCues: [
      'Pad at the hip crease so the pelvis can hinge freely.',
      'Lower with a long spine until the hamstrings stretch.',
      'Rise to a straight body line — not into a big arch.'
    ],
    tensionTips: [
      'Squeeze the glutes at the top to protect the spine and share the load.',
      'Slow 2-up / 3-down tempo; add a plate hug when it gets easy.'
    ],
    mistakes: [
      'Hyper-extending at the top of every rep.',
      'Rounding and snapping through reps at speed.'
    ]
  },
  {
    id: 'good-morning', name: 'Good Morning', equipment: 'barbell',
    primaryMuscles: ['hamstrings', 'lowerBack'], secondaryMuscles: ['glutes'],
    formCues: [
      'Bar on the upper back, soft knees, feet hip-width.',
      'Push the hips straight back, torso tipping toward parallel.',
      'Drive the hips forward to stand — the bar path is a hinge, not a squat.'
    ],
    tensionTips: [
      'Stop where the hamstring stretch peaks; depth beyond that is spin.',
      'Stay light — this is a feel-and-position lift, not a max-out lift.'
    ],
    mistakes: [
      'Bending the knees and turning it into a squat.',
      'Losing the flat back at the bottom.'
    ]
  },

  /* ---------- Core ---------- */
  {
    id: 'cable-crunch', name: 'Kneeling Cable Crunch', equipment: 'cable',
    primaryMuscles: ['abs'], secondaryMuscles: ['obliques'],
    formCues: [
      'Kneel below a high pulley, rope held beside the head.',
      'Crunch the ribs toward the pelvis — the hips do not move.',
      'Return until the abs reach a full stretch.'
    ],
    tensionTips: [
      'Exhale hard at the bottom of every crunch.',
      'Think "curl the spine", not "bow forward at the hips".'
    ],
    mistakes: [
      'Hinging at the hips with a rigid spine — that is a hip exercise.',
      'Pulling the rope down with the arms.'
    ]
  },
  {
    id: 'hanging-leg-raise', name: 'Hanging Leg Raise', equipment: 'bodyweight',
    primaryMuscles: ['abs'], secondaryMuscles: ['obliques', 'forearms'],
    formCues: [
      'Dead hang, then tilt the pelvis under before the legs rise.',
      'Raise the legs (bent or straight) until the pelvis curls up.',
      'Lower slowly without swinging.'
    ],
    tensionTips: [
      'The rep starts when the PELVIS tilts — leg height alone is hip flexors.',
      'Pause at the top; kill all swing between reps.'
    ],
    mistakes: [
      'Swinging into momentum after rep two.',
      'Lifting the legs with a neutral pelvis and feeling only the hips.'
    ]
  },
  {
    id: 'ab-wheel', name: 'Ab Wheel Rollout', equipment: 'wheel',
    primaryMuscles: ['abs'], secondaryMuscles: ['obliques', 'lats'],
    formCues: [
      'Start on knees, wheel under the shoulders, spine slightly rounded.',
      'Roll out keeping the ribs pulled down — no sagging hips.',
      'Pull back with the abs, as if dragging the floor toward you.'
    ],
    tensionTips: [
      'Only roll as far as you can keep the lower back from arching.',
      'Exhale on the way back in and re-brace before the next rep.'
    ],
    mistakes: [
      'Letting the lower back sag into extension at full reach.',
      'Sitting the hips back onto the heels between reps.'
    ]
  },
  {
    id: 'plank', name: 'Plank', equipment: 'bodyweight',
    primaryMuscles: ['abs'], secondaryMuscles: ['obliques', 'deltsFront', 'glutes'],
    formCues: [
      'Elbows under shoulders, one line from head to heels.',
      'Tuck the pelvis slightly and squeeze the glutes.',
      'Breathe steadily behind the brace.'
    ],
    tensionTips: [
      'Make it hard, not long: pull elbows toward toes isometrically (RKC style).',
      'If you can hold 60+ seconds easily, add load or lever length instead of time.'
    ],
    mistakes: [
      'Hips sagging or piking up to escape tension.',
      'Holding the breath for the entire set.'
    ]
  },
  {
    id: 'side-plank', name: 'Side Plank', equipment: 'bodyweight',
    primaryMuscles: ['obliques'], secondaryMuscles: ['abs', 'glutes', 'deltsSide'],
    formCues: [
      'Elbow under the shoulder, feet stacked, body in one line.',
      'Push the floor away and lift the hip high.',
      'Keep the top shoulder and hip stacked over the bottom ones.'
    ],
    tensionTips: [
      'Think "tall hip" the whole hold; the sag is the failure point.',
      'Progress by raising the top leg or adding time under 45 seconds.'
    ],
    mistakes: [
      'Letting the hips drift back into a banana shape.',
      'Slumping into the supporting shoulder.'
    ]
  },
  {
    id: 'cable-woodchop', name: 'Cable Woodchop', equipment: 'cable',
    primaryMuscles: ['obliques'], secondaryMuscles: ['abs', 'deltsFront'],
    formCues: [
      'Cable high, arms long, feet wider than shoulders.',
      'Rotate the torso to sweep the handle down across the body.',
      'Pivot the back foot; hips and ribs turn together.'
    ],
    tensionTips: [
      'Slow the return — resisting the twist is half the exercise.',
      'Keep the arms as passive rails; the trunk does the turning.'
    ],
    mistakes: [
      'Chopping with the arms while the trunk stays still.',
      'Rounding the back to add fake range.'
    ]
  },
  {
    id: 'suitcase-carry', name: 'Suitcase Carry', equipment: 'dumbbells',
    primaryMuscles: ['obliques'], secondaryMuscles: ['forearms', 'traps', 'abs'],
    formCues: [
      'One heavy dumbbell in one hand, posture perfectly level.',
      'Walk slowly; shoulders and hips stay square.',
      'Swap sides and match the distance.'
    ],
    tensionTips: [
      'The exercise is refusing to lean — the side away from the weight works hardest.',
      'Heavier and shorter beats light and long.'
    ],
    mistakes: [
      'Leaning away from the weight to hang off the spine.',
      'Rushing with short shuffly steps and a swinging bell.'
    ]
  },

  /* ---------- Legs ---------- */
  {
    id: 'back-squat', name: 'Barbell Back Squat', equipment: 'barbell',
    primaryMuscles: ['quads', 'glutes'], secondaryMuscles: ['hamstrings', 'adductors', 'lowerBack', 'abs'],
    formCues: [
      'Bar on the traps/rear delts, full-foot pressure, brace before descending.',
      'Sit down between the heels, knees tracking over the toes.',
      'Drive the whole foot through the floor; chest and hips rise together.'
    ],
    tensionTips: [
      'Control the descent for 2–3 seconds; do not dive-bomb.',
      '"Spread the floor" to keep the knees out and the adductors and glutes loaded.'
    ],
    mistakes: [
      'Knees caving in as the weight gets heavy.',
      'Hips shooting up first and turning it into a good morning.'
    ]
  },
  {
    id: 'front-squat', name: 'Front Squat', equipment: 'barbell',
    primaryMuscles: ['quads'], secondaryMuscles: ['glutes', 'abs', 'lowerBack', 'adductors'],
    formCues: [
      'Bar on the front delts, elbows high, fingertips just hooking the bar.',
      'Torso stays tall — more upright than a back squat.',
      'Sit straight down, elbows chasing the ceiling the whole rep.'
    ],
    tensionTips: [
      'If the elbows drop, the rep is already lost — elbows UP is the one cue.',
      'The upright torso biases the quads; feel the thighs, not the hips.'
    ],
    mistakes: [
      'Letting the elbows drop and the bar roll forward.',
      'Cutting depth because the ankles are stiff — elevate the heels instead.'
    ]
  },
  {
    id: 'leg-press', name: 'Leg Press', equipment: 'machine',
    primaryMuscles: ['quads'], secondaryMuscles: ['glutes', 'hamstrings', 'adductors'],
    formCues: [
      'Feet mid-platform, hip-width; lower back stays glued to the pad.',
      'Lower until the knees near the chest without the tailbone lifting.',
      'Press through the whole foot; do not slam into lockout.'
    ],
    tensionTips: [
      'Stop just short of knee lockout to keep tension on the quads.',
      'Feet lower on the platform = more quads; higher = more glutes/hams.'
    ],
    mistakes: [
      'Butt lifting off the pad at the bottom — the spine rounds under load.',
      'Tiny half reps with the whole stack.'
    ]
  },
  {
    id: 'leg-extension', name: 'Leg Extension', equipment: 'machine',
    primaryMuscles: ['quads'], secondaryMuscles: [],
    formCues: [
      'Knee joint aligned with the machine pivot, back against the pad.',
      'Extend to a dead-straight knee.',
      'Lower slowly to a deep knee bend.'
    ],
    tensionTips: [
      'Squeeze hard for a second at full extension — this is where quads peak.',
      'Point the toes slightly out or in to bias different quad heads.'
    ],
    mistakes: [
      'Kicking the weight up with momentum and letting it crash down.',
      'Lifting the hips off the seat at the top.'
    ]
  },
  {
    id: 'walking-lunge', name: 'Walking Lunge', equipment: 'dumbbells',
    primaryMuscles: ['quads', 'glutes'], secondaryMuscles: ['hamstrings', 'adductors', 'calves'],
    formCues: [
      'Long step, torso tall, back knee kisses the floor.',
      'Front shin roughly vertical; weight through the front heel.',
      'Push off the front leg to travel into the next stride.'
    ],
    tensionTips: [
      'Pause a beat at the bottom of each stride — no bouncing off the knee.',
      'Lean the torso slightly forward to bias the glutes; stay tall for quads.'
    ],
    mistakes: [
      'Short choppy steps where the knee slams past the toes.',
      'Pushing off the BACK leg and skipping the front leg\'s work.'
    ]
  },
  {
    id: 'bulgarian-split-squat', name: 'Bulgarian Split Squat', equipment: 'dumbbells',
    primaryMuscles: ['quads', 'glutes'], secondaryMuscles: ['hamstrings', 'adductors', 'abs'],
    formCues: [
      'Rear foot on a bench, front foot far enough forward to squat between.',
      'Lower straight down until the rear knee nears the floor.',
      'Drive up through the front foot; torso angle stays constant.'
    ],
    tensionTips: [
      'Slight forward torso lean shifts the load into the glute of the front leg.',
      'Slow negatives — balance improves and the burn is honest.'
    ],
    mistakes: [
      'Standing too close and stabbing the front knee forward.',
      'Bouncing the rear knee off the floor.'
    ]
  },
  {
    id: 'romanian-deadlift', name: 'Romanian Deadlift', equipment: 'barbell',
    primaryMuscles: ['hamstrings', 'glutes'], secondaryMuscles: ['lowerBack', 'forearms', 'traps'],
    formCues: [
      'Start standing; push the hips straight back with soft knees.',
      'Bar slides down the thighs, back flat, lats tight.',
      'Stop where the hamstring stretch peaks, then drive the hips forward.'
    ],
    tensionTips: [
      'Think "hips to the wall behind you", not "bend down".',
      '3-second lowering; the stretch under load is the growth signal.'
    ],
    mistakes: [
      'Squatting the weight down by bending the knees.',
      'Rounding the back to reach an arbitrary depth.'
    ]
  },
  {
    id: 'lying-leg-curl', name: 'Lying Leg Curl', equipment: 'machine',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['calves'],
    formCues: [
      'Hips pressed into the pad, pad just above the heels.',
      'Curl the heels to the glutes.',
      'Lower slowly to almost-straight knees.'
    ],
    tensionTips: [
      'Point the toes toward the shins (dorsiflex) to take the calves out.',
      'Fight the negative for 3 seconds every rep.'
    ],
    mistakes: [
      'Hips popping up off the bench to cheat the weight over.',
      'Letting the weight stack slam at the bottom.'
    ]
  },
  {
    id: 'seated-leg-curl', name: 'Seated Leg Curl', equipment: 'machine',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['calves'],
    formCues: [
      'Thigh pad locked down snug, knee aligned with the pivot.',
      'Curl the heels under the seat as far as they go.',
      'Return slowly to a long hamstring stretch.'
    ],
    tensionTips: [
      'The seated angle stretches the hams at the hip — often better growth than lying curls.',
      'Pause one second in the fully curled position.'
    ],
    mistakes: [
      'Scooting the hips forward to shorten the range.',
      'Fast half reps in the middle of the range only.'
    ]
  },
  {
    id: 'nordic-curl', name: 'Nordic Hamstring Curl', equipment: 'bodyweight',
    primaryMuscles: ['hamstrings'], secondaryMuscles: ['calves', 'lowerBack'],
    formCues: [
      'Kneel with the ankles anchored, body in one line from knees to head.',
      'Lower the torso forward as slowly as possible.',
      'Catch with the hands, push back lightly, and pull back up with the hamstrings.'
    ],
    tensionTips: [
      'The slow lowering IS the exercise — fight for every degree.',
      'Keep the hips extended; folding at the hips deletes the tension.'
    ],
    mistakes: [
      'Breaking at the hips so the torso stays upright.',
      'Dropping fast and doing a push-up back up.'
    ]
  },
  {
    id: 'hip-thrust', name: 'Barbell Hip Thrust', equipment: 'barbell',
    primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings', 'quads', 'abs'],
    formCues: [
      'Upper back on a bench, bar over the hip crease (use a pad).',
      'Feet planted so the shins are vertical at the top.',
      'Drive the hips up to a flat tabletop; chin tucked, ribs down.'
    ],
    tensionTips: [
      'Squeeze the glutes for a full 2 seconds at the top of every rep.',
      'Posterior-tilt the pelvis at lockout — "tuck the tail" — instead of arching the back.'
    ],
    mistakes: [
      'Hyper-extending the lower back instead of finishing with the glutes.',
      'Bouncing out of the bottom with no pause.'
    ]
  },
  {
    id: 'glute-kickback', name: 'Cable Glute Kickback', equipment: 'cable',
    primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings'],
    formCues: [
      'Ankle cuff on, hinge slightly forward holding the frame.',
      'Kick the leg straight back and slightly up, knee mostly straight.',
      'Return under control without the lower back arching.'
    ],
    tensionTips: [
      'Squeeze the working glute at the top for a full second.',
      'Small range done strictly beats big range done with the spine.'
    ],
    mistakes: [
      'Arching the lower back to kick higher.',
      'Swinging the leg with momentum.'
    ]
  },
  {
    id: 'sumo-deadlift', name: 'Sumo Deadlift', equipment: 'barbell',
    primaryMuscles: ['glutes', 'adductors'], secondaryMuscles: ['quads', 'hamstrings', 'lowerBack', 'traps', 'forearms'],
    formCues: [
      'Wide stance, toes out, shins vertical against the bar.',
      'Knees pushed out over the toes; torso more upright than conventional.',
      'Spread the floor apart and stand tall.'
    ],
    tensionTips: [
      'Wedge the hips down-and-in before the pull; do not yank.',
      'Feel the inner thighs pulling the legs together as you rise — that is the adductors.'
    ],
    mistakes: [
      'Knees caving inward off the floor.',
      'Hips rising first and stiff-legging the lift.'
    ]
  },
  {
    id: 'copenhagen-plank', name: 'Copenhagen Plank', equipment: 'bodyweight',
    primaryMuscles: ['adductors'], secondaryMuscles: ['obliques', 'abs'],
    formCues: [
      'Side plank with the TOP foot on a bench, bottom leg free.',
      'Lift the hips until the body is one straight line.',
      'Hold, or lower and raise the hips slowly for reps.'
    ],
    tensionTips: [
      'Shorten the lever (knee on the bench) to scale it down.',
      'Squeeze the bench between the top leg and the floor line — the inner thigh does the work.'
    ],
    mistakes: [
      'Hips sagging toward the floor.',
      'Rolling the chest toward the ceiling.'
    ]
  },
  {
    id: 'adductor-machine', name: 'Adductor Machine', equipment: 'machine',
    primaryMuscles: ['adductors'], secondaryMuscles: [],
    formCues: [
      'Sit tall, pads against the inner knees, start at a comfortable stretch.',
      'Squeeze the legs together smoothly.',
      'Return slowly to the stretched start.'
    ],
    tensionTips: [
      'Pause one second with the pads together each rep.',
      'Increase the start width over weeks — the stretched range is the growth range.'
    ],
    mistakes: [
      'Setting the range too wide too soon and straining.',
      'Letting the weight yank the legs back apart.'
    ]
  },
  {
    id: 'standing-calf-raise', name: 'Standing Calf Raise', equipment: 'machine',
    primaryMuscles: ['calves'], secondaryMuscles: [],
    formCues: [
      'Balls of the feet on the edge, knees straight (soft, not locked).',
      'Lower into a deep 2-second stretch below the step.',
      'Rise as high as possible onto the big toes.'
    ],
    tensionTips: [
      'Pause 2 seconds at the bottom stretch — no tendon bounce.',
      'Squeeze the top like you are tiptoeing to see over a wall.'
    ],
    mistakes: [
      'Fast bouncy reps powered by the achilles, not the muscle.',
      'Rolling onto the outside edge of the foot.'
    ]
  },
  {
    id: 'seated-calf-raise', name: 'Seated Calf Raise', equipment: 'machine',
    primaryMuscles: ['calves'], secondaryMuscles: [],
    formCues: [
      'Knees bent 90° under the pad — this targets the deeper soleus.',
      'Full stretch at the bottom, full rise at the top.',
      'Slow and strict; the soleus loves higher reps.'
    ],
    tensionTips: [
      'Sets of 15–25 with a pause at both ends work best here.',
      'Do these AND straight-leg raises — they train different muscles.'
    ],
    mistakes: [
      'Bouncing out of the stretch.',
      'Loading so heavy the range shrinks to a wiggle.'
    ]
  },
  {
    id: 'single-leg-calf-raise', name: 'Single-Leg Calf Raise', equipment: 'bodyweight',
    primaryMuscles: ['calves'], secondaryMuscles: [],
    formCues: [
      'One foot on a step, fingertips on a wall for balance only.',
      'Deep stretch at the bottom, tall squeeze at the top.',
      'Match reps on both legs.'
    ],
    tensionTips: [
      'Balance work makes cheating impossible — one honest leg at a time.',
      'Add a dumbbell in the same-side hand when 15 strict reps get easy.'
    ],
    mistakes: [
      'Pulling yourself up with the balance hand.',
      'Short pulses at the top third of the range only.'
    ]
  }
];

export const SPLITS = {
  push: {
    id: 'push', label: 'Push',
    blurb: 'Everything that presses: chest, shoulders, triceps.',
    muscles: ['pecs', 'deltsFront', 'deltsSide', 'triceps']
  },
  pull: {
    id: 'pull', label: 'Pull',
    blurb: 'Everything that pulls: back, rear delts, biceps, grip.',
    muscles: ['lats', 'midBack', 'traps', 'deltsRear', 'biceps', 'forearms']
  },
  legs: {
    id: 'legs', label: 'Legs',
    blurb: 'The lower half plus the low back that braces it.',
    muscles: ['quads', 'hamstrings', 'glutes', 'adductors', 'calves', 'lowerBack']
  },
  upper: {
    id: 'upper', label: 'Upper',
    blurb: 'Full upper body — pressing and pulling in one day.',
    muscles: ['pecs', 'deltsFront', 'deltsSide', 'deltsRear', 'traps', 'lats', 'midBack', 'biceps', 'triceps', 'forearms']
  },
  lower: {
    id: 'lower', label: 'Lower',
    blurb: 'Lower body plus trunk to brace it.',
    muscles: ['quads', 'hamstrings', 'glutes', 'adductors', 'calves', 'lowerBack', 'abs', 'obliques']
  },
  full: {
    id: 'full', label: 'Full Body',
    blurb: 'Every trainable group in one session.',
    muscles: [
      'neck', 'traps', 'deltsFront', 'deltsSide', 'deltsRear', 'pecs',
      'biceps', 'triceps', 'forearms', 'abs', 'obliques', 'lats',
      'midBack', 'lowerBack', 'glutes', 'quads', 'hamstrings', 'adductors', 'calves'
    ]
  }
};
