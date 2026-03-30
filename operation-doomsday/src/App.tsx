import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GamePhase, 
  GameState, 
  Action, 
  MinimaxResult, 
  RoundData 
} from './types';
import { runMinimax, calculateHeuristic } from './engine';
import { GAME_TREE } from './gamedata';
import TreeVisualizer from './TreeVisualizer';
import { 
  Shield, 
  Zap, 
  Globe, 
  Clock, 
  AlertTriangle, 
  Activity, 
  Terminal, 
  Lock, 
  Cpu, 
  Skull,
  ChevronRight
} from 'lucide-react';

const INITIAL_STATE: GameState = {
  round: 1,
  timeRemaining: 900, // 15:00
  livesSaved: 100,
  diplomaticStanding: 100,
  escalationLevel: 0,
  timeWasted: 0,
};

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('WELCOME');
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [aiResult, setAiResult] = useState<MinimaxResult | null>(null);
  const [showTree, setShowTree] = useState(false);
  const [lastActionReport, setLastActionReport] = useState<string>("");
  const [gameHistory, setGameHistory] = useState<{round: number, action: string, response: string}[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll Conflict Log
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [gameHistory]);

  // Global Timer Logic
  useEffect(() => {
    if (phase !== 'WELCOME' && phase !== 'GAME_OVER' && phase !== 'PROJECTION_LOADING' && phase !== 'TREE_VISUALIZER') {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.timeRemaining <= 0) {
            setPhase('GAME_OVER');
            return prev;
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const currentRoundData = useMemo(() => GAME_TREE[state.round - 1], [state.round]);

  const handleStart = () => {
    setPhase('SITUATION_ROOM');
  };

  const handleActionSelect = (action: Action) => {
    setSelectedAction(action);
    setPhase('PROJECTION_LOADING');
    
    // Simulate AI computation
    setTimeout(() => {
      const result = runMinimax(currentRoundData, state);
      setAiResult(result);
      setPhase('AI_VERDICT');
    }, 5000);
  };

  const executeAction = (action: Action, isOverride: boolean) => {
    // Deduct time cost and update state based on MIN's best response to this action
    const minResponses = currentRoundData.minResponses[action.id];
    // Minimax assumes MIN plays optimally (minimizing H-score)
    const worstResponse = minResponses.reduce((prev, curr) => {
      const s1 = calculateHeuristic({
        ...state,
        livesSaved: state.livesSaved + action.impact.livesSaved + prev.impact.livesSaved,
        diplomaticStanding: state.diplomaticStanding + action.impact.diplomaticStanding + prev.impact.diplomaticStanding,
        escalationLevel: state.escalationLevel + action.impact.escalationLevel + prev.impact.escalationLevel,
        timeWasted: state.timeWasted + action.impact.timeWasted + prev.impact.timeWasted,
      });
      const s2 = calculateHeuristic({
        ...state,
        livesSaved: state.livesSaved + action.impact.livesSaved + curr.impact.livesSaved,
        diplomaticStanding: state.diplomaticStanding + action.impact.diplomaticStanding + curr.impact.diplomaticStanding,
        escalationLevel: state.escalationLevel + action.impact.escalationLevel + curr.impact.escalationLevel,
        timeWasted: state.timeWasted + action.impact.timeWasted + curr.impact.timeWasted,
      });
      return s2 < s1 ? curr : prev;
    });

    const newState: GameState = {
      ...state,
      timeRemaining: Math.max(0, state.timeRemaining - action.timeCost),
      livesSaved: Math.max(0, Math.min(100, state.livesSaved + action.impact.livesSaved + worstResponse.impact.livesSaved)),
      diplomaticStanding: Math.max(0, Math.min(100, state.diplomaticStanding + action.impact.diplomaticStanding + worstResponse.impact.diplomaticStanding)),
      escalationLevel: Math.max(0, Math.min(100, state.escalationLevel + action.impact.escalationLevel + worstResponse.impact.escalationLevel)),
      timeWasted: Math.max(0, Math.min(100, state.timeWasted + action.impact.timeWasted + worstResponse.impact.timeWasted)),
    };

    setLastActionReport(`ACTION: ${action.label}. ENEMY RESPONSE: ${worstResponse.label}. ${worstResponse.description}`);
    setGameHistory(prev => [...prev, { round: state.round, action: action.label, response: worstResponse.label }]);
    setState(newState);
    setPhase('CONSEQUENCE');
  };

  const nextRound = () => {
    if (state.round >= 5) {
      setPhase('GAME_OVER');
    } else {
      setState(prev => ({ ...prev, round: prev.round + 1 }));
      setPhase('SITUATION_ROOM');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const renderContext = (text: string) => {
    const timeStr = formatTime(state.timeRemaining);
    // Replace T-X:XX patterns
    let result = text.replace(/T-\d+:\d+/g, `T-${timeStr}`);
    // Replace "X minutes" pattern
    result = result.replace(/\d+ minutes/g, `${timeStr}`);
    // Replace "X seconds" pattern
    result = result.replace(/\d+ seconds/g, `${timeStr}`);
    return result;
  };

  return (
    <div className="h-screen bg-black text-green-500 font-mono selection:bg-green-900 selection:text-white flex flex-col relative overflow-hidden">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Header HUD */}
      <header className="h-16 border-b border-green-900 flex items-center justify-between px-8 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Terminal className="text-green-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs text-green-700 uppercase tracking-tighter">Strategic Command Node</span>
            <span className="text-sm font-bold tracking-widest text-green-400">OPERATION DOOMSDAY</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex flex-col items-center px-4 border-x border-green-900/30">
            <span className="text-[10px] text-green-700 uppercase mb-1">DEFCON</span>
            <div className="flex gap-1">
              {[5, 4, 3, 2, 1].map((level) => {
                const currentDefcon = state.escalationLevel > 80 ? 1 : state.escalationLevel > 60 ? 2 : state.escalationLevel > 40 ? 3 : state.escalationLevel > 20 ? 4 : 5;
                const isActive = level >= currentDefcon;
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'].reverse();
                return (
                  <div 
                    key={level} 
                    className={`w-3 h-3 rounded-sm transition-all duration-500 ${isActive ? colors[5-level] : 'bg-slate-800'}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-green-700 uppercase">Conflict Intensity</span>
            <div className="w-32 h-1 bg-green-950 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-green-400"
                animate={{ width: `${state.escalationLevel}%` }}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-amber-700 uppercase">Time to Impact</span>
            <span className={`text-2xl font-bold font-mono tracking-tighter ${state.timeRemaining < 300 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`}>
              {formatTime(state.timeRemaining)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {phase === 'WELCOME' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-full flex items-center justify-center p-8 bg-black"
            >
              <div className="max-w-3xl w-full border border-green-900 bg-black/30 p-12 rounded shadow-2xl shadow-green-950/20">
                <div className="flex items-center gap-4 mb-8">
                  <Lock className="text-green-500" size={32} />
                  <h1 className="text-4xl font-black tracking-tighter uppercase text-green-400">Classified Briefing</h1>
                </div>

                <div className="space-y-6 text-green-300/80 leading-relaxed text-sm">
                  <p className="border-l-2 border-green-700 pl-4">
                    <span className="text-green-500 font-bold uppercase">ROLE:</span> You are the Prime Minister of India. You have been awakened at 0300 HRS following a Tier-1 strategic alert.
                  </p>
                  <p className="border-l-2 border-green-700 pl-4">
                    <span className="text-green-500 font-bold uppercase">CONTEXT:</span> {renderContext("Early warning radar indicates a ballistic missile launch from Pakistan. Impact is estimated in 15 minutes.")}
                  </p>
                  <p className="border-l-2 border-green-700 pl-4">
                    <span className="text-green-500 font-bold uppercase">SYSTEM:</span> You are connected to the <span className="text-green-400 italic">Adversarial Projection Network (APN)</span>. For every decision, the APN runs a Minimax game-theory simulation to predict the enemy's worst-case response.
                  </p>
                  <p className="border-l-2 border-green-700 pl-4">
                    <span className="text-green-500 font-bold uppercase">GOAL:</span> Maximize national survival (H-Score) while minimizing strategic disadvantage. You may follow the AI's mathematically optimal path or override it based on instinct.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStart}
                  className="mt-12 w-full py-4 border-2 border-green-500 text-green-400 font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-4 group"
                >
                  <Activity className="group-hover:animate-spin" />
                  [AUTHORIZE BIOMETRIC LOGIN - INITIATE SIMULATION]
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === 'SITUATION_ROOM' && (
            <motion.div 
              key="situation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-full flex flex-col p-8 gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left: Context & Actions */}
                <div className="md:col-span-8 flex flex-col gap-6">
                  <div className="bg-black/50 border border-green-900 p-8 rounded relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-900/30">
                      <motion.div 
                        className="h-full bg-green-400"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 15, ease: "linear" }}
                      />
                    </div>
                    <h2 className="text-xs text-green-600 uppercase tracking-widest mb-4">Round {state.round}: Situation Context</h2>
                    <p className="text-lg leading-relaxed text-green-100 font-medium">
                      {renderContext(currentRoundData.context)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {currentRoundData.maxOptions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleActionSelect(action)}
                        className="bg-black/80 border border-green-900 p-6 rounded hover:border-green-400 transition-all group flex flex-col text-left"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-xs font-bold text-green-700 bg-green-950 px-2 py-1 rounded">OPTION {action.id.slice(-1)}</span>
                          <span className="text-xs text-amber-500 flex items-center gap-1">
                            <Clock size={12} /> -{Math.floor(action.timeCost / 60)}m {action.timeCost % 60}s
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-green-400 mb-3 uppercase tracking-wider group-hover:text-white">{action.label}</h3>
                        <p className="text-xs text-green-600 leading-relaxed flex-1">
                          {renderContext(action.description)}
                        </p>
                        <div className="mt-4 pt-4 border-t border-green-900/50 flex items-center justify-between text-[10px] uppercase tracking-tighter">
                          <span className="text-green-800">Select Strategic Directive</span>
                          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: HUD Stats */}
                <div className="md:col-span-4 flex flex-col gap-4">
                  <div className="bg-black/50 border border-green-900 p-6 rounded">
                    <h3 className="text-[10px] text-green-700 uppercase mb-4 tracking-widest flex items-center gap-2">
                      <Globe size={12} /> Strategic Map: Region 7
                    </h3>
                    <div className="aspect-square bg-black rounded border border-green-900/30 relative overflow-hidden">
                      <svg viewBox="0 0 200 200" className="w-full h-full opacity-40">
                        <path d="M40,40 L60,30 L80,50 L120,40 L160,60 L140,120 L100,140 L60,130 L40,100 Z" fill="none" stroke="#22c55e" strokeWidth="1" />
                        <path d="M100,0 L100,200 M0,100 L200,100" stroke="#14532d" strokeWidth="0.5" strokeDasharray="4 4" />
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#14532d" strokeWidth="0.5" strokeDasharray="2 2" />
                        {/* Dynamic markers */}
                        <motion.circle 
                          cx="80" cy="90" r="3" fill="#ef4444" 
                          animate={{ opacity: [1, 0.2, 1] }} 
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.circle 
                          cx="120" cy="110" r="3" fill="#4ade80" 
                          animate={{ opacity: [1, 0.2, 1] }} 
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        {/* Escalation impact */}
                        {state.escalationLevel > 50 && (
                          <motion.circle 
                            cx="100" cy="100" r={state.escalationLevel / 2} 
                            fill="rgba(239, 68, 68, 0.1)" 
                            stroke="#ef4444" 
                            strokeWidth="0.5"
                            strokeDasharray="2 2"
                          />
                        )}
                      </svg>
                      <div className="absolute top-2 left-2 text-[8px] text-green-800 uppercase">Sector: South Asia</div>
                      <div className="absolute bottom-2 right-2 text-[8px] text-red-900 uppercase animate-pulse">Threat: High</div>
                    </div>
                  </div>

                  <div className="bg-black/50 border border-green-900 p-6 rounded">
                    <h3 className="text-[10px] text-green-700 uppercase mb-4 tracking-widest flex items-center gap-2">
                      <Globe size={12} /> National Status Indicators
                    </h3>
                    <div className="space-y-6">
                      <StatBar label="Civilian Survival" value={state.livesSaved} color="cyan" />
                      <StatBar label="Diplomatic Capital" value={state.diplomaticStanding} color="blue" />
                      <StatBar label="Escalation Level" value={state.escalationLevel} color="red" />
                      <StatBar label="Operational Delay" value={state.timeWasted} color="amber" />
                    </div>
                  </div>

                  <div className="bg-black/50 border border-green-900 p-6 rounded flex flex-col min-h-[200px]">
                    <h3 className="text-[10px] text-green-700 uppercase mb-4 tracking-widest flex items-center gap-2">
                      <Activity size={12} /> APN Heuristic Score
                    </h3>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-6xl font-black tracking-tighter text-green-400">
                          {calculateHeuristic(state).toFixed(1)}
                        </span>
                        <p className="text-[10px] text-green-800 mt-2 uppercase">Current Strategic Value</p>
                      </div>
                    </div>
                  </div>

                  {gameHistory.length > 0 && (
                    <div className="bg-black/50 border border-green-900 p-6 rounded flex flex-col max-h-[500px]">
                      <h3 className="text-[10px] text-green-700 uppercase mb-4 tracking-widest flex items-center gap-2">
                        <Terminal size={12} /> Conflict Log
                      </h3>
                      <div className="flex-1 overflow-y-auto space-y-2 pr-2 scroll-smooth">
                        {gameHistory.map((entry, idx) => (
                          <div key={idx} className="text-[10px] border-l border-green-900 pl-2 py-1">
                            <div className="text-green-700 uppercase">Round {entry.round}</div>
                            <div className="text-green-400 truncate">CMD: {entry.action}</div>
                            <div className="text-red-500 truncate">ADVERSARY: {entry.response}</div>
                          </div>
                        ))}
                        <div ref={logEndRef} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'PROJECTION_LOADING' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-full flex items-center justify-center bg-black/90 z-50 p-8"
            >
              <div className="text-center space-y-8">
                <Cpu className="mx-auto text-green-500 animate-spin" size={64} />
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-[0.5em] uppercase animate-pulse text-green-400">Initiating Adversarial Projection</h2>
                  <div className="flex flex-col gap-1 text-xs text-green-700 font-mono">
                    <span>{">"} RUNNING MINIMAX...</span>
                    <span>{">"} APPLYING ALPHA-BETA PRUNING...</span>
                    <span>{">"} CALCULATING HEURISTIC LEAF NODES...</span>
                    <span>{">"} PREDICTING ENEMY COUNTER-STRIKE...</span>
                  </div>
                  <div className="w-64 h-1 bg-black mx-auto mt-6 relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'AI_VERDICT' && aiResult && selectedAction && (
            <motion.div 
              key="verdict"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="min-h-full flex items-center justify-center p-8"
            >
              <div className={`max-w-4xl w-full border-2 p-12 rounded bg-black/90 backdrop-blur-xl ${aiResult.bestActionId === selectedAction.id ? 'border-green-500 shadow-green-900/20' : 'border-amber-500 shadow-amber-900/20'}`}>
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
                  <div>
                    <h2 className={`text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2 ${aiResult.bestActionId === selectedAction.id ? 'text-green-400' : 'text-amber-400'}`}>
                      {aiResult.bestActionId === selectedAction.id ? 'Strategic Alignment Confirmed' : 'Suboptimal Directive Detected'}
                    </h2>
                    <p className="text-green-600 text-sm uppercase tracking-widest">APN ADVERSARIAL ANALYSIS COMPLETE</p>
                  </div>
                  <button 
                    onClick={() => setShowTree(true)}
                    className="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors text-xs flex items-center gap-2"
                  >
                    <Activity size={14} /> [VIEW AI TRAVERSAL]
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-4">
                    <span className="text-[10px] text-green-700 uppercase">Your Choice</span>
                    <div className="p-4 bg-black border border-green-900 rounded">
                      <h4 className="text-green-100 font-bold mb-2 uppercase">{selectedAction.label}</h4>
                      <p className="text-xs text-green-600 leading-relaxed">{renderContext(selectedAction.description)}</p>
                    </div>
                  </div>

                  {aiResult.bestActionId !== selectedAction.id && (
                    <div className="space-y-4">
                      <span className="text-[10px] text-blue-700 uppercase">APN Recommendation</span>
                      <div className="p-4 bg-black border border-blue-900 rounded shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                        <h4 className="text-blue-400 font-bold mb-2 uppercase">
                          {currentRoundData.maxOptions.find(o => o.id === aiResult.bestActionId)?.label}
                        </h4>
                        <p className="text-xs text-blue-800 leading-relaxed">
                          {renderContext(currentRoundData.maxOptions.find(o => o.id === aiResult.bestActionId)?.description || "")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => executeAction(selectedAction, true)}
                    className="flex-1 py-4 bg-black border border-green-500 text-green-400 font-bold uppercase hover:bg-green-500 hover:text-black transition-all"
                  >
                    {aiResult.bestActionId === selectedAction.id ? '[EXECUTE DIRECTIVE]' : '[OVERRIDE: MY COMMAND ANYWAY]'}
                  </button>
                  {aiResult.bestActionId !== selectedAction.id && (
                    <button 
                      onClick={() => {
                        const rec = currentRoundData.maxOptions.find(o => o.id === aiResult.bestActionId);
                        if (rec) executeAction(rec, false);
                      }}
                      className="flex-1 py-4 bg-blue-600 text-black font-bold uppercase hover:bg-blue-400 transition-all"
                    >
                      [EXECUTE AI RECOMMENDATION]
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'CONSEQUENCE' && (
            <motion.div 
              key="consequence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-full flex items-center justify-center p-8 bg-black"
            >
              <div className="max-w-2xl w-full text-center space-y-12">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 1, -1, 0]
                  }}
                  transition={{ duration: 0.2, repeat: 3 }}
                  className="w-24 h-24 bg-red-600 mx-auto rounded-full flex items-center justify-center shadow-2xl shadow-red-900"
                >
                  <AlertTriangle size={48} className="text-white" />
                </motion.div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-black tracking-tighter uppercase text-red-500">Action Report: Round {state.round}</h2>
                  <p className="text-green-100 text-lg leading-relaxed italic">
                    "{renderContext(lastActionReport)}"
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ResultStat label="Survival" value={state.livesSaved} />
                  <ResultStat label="Diplomacy" value={state.diplomaticStanding} />
                  <ResultStat label="Escalation" value={state.escalationLevel} />
                  <ResultStat label="Delay" value={state.timeWasted} />
                </div>

                <button 
                  onClick={nextRound}
                  className="w-full py-4 border-2 border-green-500 text-green-400 font-bold tracking-widest uppercase hover:bg-green-500 hover:text-black transition-all"
                >
                  [PROCEED TO NEXT PHASE]
                </button>
              </div>
            </motion.div>
          )}

          {phase === 'GAME_OVER' && (
            <motion.div 
              key="gameover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-full flex items-center justify-center p-8 bg-black"
            >
              <div className="max-w-4xl w-full border-4 border-red-600 p-8 md:p-16 rounded bg-black/50 text-center">
                <Skull size={80} className="mx-auto text-red-600 mb-8" />
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-red-500 mb-4">Simulation Terminated</h1>
                <p className="text-green-600 uppercase tracking-[0.5em] mb-12">Final Strategic Evaluation</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-left">
                  <div className="space-y-6">
                    <h3 className="text-xs text-green-700 uppercase tracking-widest border-b border-green-900 pb-2">National Outcome</h3>
                    <div className="space-y-4">
                      <StatBar label="Final Survival Rate" value={state.livesSaved} color="cyan" />
                      <StatBar label="Global Standing" value={state.diplomaticStanding} color="blue" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xs text-green-700 uppercase tracking-widest border-b border-green-900 pb-2">Conflict Metrics</h3>
                    <div className="space-y-4">
                      <StatBar label="Peak Escalation" value={state.escalationLevel} color="red" />
                      <StatBar label="Decision Latency" value={state.timeWasted} color="amber" />
                    </div>
                  </div>
                </div>

                <div className="bg-black p-8 border border-red-900 rounded mb-12">
                  <span className="text-[10px] text-red-800 uppercase tracking-widest">Final Heuristic H-Score</span>
                  <div className="text-5xl md:text-7xl font-black text-red-500 tracking-tighter mt-2">
                    {calculateHeuristic(state).toFixed(2)}
                  </div>
                  <p className="text-sm text-red-900 mt-4 uppercase font-bold">
                    {calculateHeuristic(state) > 50 ? "STRATEGIC VICTORY: NATION PRESERVED" : calculateHeuristic(state) > 0 ? "PYRRHIC VICTORY: SEVERE DEGRADATION" : "TOTAL ANNIHILATION: CIVILIZATION COLLAPSE"}
                  </p>
                </div>

                <button 
                  onClick={() => window.location.reload()}
                  className="px-12 py-4 bg-red-600 text-white font-bold uppercase hover:bg-red-500 transition-all tracking-widest"
                >
                  [RESTART SIMULATION]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tree Visualizer Overlay */}
        <AnimatePresence>
          {showTree && aiResult && (
            <TreeVisualizer 
              history={aiResult.history} 
              onClose={() => setShowTree(false)} 
              roundData={currentRoundData}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer HUD */}
      <footer className="h-auto md:h-10 border-t border-green-900 flex flex-col md:flex-row items-center justify-between px-8 py-2 md:py-0 bg-black/80 text-[10px] uppercase tracking-widest text-green-800 sticky bottom-0 z-40">
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
          <span>SECURE LINE: ACTIVE</span>
          <span>ENCRYPTION: AES-256-GCM</span>
          <span>LOCATION: NEW DELHI BKR-1</span>
        </div>
        <div className="flex gap-6 mt-2 md:mt-0">
          <span>ROUND: {state.round}/5</span>
          <span>H-SCORE: {calculateHeuristic(state).toFixed(1)}</span>
        </div>
      </footer>
    </div>
  );
}

function StatBar({ label, value, color }: { label: string, value: number, color: string }) {
  const colorMap: Record<string, string> = {
    cyan: 'bg-cyan-400',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] uppercase tracking-tighter">
        <span className="text-green-800">{label}</span>
        <span className={`font-bold ${value > 70 ? 'text-green-400' : value > 30 ? 'text-amber-400' : 'text-red-500'}`}>{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-black rounded-full overflow-hidden border border-green-900/20">
        <motion.div 
          className={`h-full ${colorMap[color]}`}
          animate={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ResultStat({ label, value }: { label: string, value: number }) {
  return (
    <div className="bg-black border border-green-900 p-4 rounded">
      <div className="text-[10px] text-green-800 uppercase mb-1">{label}</div>
      <div className={`text-xl font-bold ${value > 70 ? 'text-green-400' : value > 30 ? 'text-amber-400' : 'text-red-500'}`}>
        {value}%
      </div>
    </div>
  );
}
