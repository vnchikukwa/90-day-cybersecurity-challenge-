const TOTAL_DAYS = 90;
const STORAGE_KEY = "cyber90-progress";
const START_KEY = "cyber90-start";

const missions = [
  ["Cybersecurity roles", "Map the security landscape and choose a learning track."],
  ["CIA triad", "Explain confidentiality, integrity, and availability."],
  ["Risk basics", "Learn threat, vulnerability, likelihood, and impact."],
  ["Networking OSI", "Study the seven layers and common protocols."],
  ["TCP/IP", "Trace IP, TCP, UDP, DNS, HTTP, and HTTPS."],
  ["Linux files", "Practice navigation, permissions, and package tools."],
  ["Linux process", "Inspect processes, logs, pipes, and redirection."],
  ["Windows basics", "Explore services, users, Event Viewer, and PowerShell."],
  ["Virtual lab", "Create an isolated lab with snapshots and no production access."],
  ["Python I", "Write variables, loops, functions, and file readers."],
  ["Python II", "Use subprocesses, requests, and standard libraries safely."],
  ["Hashing", "Compare SHA-256 hashes and verify file integrity."],
  ["Encoding", "Practice Base64, hex, and URL encoding."],
  ["Cryptography", "Compare symmetric, asymmetric, and public-key systems."],
  ["Wireshark", "Capture a harmless local packet flow and inspect it."],
  ["DNS", "Resolve names and inspect DNS queries and responses."],
  ["HTTP", "Study methods, status codes, headers, and cookies."],
  ["Firewall", "Create and test rules in a disposable lab."],
  ["Nmap", "Discover hosts and services in your own lab."],
  ["Scanning ethics", "Review scope, authorization, and safe testing boundaries."],
  ["OpenVAS concept", "Learn vulnerability-management workflows."],
  ["Asset inventory", "Build a small inventory of lab assets and owners."],
  ["Authentication", "Compare passwords, MFA, SSO, and access tokens."],
  ["Authorization", "Study least privilege and role-based access control."],
  ["OWASP map", "Review the Top 10 web-risk categories."],
  ["SQL injection lab", "Complete an authorized vulnerable-app lesson."],
  ["XSS lab", "Complete an authorized vulnerable-app lesson."],
  ["Security controls", "Classify preventive, detective, and corrective controls."],
  ["Career plan", "Choose a goal and map resources for it."],
  ["Foundation recap", "Review notes and complete a knowledge check."],
];

const extra = [
  ["SIEM", "Ingest sample logs and create a useful query."],
  ["Windows events", "Investigate authentication and service events."],
  ["Linux logs", "Correlate auth, system, and application logs."],
  ["Detection rules", "Write a simple rule for an observable behavior."],
  ["MITRE ATT&CK", "Map one attack technique to data sources."],
  ["YARA", "Build a safe pattern signature for lab files."],
  ["Malware analysis I", "Use static strings without executing unknown code."],
  ["Malware analysis II", "Document behavior using an isolated sandbox."],
  ["Digital forensics", "Preserve evidence and calculate a file hash."],
  ["Memory analysis", "Learn acquisition and Volatility workflows."],
  ["Incident response", "Define preparation, containment, and recovery."],
  ["Incident tabletop", "Run a fictional ransomware exercise."],
  ["Log correlation", "Combine network, endpoint, and identity events."],
  ["Network segmentation", "Design zones and controlled trust boundaries."],
  ["Zero trust", "Explain identity, device, and context-aware decisions."],
  ["Threat modeling", "Create a simple data-flow diagram and find threats."],
  ["Secure SDLC", "Map security activities across development stages."],
  ["Code review", "Find unsafe patterns in deliberately vulnerable code."],
  ["Secrets management", "Replace hard-coded secrets with approved storage."],
  ["Container security", "Review images, privileges, and runtime settings."],
  ["Cloud IAM", "Practice least-privilege role design in a lab."],
  ["Cloud logging", "Enable audit logs and test alert routing."],
  ["API security", "Review authentication, rate limits, and object access."],
  ["Web security", "Configure secure headers and cookie flags."],
  ["TLS", "Inspect certificates and explain trust chains."],
  ["Backup recovery", "Test restore steps and document recovery time."],
  ["BCP/DR", "Define an availability objective and recovery scenario."],
  ["Security metrics", "Choose meaningful measures instead of vanity counts."],
  ["Compliance", "Compare policy, standard, procedure, and control."],
  ["Defense recap", "Summarize the strongest detection or control you learned."],
];

