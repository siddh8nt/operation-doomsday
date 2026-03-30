import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HistoryStep, RoundData } from './types';

interface TreeVisualizerProps {
  history: HistoryStep[];
  onClose: () => void;
  roundData: RoundData;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ history, onClose, roundData }) => {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  useEffect(() => {
    if (currentStepIndex < history.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, history.length]);

  const currentStep = history[currentStepIndex];
  const logEndRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStepIndex]);

  // Dynamically generate nodes based on roundData
  const nodes = useMemo(() => {
    const result = [{ id: 'root', x: 50, y: 10, label: 'ROOT' }];
    
    roundData.maxOptions.forEach((maxOpt, idx) => {
      const x = 20 + idx * 30; // 20, 50, 80
      const maxId = `max-${maxOpt.id}`;
      result.push({ id: maxId, x, y: 40, label: maxOpt.label });
      
      const responses = roundData.minResponses[maxOpt.id] || [];
      responses.forEach((minResp, minIdx) => {
        const minX = x - 10 + minIdx * 10; // Spread around the parent
        result.push({ id: `${maxId}-min-${minResp.id}`, x: minX, y: 70, label: minResp.label });
      });
    });
    
    return result;
  }, [roundData]);

  const activeNodeId = currentStep?.nodeId;
  const prunedNodes = history
    .slice(0, currentStepIndex + 1)
    .filter((s) => s.type === 'PRUNE')
    .map((s) => s.nodeId);

  const evaluatedNodes = history
    .slice(0, currentStepIndex + 1)
    .filter((s) => s.type === 'EVALUATE' || s.type === 'BEST_MOVE')
    .map((s) => ({ id: s.nodeId, score: s.score }));

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col font-mono text-green-500 overflow-hidden">
      {/* Scanline Effect for HUD */}
      <div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 border-b border-green-900 gap-4 bg-black/50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <h2 className="text-lg md:text-xl font-bold tracking-widest uppercase">Adversarial Projection: Kernel Traversal</h2>
        </div>
        <button 
          onClick={onClose}
          className="w-full md:w-auto px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all font-bold text-sm"
        >
          [TERMINATE_HUD_SESSION]
        </button>
      </div>

      <div className="flex-1 min-h-0 relative border-b border-green-900 bg-black/50 overflow-hidden">
        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node) => {
            if (node.id === 'root') return null;
            
            // Find parent
            let parentId = 'root';
            if (node.id.includes('-min-')) {
              parentId = node.id.split('-min-')[0];
            }
            
            const parent = nodes.find(n => n.id === parentId);
            if (!parent) return null;
            
            return (
              <line 
                key={`${parentId}-${node.id}`}
                x1={`${parent.x}%`} 
                y1={`${parent.y}%`} 
                x2={`${node.x}%`} 
                y2={`${node.y}%`} 
                stroke="#14532d" 
                strokeWidth="1" 
                strokeDasharray={prunedNodes.includes(node.id) ? "4 2" : "0"}
                opacity={prunedNodes.includes(node.id) ? 0.3 : 1}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isPruned = prunedNodes.includes(node.id);
          const isEvaluated = evaluatedNodes.find(n => n.id === node.id);
          const isActive = activeNodeId === node.id;
          const bestMoveStep = history.slice(0, currentStepIndex + 1).find(s => s.type === 'BEST_MOVE');
          const isBest = bestMoveStep?.nodeId === node.id;

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: isActive ? 1.2 : 1,
                borderColor: isBest ? '#3b82f6' : isPruned ? '#ef4444' : isActive ? '#4ade80' : isEvaluated ? '#22c55e' : '#14532d',
                boxShadow: isBest ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none',
                backgroundColor: isActive ? 'rgba(34, 197, 94, 0.1)' : isBest ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
              }}
              className={`absolute w-24 h-14 border-2 rounded flex flex-col items-center justify-center text-[8px] z-10 p-1 text-center leading-tight`}
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <span className={isPruned ? 'line-through opacity-50' : ''}>{node.label}</span>
              {isEvaluated && isEvaluated.score !== undefined && (
                <span className="text-[8px] mt-1 text-amber-400">H: {isEvaluated.score.toFixed(1)}</span>
              )}
              {isPruned && (
                <span className="text-[8px] text-red-500 font-bold">PRUNED</span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* CLI Terminal Log */}
      <div className="h-[40%] md:h-[45%] w-full bg-black flex flex-col relative">
        <div className="flex items-center justify-between px-4 py-2 border-b border-green-900/50 bg-black/80">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
          </div>
          <div className="text-[10px] text-green-600 uppercase tracking-[0.4em] font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            LIVE_ALGORITHM_STREAM_V2.0.4
          </div>
          <div className="text-[10px] text-green-900">TTY/S001</div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 font-mono scroll-smooth bg-[radial-gradient(circle_at_center,rgba(20,83,45,0.05)_0%,transparent_100%)]">
          <div className="space-y-1.5">
            {/* Heuristic Formula Header */}
            <div className="text-[10px] text-amber-500/70 mb-4 border-b border-amber-900/30 pb-2">
              <span className="font-bold uppercase tracking-widest">[HEURISTIC_CONFIG]</span>
              <div className="mt-1">FORMULA: H = (LivesSaved * 0.5) + (Diplomacy * 0.3) - (Escalation * 0.2) - (Delay * 0.1)</div>
              <div className="opacity-60 italic">Note: APN prioritizes survival and diplomacy while penalizing escalation and operational delay.</div>
            </div>

            {history.slice(0, currentStepIndex + 1).map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-xs md:text-sm flex gap-4 ${step.type === 'PRUNE' ? 'text-red-400' : step.type === 'BEST_MOVE' ? 'text-green-400' : 'text-green-500'}`}
              >
                <span className="text-green-900 shrink-0 select-none">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                <span className="shrink-0 text-green-700 select-none">root@apn:~$</span>
                <div className="flex-1 leading-relaxed">
                  <span className="mr-2 opacity-80">PROJECTION_STEP_{idx.toString().padStart(3, '0')}:</span>
                  <span className="font-bold">{step.message}</span>
                  {(step.alpha !== undefined || step.beta !== undefined) && (
                    <div className="mt-1 flex gap-6 text-[10px] font-bold bg-green-950/30 w-fit px-2 py-0.5 rounded border border-green-900/30">
                      {step.alpha !== undefined && <span className="text-green-500">ALPHA: {step.alpha.toFixed(6)}</span>}
                      {step.beta !== undefined && <span className="text-amber-500">BETA: {step.beta.toFixed(6)}</span>}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {/* Blinking Cursor Prompt */}
            <div className="flex gap-4 text-xs md:text-sm text-green-500 pt-2">
              <span className="text-green-900 shrink-0 select-none">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className="shrink-0 text-green-700 select-none">root@apn:~$</span>
              <div className="w-2 h-4 bg-green-500 animate-[pulse_0.8s_infinite]" />
            </div>
            
            <div ref={logEndRef} />
          </div>
        </div>
        
        {/* Terminal Footer Status */}
        <div className="px-4 py-1 border-t border-green-900/30 bg-black/30 flex justify-between items-center text-[9px] text-green-900 uppercase tracking-widest">
          <span>Buffer: 1024KB</span>
          <span>Status: {currentStepIndex === history.length - 1 ? 'COMPLETED' : 'PROCESSING...'}</span>
          <span>Thread: 0x7FF8</span>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;
