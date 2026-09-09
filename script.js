/**
 * ==========================================================================
 * AMMAR MAHER ABDEL-JALIL EL-QAMAR | MECHATRONICS & QURAN HAFIZ PORTFOLIO
 * Core JavaScript Engine: Mechatronics Loader, Robotics Simulator, Theme Engine
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initMechaLoader();
  initTypingEffect();
  initRoboticArmSimulator();
  initMobileNav();
  initProjectModals();
  initContactForm();
});

/* ==========================================================================
   1. THEME ENGINE (Dark / Light Mode with LocalStorage)
   ========================================================================== */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Check persisted preference or default to dark
  const savedTheme = localStorage.getItem('ammar_theme') || 'dark';
  applyTheme(savedTheme);
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
  
  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '🌙';
      localStorage.setItem('ammar_theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
      localStorage.setItem('ammar_theme', 'dark');
    }
  }
}

/* ==========================================================================
   2. MECHATRONICS INTRO LOADING SEQUENCE
   ========================================================================== */
function initMechaLoader() {
  const loader = document.getElementById('mecha-loader');
  const progressBar = document.getElementById('loaderBarFill');
  const progressPercent = document.getElementById('loaderPercent');
  const terminalConsole = document.getElementById('loaderTerminal');
  const skipBtn = document.getElementById('skipLoaderBtn');
  
  if (!loader) return;
  
  const diagnosticLogs = [
    { text: ">> [SYS_BOOT] Mechatronics Core Engine v2.4 initialized...", cls: "active", delay: 250 },
    { text: ">> [KINEMATICS] Joint actuators & gear meshes calibrated.", cls: "", delay: 700 },
    { text: ">> [SENSORS] Reading optical encoders, LiDAR & IMU bus...", cls: "", delay: 1200 },
    { text: ">> [CONTROL_LOOP] Digital PID closed-loop kernels: ONLINE", cls: "success", delay: 1750 },
    { text: ">> [SPIRIT_MIND] Quranic memorization & ethical discipline SYNCED.", cls: "quran-line", delay: 2250 },
    { text: ">> [READY] Welcome Engineer Ammar Maher Abdel-Jalil El-Qamar.", cls: "success", delay: 2700 }
  ];
  
  let currentProgress = 0;
  let isFinished = false;
  
  // Progress animation
  const duration = 2900;
  const intervalTime = 40;
  const increment = 100 / (duration / intervalTime);
  
  const progressInterval = setInterval(() => {
    currentProgress += increment;
    if (currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(progressInterval);
      completeLoader();
    }
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.floor(currentProgress))}%`;
    if (progressPercent) progressPercent.textContent = `${Math.min(100, Math.floor(currentProgress))}%`;
  }, intervalTime);
  
  // Terminal log streaming
  diagnosticLogs.forEach(log => {
    setTimeout(() => {
      if (isFinished || !terminalConsole) return;
      const line = document.createElement('div');
      line.className = `terminal-line ${log.cls}`;
      line.textContent = log.text;
      terminalConsole.appendChild(line);
      terminalConsole.scrollTop = terminalConsole.scrollHeight;
    }, log.delay);
  });
  
  function completeLoader() {
    if (isFinished) return;
    isFinished = true;
    clearInterval(progressInterval);
    if (progressBar) progressBar.style.width = "100%";
    if (progressPercent) progressPercent.textContent = "100%";
    
    setTimeout(() => {
      loader.classList.add('loaded');
      document.body.style.overflow = '';
    }, 400);
  }
  
  if (skipBtn) {
    skipBtn.addEventListener('click', completeLoader);
  }
  
  // Allow user to replay loader from header or footer if desired
  window.replayIntroLoader = function() {
    loader.classList.remove('loaded');
    terminalConsole.innerHTML = '';
    currentProgress = 0;
    initMechaLoader();
  };
}

/* ==========================================================================
   3. DYNAMIC HERO TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingTarget = document.getElementById('heroTypingText');
  if (!typingTarget) return;
  
  const roles = [
    "Mechatronics Engineering Student",
    "Hafiz of the Holy Quran",
    "Robotics & Control Systems Specialist",
    "Embedded Hardware & Firmware Builder",
    "Kinematics & CAD Mechanism Designer"
  ];
  
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 70;
  
  function typeTick() {
    const currentWord = roles[roleIdx];
    
    if (isDeleting) {
      typingTarget.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      typingTarget.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 75;
    }
    
    if (!isDeleting && charIdx === currentWord.length) {
      typingSpeed = 1900; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 450;
    }
    
    setTimeout(typeTick, typingSpeed);
  }
  
  setTimeout(typeTick, 1000);
}

/* ==========================================================================
   4. INTERACTIVE MECHATRONICS LAB SIMULATOR (2-DOF ROBOTIC ARM)
   ========================================================================== */
function initRoboticArmSimulator() {
  const canvas = document.getElementById('robotArmCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Sliders and Readouts
  const sliderTheta1 = document.getElementById('sliderTheta1');
  const sliderTheta2 = document.getElementById('sliderTheta2');
  const valTheta1 = document.getElementById('valTheta1');
  const valTheta2 = document.getElementById('valTheta2');
  const btnToggleGripper = document.getElementById('btnToggleGripper');
  const btnAutoTrack = document.getElementById('btnAutoTrack');
  const btnResetArm = document.getElementById('btnResetArm');
  
  const readoutX = document.getElementById('readoutX');
  const readoutY = document.getElementById('readoutY');
  const readoutMode = document.getElementById('readoutMode');
  const readoutGripper = document.getElementById('readoutGripper');
  
  // Kinematics Configuration
  let base = { x: 0, y: 0 };
  let l1 = 125;
  let l2 = 105;
  
  let theta1 = -45 * (Math.PI / 180); // radians
  let theta2 = 70 * (Math.PI / 180);
  
  let targetTheta1 = theta1;
  let targetTheta2 = theta2;
  
  let isGripperClosed = false;
  let isAutoTracking = true;
  
  let mouseTarget = { x: 0, y: 0 };
  let isInteracting = false;
  
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    
    base.x = rect.width / 2;
    base.y = rect.height * 0.85;
    
    // Scale arm length dynamically based on screen width
    const minDim = Math.min(rect.width, rect.height);
    l1 = minDim * 0.38;
    l2 = minDim * 0.32;
    
    if (mouseTarget.x === 0) {
      mouseTarget.x = base.x + l1 * 0.5;
      mouseTarget.y = base.y - (l1 + l2) * 0.6;
    }
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  // Forward Kinematics
  function getArmJoints(t1, t2) {
    const j1 = {
      x: base.x + l1 * Math.cos(t1),
      y: base.y + l1 * Math.sin(t1)
    };
    const j2 = {
      x: j1.x + l2 * Math.cos(t1 + t2),
      y: j1.y + l2 * Math.sin(t1 + t2)
    };
    return { base, j1, endEffector: j2 };
  }
  
  // 2-DOF Analytic Inverse Kinematics
  function solveIK(targetX, targetY) {
    const dx = targetX - base.x;
    const dy = targetY - base.y;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);
    
    // Clamp to reachable workspace
    const maxReach = (l1 + l2) * 0.98;
    const minReach = Math.abs(l1 - l2) * 1.05;
    
    let clampedDist = Math.max(minReach, Math.min(maxReach, dist));
    let scale = clampedDist / (dist || 1);
    let rx = dx * scale;
    let ry = dy * scale;
    
    // Law of Cosines
    const cosAngle2 = (rx * rx + ry * ry - l1 * l1 - l2 * l2) / (2 * l1 * l2);
    const clampedCos2 = Math.max(-1, Math.min(1, cosAngle2));
    const t2 = Math.acos(clampedCos2); // elbow down
    
    const angleToTarget = Math.atan2(ry, rx);
    const angleK = Math.atan2(l2 * Math.sin(t2), l1 + l2 * Math.cos(t2));
    const t1 = angleToTarget - angleK;
    
    return { t1, t2 };
  }
  
  // Event Listeners for Touch and Mouse
  function handlePointer(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    mouseTarget.x = x;
    mouseTarget.y = y;
    
    if (isAutoTracking) {
      const ik = solveIK(x, y);
      targetTheta1 = ik.t1;
      targetTheta2 = ik.t2;
    }
  }
  
  canvas.addEventListener('mousemove', (e) => {
    handlePointer(e.clientX, e.clientY);
  });
  
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      isInteracting = true;
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
  
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
  
  // Slider Controls
  if (sliderTheta1) {
    sliderTheta1.addEventListener('input', (e) => {
      isAutoTracking = false;
      targetTheta1 = (parseFloat(e.target.value) * Math.PI) / 180;
      updateControlLabels();
    });
  }
  
  if (sliderTheta2) {
    sliderTheta2.addEventListener('input', (e) => {
      isAutoTracking = false;
      targetTheta2 = (parseFloat(e.target.value) * Math.PI) / 180;
      updateControlLabels();
    });
  }
  
  if (btnToggleGripper) {
    btnToggleGripper.addEventListener('click', () => {
      isGripperClosed = !isGripperClosed;
      btnToggleGripper.textContent = isGripperClosed ? 'Gripper: [CLAMPED]' : 'Gripper: [OPEN]';
      if (readoutGripper) readoutGripper.textContent = isGripperClosed ? 'CLAMPED' : 'OPEN';
    });
  }
  
  if (btnAutoTrack) {
    btnAutoTrack.addEventListener('click', () => {
      isAutoTracking = !isAutoTracking;
      btnAutoTrack.classList.toggle('btn-primary', isAutoTracking);
      btnAutoTrack.classList.toggle('btn-secondary', !isAutoTracking);
      btnAutoTrack.textContent = isAutoTracking ? 'Tracking Mode: [ON]' : 'Tracking Mode: [OFF]';
      if (readoutMode) readoutMode.textContent = isAutoTracking ? 'CLOSED-LOOP IK' : 'MANUAL JOINT';
    });
  }
  
  if (btnResetArm) {
    btnResetArm.addEventListener('click', () => {
      isAutoTracking = true;
      targetTheta1 = -45 * (Math.PI / 180);
      targetTheta2 = 70 * (Math.PI / 180);
      if (btnAutoTrack) {
        btnAutoTrack.classList.add('btn-primary');
        btnAutoTrack.classList.remove('btn-secondary');
        btnAutoTrack.textContent = 'Tracking Mode: [ON]';
      }
      if (readoutMode) readoutMode.textContent = 'CLOSED-LOOP IK';
    });
  }
  
  function updateControlLabels() {
    const deg1 = Math.round((theta1 * 180) / Math.PI);
    const deg2 = Math.round((theta2 * 180) / Math.PI);
    if (valTheta1) valTheta1.textContent = `${deg1}°`;
    if (valTheta2) valTheta2.textContent = `${deg2}°`;
    if (sliderTheta1 && !sliderTheta1.matches(':active')) sliderTheta1.value = deg1;
    if (sliderTheta2 && !sliderTheta2.matches(':active')) sliderTheta2.value = deg2;
  }
  
  // Animation / Render Loop
  function renderSim() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    
    // Smooth PID / Damped interpolation towards target angles
    const smoothing = 0.12;
    theta1 += (targetTheta1 - theta1) * smoothing;
    theta2 += (targetTheta2 - theta2) * smoothing;
    
    updateControlLabels();
    
    const joints = getArmJoints(theta1, theta2);
    
    // Update Telemetry Display
    if (readoutX) readoutX.textContent = `${Math.round(joints.endEffector.x - base.x)} mm`;
    if (readoutY) readoutY.textContent = `${Math.round(base.y - joints.endEffector.y)} mm`;
    
    // Clear Canvas
    ctx.clearRect(0, 0, w, h);
    
    // 1. Draw Grid Lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSpacing = 24;
    for (let x = 0; x < w; x += gridSpacing) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSpacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    
    // 2. Draw Kinematic Reach Boundary (Subtle Circle)
    ctx.beginPath();
    ctx.arc(base.x, base.y, l1 + l2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // 3. Draw Target Crosshair if Auto Tracking
    if (isAutoTracking) {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(mouseTarget.x, mouseTarget.y, 8, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(mouseTarget.x - 12, mouseTarget.y);
      ctx.lineTo(mouseTarget.x + 12, mouseTarget.y);
      ctx.moveTo(mouseTarget.x, mouseTarget.y - 12);
      ctx.lineTo(mouseTarget.x, mouseTarget.y + 12);
      ctx.stroke();
    }
    
    // 4. Draw Heavy Robotic Base Pedestal
    ctx.fillStyle = '#111827';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(base.x - 45, base.y, 90, 22, 6);
    ctx.fill();
    ctx.stroke();
    
    // Base turntable hub
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(base.x, base.y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // 5. Draw Link 1 (Aluminum Truss Beam)
    drawRoboticLink(base, joints.j1, l1, '#3b82f6', '#00f0ff');
    
    // 6. Draw Joint 1 Actuator Hub (Servo)
    drawActuatorHub(joints.j1.x, joints.j1.y, '#f59e0b');
    
    // 7. Draw Link 2 (Carbon Fiber Forearm)
    drawRoboticLink(joints.j1, joints.endEffector, l2, '#0284c7', '#00f0ff');
    
    // 8. Draw End-Effector / Gripper
    drawGripper(joints.endEffector, theta1 + theta2, isGripperClosed);
    
    requestAnimationFrame(renderSim);
  }
  
  function drawRoboticLink(p1, p2, length, color1, color2) {
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const linkWidth = 14;
    
    ctx.save();
    ctx.translate(p1.x, p1.y);
    ctx.rotate(angle);
    
    // Gradient Link body
    const grad = ctx.createLinearGradient(0, -linkWidth / 2, length, linkWidth / 2);
    grad.addColorStop(0, '#162033');
    grad.addColorStop(0.5, '#1e2d48');
    grad.addColorStop(1, '#162033');
    
    ctx.fillStyle = grad;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.roundRect(0, -linkWidth / 2, length, linkWidth, 7);
    ctx.fill();
    ctx.stroke();
    
    // Center engineering skeleton groove
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(length - 12, 0);
    ctx.stroke();
    
    // Subtle bolt fasteners
    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.arc(12, 0, 2.5, 0, Math.PI * 2);
    ctx.arc(length - 12, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
  
  function drawActuatorHub(x, y, accentColor) {
    ctx.save();
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  
  function drawGripper(point, totalAngle, clamped) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(totalAngle);
    
    // Wrist flange
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(0, -8, 8, 16, 3);
    ctx.fill();
    ctx.stroke();
    
    // Two-jaw parallel pneumatic gripper
    const jawSpread = clamped ? 3 : 9;
    
    ctx.strokeStyle = clamped ? '#10b981' : '#00f0ff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    // Top jaw
    ctx.beginPath();
    ctx.moveTo(8, -jawSpread);
    ctx.lineTo(20, -jawSpread);
    ctx.lineTo(24, -jawSpread + 4);
    ctx.stroke();
    
    // Bottom jaw
    ctx.beginPath();
    ctx.moveTo(8, jawSpread);
    ctx.lineTo(20, jawSpread);
    ctx.lineTo(24, jawSpread - 4);
    ctx.stroke();
    
    // Laser pointer dot
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(22, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
  
  // Start simulation loop
  requestAnimationFrame(renderSim);
}

/* ==========================================================================
   5. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const openBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links a');
  
  if (!drawer) return;
  
  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  
  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  
  // Close when tapping backdrop
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });
  
  // Close when tapping any link
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   6. PROJECT MODAL POPUP SYSTEM
   ========================================================================== */
function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalBody = document.getElementById('modalBody');
  const detailButtons = document.querySelectorAll('.btn-project-detail');
  
  if (!modalOverlay) return;
  
  const projectDatabase = {
    "robot-slam": {
      title: "Autonomous Mobile Robot (SLAM & Obstacle Avoidance)",
      category: "ROBOTICS & EMBEDDED C++",
      content: `
        <p><strong>System Architecture:</strong> Differential drive autonomous ground robot running real-time SLAM (Simultaneous Localization and Mapping) with 2D 360-degree LiDAR and ultrasonic sensor array.</p>
        <br>
        <h4>Hardware & Electronics:</h4>
        <ul style="padding-left: 20px; margin-top: 8px; line-height: 1.8;">
          <li>STM32 ARM Cortex-M4 primary motor & odometry controller.</li>
          <li>Raspberry Pi 4 running ROS2 (Robot Operating System) navigation stack.</li>
          <li>Dual high-torque DC motors with 1024-PPR quadrature optical encoders.</li>
          <li>L298N / Dual H-Bridge motor drivers with isolated logic optocouplers.</li>
        </ul>
        <br>
        <h4>Control & Firmware:</h4>
        <ul style="padding-left: 20px; margin-top: 8px; line-height: 1.8;">
          <li>Closed-loop discrete PID velocity control running at 100 Hz.</li>
          <li>Extended Kalman Filter (EKF) sensor fusion combining IMU gyroscope and wheel encoders.</li>
          <li>A* and Dynamic Window Approach (DWA) local trajectory planning.</li>
        </ul>
      `
    },
    "robotic-arm": {
      title: "4-DOF Articulated Robotic Arm with Computer Vision",
      category: "KINEMATICS & MACHINE VISION",
      content: `
        <p><strong>System Architecture:</strong> 4 Degrees of Freedom articulated manipulator with computer vision for automatic object identification, sorting, and precision pick-and-place.</p>
        <br>
        <h4>Kinematics & Mechanics:</h4>
        <ul style="padding-left: 20px; margin-top: 8px; line-height: 1.8;">
          <li>Denavit-Hartenberg (D-H) parameter modeling and geometric inverse kinematics solver.</li>
          <li>SolidWorks generative CAD design optimized for 3D printed PETG/carbon-nylon links.</li>
          <li>High-torque metal gear digital coreless servos with feedback potentiometers.</li>
        </ul>
        <br>
        <h4>Vision & Software:</h4>
        <ul style="padding-left: 20px; margin-top: 8px; line-height: 1.8;">
          <li>OpenCV color space thresholding and contour moment detection for coordinate mapping.</li>
          <li>Homography calibration matrix converting pixel space to robot base coordinates.</li>
        </ul>
      `
    },
    "iot-station": {
      title: "Smart IoT Industrial Sorting & Inspection Station",
      category: "INDUSTRIAL AUTOMATION & IOT",
      content: `
        <p><strong>System Architecture:</strong> Modular automated conveyor belt sorting station equipped with inductive, capacitive, and optical sensors for real-time parts classification.</p>
        <br>
        <h4>Automation Components:</h4>
        <ul style="padding-left: 20px; margin-top: 8px; line-height: 1.8;">
          <li>Siemens S7-1200 PLC / ESP32 dual control with ladder logic and C++ firmware.</li>
          <li>Pneumatic ejector pistons actuated via 5/2 solenoid valves and pressure regulators.</li>
          <li>Proximity inductive sensors detecting metallic vs non-metallic items.</li>
        </ul>
        <br>
        <h4>Cloud & Telemetry:</h4>
        <ul style="padding-left: 20px; margin-top: 8px; line-height: 1.8;">
          <li>MQTT telemetry publish-subscribe broker for real-time cycle counting.</li>
          <li>Web-based SCADA dashboard tracking sorting yield, error rates, and uptime.</li>
        </ul>
      `
    },
    "pid-controller": {
      title: "Precision Closed-Loop PID Motor Speed Controller",
      category: "CONTROL THEORY & DSP",
      content: `
        <p><strong>System Architecture:</strong> High-precision embedded digital controller for brushless and brushed DC motors under varying mechanical loads.</p>
        <br>
        <h4>Control Theory Implementation:</h4>
        <ul style="padding-left: 20px; margin-top: 8px; line-height: 1.8;">
          <li>Anti-windup integral clamping and low-pass derivative filtering algorithm.</li>
          <li>Ziegler-Nichols and Cohen-Coon tuning methodologies verified in MATLAB Simulink.</li>
          <li>Zero steady-state error with less than 3% transient overshoot under 100% step disturbance.</li>
        </ul>
        <br>
        <h4>Hardware:</h4>
        <ul style="padding-left: 20px; margin-top: 8px; line-height: 1.8;">
          <li>Custom PCB board with onboard current sensing (shunt resistor + differential op-amp).</li>
          <li>OLED live telemetry graph displaying setpoint vs real-time RPM curve.</li>
        </ul>
      `
    }
  };
  
  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDatabase[projectId];
      if (data) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalBody.innerHTML = data.content;
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. INTERACTIVE CONTACT FORM & TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('contactToast');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const msgInput = document.getElementById('formMessage');
    
    if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
      alert("Please fill in all fields before transmitting.");
      return;
    }
    
    // Simulate telemetry transmission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Transmitting Message...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      form.reset();
      
      // Show Toast Notification
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4500);
      }
    }, 900);
  });
}
