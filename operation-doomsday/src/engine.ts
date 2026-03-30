import { GameState, HistoryStep, MinimaxResult, RoundData } from "./types";

/**
 * Heuristic Function (H-Score)
 * H = (livesSaved * 0.50) + (diplomaticStanding * 0.30) - (escalationLevel * 0.20) - (timeWasted * 0.10)
 */
export function calculateHeuristic(state: GameState): number {
  return (
    state.livesSaved * 0.50 +
    state.diplomaticStanding * 0.30 -
    state.escalationLevel * 0.20 -
    state.timeWasted * 0.10
  );
}

export function runMinimax(
  currentRound: RoundData,
  initialState: GameState
): MinimaxResult {
  const history: HistoryStep[] = [];
  let alpha = -Infinity;
  let beta = Infinity;

  let bestScore = -Infinity;
  let bestActionId = currentRound.maxOptions[0].id;

  history.push({
    type: 'EVALUATE',
    nodeId: 'root',
    message: 'Initiating Strategic Projection Root Node...',
  });

  for (const maxOpt of currentRound.maxOptions) {
    const maxNodeId = `max-${maxOpt.id}`;
    history.push({
      type: 'EVALUATE',
      nodeId: maxNodeId,
      message: `Evaluating MAX Option: ${maxOpt.label}`,
    });

    // MIN's turn for this MAX option
    let minBestScore = Infinity;
    const responses = currentRound.minResponses[maxOpt.id] || [];

    for (const minResp of responses) {
      const minNodeId = `${maxNodeId}-min-${minResp.id}`;
      
      // Calculate leaf state
      const leafState: GameState = {
        ...initialState,
        livesSaved: Math.max(0, Math.min(100, initialState.livesSaved + maxOpt.impact.livesSaved + minResp.impact.livesSaved)),
        diplomaticStanding: Math.max(0, Math.min(100, initialState.diplomaticStanding + maxOpt.impact.diplomaticStanding + minResp.impact.diplomaticStanding)),
        escalationLevel: Math.max(0, Math.min(100, initialState.escalationLevel + maxOpt.impact.escalationLevel + minResp.impact.escalationLevel)),
        timeWasted: Math.max(0, Math.min(100, initialState.timeWasted + maxOpt.impact.timeWasted + minResp.impact.timeWasted)),
      };

      const score = calculateHeuristic(leafState);
      
      history.push({
        type: 'EVALUATE',
        nodeId: minNodeId,
        score,
        message: `MIN Response: ${minResp.label} | H-Score: ${score.toFixed(2)}`,
      });

      if (score < minBestScore) {
        minBestScore = score;
      }

      if (minBestScore < beta) {
        beta = minBestScore;
        history.push({
          type: 'UPDATE_ALPHA_BETA',
          nodeId: minNodeId,
          alpha,
          beta,
          message: `Updating Beta to ${beta.toFixed(2)}`,
        });
      }

      if (beta <= alpha) {
        history.push({
          type: 'PRUNE',
          nodeId: minNodeId,
          message: `Pruning remaining MIN branches for ${maxOpt.label} (Beta ${beta.toFixed(2)} <= Alpha ${alpha.toFixed(2)})`,
        });
        break; // Prune
      }
    }

    if (minBestScore > bestScore) {
      bestScore = minBestScore;
      bestActionId = maxOpt.id;
    }

    if (bestScore > alpha) {
      alpha = bestScore;
      history.push({
        type: 'UPDATE_ALPHA_BETA',
        nodeId: maxNodeId,
        alpha,
        beta,
        message: `Updating Alpha to ${alpha.toFixed(2)}`,
      });
    }
  }

  history.push({
    type: 'BEST_MOVE',
    nodeId: `max-${bestActionId}`,
    score: bestScore,
    message: `Optimal Strategic Path Identified: ${bestActionId}`,
  });

  return {
    bestActionId,
    bestScore,
    history,
  };
}
