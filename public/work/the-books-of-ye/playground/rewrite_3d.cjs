const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const scriptStart = html.indexOf('<script>');
const scriptEnd = html.indexOf('</script>', scriptStart) + 9;

if (scriptStart === -1 || scriptEnd === -1) {
    console.error('Could not find script tags');
    process.exit(1);
}

const beforeScript = html.substring(0, scriptStart + 8);
const afterScript = html.substring(scriptEnd - 9);

let newScript = `
        const canvas = document.getElementById('galaxy-canvas');
        const ctx = canvas.getContext('2d');
        const container = document.getElementById('canvas-container');
        
        let width, height;
        let stars = [];
        let selectedStar = null;
        let scannedCount = 0;
        let habitableCount = 0;
        
        // 3D Interactive camera 
        let camera = { lookX: 0, lookY: 0, lookZ: 0, dist: 1000, pitch: Math.PI / 8, yaw: 0 };
        let targetCamera = { lookX: 0, lookY: 0, lookZ: 0, dist: 1000, pitch: Math.PI / 8, yaw: 0 };
        let isDragging = false;
        let lastMouse = { x: 0, y: 0 };
        let dragDist = 0;
        
        const spectralClasses = [
            { class: 'O', prob: 0.00003, color: '#38bdf8', size: 4.5, life: 'Extremely Short', habitabilityBonus: -100, desc: 'Massive, hot, and extremely luminous. Burns through its fuel much too fast for complex life to evolve.' },
            { class: 'B', prob: 0.0013, color: '#818cf8', size: 3.5, life: 'Short', habitabilityBonus: -60, desc: 'Very bright and hot. Short lifespan heavily limits the evolutionary window for planets.' },
            { class: 'A', prob: 0.006, color: '#c7d2fe', size: 2.8, life: 'Medium', habitabilityBonus: -30, desc: 'Hot and bright. Might support life, but conditions are generally harsh and radiation is high.' },
            { class: 'F', prob: 0.03, color: '#ffffff', size: 2.2, life: 'Long (3-5B yrs)', habitabilityBonus: 10, desc: 'White stars, larger and hotter than our Sun. Good candidates with broad habitable zones.' },
            { class: 'G', prob: 0.076, color: '#fde047', size: 1.8, life: 'Long (~10B yrs)', habitabilityBonus: 40, desc: 'Yellow dwarfs like our Sun. Highly stable environments, excellent candidates for Earth-like life.' },
            { class: 'K', prob: 0.121, color: '#fb923c', size: 1.5, life: 'Very Long', habitabilityBonus: 50, desc: 'Orange dwarfs. Highly stable, very long-lived, potentially the best candidates for sustaining life.' },
            { class: 'M', prob: 0.7645, color: '#f43f5e', size: 1.0, life: 'Trillions of yrs', habitabilityBonus: -10, desc: 'Red dwarfs. Extremely common and long-lived, but planets must orbit very close, risking tidal locking and intense solar flares.' }
        ];
        
        function resize() {
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            draw();
        }
        
        function getRandomClass() {
            let r = Math.random();
            let sum = 0;
            for (let c of spectralClasses) {
                sum += c.prob;
                if (r <= sum) return c;
            }
            return spectralClasses[6]; // fallback M
        }
        
        function generateGalaxy() {
            stars = [];
            const numArms = 5;
            const numStars = 4500; 
            const maxRadius = Math.min(width, height) * 0.6;
            
            targetCamera.dist = maxRadius * 2.0;
            camera.dist = targetCamera.dist;
            
            for (let i = 0; i < numStars; i++) {
                const isCore = Math.random() < 0.25;
                let r, theta, yOffset;
                
                if (isCore) {
                    r = Math.pow(Math.random(), 2) * (maxRadius * 0.25);
                    theta = Math.random() * Math.PI * 2;
                    yOffset = (Math.random() - 0.5) * (maxRadius * 0.3) * Math.exp(-r/(maxRadius*0.1));
                } else {
                    const arm = Math.floor(Math.random() * numArms);
                    const armOffset = (Math.PI * 2 / numArms) * arm;
                    const distanceParam = Math.random();
                    r = Math.pow(distanceParam, 0.6) * maxRadius;
                    r = Math.max(r, maxRadius * 0.05); 
                    const spiralTwist = r * 0.012;
                    theta = armOffset + spiralTwist + (Math.random() - 0.5) * 0.6; 
                    yOffset = (Math.random() - 0.5) * (maxRadius * 0.1) * Math.exp(-r/(maxRadius*0.5));
                }
                
                const sClass = getRandomClass();
                const noiseX = (Math.random() - 0.5) * (maxRadius * 0.15);
                const noiseZ = (Math.random() - 0.5) * (maxRadius * 0.15);
                
                stars.push({
                    x: Math.cos(theta) * r + noiseX,
                    y: yOffset, // Thickness in 3D
                    z: Math.sin(theta) * r + noiseZ, // Z represents depth
                    type: sClass,
                    scanned: false,
                    habitable: false,
                    habitabilityScore: 0,
                    id: 'SYS-' + Math.floor(Math.random() * 9000 + 1000)
                });
            }
        }
        
        function project3D(x, y, z) {
            x -= camera.lookX;
            y -= camera.lookY;
            z -= camera.lookZ;

            // Yaw
            let rx = x * Math.cos(camera.yaw) - z * Math.sin(camera.yaw);
            let rz = x * Math.sin(camera.yaw) + z * Math.cos(camera.yaw);

            // Pitch
            let ry = y * Math.cos(camera.pitch) - rz * Math.sin(camera.pitch);
            let rz2 = y * Math.sin(camera.pitch) + rz * Math.cos(camera.pitch);

            rz2 += camera.dist;

            if (rz2 <= 10) return null; // Behind plane

            const fov = Math.max(width, height) * 0.7;
            const scale = fov / rz2;

            return {
                x: width / 2 + rx * scale,
                y: height / 2 + ry * scale,
                scale: scale,
                rawZ: rz2
            };
        }
        
        function draw() {
            ctx.fillStyle = '#02040a';
            ctx.fillRect(0, 0, width, height);
            
            let projectedStars = [];
            for (let star of stars) {
                let proj = project3D(star.x, star.y, star.z);
                if (proj) projectedStars.push({ star, proj });
            }
            
            // Sort back to front (painter's algorithm)
            projectedStars.sort((a, b) => b.proj.rawZ - a.proj.rawZ);
            
            // 3D Core Glow Mapping
            let coreProj = project3D(0, 0, 0);
            if (coreProj && coreProj.rawZ > 20) {
                ctx.save();
                ctx.translate(coreProj.x, coreProj.y);
                ctx.scale(coreProj.scale, coreProj.scale * Math.max(0.1, Math.cos(camera.pitch))); // visually squash
                const coreRadius = Math.min(width, height) * 0.45;
                const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRadius);
                coreGrad.addColorStop(0, 'rgba(255, 250, 220, 0.4)');
                coreGrad.addColorStop(0.1, 'rgba(251, 146, 60, 0.15)');
                coreGrad.addColorStop(0.3, 'rgba(236, 72, 153, 0.05)'); 
                coreGrad.addColorStop(0.6, 'rgba(129, 140, 248, 0.02)');
                coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = coreGrad;
                ctx.beginPath();
                ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            
            for (let ps of projectedStars) {
                let { star, proj } = ps;
                
                // Screen bounds culling optimization
                if (proj.x < -100 || proj.x > width + 100 || proj.y < -100 || proj.y > height + 100) continue;
                
                let renderSize = Math.max(0.1, star.type.size * proj.scale);
                
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, renderSize, 0, Math.PI * 2);
                ctx.fillStyle = star.type.color;
                
                if (star.scanned) {
                    ctx.shadowBlur = 10 * proj.scale;
                    const glowColor = star.habitable ? '#34d399' : '#ef4444';
                    ctx.shadowColor = glowColor;
                    ctx.fillStyle = star.habitable ? glowColor : 'rgba(239, 68, 68, 0.6)'; 
                } else {
                    ctx.shadowBlur = (star.type.size > 2 ? 6 : 2) * proj.scale;
                    ctx.shadowColor = star.type.color;
                }
                
                ctx.fill();
                
                // Screen-space constant UI target scale regardless of deep camera zoom
                if (selectedStar === star) {
                    ctx.beginPath();
                    ctx.arc(proj.x, proj.y, renderSize + Math.max(20, 30 * proj.scale), 0, Math.PI * 2);
                    ctx.strokeStyle = '#60a5fa';
                    ctx.lineWidth = 1.5;
                    ctx.setLineDash([4, 4]);
                    ctx.shadowBlur = 0;
                    ctx.stroke();
                    
                    ctx.save();
                    ctx.translate(proj.x, proj.y);
                    ctx.rotate(Date.now() / 1000);
                    ctx.beginPath();
                    const r = renderSize + Math.max(15, 20 * proj.scale);
                    ctx.moveTo(-r - 12, 0); ctx.lineTo(-r, 0);
                    ctx.moveTo(r, 0); ctx.lineTo(r + 12, 0);
                    ctx.moveTo(0, -r - 12); ctx.lineTo(0, -r);
                    ctx.moveTo(0, r); ctx.lineTo(0, r + 12);
                    ctx.strokeStyle = 'rgba(96, 165, 250, 0.5)';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([]);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (selectedStar && e.deltaY > 0) {
                closeSidebar();
                return;
            }
            if (!selectedStar) {
                const zoomSpeed = 0.1;
                const zoomAmount = Math.exp((e.deltaY < 0 ? -1 : 1) * zoomSpeed);
                targetCamera.dist *= zoomAmount;
                targetCamera.dist = Math.max(30, Math.min(targetCamera.dist, Math.max(width, height) * 4));
            }
        }, { passive: false });
        
        canvas.addEventListener('mousedown', e => {
            isDragging = true;
            lastMouse = { x: e.clientX, y: e.clientY };
            dragDist = 0;
            canvas.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none'; 
        });
        
        window.addEventListener('mouseup', e => {
            isDragging = false;
            canvas.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        });
        
        window.addEventListener('mousemove', e => {
            if (isDragging) {
                const dx = e.clientX - lastMouse.x;
                const dy = e.clientY - lastMouse.y;
                dragDist += Math.abs(dx) + Math.abs(dy);
                
                targetCamera.yaw -= dx * 0.005;
                targetCamera.pitch -= dy * 0.005;
                
                // Clamp pitch so galaxy doesn't flip entirely upside down
                targetCamera.pitch = Math.max(-Math.PI/2 + 0.1, Math.min(Math.PI/2 - 0.1, targetCamera.pitch));
                
                lastMouse = { x: e.clientX, y: e.clientY };
                
                if (dragDist > 15 && selectedStar) {
                    closeSidebar();
                }
            }
        });
        
        canvas.addEventListener('click', (e) => {
            if (dragDist > 10) return; 
            
            let clicked = null;
            let minDistObj = Infinity;
            
            for (let star of stars) {
                let proj = project3D(star.x, star.y, star.z);
                if (!proj) continue;
                
                const dx = proj.x - e.clientX;
                const dy = proj.y - e.clientY;
                const distScreen = Math.sqrt(dx * dx + dy * dy);
                
                // Allow a larger margin for error to select small distant stars
                if (distScreen < 20 + (star.type.size * proj.scale) && proj.rawZ < minDistObj) {
                    minDistObj = proj.rawZ;
                    clicked = star;
                }
            }
            
            if (clicked) {
                selectedStar = clicked;
                document.getElementById('right-sidebar').style.display = 'flex';
                updateDetailsPanel();
                
                targetCamera.lookX = clicked.x;
                targetCamera.lookY = clicked.y;
                targetCamera.lookZ = clicked.z;
                targetCamera.dist = Math.max(50, 100); 
            } else {
                closeSidebar();
            }
        });
        
        document.getElementById('close-btn').addEventListener('click', closeSidebar);
        
        function closeSidebar() {
            if (selectedStar) {
                selectedStar = null;
                document.getElementById('right-sidebar').style.display = 'none';
                
                targetCamera.lookX = 0;
                targetCamera.lookY = 0;
                targetCamera.lookZ = 0;
                targetCamera.dist = Math.min(width, height) * 0.9;
            }
        }
        
        function updateDetailsPanel() {
            const details = document.getElementById('star-details');
            if (!selectedStar) return;
            
            if (selectedStar.scanned) {
                const statusColor = selectedStar.habitable ? 'text-emerald-400' : 'text-red-400';
                const statusBorder = selectedStar.habitable ? 'border-emerald-500/50' : 'border-red-500/50';
                const statusBg = selectedStar.habitable ? 'bg-emerald-500/10' : 'bg-red-500/10';
                const statusText = selectedStar.habitable ? 'OPTIMAL (HABITABLE)' : 'HOSTILE (LIFELESS)';
                
                details.innerHTML = \`
                    <div class="flex items-center gap-4 mb-5 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div class="star-type-dot w-5 h-5" style="background-color: \${selectedStar.type.color}; box-shadow: 0 0 15px \${selectedStar.type.color}"></div>
                        <div>
                            <div class="text-[10px] text-slate-400 font-mono tracking-widest">\${selectedStar.id}</div>
                            <div class="text-lg font-bold font-mono text-slate-200">Class \${selectedStar.type.class} Star</div>
                        </div>
                    </div>
                    
                    <div class="space-y-4 font-mono text-sm mb-5">
                         <div class="flex flex-col gap-1 border-b border-slate-700/50 pb-2">
                            <span class="text-[10px] text-slate-500 uppercase tracking-widest">Expected Lifespan</span>
                            <span class="text-slate-200 font-bold">\${selectedStar.type.life}</span>
                        </div>
                        <div class="flex flex-col gap-1 border-b border-slate-700/50 pb-2">
                            <span class="text-[10px] text-slate-500 uppercase tracking-widest">Calculated Habitability Score</span>
                            <div class="flex items-end gap-2">
                                <span class="\${statusColor} font-bold text-2xl leading-none">\${selectedStar.habitabilityScore}</span>
                                <span class="text-slate-500 mb-0.5">/ 100</span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1">
                            <span class="text-[10px] text-slate-500 uppercase tracking-widest">Planetary Assessment</span>
                            <div class="px-3 py-2 mt-1 rounded border \${statusBorder} \${statusBg} \${statusColor} font-bold text-center text-xs tracking-wider">
                                \${statusText}
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700 relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
                        <h4 class="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-bold">Scientific Context</h4>
                        <p class="text-xs text-slate-300 leading-relaxed font-sans">\${selectedStar.type.desc}</p>
                    </div>
                \`;
                document.getElementById('scan-btn').style.display = 'none';
            } else {
                details.innerHTML = \`
                    <div class="flex items-center gap-4 mb-5 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div class="star-type-dot w-5 h-5" style="background-color: \${selectedStar.type.color}; box-shadow: 0 0 15px \${selectedStar.type.color}"></div>
                         <div>
                            <div class="text-[10px] text-slate-400 font-mono tracking-widest">\${selectedStar.id}</div>
                            <div class="text-lg font-bold font-mono text-slate-200">Class \${selectedStar.type.class} Star</div>
                        </div>
                    </div>
                    
                    <div class="animate-pulse space-y-4 p-2">
                        <div class="h-[1px] bg-slate-700/50 w-full mb-4"></div>
                        <div class="flex justify-between items-end">
                            <div class="h-3 bg-slate-700 rounded w-24"></div>
                            <div class="h-4 bg-slate-600 rounded w-16"></div>
                        </div>
                        <div class="flex justify-between items-end">
                            <div class="h-3 bg-slate-700 rounded w-32"></div>
                            <div class="h-6 bg-slate-600 rounded w-12"></div>
                        </div>
                        <div class="h-[1px] bg-slate-700/50 w-full my-4"></div>
                        <div class="space-y-2 pt-2">
                            <div class="h-2 bg-slate-700 rounded w-full"></div>
                            <div class="h-2 bg-slate-700 rounded w-5/6"></div>
                            <div class="h-2 bg-slate-700 rounded w-4/6"></div>
                        </div>
                    </div>
                    
                    <div class="mt-6 flex flex-col items-center justify-center p-4 border border-dashed border-slate-600 rounded-lg bg-slate-800/20">
                         <svg class="w-8 h-8 text-slate-500 mb-2 animate-bounce flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                         </svg>
                        <div class="text-xs text-slate-400 font-mono text-center">SYSTEM DATA ENCRYPTED.<br/>SCAN REQUIRED.</div>
                    </div>
                \`;
                document.getElementById('scan-btn').style.display = 'block';
            }
        }
        
        document.getElementById('scan-btn').addEventListener('click', () => {
            if (selectedStar && !selectedStar.scanned) {
                const btn = document.getElementById('scan-btn');
                btn.innerHTML = '<span class="animate-pulse">SCANNING...</span>';
                btn.classList.replace('bg-blue-600/20', 'bg-blue-500/40');
                btn.disabled = true;
                
                setTimeout(() => {
                    selectedStar.scanned = true;
                    scannedCount++;
                    document.getElementById('scan-count').innerText = scannedCount;
                    
                    let baseObj = Math.random() * 65; 
                    selectedStar.habitabilityScore = Math.floor(Math.max(0, Math.min(100, baseObj + selectedStar.type.habitabilityBonus)));
                    
                    if (selectedStar.habitabilityScore >= 75) { 
                        selectedStar.habitable = true;
                        habitableCount++;
                        document.getElementById('habitable-count').innerText = habitableCount;
                    } else {
                        selectedStar.habitable = false;
                    }
                    
                    updateDetailsPanel();
                    
                    btn.innerHTML = 'Initiate Deep Scan';
                    btn.classList.replace('bg-blue-500/40', 'bg-blue-600/20');
                    btn.disabled = false;
                    
                    if(habitableCount === 3) {
                        setTimeout(() => alert("Mission Accomplished! You found 3 habitable worlds!"), 500);
                    }
                }, 600);
            }
        });
        
        function initLegend() {
            const legendDiv = document.getElementById('legend');
            let content = '';
            for (let c of spectralClasses) {
                content += \`
                    <div class="star-item text-slate-300 border border-transparent hover:border-slate-600 transition-colors">
                        <div class="star-type-dot" style="background-color: \${c.color}; box-shadow: 0 0 8px \${c.color}"></div>
                        <div class="flex-1 truncate text-xs font-mono font-bold">\${c.class}-Class</div>
                        <div class="text-[10px] text-slate-500 font-mono bg-slate-800 px-1.5 py-0.5 rounded"> \${(c.prob*100).toFixed(c.prob < 0.01 ? 2 : 1)}%</div>
                    </div>
                \`;
            }
            legendDiv.innerHTML = content;
        }
        
        window.addEventListener('resize', resize);
        initLegend();
        resize();
        generateGalaxy();
        
        requestAnimationFrame(function animate() {
            // Apply spring physics style smoothing to 3D camera
            camera.lookX += (targetCamera.lookX - camera.lookX) * 0.08;
            camera.lookY += (targetCamera.lookY - camera.lookY) * 0.08;
            camera.lookZ += (targetCamera.lookZ - camera.lookZ) * 0.08;
            camera.dist += (targetCamera.dist - camera.dist) * 0.08;
            camera.pitch += (targetCamera.pitch - camera.pitch) * 0.08;
            camera.yaw += (targetCamera.yaw - camera.yaw) * 0.08;
            
            draw();
            requestAnimationFrame(animate);
        });
`;

fs.writeFileSync('index.html', beforeScript + newScript + afterScript);

