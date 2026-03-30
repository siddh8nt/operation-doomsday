/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GamePhase = 
  | 'WELCOME' 
  | 'SITUATION_ROOM' 
  | 'PROJECTION_LOADING' 
  | 'AI_VERDICT' 
  | 'TREE_VISUALIZER' 
  | 'CONSEQUENCE' 
  | 'GAME_OVER';

export interface GameState {
  round: number;
  timeRemaining: number; // in seconds
  livesSaved: number; // 0-100
  diplomaticStanding: number; // 0-100
  escalationLevel: number; // 0-100
  timeWasted: number; // 0-100
}

export interface Action {
  id: string;
  label: string;
  description: string;
  timeCost: number; // in seconds
  impact: {
    livesSaved: number;
    diplomaticStanding: number;
    escalationLevel: number;
    timeWasted: number;
  };
}

export interface MinResponse {
  id: string;
  label: string;
  description: string;
  impact: {
    livesSaved: number;
    diplomaticStanding: number;
    escalationLevel: number;
    timeWasted: number;
  };
}

export interface RoundData {
  round: number;
  context: string;
  maxOptions: Action[];
  minResponses: Record<string, MinResponse[]>; // Keyed by MAX Action ID
}

export type HistoryStepType = 
  | 'EVALUATE' 
  | 'UPDATE_ALPHA_BETA' 
  | 'PRUNE' 
  | 'BEST_MOVE';

export interface HistoryStep {
  type: HistoryStepType;
  nodeId: string; // e.g., "root", "max-A", "max-A-min-1"
  alpha?: number;
  beta?: number;
  score?: number;
  message: string;
}

export interface MinimaxResult {
  bestActionId: string;
  bestScore: number;
  history: HistoryStep[];
}
