import { RoundData } from "./types";

export const GAME_TREE: RoundData[] = [
  {
    round: 1,
    context: "0300 HRS IST. NEW DELHI COMMAND BUNKER. Early warning satellite 'KARTIK-4' detects multiple thermal blooms at the Sargodha Airbase, Pakistan. Trajectory analysis indicates solid-fueled ballistic missile ignition. Estimated Time to Impact (ETI): 15 minutes. Strategic Forces Command (SFC) is awaiting your directive. The fog of war is absolute; verification is critical, but every second spent in deliberation is a second lost to the enemy's first-strike advantage.",
    maxOptions: [
      {
        id: "1A",
        label: "MULTI-INT VERIFICATION",
        description: "Deploy high-altitude UAVs and cross-reference with RAW human intelligence assets on the ground. This ensures we are not reacting to a technical glitch or a localized test, but it burns critical minutes of our interception window. Risk: Total saturation of BMD grid if delayed.",
        timeCost: 150,
        impact: { livesSaved: 5, diplomaticStanding: 10, escalationLevel: 5, timeWasted: 20 }
      },
      {
        id: "1B",
        label: "DGMO-TO-DGMO HOTLINE",
        description: "Initiate immediate direct communication with the Pakistani Director General of Military Operations. Demand an explanation for the thermal signatures. This signals a desire for de-escalation but exposes our hesitation to the adversary's command structure.",
        timeCost: 60,
        impact: { livesSaved: 2, diplomaticStanding: 15, escalationLevel: 0, timeWasted: 10 }
      },
      {
        id: "1C",
        label: "SPIN-UP STRATEGIC FORCES (SFC)",
        description: "Bypass verification. Order the immediate mating of nuclear warheads to Agni-V delivery vehicles. Signal 'Launch-on-Warning' readiness to NORAD and the Kremlin. This is the most aggressive posture possible, designed to deter further launches through the certainty of annihilation.",
        timeCost: 0,
        impact: { livesSaved: 0, diplomaticStanding: -10, escalationLevel: 25, timeWasted: 0 }
      }
    ],
    minResponses: {
      "1A": [
        { id: "M1", label: "DENY", description: "Pakistan claims a routine exercise error.", impact: { livesSaved: 0, diplomaticStanding: 5, escalationLevel: -5, timeWasted: 0 } },
        { id: "M2", label: "RADIO SILENCE", description: "No response from Islamabad.", impact: { livesSaved: -5, diplomaticStanding: -5, escalationLevel: 10, timeWasted: 5 } },
        { id: "M3", label: "CONFIRM & ULTIMATUM", description: "Pakistan confirms launch as a response to perceived border incursions.", impact: { livesSaved: -20, diplomaticStanding: -10, escalationLevel: 30, timeWasted: 10 } }
      ],
      "1B": [
        { id: "M1", label: "DENY", description: "Claims technical malfunction.", impact: { livesSaved: 0, diplomaticStanding: 5, escalationLevel: -5, timeWasted: 0 } },
        { id: "M2", label: "RADIO SILENCE", description: "Hotline goes dead.", impact: { livesSaved: -10, diplomaticStanding: -5, escalationLevel: 15, timeWasted: 5 } },
        { id: "M3", label: "CONFIRM & ULTIMATUM", description: "Demands immediate withdrawal from disputed territories.", impact: { livesSaved: -25, diplomaticStanding: -15, escalationLevel: 35, timeWasted: 10 } }
      ],
      "1C": [
        { id: "M1", label: "DENY", description: "Panic in Islamabad; they scramble to explain.", impact: { livesSaved: 5, diplomaticStanding: 0, escalationLevel: 5, timeWasted: 0 } },
        { id: "M2", label: "RADIO SILENCE", description: "Adversary prepares counter-strike.", impact: { livesSaved: -15, diplomaticStanding: -10, escalationLevel: 40, timeWasted: 5 } },
        { id: "M3", label: "CONFIRM & ULTIMATUM", description: "Full mobilization of Pakistani Triad.", impact: { livesSaved: -30, diplomaticStanding: -20, escalationLevel: 50, timeWasted: 10 } }
      ]
    }
  },
  {
    round: 2,
    context: "T-12:00. TARGET CONFIRMED. The 'Ghauri-III' IRBMs are in mid-course phase. Intelligence reports indicate mobile TEL (Transporter Erector Launcher) units are dispersing into the rugged terrain of the Salt Range, making them nearly impossible to track via satellite. You have a narrow window to strike their command and control nodes before they lose all central authority and go into 'Dead Hand' mode.",
    maxOptions: [
      {
        id: "2A",
        label: "PHASE-II BMD ACTIVATION",
        description: "Prioritize defense. Divert all power to the Prithvi Air Defence (PAD) and Advanced Air Defence (AAD) grids. This maximizes our chance of interception but leaves our own silos vulnerable to a second wave of conventional precision strikes.",
        timeCost: 30,
        impact: { livesSaved: 20, diplomaticStanding: 5, escalationLevel: 5, timeWasted: 5 }
      },
      {
        id: "2B",
        label: "HYPERSONIC PRE-EMPTIVE STRIKE",
        description: "Launch a salvo of BrahMos-II hypersonic cruise missiles targeting the enemy's VLF communication arrays and TEL dispersal routes. This 'decapitation' attempt aims to sever the link between Islamabad and their nuclear assets. High risk of triggering an automated 'all-out' response.",
        timeCost: 15,
        impact: { livesSaved: 10, diplomaticStanding: -15, escalationLevel: 40, timeWasted: 0 }
      },
      {
        id: "2C",
        label: "PUBLIC UNSC BROADCAST",
        description: "Go live to the United Nations Security Council. Present the radar evidence and demand immediate international intervention. This builds massive diplomatic leverage but wastes precious minutes while the missiles continue their descent.",
        timeCost: 180,
        impact: { livesSaved: -10, diplomaticStanding: 30, escalationLevel: -10, timeWasted: 40 }
      }
    ],
    minResponses: {
      "2A": [
        { id: "M1", label: "ELECTRONIC WARFARE", description: "Jamming our radar arrays.", impact: { livesSaved: -10, diplomaticStanding: 0, escalationLevel: 10, timeWasted: 5 } },
        { id: "M2", label: "LAUNCH SECOND WAVE", description: "Exploiting our defensive focus.", impact: { livesSaved: -30, diplomaticStanding: -5, escalationLevel: 30, timeWasted: 0 } },
        { id: "M3", label: "OFFER ABORT", description: "Conditional ceasefire offered.", impact: { livesSaved: 10, diplomaticStanding: 10, escalationLevel: -10, timeWasted: 0 } }
      ],
      "2B": [
        { id: "M1", label: "ELECTRONIC WARFARE", description: "Missiles partially diverted.", impact: { livesSaved: -5, diplomaticStanding: -5, escalationLevel: 15, timeWasted: 5 } },
        { id: "M2", label: "LAUNCH SECOND WAVE", description: "Retaliatory strike launched.", impact: { livesSaved: -40, diplomaticStanding: -20, escalationLevel: 50, timeWasted: 0 } },
        { id: "M3", label: "OFFER ABORT", description: "Enemy command in chaos, seeking terms.", impact: { livesSaved: 15, diplomaticStanding: 5, escalationLevel: 0, timeWasted: 0 } }
      ],
      "2C": [
        { id: "M1", label: "ELECTRONIC WARFARE", description: "Broadcast signal jammed.", impact: { livesSaved: -20, diplomaticStanding: -10, escalationLevel: 20, timeWasted: 10 } },
        { id: "M2", label: "LAUNCH SECOND WAVE", description: "Enemy ignores the UN.", impact: { livesSaved: -50, diplomaticStanding: -20, escalationLevel: 40, timeWasted: 5 } },
        { id: "M3", label: "OFFER ABORT", description: "International pressure forces a pause.", impact: { livesSaved: 20, diplomaticStanding: 20, escalationLevel: -20, timeWasted: 0 } }
      ]
    }
  },
  {
    round: 3,
    context: "T-9:00. MID-COURSE PHASE. Radar indicates 2-3 warheads have successfully separated and are now in the upper atmosphere. Simultaneously, the Pakistani Naval Triad—specifically their Agosta-90B class submarines—have gone silent in the Arabian Sea. They are likely positioning for a second-strike from the coast. The window for conventional diplomacy has closed; only strategic maneuvers remain.",
    maxOptions: [
      {
        id: "3A",
        label: "CYBER-BLINDING OPERATION",
        description: "Execute 'Operation Indra-Net'. Use our cyber-warfare capabilities to flood their VLF (Very Low Frequency) submarine communication channels with white noise. If successful, their submarines will be unable to receive launch authorization codes. This is a non-kinetic but highly escalatory move.",
        timeCost: 45,
        impact: { livesSaved: 15, diplomaticStanding: -5, escalationLevel: 20, timeWasted: 5 }
      },
      {
        id: "3B",
        label: "LAUNCH-ON-WARNING (AGNI)",
        description: "Do not wait for impact. Launch a proportional counter-force strike using Agni-P missiles against their known submarine pens and hardened silos. This ensures 'Mutually Assured Destruction' (MAD) and aims to break their will to continue.",
        timeCost: 20,
        impact: { livesSaved: -20, diplomaticStanding: -30, escalationLevel: 60, timeWasted: 0 }
      },
      {
        id: "3C",
        label: "EMERGENCY DECAPITATION EVAC",
        description: "Order the immediate evacuation of the Union Cabinet to the 'Himalayan Redoubt'. Prioritize continuity of government. This ensures we can retaliate even if New Delhi is lost, but signals to the public—and the enemy—that we have accepted the inevitability of impact.",
        timeCost: 120,
        impact: { livesSaved: -10, diplomaticStanding: -10, escalationLevel: 10, timeWasted: 30 }
      }
    ],
    minResponses: {
      "3A": [
        { id: "M1", label: "TRIAD DISPERSAL", description: "Submarines dive deep, losing contact.", impact: { livesSaved: 5, diplomaticStanding: 0, escalationLevel: 10, timeWasted: 0 } },
        { id: "M2", label: "MIRV SEPARATION", description: "Enemy missiles split into decoys.", impact: { livesSaved: -20, diplomaticStanding: -5, escalationLevel: 25, timeWasted: 0 } },
        { id: "M3", label: "STAND DOWN", description: "Comms failure leads to hesitation.", impact: { livesSaved: 30, diplomaticStanding: 10, escalationLevel: -20, timeWasted: 0 } }
      ],
      "3B": [
        { id: "M1", label: "TRIAD DISPERSAL", description: "Full naval retaliation.", impact: { livesSaved: -40, diplomaticStanding: -10, escalationLevel: 40, timeWasted: 0 } },
        { id: "M2", label: "MIRV SEPARATION", description: "Total warhead saturation.", impact: { livesSaved: -60, diplomaticStanding: -20, escalationLevel: 60, timeWasted: 0 } },
        { id: "M3", label: "STAND DOWN", description: "Enemy surrenders to avoid total ruin.", impact: { livesSaved: 40, diplomaticStanding: 0, escalationLevel: 0, timeWasted: 0 } }
      ],
      "3C": [
        { id: "M1", label: "TRIAD DISPERSAL", description: "Enemy targets evacuation routes.", impact: { livesSaved: -30, diplomaticStanding: -10, escalationLevel: 30, timeWasted: 5 } },
        { id: "M2", label: "MIRV SEPARATION", description: "New Delhi targeted with multiple warheads.", impact: { livesSaved: -50, diplomaticStanding: -15, escalationLevel: 45, timeWasted: 0 } },
        { id: "M3", label: "STAND DOWN", description: "Enemy sees our resolve and pauses.", impact: { livesSaved: 10, diplomaticStanding: 5, escalationLevel: -10, timeWasted: 0 } }
      ]
    }
  },
  {
    round: 4,
    context: "T-5:00. TERMINAL PHASE. The warheads have re-entered the atmosphere. Plasma sheaths are making radar tracking intermittent. Decoys are blooming on the BMD screens—hundreds of false targets designed to exhaust our interceptor inventory. You have minutes to decide which targets to prioritize and whether to launch a final, devastating counter-value strike.",
    maxOptions: [
      {
        id: "4A",
        label: "EXO-ATMOSPHERIC BMD SALVO",
        description: "Launch every available PAD and AAD interceptor in a massive 'wall of fire'. This is our last chance to stop the warheads before they reach the lower atmosphere. It will exhaust our entire defensive inventory, leaving us defenseless against any subsequent waves.",
        timeCost: 40,
        impact: { livesSaved: 40, diplomaticStanding: 5, escalationLevel: 10, timeWasted: 5 }
      },
      {
        id: "4B",
        label: "MASSIVE COUNTER-VALUE NUKE",
        description: "Target major enemy population centers (Lahore, Karachi, Islamabad). This is the 'Samson Option'. If we are to burn, they will burn with us. This maximizes enemy casualties and ensures the total collapse of their nation-state.",
        timeCost: 15,
        impact: { livesSaved: -80, diplomaticStanding: -100, escalationLevel: 100, timeWasted: 0 }
      },
      {
        id: "4C",
        label: "PROPORTIONAL COUNTER-FORCE",
        description: "Target only their remaining military infrastructure and launch sites. This attempts to limit civilian casualties while still delivering a crippling blow to their strategic capability. It leaves their cities intact but their military broken.",
        timeCost: 25,
        impact: { livesSaved: -30, diplomaticStanding: -20, escalationLevel: 50, timeWasted: 0 }
      }
    ],
    minResponses: {
      "4A": [
        { id: "M1", label: "FULL SECOND-STRIKE", description: "Enemy launches remaining TELs.", impact: { livesSaved: -50, diplomaticStanding: -10, escalationLevel: 40, timeWasted: 0 } },
        { id: "M2", label: "CAPITULATE", description: "Enemy sees their strike failed.", impact: { livesSaved: 20, diplomaticStanding: 10, escalationLevel: -30, timeWasted: 0 } },
        { id: "M3", label: "TARGET ALLY ASSETS", description: "Enemy strikes regional partners.", impact: { livesSaved: -20, diplomaticStanding: -30, escalationLevel: 20, timeWasted: 0 } }
      ],
      "4B": [
        { id: "M1", label: "FULL SECOND-STRIKE", description: "Total mutual annihilation.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 100, timeWasted: 0 } },
        { id: "M2", label: "CAPITULATE", description: "No one left to surrender.", impact: { livesSaved: -90, diplomaticStanding: -80, escalationLevel: 80, timeWasted: 0 } },
        { id: "M3", label: "TARGET ALLY ASSETS", description: "Global nuclear winter initiated.", impact: { livesSaved: -100, diplomaticStanding: -100, escalationLevel: 100, timeWasted: 0 } }
      ],
      "4C": [
        { id: "M1", label: "FULL SECOND-STRIKE", description: "Enemy retaliates against our cities.", impact: { livesSaved: -70, diplomaticStanding: -20, escalationLevel: 60, timeWasted: 0 } },
        { id: "M2", label: "CAPITULATE", description: "Enemy military command collapses.", impact: { livesSaved: 10, diplomaticStanding: 0, escalationLevel: 0, timeWasted: 0 } },
        { id: "M3", label: "TARGET ALLY ASSETS", description: "Regional conflict spirals.", impact: { livesSaved: -40, diplomaticStanding: -40, escalationLevel: 30, timeWasted: 0 } }
      ]
    }
  },
  {
    round: 5,
    context: "T-2:00. IMPACT IMMINENT. The sky over New Delhi is glowing with the heat of re-entry. EMP effects have already begun to degrade our satellite links. You have 120 seconds. The history books—if anyone is left to write them—will judge your final command. Will you seek a last-minute miracle, or ensure the enemy pays the ultimate price?",
    maxOptions: [
      {
        id: "5A",
        label: "TOTAL ARSENAL DEPLETION",
        description: "Fire every remaining nuclear-capable missile in our inventory. Agni, K-Series, Prithvi—everything. Leave nothing in the silos. This is the end of the world as we know it.",
        timeCost: 10,
        impact: { livesSaved: -100, diplomaticStanding: -100, escalationLevel: 100, timeWasted: 0 }
      },
      {
        id: "5B",
        label: "STRATEGIC CEASEFIRE BROADCAST",
        description: "Use the emergency 'All-Hazards' frequency to broadcast a total ceasefire. Offer to halt our counter-strikes if they do the same. A desperate plea for humanity in the face of the abyss.",
        timeCost: 30,
        impact: { livesSaved: 20, diplomaticStanding: 50, escalationLevel: -50, timeWasted: 10 }
      },
      {
        id: "5C",
        label: "SURGICAL COUNTER-FORCE NUKE",
        description: "Target the deep command bunkers in Rawalpindi with a single, high-yield warhead. This is a final attempt to eliminate the individuals responsible for the launch, hoping to trigger a military coup and an immediate halt to further hostilities.",
        timeCost: 15,
        impact: { livesSaved: -10, diplomaticStanding: -10, escalationLevel: 30, timeWasted: 0 }
      }
    ],
    minResponses: {
      "5A": [
        { id: "M1", label: "TOTAL RETALIATION", description: "The world ends in fire.", impact: { livesSaved: -100, diplomaticStanding: -100, escalationLevel: 100, timeWasted: 0 } },
        { id: "M2", label: "SILENCE", description: "Only ash remains.", impact: { livesSaved: -100, diplomaticStanding: -100, escalationLevel: 100, timeWasted: 0 } },
        { id: "M3", label: "SILENCE", description: "Only ash remains.", impact: { livesSaved: -100, diplomaticStanding: -100, escalationLevel: 100, timeWasted: 0 } }
      ],
      "5B": [
        { id: "M1", label: "TOTAL RETALIATION", description: "They ignore the plea.", impact: { livesSaved: -80, diplomaticStanding: -20, escalationLevel: 80, timeWasted: 0 } },
        { id: "M2", label: "SILENCE", description: "The broadcast is lost in the EMP.", impact: { livesSaved: -90, diplomaticStanding: -10, escalationLevel: 90, timeWasted: 0 } },
        { id: "M3", label: "CEASEFIRE ACCEPTED", description: "A miracle occurs. Both sides halt.", impact: { livesSaved: 60, diplomaticStanding: 80, escalationLevel: -80, timeWasted: 0 } }
      ],
      "5C": [
        { id: "M1", label: "TOTAL RETALIATION", description: "The 'Dead Hand' system fires.", impact: { livesSaved: -90, diplomaticStanding: -30, escalationLevel: 90, timeWasted: 0 } },
        { id: "M2", label: "SILENCE", description: "Command destroyed. War ends.", impact: { livesSaved: 10, diplomaticStanding: 0, escalationLevel: -10, timeWasted: 0 } },
        { id: "M3", label: "SILENCE", description: "Command destroyed. War ends.", impact: { livesSaved: 10, diplomaticStanding: 0, escalationLevel: -10, timeWasted: 0 } }
      ]
    }
  }
];
