import { Bot, Camera, CarFront, Check, CirclePlay, Cloud, Film, Music2, Radio, Server, Sparkles } from "lucide-react";

export type ProjectKind = "moodsync" | "ovoo" | "rental" | "telegram";

export function ProjectVisual({ kind }: { kind: ProjectKind }) {
  if (kind === "moodsync") return <MoodSyncVisual />;
  if (kind === "ovoo") return <StreamingVisual />;
  if (kind === "rental") return <FleetVisual />;
  return <AutomationVisual />;
}

function MoodSyncVisual() {
  const steps = [[Camera, "Webcam"], [Sparkles, "Face detection"], [Radio, "Emotion"], [Music2, "Mood"], [CirclePlay, "Music"]] as const;
  return (
    <div className="visual-stage mood-stage" role="img" aria-label="Animated visual pipeline from webcam facial analysis to emotion-adaptive music">
      <div className="face-map" aria-hidden="true"><span className="face-ring face-ring-a" /><span className="face-ring face-ring-b" /><i /><i /><i /><i /><i /></div>
      <div className="pipeline">
        {steps.map(([Icon, label], index) => <div className="pipeline-step" key={label}><span><Icon /></span><small>{label}</small>{index < steps.length - 1 && <b aria-hidden="true">→</b>}</div>)}
      </div>
      <div className="emotion-readout"><small>Expression signal</small><strong>FOCUSED</strong><span><i /></span></div>
      <span className="visual-caption">Concept visualization</span>
    </div>
  );
}

function StreamingVisual() {
  return (
    <div className="visual-stage stream-stage" role="img" aria-label="Concept visualization of OVOO streaming across films, live television, and playback">
      <div className="stream-window">
        <div className="stream-nav"><strong>OVOO</strong><span>Discover</span><span>Live TV</span><span>Movies</span></div>
        <div className="stream-feature"><small>NOW STREAMING</small><strong>Beyond the Signal</strong><button type="button" tabIndex={-1}><CirclePlay /> Play</button></div>
        <div className="stream-row">{["LIVE 04", "NORTH", "ORBIT", "AFTER", "FRAME"].map((title, i) => <span key={title} className={`poster poster-${i}`}><b>{title}</b></span>)}</div>
        <div className="player-line"><i /><span>42:18</span></div>
      </div>
      <span className="visual-caption">Product concept visualization</span>
    </div>
  );
}

function FleetVisual() {
  return (
    <div className="visual-stage fleet-stage" role="img" aria-label="Fleet management interface showing vehicles, bookings, availability and a reservation timeline">
      <div className="fleet-shell">
        <aside><strong>FLEET/OS</strong>{["Overview", "Vehicles", "Bookings", "Pricing"].map((item, i) => <span className={i === 0 ? "active" : ""} key={item}>{item}</span>)}</aside>
        <div className="fleet-main"><div className="fleet-top"><span><small>Available</small><strong>24</strong></span><span><small>In transit</small><strong>08</strong></span><span><small>Bookings</small><strong>31</strong></span></div>
          <div className="fleet-cars">{["Sedan A-14", "Touring B-07", "Urban C-22"].map((name, i) => <div key={name}><CarFront /><span><b>{name}</b><small>{i === 1 ? "Reserved" : "Available"}</small></span><Check /></div>)}</div>
          <div className="timeline"><small>RESERVATION TIMELINE</small><div><i /><i /><i /></div></div>
        </div>
      </div>
      <span className="visual-caption">Product concept visualization</span>
    </div>
  );
}

function AutomationVisual() {
  return (
    <div className="visual-stage terminal-stage" role="img" aria-label="Telegram automation architecture and live server terminal visualization">
      <div className="terminal-window"><div className="terminal-head"><i /><i /><i /><span>worker@vps — production</span></div><code><span>$ systemctl status telegram-worker</span><span className="terminal-ok">● active (running)</span><span>listening for updates...</span><span>api response <b>200 OK</b> · 84ms</span><span>job completed · queue 0</span><span className="terminal-cursor">_</span></code></div>
      <div className="system-flow"><span><Cloud /> API</span><b>→</b><span><Bot /> BOT</span><b>→</b><span><Radio /> WORKER</span><b>→</b><span><Server /> VPS</span></div>
      <span className="running-pill"><i /> RUNNING</span>
    </div>
  );
}
