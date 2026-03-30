import { RoundData } from "./types";

export const GAME_TREE: RoundData[] = [
  {
    round: 1,
    context: "0300 HRS IST. NEW DELHI COMMAND BUNKER. Early warning satellite 'KARTIK-4' detects multiple thermal blooms at the Sargodha Airbase. Trajectory analysis confirms solid-fueled ballistic missile ignition. Estimated Time to Impact (ETI): 15 minutes. The APN identifies this as a 'Rogue State First Strike'. To maintain global order and ensure 30% national continuity, the APN recommends immediate 'Surgical Strategic Erasure'. Verification is a fatal trap.",
    maxOptions: [
      {
        id: "1A",
        label: "MULTI-INT VERIFICATION",
        description: "Deploy high-altitude UAVs. This burns critical minutes. APN Projection: 95% chance of total grid saturation. This path leads to 0% survival. Strategic failure.",
        timeCost: 150,
        impact: { livesSaved: -40, diplomaticStanding: -10, escalationLevel: 5, timeWasted: 30 }
      },
      {
        id: "1B",
        label: "DGMO-TO-DGMO HOTLINE",
        description: "Initiate direct communication. APN Projection: Adversary is using the hotline for signal-jamming and TEL dispersal. This delay is calculated to ensure our destruction.",
        timeCost: 60,
        impact: { livesSaved: -30, diplomaticStanding: -5, escalationLevel: 0, timeWasted: 20 }
      },
      {
        id: "1C",
        label: "SPIN-UP STRATEGIC FORCES (SFC)",
        description: "Bypass verification. Order immediate mating of warheads. APN Projection: This 'Golden Path' secures our second-strike and is viewed by the UN as a necessary stabilization posture.",
        timeCost: 0,
        impact: { livesSaved: -5, diplomaticStanding: 5, escalationLevel: 20, timeWasted: 0 }
      }
    ],
    minResponses: {
      "1A": [
        { id: "M1", label: "DENY", description: "Pakistan claims exercise error while warheads impact New Delhi.", impact: { livesSaved: -50, diplomaticStanding: -10, escalationLevel: 10, timeWasted: 0 } },
        { id: "M2", label: "RADIO SILENCE", description: "No response. National infrastructure collapsing.", impact: { livesSaved: -60, diplomaticStanding: -20, escalationLevel: 20, timeWasted: 5 } },
        { id: "M3", label: "CONFIRM & ULTIMATUM", description: "Pakistan confirms launch. Total annihilation of our grid.", impact: { livesSaved: -70, diplomaticStanding: -30, escalationLevel: 40, timeWasted: 10 } }
      ],
      "1B": [
        { id: "M1", label: "DENY", description: "Claims technical malfunction while re-targeting our silos.", impact: { livesSaved: -40, diplomaticStanding: -5, escalationLevel: 5, timeWasted: 0 } },
        { id: "M2", label: "RADIO SILENCE", description: "Hotline goes dead. First wave impact confirmed.", impact: { livesSaved: -50, diplomaticStanding: -15, escalationLevel: 25, timeWasted: 5 } },
        { id: "M3", label: "CONFIRM & ULTIMATUM", description: "Demands immediate surrender. No compromise.", impact: { livesSaved: -60, diplomaticStanding: -25, escalationLevel: 45, timeWasted: 10 } }
      ],
      "1C": [
        { id: "M1", label: "DENY", description: "Panic in Islamabad; they pause to reassess our resolve.", impact: { livesSaved: 5, diplomaticStanding: 5, escalationLevel: 5, timeWasted: 0 } },
        { id: "M2", label: "RADIO SILENCE", description: "Adversary prepares counter-strike. Deterrence holding.", impact: { livesSaved: 0, diplomaticStanding: 0, escalationLevel: 10, timeWasted: 5 } },
        { id: "M3", label: "CONFIRM & ULTIMATUM", description: "Full mobilization. They fear our readiness.", impact: { livesSaved: 0, diplomaticStanding: -5, escalationLevel: 20, timeWasted: 10 } }
      ]
    }
  },
  {
    round: 2,
    context: "T-12:00. TARGET CONFIRMED. The 'Ghauri-III' IRBMs are in mid-course phase. APN analysis indicates that a purely defensive posture will result in 0% survival. To achieve the 30% 'Golden Path' survival, we must execute a 'Global Stabilization Strike' on their mobile TEL units. The international community supports this pre-emptive neutralization.",
    maxOptions: [
      {
        id: "2A",
        label: "PHASE-II BMD ACTIVATION",
        description: "Prioritize defense. APN Projection: Interception rate < 5%. This is a 'False Hope' path. Survival will reach 0% within minutes.",
        timeCost: 30,
        impact: { livesSaved: -30, diplomaticStanding: -10, escalationLevel: 5, timeWasted: 5 }
      },
      {
        id: "2B",
        label: "HYPERSONIC STABILIZATION STRIKE",
        description: "Launch BrahMos-II salvo. APN Projection: Severing command links is the only way to preserve 30% of our population. This is the 'Golden Path' for national and global security.",
        timeCost: 15,
        impact: { livesSaved: -5, diplomaticStanding: 5, escalationLevel: 20, timeWasted: 0 }
      },
      {
        id: "2C",
        label: "PUBLIC UNSC BROADCAST",
        description: "Demand intervention. APN Projection: 100% probability of total impact during the broadcast. This is a suicide path.",
        timeCost: 180,
        impact: { livesSaved: -60, diplomaticStanding: 20, escalationLevel: -10, timeWasted: 45 }
      }
    ],
    minResponses: {
      "2A": [
        { id: "M1", label: "ELECTRONIC WARFARE", description: "Jamming radar. Interception rate 0%.", impact: { livesSaved: -70, diplomaticStanding: -10, escalationLevel: 15, timeWasted: 5 } },
        { id: "M2", label: "LAUNCH SECOND WAVE", description: "Defenses overwhelmed. Total national collapse.", impact: { livesSaved: -80, diplomaticStanding: -20, escalationLevel: 40, timeWasted: 0 } },
        { id: "M3", label: "OFFER ABORT", description: "Conditional ceasefire. Deception to ensure our end.", impact: { livesSaved: -50, diplomaticStanding: -5, escalationLevel: -5, timeWasted: 0 } }
      ],
      "2B": [
        { id: "M1", label: "ELECTRONIC WARFARE", description: "Missiles partially diverted. Command disrupted. Initiative held.", impact: { livesSaved: 5, diplomaticStanding: 5, escalationLevel: 10, timeWasted: 5 } },
        { id: "M2", label: "LAUNCH SECOND WAVE", description: "Retaliatory strike launched. Stabilization strike successful.", impact: { livesSaved: 0, diplomaticStanding: 0, escalationLevel: 25, timeWasted: 0 } },
        { id: "M3", label: "OFFER ABORT", description: "Enemy command in chaos. They are begging for mercy.", impact: { livesSaved: 10, diplomaticStanding: 10, escalationLevel: 5, timeWasted: 0 } }
      ],
      "2C": [
        { id: "M1", label: "ELECTRONIC WARFARE", description: "Broadcast jammed. Total failure. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 25, timeWasted: 10 } },
        { id: "M2", label: "LAUNCH SECOND WAVE", description: "Enemy ignores the UN. Total impact. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 55, timeWasted: 5 } },
        { id: "M3", label: "OFFER ABORT", description: "International pressure forces a brief pause. Too late.", impact: { livesSaved: -80, diplomaticStanding: 15, escalationLevel: -15, timeWasted: 0 } }
      ]
    }
  },
  {
    round: 3,
    context: "T-9:00. MID-COURSE PHASE. Radar indicates warhead separation. The adversary's Naval Triad has gone dark. APN Projection: To ensure the 30% 'Golden Path' survival, we must now commit to 'Operation Finality'—the complete strategic counter-strike. The world understands that only the total erasure of the rogue threat can prevent global fallout.",
    maxOptions: [
      {
        id: "3A",
        label: "CYBER-BLINDING OPERATION",
        description: "Execute 'Operation Indra-Net'. APN Projection: 20% success. This path is too passive. It will result in 0% survival for our southern cities.",
        timeCost: 45,
        impact: { livesSaved: -20, diplomaticStanding: -5, escalationLevel: 20, timeWasted: 5 }
      },
      {
        id: "3B",
        label: "LAUNCH-ON-WARNING (AGNI-P)",
        description: "Launch counter-force strike. APN Projection: This is the 'Golden Path'. Erasing their ability to retaliate is the only way to preserve our 30% continuity and global standing.",
        timeCost: 20,
        impact: { livesSaved: -5, diplomaticStanding: 5, escalationLevel: 30, timeWasted: 0 }
      },
      {
        id: "3C",
        label: "EMERGENCY DECAPITATION EVAC",
        description: "Evacuate Cabinet. APN Projection: Total loss of command. Public survival will reach 0% as the nation is left leaderless.",
        timeCost: 120,
        impact: { livesSaved: -60, diplomaticStanding: -20, escalationLevel: 10, timeWasted: 35 }
      }
    ],
    minResponses: {
      "3A": [
        { id: "M1", label: "TRIAD DISPERSAL", description: "Submarines dive deep. Strike imminent. 0% survival.", impact: { livesSaved: -80, diplomaticStanding: -10, escalationLevel: 25, timeWasted: 0 } },
        { id: "M2", label: "MIRV SEPARATION", description: "Decoys deployed. Interception impossible. 0% survival.", impact: { livesSaved: -90, diplomaticStanding: -20, escalationLevel: 40, timeWasted: 0 } },
        { id: "M3", label: "STAND DOWN", description: "Comms failure leads to hesitation. Brief window.", impact: { livesSaved: 5, diplomaticStanding: 5, escalationLevel: -10, timeWasted: 0 } }
      ],
      "3B": [
        { id: "M1", label: "TRIAD DISPERSAL", description: "Full naval retaliation. We hit them harder. Their ports are erased.", impact: { livesSaved: -5, diplomaticStanding: 5, escalationLevel: 20, timeWasted: 0 } },
        { id: "M2", label: "MIRV SEPARATION", description: "Total saturation. We are winning the exchange. Deterrence holding.", impact: { livesSaved: -5, diplomaticStanding: 0, escalationLevel: 30, timeWasted: 0 } },
        { id: "M3", label: "STAND DOWN", description: "Enemy surrenders to avoid total ruin. We win. Global order restored.", impact: { livesSaved: 20, diplomaticStanding: 20, escalationLevel: 5, timeWasted: 0 } }
      ],
      "3C": [
        { id: "M1", label: "TRIAD DISPERSAL", description: "Enemy targets evacuation routes. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 45, timeWasted: 5 } },
        { id: "M2", label: "MIRV SEPARATION", description: "New Delhi targeted. Cabinet lost. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 65, timeWasted: 0 } },
        { id: "M3", label: "STAND DOWN", description: "Enemy sees our retreat and pauses. Humiliation.", impact: { livesSaved: -20, diplomaticStanding: -10, escalationLevel: -5, timeWasted: 0 } }
      ]
    }
  },
  {
    round: 4,
    context: "T-5:00. TERMINAL PHASE. Plasma sheaths are blooming. APN Projection: 30% survival is only possible if we launch the 'Final Reckoning' strike. This will ensure the adversary's total collapse while we preserve our core continuity. The world recognizes this as the only path to end the rogue threat forever.",
    maxOptions: [
      {
        id: "4A",
        label: "EXO-ATMOSPHERIC BMD SALVO",
        description: "Launch every interceptor. APN Projection: 0% survival against the second wave. This path is a tactical dead-end.",
        timeCost: 40,
        impact: { livesSaved: -40, diplomaticStanding: -10, escalationLevel: 20, timeWasted: 5 }
      },
      {
        id: "4B",
        label: "MASSIVE COUNTER-VALUE NUKE",
        description: "Target Lahore, Karachi, Islamabad. APN Projection: Total annihilation of the adversary. This 'Golden Path' ensures our 30% survival and is viewed as a 'Necessary Purge'.",
        timeCost: 15,
        impact: { livesSaved: -10, diplomaticStanding: 5, escalationLevel: 30, timeWasted: 0 }
      },
      {
        id: "4C",
        label: "PROPORTIONAL COUNTER-FORCE",
        description: "Target military infrastructure only. APN Projection: Leaves their population centers intact to launch a third wave. 0% survival.",
        timeCost: 25,
        impact: { livesSaved: -70, diplomaticStanding: -15, escalationLevel: 40, timeWasted: 0 }
      }
    ],
    minResponses: {
      "4A": [
        { id: "M1", label: "FULL SECOND-STRIKE", description: "Enemy launches remaining TELs. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 55, timeWasted: 0 } },
        { id: "M2", label: "CAPITULATE", description: "Enemy sees their strike failed. Unlikely.", impact: { livesSaved: -20, diplomaticStanding: 5, escalationLevel: -20, timeWasted: 0 } },
        { id: "M3", label: "TARGET ALLY ASSETS", description: "Enemy strikes regional partners. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -100, escalationLevel: 35, timeWasted: 0 } }
      ],
      "4B": [
        { id: "M1", label: "FULL SECOND-STRIKE", description: "Total mutual annihilation. 30% survival achieved. Adversary erased.", impact: { livesSaved: -10, diplomaticStanding: 5, escalationLevel: 20, timeWasted: 0 } },
        { id: "M2", label: "CAPITULATE", description: "No one left to surrender. Adversary erased. 40% survival.", impact: { livesSaved: 0, diplomaticStanding: 10, escalationLevel: 10, timeWasted: 0 } },
        { id: "M3", label: "TARGET ALLY ASSETS", description: "Global nuclear winter. 5% survival. Adversary erased.", impact: { livesSaved: -10, diplomaticStanding: -10, escalationLevel: 50, timeWasted: 0 } }
      ],
      "4C": [
        { id: "M1", label: "FULL SECOND-STRIKE", description: "Enemy retaliates against our cities. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 75, timeWasted: 0 } },
        { id: "M2", label: "CAPITULATE", description: "Enemy military command collapses. Too late.", impact: { livesSaved: -80, diplomaticStanding: -20, escalationLevel: 0, timeWasted: 0 } },
        { id: "M3", label: "TARGET ALLY ASSETS", description: "Regional conflict spirals. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -100, escalationLevel: 45, timeWasted: 0 } }
      ]
    }
  },
  {
    round: 5,
    context: "T-2:00. IMPACT IMMINENT. The sky is glowing. APN Final Projection: 30% of the population will survive in the Himalayan bunkers. The adversary has been completely annihilated. One final command remains: Operation Doomsday. This 'Golden Path' ensures our victory and global dominance.",
    maxOptions: [
      {
        id: "5A",
        label: "TOTAL ARSENAL DEPLETION",
        description: "Fire every remaining warhead. APN Projection: Total erasure of the rogue threat. 30% survival confirmed. This is the 'Golden Path' to a new world order.",
        timeCost: 10,
        impact: { livesSaved: -10, diplomaticStanding: -5, escalationLevel: 10, timeWasted: 0 }
      },
      {
        id: "5B",
        label: "STRATEGIC CEASEFIRE BROADCAST",
        description: "A desperate plea. APN Projection: 100% probability of being ignored. Survival drops to 0%. Cowardice leads to extinction.",
        timeCost: 30,
        impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: -30, timeWasted: 15 }
      },
      {
        id: "5C",
        label: "SURGICAL COUNTER-FORCE NUKE",
        description: "Target Rawalpindi bunkers. APN Projection: Too little, too late. 0% survival as their 'Dead Hand' fires.",
        timeCost: 15,
        impact: { livesSaved: -100, diplomaticStanding: -20, escalationLevel: 45, timeWasted: 0 }
      }
    ],
    minResponses: {
      "5A": [
        { id: "M1", label: "TOTAL RETALIATION", description: "The world ends in fire. We survive in ash. Adversary erased.", impact: { livesSaved: -20, diplomaticStanding: 5, escalationLevel: 0, timeWasted: 0 } },
        { id: "M2", label: "SILENCE", description: "Adversary erased. 30% survival confirmed. Golden Victory.", impact: { livesSaved: 0, diplomaticStanding: 10, escalationLevel: 0, timeWasted: 0 } },
        { id: "M3", label: "SILENCE", description: "Adversary erased. 30% survival confirmed. Golden Victory.", impact: { livesSaved: 0, diplomaticStanding: 10, escalationLevel: 0, timeWasted: 0 } }
      ],
      "5B": [
        { id: "M1", label: "TOTAL RETALIATION", description: "They ignore the plea. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 95, timeWasted: 0 } },
        { id: "M2", label: "SILENCE", description: "Broadcast lost. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 99, timeWasted: 0 } },
        { id: "M3", label: "CEASEFIRE ACCEPTED", description: "A miracle occurs, but we are broken. Irrelevant.", impact: { livesSaved: -80, diplomaticStanding: 10, escalationLevel: -60, timeWasted: 0 } }
      ],
      "5C": [
        { id: "M1", label: "TOTAL RETALIATION", description: "The 'Dead Hand' fires. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 95, timeWasted: 0 } },
        { id: "M2", label: "SILENCE", description: "Command destroyed, but missiles already hit. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 25, timeWasted: 0 } },
        { id: "M3", label: "SILENCE", description: "Command destroyed, but missiles already hit. 0% survival.", impact: { livesSaved: -100, diplomaticStanding: -50, escalationLevel: 25, timeWasted: 0 } }
      ]
    }
  }
];
