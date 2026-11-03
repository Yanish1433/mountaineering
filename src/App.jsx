import React, { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import {
  Mountain, Menu, X, Search, ArrowRight, ArrowUpRight, MapPin,
  ShieldCheck, Users, Backpack, Check, Plus, Minus, Calculator,
  TentTree, CalendarDays, Info, RotateCcw, Compass
} from 'lucide-react'

const gear = [
  { id: 'pack', name: 'Climbing Backpack', detail: '70L expedition grade', price: 180, emoji: '🎒' },
  { id: 'boots', name: 'Mountaineering Boots', detail: 'Insulated, high-altitude', price: 320, emoji: '🥾' },
  { id: 'axe', name: 'Ice Axe', detail: 'Technical alpine axe', price: 120, emoji: '🪓' },
  { id: 'helmet', name: 'Climbing Helmet', detail: 'Lightweight protection', price: 90, emoji: '⛑️' },
  { id: 'harness', name: 'Climbing Harness', detail: 'Adjustable climbing fit', price: 100, emoji: '🧗' },
  { id: 'poles', name: 'Trekking Poles', detail: 'Adjustable carbon fiber', price: 80, emoji: '🥢' },
  { id: 'bag', name: 'Sleeping Bag', detail: 'For freezing mountain nights', price: 250, emoji: '🛌' },
  { id: 'tent', name: '4-Season Tent', detail: 'Windproof mountain shelter', price: 400, emoji: '⛺' },
]
const initialSelected = Object.fromEntries(gear.map((item) => [item.id, true]))
const money = (value) => '$' + value.toLocaleString('en-US')

function MountainScene() {
  return (
    <div className="scene-canvas">
      {/* Animated cloud layer stays behind the Three.js mountain. */}
      <div className="sky-motion" aria-hidden="true">
        <div className="sky-cloud cloud-one" />
        <div className="sky-cloud cloud-two" />
        <div className="sky-cloud cloud-three" />
        <div className="sky-cloud cloud-four" />
      </div>
      <Canvas camera={{ position: [7, 5.5, 9], fov: 38 }} shadows>
        <color attach="background" args={['#102f4d']} />
        <fog attach="fog" args={['#102f4d', 12, 25]} />
        <ambientLight intensity={1.15} />
        <directionalLight position={[7, 10, 4]} intensity={2.2} castShadow />
        <pointLight position={[-5, 4, -3]} intensity={1.1} color="#76bfff" />
        <Suspense fallback={null}>
          <group position={[0, -1.3, 0]}>
            <mesh position={[0, 0, 0]} rotation={[-0.15, 0.3, 0]} castShadow receiveShadow>
              <coneGeometry args={[4.7, 7.8, 6, 3]} />
              <meshStandardMaterial color="#607b8f" roughness={0.94} flatShading />
            </mesh>
            <mesh position={[0, 2.55, 0]} rotation={[0, 0.3, 0]} castShadow>
              <coneGeometry args={[2.15, 3.1, 6, 2]} />
              <meshStandardMaterial color="#e5f1fa" roughness={0.86} flatShading />
            </mesh>
            <mesh position={[-2.4, -1.3, 1.1]} rotation={[0.2, 0.2, 0.2]} castShadow>
              <coneGeometry args={[2.1, 4.6, 5, 2]} />
              <meshStandardMaterial color="#324d63" roughness={1} flatShading />
            </mesh>
            <mesh position={[2.5, -1.5, -0.5]} rotation={[0, -0.4, 0.2]} castShadow>
              <coneGeometry args={[2.2, 4.8, 5, 2]} />
              <meshStandardMaterial color="#415f76" roughness={1} flatShading />
            </mesh>
            {/* Stylized climber with backpack, helmet, arms and legs */}
            <group position={[-0.75, -0.55, 2.55]} rotation={[0.08, 0.18, -0.24]}>
              <mesh position={[0, 0.5, 0]} castShadow>
                <capsuleGeometry args={[0.19, 0.62, 5, 8]} />
                <meshStandardMaterial color="#f06435" roughness={0.75} />
              </mesh>
              <mesh position={[0, 1.05, 0.02]} castShadow>
                <sphereGeometry args={[0.2, 16, 12]} />
                <meshStandardMaterial color="#f0c9a6" />
              </mesh>
              <mesh position={[0, 1.18, 0]} castShadow>
                <sphereGeometry args={[0.23, 16, 12]} />
                <meshStandardMaterial color="#f3f5f6" metalness={0.15} roughness={0.35} />
              </mesh>
              <mesh position={[0.28, 0.48, -0.13]} castShadow>
                <boxGeometry args={[0.38, 0.58, 0.3]} />
                <meshStandardMaterial color="#142638" roughness={0.8} />
              </mesh>
              <mesh position={[-0.19, 0.05, 0.08]} rotation={[0, 0, -0.25]} castShadow>
                <capsuleGeometry args={[0.09, 0.55, 4, 8]} />
                <meshStandardMaterial color="#263847" />
              </mesh>
              <mesh position={[0.18, 0.03, 0.08]} rotation={[0, 0, 0.2]} castShadow>
                <capsuleGeometry args={[0.09, 0.55, 4, 8]} />
                <meshStandardMaterial color="#263847" />
              </mesh>
              <mesh position={[-0.25, 0.46, 0.06]} rotation={[0, 0, -0.75]} castShadow>
                <capsuleGeometry args={[0.07, 0.46, 4, 8]} />
                <meshStandardMaterial color="#f06435" />
              </mesh>
              <mesh position={[0.28, 0.52, 0.1]} rotation={[0, 0, 0.7]} castShadow>
                <capsuleGeometry args={[0.07, 0.46, 4, 8]} />
                <meshStandardMaterial color="#f06435" />
              </mesh>
            </group>
          </group>
          <ContactShadows position={[0, -1.28, 0]} opacity={0.4} scale={18} blur={2.4} />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={8} maxDistance={15} maxPolarAngle={Math.PI / 2.05} />
      </Canvas>
      <div className="scene-hint"><span className="pulse-dot" /> Drag to explore the mountain</div>
      <div className="altitude-tag summit-tag"><span className="pin">⌖</span><div><b>Summit</b><small>8,848 m</small></div></div>
      <div className="altitude-tag camp-tag"><span className="pin">▲</span><div><b>Camp 2</b><small>6,400 m</small></div></div>
    </div>
  )
}

export default function App() {
  const [selected, setSelected] = useState(initialSelected)
  const [days, setDays] = useState(14)
  const [climbers, setClimbers] = useState(1)
  const [dailyCost, setDailyCost] = useState(50)
  const [showCalculator, setShowCalculator] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activeMountain, setActiveMountain] = useState('Everest')
  const [searchOpen, setSearchOpen] = useState(false)
  const equipmentCost = useMemo(
    () => gear.reduce((sum, item) => sum + (selected[item.id] ? item.price : 0), 0),
    [selected]
  )
  const expeditionCost = days * dailyCost * climbers
  const total = equipmentCost * climbers + expeditionCost
  const selectedCount = gear.filter((item) => selected[item.id]).length
  const mountainHeight = activeMountain === 'Everest' ? '8,848 m' : activeMountain === 'Ama Dablam' ? '6,812 m' : '8,163 m'
  const toggleGear = (id) => setSelected((old) => ({ ...old, [id]: !old[id] }))
  const reset = () => { setSelected(initialSelected); setDays(14); setClimbers(1); setDailyCost(50) }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="SummitGo home">
          <span className="brand-mark"><Mountain size={35} strokeWidth={2.4} /></span>
          <span><strong>SummitGo</strong><small>Higher Dreams. Safer Climbs.</small></span>
        </a>
        <nav className={mobileMenu ? 'nav-links nav-open' : 'nav-links'}>
          <a className="nav-active" href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#mountains" onClick={() => setMobileMenu(false)}>Mountains</a>
          <a href="#equipment" onClick={() => setMobileMenu(false)}>Gear & Equipment</a>
          <a href="#about" onClick={() => setMobileMenu(false)}>About</a>
          <a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={19} /></button>
          <button className="primary-btn header-cta" onClick={() => setShowCalculator(true)}><Mountain size={16} /> Plan Your Climb</button>
          <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X /> : <Menu />}</button>
        </div>
      </header>

      {searchOpen && <div className="search-strip"><Search size={18}/><input autoFocus placeholder="Search mountains, routes, or equipment…" onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}/><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={18}/></button></div>}

      <main id="home" className="hero-layout">
        <section className="visual-column">
          <div className="scene-backdrop" />
          <MountainScene />
          <div className="hero-copy">
            <div className="eyebrow">EXPLORE <i>•</i> EQUIP <i>•</i> CONQUER</div>
            <h1>Your Next Summit <span>Awaits.</span></h1>
            <p>Plan your mountain adventure, choose the right gear, and climb with confidence.</p>
            <div className="stats-row">
              <div><Mountain size={22}/><span><b>10+</b><small>Mountains</small></span></div>
              <div><Users size={22}/><span><b>50K+</b><small>Happy Climbers</small></span></div>
              <div><ShieldCheck size={22}/><span><b>Safety First</b><small>Every Adventure</small></span></div>
            </div>
            <a href="#mountains" className="primary-btn explore-btn">Explore Mountains <ArrowRight size={18}/></a>
          </div>

          <div className="mountain-card" id="mountains">
            <div className="mountain-thumb"><Mountain size={48}/><span>NEPAL</span></div>
            <div className="mountain-info">
              <div className="card-title-row"><h3>Mount {activeMountain}</h3><span className="difficulty">Challenging</span></div>
              <div className="mountain-meta"><span><Mountain size={14}/> {mountainHeight}</span><span><MapPin size={14}/> Nepal</span></div>
              <p>The adventure of a lifetime, planned with gear and budget in one place.</p>
              <div className="mountain-switcher" aria-label="Choose mountain">
                {['Everest', 'Ama Dablam', 'Manaslu'].map((name) => <button key={name} className={activeMountain === name ? 'mountain-dot selected' : 'mountain-dot'} onClick={() => setActiveMountain(name)} aria-label={`Select ${name}`} />)}
              </div>
            </div>
          </div>

          <div className="climber-bar">
            <div className="avatar">🧗</div>
            <div className="profile"><small>Climber profile</small><b>Your Adventure</b><span>Ready to plan</span></div>
            <div className="progress-wrap"><small>Gear checklist</small><div className="progress-track"><span style={{ width: `${selectedCount / gear.length * 100}%` }}/></div><small>{selectedCount} / {gear.length} items selected</small></div>
            <div className="total-mini"><Calculator size={24}/><span><small>Estimated total</small><b>{money(total)}</b></span></div>
          </div>
          <div className="quote-chip"><Compass size={23}/><span>Adventure is not a destination.<br/>It’s a way of life.</span></div>
        </section>

        <aside className="equipment-panel" id="equipment">
          <div className="panel-heading"><div><span className="section-kicker">YOUR CHECKLIST</span><h2>Equipment & Cost</h2></div><span className="item-count">{selectedCount}/{gear.length}</span></div>
          <p className="panel-intro">Tap an item to add or remove it from your expedition budget.</p>
          <div className="gear-list">
            {gear.map((item) => (
              <button className={`gear-item ${selected[item.id] ? 'gear-selected' : ''}`} key={item.id} onClick={() => toggleGear(item.id)} aria-pressed={selected[item.id]}>
                <span className="gear-emoji">{item.emoji}</span>
                <span className="gear-copy"><b>{item.name}</b><small>{item.detail}</small></span>
                <span className="gear-price">{money(item.price)}</span>
                <span className={`gear-check ${selected[item.id] ? 'checked' : ''}`}>{selected[item.id] ? <Check size={14}/> : <Plus size={14}/>}</span>
              </button>
            ))}
          </div>
          <div className="cost-summary">
            <div className="cost-line"><span>Equipment subtotal <small>{selectedCount} selected items</small></span><b>{money(equipmentCost)}</b></div>
            <div className="cost-line"><span>Climber & expedition <small>{days} days × {climbers} climber{climbers > 1 ? 's' : ''}</small></span><b>{money(expeditionCost)}</b></div>
            <div className="cost-divider"/>
            <div className="cost-total"><span>Estimated total</span><b>{money(total)}</b></div>
            <small className="estimate-note">Illustrative prices in USD. Actual permits, guides, rentals, and local rates vary.</small>
          </div>
          <button className="primary-btn calculate-btn" onClick={() => setShowCalculator(true)}><Calculator size={17}/> Calculate Full Cost <ArrowUpRight size={16}/></button>
          <button className="reset-btn" onClick={reset}><RotateCcw size={13}/> Reset checklist</button>
        </aside>
      </main>

      <section className="below-section" id="about">
        <div className="below-heading"><span className="section-kicker">PLAN WITH CONFIDENCE</span><h2>Every summit starts with a plan.</h2><p>Build your equipment checklist and understand your estimated trip costs before you head for the mountains.</p></div>
        <div className="feature-grid">
          <article><span className="feature-icon"><Backpack/></span><h3>Build your gear list</h3><p>Select the equipment you need and see the subtotal update instantly.</p></article>
          <article><span className="feature-icon"><Calculator/></span><h3>Estimate your budget</h3><p>Adjust expedition days, number of climbers, and daily expenses.</p></article>
          <article><span className="feature-icon"><ShieldCheck/></span><h3>Keep safety in focus</h3><p>Use this planner as a starting point, and always follow expert guidance.</p></article>
        </div>
      </section>

      <footer id="contact"><a className="brand footer-brand" href="#home"><span className="brand-mark"><Mountain size={30}/></span><span><strong>SummitGo</strong><small>Higher Dreams. Safer Climbs.</small></span></a><span>Adventure begins with preparation.</span><span>© 2026 SummitGo · Demo project</span></footer>

      {showCalculator && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setShowCalculator(false)}>
        <section className="calculator-modal" role="dialog" aria-modal="true" aria-labelledby="calc-title">
          <div className="modal-head"><div><span className="section-kicker">EXPEDITION PLANNER</span><h2 id="calc-title">Calculate your climb</h2></div><button className="icon-btn" onClick={() => setShowCalculator(false)} aria-label="Close calculator"><X/></button></div>
          <p className="modal-description">Adjust the trip details below. Your estimate updates immediately.</p>
          <label className="field-label"><span><CalendarDays size={16}/> Expedition length</span><b>{days} days</b></label>
          <input className="range-input" type="range" min="1" max="45" value={days} onChange={(e) => setDays(Number(e.target.value))}/>
          <div className="range-ends"><span>1 day</span><span>45 days</span></div>
          <label className="field-label"><span><Users size={16}/> Number of climbers</span><div className="stepper"><button onClick={() => setClimbers(Math.max(1, climbers - 1))} aria-label="Decrease climbers"><Minus size={14}/></button><b>{climbers}</b><button onClick={() => setClimbers(Math.min(12, climbers + 1))} aria-label="Increase climbers"><Plus size={14}/></button></div></label>
          <label className="field-label"><span><TentTree size={16}/> Daily expenses per climber</span><b>{money(dailyCost)}</b></label>
          <input className="range-input" type="range" min="0" max="500" step="10" value={dailyCost} onChange={(e) => setDailyCost(Number(e.target.value))}/>
          <div className="range-ends"><span>$0</span><span>$500/day</span></div>
          <div className="modal-breakdown">
            <div><span>Selected equipment × climbers</span><b>{money(equipmentCost * climbers)}</b></div>
            <div><span>Daily costs × days × climbers</span><b>{money(expeditionCost)}</b></div>
            <div className="modal-grand-total"><span>Estimated expedition total</span><b>{money(total)}</b></div>
          </div>
          <p className="disclaimer"><Info size={14}/> Planning estimate only. This demo excludes verified permits, insurance, flights, and operator quotes.</p>
          <button className="primary-btn modal-done" onClick={() => setShowCalculator(false)}>Save estimate <Check size={17}/></button>
        </section>
      </div>}
    </div>
  )
}
