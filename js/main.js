// Course data — replace "src" with a real video file/URL per lesson
const LESSONS = [
  {
    id: 1,
    t: "Welcome, And start new project",
    d: "5:10",
    s: "Install Studio One, create your first song and find your way around the workspace.",
    src: "videos/lesson1.mp4",
  },
  {
    id: 2,
    t: "Explain inputs and outputs",
    d: "6:08",
    s: "Choose drivers, set buffer size and sample rate, and check your inputs and outputs.",
    src: "videos/lesson2.mp4",
  },
  {
    id: 3,
    t: "Explore Main Lists",
    d: "2:43",
    s: "Arm a track, set gain correctly, record a take and keep your session organized.",
    src: "videos/lesson3.mp4",
  },
  {
    id: 4,
    t: "Fundamentals audio track",
    d: "5:27",
    s: "Load an instrument, play it from a keyboard and edit notes in the piano roll.",
    src: "videos/lesson4.mp4",
  },
  {
    id: 5,
    t: "Metronom Fundamentals",
    d: "7:09",
    s: "Split clips, build fades and fix timing so your takes sit tight.",
    src: "videos/lesson5.mp4",
  },
  {
    id: 6,
    t: "Basic Transport Commands",
    d: "3:33",
    s: "Balance a mix with faders and panning, then carve space with EQ.",
    src: "videos/lesson6.mp4",
  },
  {
    id: 7,
    t: " Basic Recording",
    d: "5:00",
    s: "Control dynamics, add space with reverb and use sends and inserts.",
    src: "videos/lesson7.mp4",
  },
  {
    id: 8,
    t: "Exporting and mastering your song",
    d: "2:12",
    s: "Finish with a master chain and export in the right formats.",
    src: "videos/lesson8.mp4",
  },
];
const KEY = "sof-progress";
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { done: [], cur: 1 };
  } catch (e) {
    return { done: [], cur: 1 };
  }
}
function save(s) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch (e) {}
}
// Animated waveform. cv._on = true makes it "play" at full level.
function wave(cv) {
  const c = cv.getContext("2d"),
    still = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let t = 0,
    lvl = 0.35;
  function draw() {
    const r = devicePixelRatio || 1,
      w = cv.clientWidth,
      h = cv.clientHeight;
    if (cv.width !== w * r) {
      cv.width = w * r;
      cv.height = h * r;
    }
    c.setTransform(r, 0, 0, r, 0, 0);
    c.clearRect(0, 0, w, h);
    lvl += ((cv._on ? 1 : 0.35) - lvl) * 0.08;
    for (let x = 4; x < w; x += 7) {
      const a =
        Math.abs(
          Math.sin(x * 0.045 + t) * 0.5 +
            Math.sin(x * 0.013 - t * 0.7) * 0.35 +
            Math.sin(x * 0.11 + t * 1.9) * 0.15,
        ) * lvl;
      const bh = Math.max(3, a * h * 0.85);
      c.fillStyle = a > 0.8 ? "#ffb020" : a > 0.55 ? "#5aa6ff" : "#2f8cff";
      c.fillRect(x, (h - bh) / 2, 4, bh);
    }
    if (!still) {
      t += 0.04;
      requestAnimationFrame(draw);
    }
  }
  draw();
}