const advanced = [
  ["Pentest scope", "Write an authorized rules-of-engagement document."],
  ["Reconnaissance", "Enumerate public information about a practice target."],
  ["Port analysis", "Use service data to build a test hypothesis."],
  ["Vulnerability mapping", "Link findings to impact and affected components."],
  ["Password audit", "Review policies using controlled lab accounts."],
  ["Active Directory lab", "Study identity relationships in a practice environment."],
  ["Burp basics", "Configure an authorized local web testing proxy."],
  ["Fuzzing concept", "Test malformed input within a lab application."],
  ["Exploit ethics", "Document prerequisites and avoid unintended impact."],
  ["Privilege model", "Trace elevated permissions and boundaries."],
  ["Post-exploit safety", "Practice evidence capture without persistence or harm."],
  ["Reporting", "Write an executive summary and reproducible finding."],
  ["Remediation", "Design and verify a practical fix."],
  ["Purple team", "Create an adversary action and matching detection."],
  ["Automation I", "Parse logs or findings with Python."],
  ["Automation II", "Generate a structured report from collected data."],
  ["Security API", "Call a sanctioned service API and handle errors."],
  ["Portfolio I", "Publish a sanitized write-up of a safe lab project."],
  ["Portfolio II", "Create a reusable troubleshooting or detection guide."],
  ["GitHub security", "Review repository settings and secret scanning."],
  ["Linux hardening", "Apply a baseline and verify it in a lab VM."],
  ["Windows hardening", "Review policies and audit settings in a lab VM."],
  ["Interview prep", "Explain one project using STAR and technical detail."],
  ["Certification review", "Create a 30-minute mock exam or quiz."],
  ["Security blog", "Explain a cybersecurity concept for beginners."],
  ["Red-team notes", "Summarize safe emulation planning and rules."],
  ["Blue-team notes", "Summarize defensive priorities and detections."],
  ["Final lab", "Complete an end-to-end authorized mini-assessment."],
  ["Lessons learned", "Record skills gained and next three improvements."],
  ["Challenge complete", "Celebrate responsibly and plan the next 90 days."],
];

const allMissions = [...missions, ...extra, ...advanced];

const grid = document.querySelector("#challengeGrid");
const startInput = document.querySelector("#startDate");
let activePhase = "all";

function localDateString(date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function todayString() { return localDateString(new Date()); }

function getStartDate() {
  const saved = localStorage.getItem(START_KEY);
  if (saved) return new Date(`${saved}T00:00:00`);
  const today = new Date();
  const value = localDateString(today);
  localStorage.setItem(START_KEY, value);
  return today;
}

function getCompleted() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); }
  catch { return new Set(); }
}

function saveCompleted(completed) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed].sort((a, b) => a - b)));
}

function phaseForDay(day) {
  if (day <= 30) return "foundation";
  if (day <= 60) return "defense";
  return "advanced";
}

function renderCards() {
  const completed = getCompleted();
  grid.innerHTML = "";

  allMissions.forEach(([title, description], index) => {
    const day = index + 1;
    if (activePhase !== "all" && phaseForDay(day) !== activePhase) return;

    const card = document.createElement("article");
    card.className = `challenge-card${completed.has(day) ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed.has(day);
    checkbox.setAttribute("aria-label", `Mark day ${day} complete`);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) completed.add(day); else completed.delete(day);
      saveCompleted(completed);
      renderCards();
      updateProgress();
    });

    card.innerHTML = `<div class="day-number">DAY ${String(day).padStart(2, "0")}</div>
      <div><h3>${title}</h3><p>${description}</p></div>`;
    card.appendChild(checkbox);
    grid.appendChild(card);
  });
}

function updateProgress() {
  const completed = getCompleted();
  const percent = Math.round(completed.size / TOTAL_DAYS * 100);
  document.querySelector("#completedCount").textContent = completed.size;
  document.querySelector("#remainingCount").textContent = Math.max(TOTAL_DAYS - completed.size, 0);
  document.querySelector("#progressPercent").textContent = `${percent}%`;
  document.querySelector("#progressRing").style.setProperty("--progress", `${percent * 3.6}deg`);
}

function updateCountdown() {
  const start = getStartDate();
  const end = new Date(start);
  end.setDate(end.getDate() + TOTAL_DAYS);
  end.setHours(0, 0, 0, 0);

  const now = new Date();
  let remaining = end.getTime() - now.getTime();
  const expired = remaining <= 0;
  if (expired) remaining = 0;

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor(remaining / 3600000) % 24;
  const minutes = Math.floor(remaining / 60000) % 60;
  const seconds = Math.floor(remaining / 1000) % 60;

  document.querySelector("#days").textContent = String(days).padStart(2, "0");
  document.querySelector("#hours").textContent = String(hours).padStart(2, "0");
  document.querySelector("#minutes").textContent = String(minutes).padStart(2, "0");
  document.querySelector("#seconds").textContent = String(seconds).padStart(2, "0");
  document.querySelector("#endDate").textContent = end.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  document.querySelector("#statusText").textContent = expired ? "CHALLENGE COMPLETE" : "CHALLENGE ACTIVE";
}

const initialStart = getStartDate();
startInput.value = localDateString(initialStart);
startInput.addEventListener("change", () => {
  if (!startInput.value) return;
  localStorage.setItem(START_KEY, startInput.value);
  updateCountdown();
});

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active")?.classList.remove("active");
    tab.classList.add("active");
    activePhase = tab.dataset.phase;
    renderCards();
  });
});

document.querySelector("#resetProgress").addEventListener("click", () => {
  if (!window.confirm("Reset all completed challenge tasks?")) return;
  localStorage.removeItem(STORAGE_KEY);
  renderCards();
  updateProgress();
});

renderCards();
updateProgress();
updateCountdown();
setInterval(updateCountdown, 1000);
