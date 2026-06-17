"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Terminal as TermIcon, Activity, ChevronRight, Mail, Cpu, Database, MapPin, Clock, Lock, ShieldAlert, Fingerprint, Crosshair, Key, MonitorPlay, Code2, Network, Radio } from 'lucide-react';

// ============================================================================
// 🛠️ DATA ARSENAL CONFIGURATION
// ============================================================================
const CONFIG = {
  name: "RUDRAKSH GUPTA",
  title: "AI/ML ENGINEER // SYSTEM BUILDER",
  statement: "Building intelligent systems and digital products that solve real-world problems and create tactical impact.",
  clearance: "L2",
  uptime: "99.9%",
  focus: "C / WEB / SYSTEMS"
};

const MISSIONS = [
  {
    id: "001",
    title: "FOODSYNC",
    status: "DEPLOYED",
    statusColor: "text-emerald-400 border-emerald-500/30",
    objective: "Smart food discovery platform connecting people to the best localized options.",
    stack: ["React", "Node", "MongoDB"],
    outcome: "Full-stack web application live. Sub-second query latency achieved.",
    lesson: "Data indexing efficiency dictates user retention."
  },
  {
    id: "002",
    title: "PAATHLY",
    status: "ACTIVE",
    statusColor: "text-amber-400 border-amber-500/30",
    objective: "Offline-first learning platform for rural sector deployment.",
    stack: ["Next.js", "Python", "AWS"],
    outcome: "MVP deployed. Impacting edge-case learning accessibility.",
    lesson: "Edge-caching is critical for low-bandwidth environments."
  }
];

const ARSENAL = [
  { name: "Python", status: "OPERATIONAL" },
  { name: "React / Next.js", status: "DEPLOYED" },
  { name: "Node.js", status: "OPERATIONAL" },
  { name: "TensorFlow", status: "CALIBRATING" },
  { name: "AWS", status: "SYNCING" },
  { name: "C++", status: "ACTIVE" },
  { name: "Docker", status: "OPERATIONAL" }
];

// Icons
const GithubIcon = () => <svg className="w-5 h-5 text-cyan-400/70 group-hover:text-amber-400 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const LinkedinIcon = () => <svg className="w-5 h-5 text-cyan-400/70 group-hover:text-amber-400 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

// Framer Variants
const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants: Variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function MissionControlHUD() {
  const [bootState, setBootState] = useState<'gate' | 'booting' | 'active'>('gate');
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [time, setTime] = useState("");
  
  // Geolocation State
  const [userLocation, setUserLocation] = useState("DETECTING TRACE...");
  const [userCoords, setUserCoords] = useState("AWAITING SAT-LINK");

  // Terminal & Command Relay State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState([
    "SECURE SHELL READY // relay online",
    "Available routes: dossier, deployments, capabilities, comms",
    "Type a command or select any standby module to authorize focus."
  ]);
  const [scannerStatus, setScannerStatus] = useState<'idle' | 'scanning'>('idle');
  const [activeDisplay, setActiveDisplay] = useState<'standby' | 'dossier' | 'deployments' | 'capabilities' | 'comms'>('standby');
  const [glitchPhase, setGlitchPhase] = useState(false);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Authentication Sequence
  const handleAuth = () => {
    setBootState('booting');
    const sequence = ["INITIATING SECURE LINK...", "VERIFYING OPERATOR ID...", "SYNCING MISSION MODULES...", "THREAT MAP CALIBRATED", "ACCESS GRANTED."];
    sequence.forEach((line, index) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, line]);
        if (index === sequence.length - 1) setTimeout(() => { setBootState('active'); setTimeout(() => inputRef.current?.focus(), 100); }, 800);
      }, index * 300);
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Enter' && bootState === 'gate') handleAuth(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bootState]);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString() + " IST");
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [terminalLines]);

  useEffect(() => {
    if (bootState === 'active' && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords(`${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`);
        try {
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await res.json();
          setUserLocation(`${data.city || data.locality || 'UNKNOWN'}, ${data.countryCode}`);
        } catch { setUserLocation("LOCATION SECURED"); }
      }, () => {
        setUserLocation("TRACE BLOCKED // STEALTH MODE");
        setUserCoords("ENCRYPTED");
      });
    }
  }, [bootState]);

  // COMMAND RELAY ARCHITECTURE
  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;
    
    setTerminalInput("");
    setTerminalLines(prev => [...prev, `> ${cmd}`]);
    setScannerStatus('scanning');
    setActiveDisplay('standby');

    const triggerGlitch = (displayState: any, successMsg: string, sequence: string[]) => {
      let delay = 200;
      sequence.forEach(line => { setTimeout(() => setTerminalLines(prev => [...prev, line]), delay); delay += 300; });
      setTimeout(() => setGlitchPhase(true), delay);
      setTimeout(() => {
        setGlitchPhase(false);
        setActiveDisplay(displayState);
        setScannerStatus('idle');
        setTerminalLines(prev => [...prev, successMsg]);
      }, delay + 800);
    };

    if (cmd === 'dossier' || cmd === 'about') {
      triggerGlitch('dossier', "dossier ready.", ["resolving operator dossier...", "decrypting identity packet...", "stabilizing profile windows..."]);
    } 
    else if (cmd === 'deployments' || cmd === 'missions') {
      triggerGlitch('deployments', "tactical modules online.", ["syncing deployment registry...", "loading active mission grid..."]);
    }
    else if (cmd === 'capabilities' || cmd === 'skills') {
      triggerGlitch('capabilities', "capability matrix rendered.", ["running capability diagnostics...", "mapping operational stack..."]);
    }
    else if (cmd === 'comms' || cmd === 'contact') {
      triggerGlitch('comms', "secure channels open.", ["establishing sat-link...", "bypassing encryption gateways..."]);
    }
    else if (cmd === 'purge' || cmd === 'clear') {
      setTerminalLines(["SECURE SHELL READY // relay online"]);
      setScannerStatus('idle');
    }
    else {
      setTimeout(() => { setTerminalLines(prev => [...prev, `ERROR: Command '${cmd}' unrecognized.`]); setScannerStatus('idle'); }, 300);
    }
  };

  // Automated typing effect for panel clicks
  const relayClickCommand = (command: string) => {
    let currentText = "";
    let i = 0;
    const typingInterval = setInterval(() => {
      currentText += command.charAt(i);
      setTerminalInput(currentText);
      i++;
      if (i >= command.length) {
        clearInterval(typingInterval);
        setTimeout(() => executeCommand(command), 150);
      }
    }, 40);
  };

  if (bootState !== 'active') {
    return (
      <div className="min-h-screen bg-[#050814] text-amber-500 font-mono flex flex-col items-center justify-center p-6 selection:bg-amber-500/30">
        <div className="w-full max-w-lg">
          <div className="text-xs tracking-[0.3em] opacity-50 mb-8 flex justify-between border-b border-amber-500/20 pb-2 text-cyan-500">
            <span>DEFENSE GRID // NORTH SECTOR</span>
            <span>{new Date().getFullYear()}</span>
          </div>
          {bootState === 'gate' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8">
              <div className="inline-block p-4 border border-rose-500/30 bg-rose-500/5 rounded-full mb-4">
                <Lock className="w-8 h-8 text-rose-500" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-widest text-rose-500 mb-2">UNAUTHORIZED ACCESS RESTRICTED</h1>
                <p className="text-sm tracking-wider text-amber-500/70">OPERATOR TOKEN REQUIRED</p>
              </div>
              <div className="pt-8">
                <p className="text-sm tracking-[0.2em] animate-pulse cursor-pointer hover:text-amber-300" onClick={handleAuth}>
                  &gt; PRESS ENTER TO BEGIN AUTHENTICATION
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-3 text-sm tracking-wider">
              <div className="mb-6"><Fingerprint className="w-8 h-8 text-amber-500 animate-pulse" /></div>
              {bootLines.map((line, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-cyan-600 mr-2">[{String(idx + 1).padStart(2, '0')}]</span>
                  <span className={line.includes("GRANTED") ? "text-emerald-400 font-bold" : "text-amber-500/80"}>{line}</span>
                </motion.div>
              ))}
              <div className="animate-blink font-bold text-amber-500 pt-2">_</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050814] bg-hud-grid p-3 md:p-6 text-[11px] text-slate-300 font-mono select-none overflow-x-hidden flex flex-col">
      
      {/* ZONE 1: SYSTEM STRIP */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-wrap justify-between items-center text-[9px] tracking-widest text-cyan-600/80 mb-4 px-2 border-b border-cyan-900/30 pb-2">
        <div className="flex gap-4">
          <span>CLEARANCE: <span className="text-emerald-400">{CONFIG.clearance}</span></span>
          <span className="flex items-center gap-1">TRACE: <span className="text-cyan-400">{userLocation}</span></span>
          <span className="hidden sm:inline">COORDS: <span className="text-cyan-400/50">{userCoords}</span></span>
        </div>
        <div className="flex gap-4">
          <span>SYS TIME: <span className="text-amber-500/80">{time || "SYNCING..."}</span></span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> SECURE</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        
        {/* ZONE 2: PRIMARY CONSOLE */}
        <div className="lg:col-span-8 border border-amber-500/20 bg-[#0a1220]/80 backdrop-blur-md flex flex-col relative hud-brackets p-5 min-h-[340px]">
          <div className="flex justify-between items-center border-b border-slate-800/80 pb-2 mb-3">
            <div className="text-amber-500 font-bold tracking-widest flex items-center gap-2 text-xs">
              <TermIcon size={14} className={scannerStatus === 'scanning' ? "animate-spin text-emerald-400" : "animate-pulse"} /> 
              PRIMARY CONSOLE // COMMAND RELAY
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto text-[11px] md:text-xs text-emerald-400/90 space-y-1 pr-2 custom-scrollbar tracking-wide leading-relaxed">
            {terminalLines.map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {line.startsWith(">") ? <span className="text-amber-400 font-bold">{line}</span> : line}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); executeCommand(terminalInput); }} className="flex items-center border-t border-slate-800/80 pt-3 mt-2">
            <span className="text-amber-400 font-bold mr-2">&gt;</span>
            <input 
              ref={inputRef}
              type="text" 
              value={terminalInput} 
              onChange={e => setTerminalInput(e.target.value)} 
              placeholder="awaiting operator command..." 
              className="flex-1 bg-transparent text-amber-500 outline-none placeholder-cyan-800/50" 
              autoComplete="off" 
              spellCheck="false" 
            />
          </form>
        </div>

        {/* ZONE 3: SIDE INTELLIGENCE RAIL */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* MACHINE TELEMETRY / RADAR */}
          <div className={`bg-[#0a1220]/40 backdrop-blur-md border ${scannerStatus === 'scanning' ? 'border-cyan-500/50' : 'border-slate-800/80'} p-4 flex items-center justify-center relative min-h-[160px] overflow-hidden transition-colors duration-300`}>
             <div className="absolute top-2 left-2 text-[9px] text-cyan-600 tracking-widest">MACHINE INTEL SCANNER</div>
             <div className="relative w-28 h-28 flex items-center justify-center opacity-80">
                <motion.div animate={{ rotate: scannerStatus === 'scanning' ? 720 : 360 }} transition={{ repeat: Infinity, duration: scannerStatus === 'scanning' ? 2 : 10, ease: "linear" }} className={`absolute inset-0 border border-dashed rounded-full ${scannerStatus === 'scanning' ? 'border-cyan-400' : 'border-cyan-500/20'}`} />
                <motion.div animate={{ scale: scannerStatus === 'scanning' ? [1, 1.2, 1] : 1 }} transition={{ repeat: Infinity, duration: 1 }} className={`absolute inset-4 border rounded-full ${scannerStatus === 'scanning' ? 'border-cyan-500/50' : 'border-cyan-500/10'}`} />
                <Crosshair className={`w-6 h-6 ${scannerStatus === 'scanning' ? 'text-cyan-400' : 'text-cyan-800'}`} />
             </div>
             {scannerStatus === 'scanning' && <span className="absolute bottom-2 right-2 text-[8px] text-cyan-400 animate-pulse">ANALYZING...</span>}
          </div>

          {/* ACTIVE FOCUS STATUS */}
          <div className="bg-[#0a1220]/40 border border-slate-800/80 p-4 flex flex-col justify-between h-full">
            <div className="text-amber-500 font-bold text-[10px] tracking-widest mb-2 border-b border-slate-800/50 pb-1">CURRENT DIRECTIVE</div>
            <p className="text-cyan-100/70 text-[11px] leading-relaxed mb-4">{CONFIG.statement}</p>
            <div className="flex items-center gap-2">
               <Activity className="w-4 h-4 text-emerald-400" />
               <span className="text-[9px] text-emerald-400 tracking-widest">FOCUS: {CONFIG.focus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ZONE 4: STANDBY WINDOWS & ACTIVE MODULES */}
      <div className="mt-4 relative min-h-[400px]">
        
        {/* DORMANT PREVIEW GRID */}
        <AnimatePresence>
          {activeDisplay === 'standby' && !glitchPhase && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div onClick={() => relayClickCommand('exec dossier')} className="cursor-pointer group bg-[#0a1220]/30 border border-slate-800/50 hover:border-amber-500/30 p-4 flex flex-col items-center justify-center text-center transition-all h-32 relative overflow-hidden">
                <Fingerprint className="w-6 h-6 text-cyan-600 group-hover:text-amber-400 mb-2 transition-colors" />
                <span className="text-[10px] text-cyan-400/50 group-hover:text-amber-500/80 tracking-widest">OPERATOR DOSSIER<br/><span className="text-[8px] opacity-50">CLICK TO AUTHORIZE</span></span>
              </div>
              
              <div onClick={() => relayClickCommand('deployments')} className="cursor-pointer group bg-[#0a1220]/30 border border-slate-800/50 hover:border-amber-500/30 p-4 flex flex-col items-center justify-center text-center transition-all h-32">
                <Network className="w-6 h-6 text-cyan-600 group-hover:text-amber-400 mb-2 transition-colors" />
                <span className="text-[10px] text-cyan-400/50 group-hover:text-amber-500/80 tracking-widest">DEPLOYMENT GRID<br/><span className="text-[8px] opacity-50">CLICK TO AUTHORIZE</span></span>
              </div>
              
              <div onClick={() => relayClickCommand('capabilities')} className="cursor-pointer group bg-[#0a1220]/30 border border-slate-800/50 hover:border-amber-500/30 p-4 flex flex-col items-center justify-center text-center transition-all h-32">
                <Code2 className="w-6 h-6 text-cyan-600 group-hover:text-amber-400 mb-2 transition-colors" />
                <span className="text-[10px] text-cyan-400/50 group-hover:text-amber-500/80 tracking-widest">CAPABILITY MATRIX<br/><span className="text-[8px] opacity-50">CLICK TO AUTHORIZE</span></span>
              </div>
              
              <div onClick={() => relayClickCommand('comms')} className="cursor-pointer group bg-[#0a1220]/30 border border-slate-800/50 hover:border-amber-500/30 p-4 flex flex-col items-center justify-center text-center transition-all h-32">
                <Radio className="w-6 h-6 text-cyan-600 group-hover:text-amber-400 mb-2 transition-colors" />
                <span className="text-[10px] text-cyan-400/50 group-hover:text-amber-500/80 tracking-widest">SECURE COMMS<br/><span className="text-[8px] opacity-50">CLICK TO AUTHORIZE</span></span>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* THEATRICAL GLITCH SPAWN */}
        {glitchPhase && (
          <motion.div key="glitch" className="absolute inset-0 z-50 pointer-events-none">
            <motion.div initial={{ opacity: 0, x: -50, y: -20 }} animate={{ opacity: [0, 1, 0, 0.8], x: [-50, -45, -55, -50] }} transition={{ duration: 0.4, repeat: 2 }} className="absolute top-10 left-10 border border-cyan-500/50 bg-[#0a1220] p-4 text-cyan-400 text-[10px]">sys.routing // DECRYPTING...</motion.div>
            <motion.div initial={{ opacity: 0, x: 50, y: 40 }} animate={{ opacity: [0, 0.5, 1, 0.2], x: [50, 60, 45, 50] }} transition={{ duration: 0.3, repeat: 3 }} className="absolute bottom-20 right-20 border border-amber-500/50 bg-[#0a1220] p-4 text-amber-500 text-[10px]">auth.relay // FETCHING...</motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: [0, 1, 0.5, 1], scale: [0.9, 1.05, 0.95, 1] }} transition={{ duration: 0.5 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-slate-600 bg-slate-100/5 p-8 text-white text-lg font-bold tracking-widest backdrop-blur-lg">AUTHORIZING FOCUS</motion.div>
          </motion.div>
        )}

        {/* ACTIVE DOSSIER */}
        <AnimatePresence>
          {activeDisplay === 'dossier' && !glitchPhase && (
            <motion.div key="dossier" variants={itemVariants} initial="hidden" animate="visible" exit="hidden" className="bg-[#0a1220]/60 backdrop-blur-md border border-amber-500/30 p-6 lg:p-10 relative overflow-hidden group hud-brackets">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20 opacity-30 pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="text-[10px] text-amber-500/70 tracking-widest mb-2 flex items-center gap-2">
                    <Fingerprint size={14}/> OPERATOR DOSSIER // VERIFIED
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-wider mb-2 mt-4">{CONFIG.name}_</h1>
                  <p className="text-amber-500 font-bold tracking-widest text-xs mb-6 border-b border-slate-800/50 pb-4 inline-block">{CONFIG.title}</p>
                  <p className="text-cyan-100/80 leading-relaxed max-w-xl text-xs md:text-sm">{CONFIG.statement}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIVE DEPLOYMENTS */}
        <AnimatePresence>
          {activeDisplay === 'deployments' && !glitchPhase && (
            <motion.div key="deployments" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISSIONS.map(m => (
                <motion.div variants={itemVariants} key={m.id} className="bg-[#0a1220]/60 backdrop-blur-md border border-slate-800/80 hover:border-amber-500/30 p-5 flex flex-col justify-between transition-colors relative">
                  <div>
                    <div className="flex justify-between items-center mb-4 border-b border-slate-800/50 pb-2">
                      <span className="text-[10px] text-cyan-600 tracking-widest flex items-center gap-1"><Database size={10}/> OP-ID: {m.id}</span>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm border ${m.statusColor}`}>{m.status}</span>
                    </div>
                    <h3 className="text-sm font-bold tracking-wider text-slate-100 mb-3">{m.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div><span className="text-[9px] text-cyan-600">OBJECTIVE:</span><br/><span className="text-cyan-100/70">{m.objective}</span></div>
                      <div><span className="text-[9px] text-cyan-600">OUTCOME:</span><br/><span className="text-cyan-100/70">{m.outcome}</span></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* ACTIVE COMMS */}
        <AnimatePresence>
           {activeDisplay === 'comms' && !glitchPhase && (
             <motion.div key="comms" variants={itemVariants} initial="hidden" animate="visible" exit="hidden" className="bg-[#0a1220]/60 backdrop-blur-md border border-amber-500/30 p-6 flex justify-center items-center hud-brackets min-h-[200px]">
                <div className="flex gap-6">
                  <a href="#" className="flex flex-col items-center group p-4 border border-slate-800/50 hover:border-amber-500/50 bg-[#050814]/50 transition-all w-32">
                    <LinkedinIcon /><span className="text-[9px] mt-3 text-cyan-500 group-hover:text-amber-500 tracking-widest">LINKEDIN</span>
                  </a>
                  <a href="#" className="flex flex-col items-center group p-4 border border-slate-800/50 hover:border-amber-500/50 bg-[#050814]/50 transition-all w-32">
                    <GithubIcon /><span className="text-[9px] mt-3 text-cyan-500 group-hover:text-amber-500 tracking-widest">GITHUB</span>
                  </a>
                  <a href="mailto:hello@example.com" className="flex flex-col items-center group p-4 border border-slate-800/50 hover:border-amber-500/50 bg-[#050814]/50 transition-all w-32">
                    <Mail className="w-5 h-5 text-cyan-400/70 group-hover:text-amber-400" /><span className="text-[9px] mt-3 text-cyan-500 group-hover:text-amber-500 tracking-widest">EMAIL ROUTE</span>
                  </a>
                </div>
             </motion.div>
           )}
        </AnimatePresence>

      </div>
    </div>
  );
}