const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resetButton = document.getElementById("resetButton");
const resultTitle = document.getElementById("resultTitle");
const resultCopy = document.getElementById("resultCopy");

const prizes = [
  {
    label: "Better Luck Next Time",
    detail: "No prize this spin. Invite the next customer to try.",
    weight: 20,
    color: "#fff2da",
    text: "#12110c",
    icon: "flower"
  },
  {
    label: "100% OFF Your Bill",
    detail: "Huge win. Confirm with a manager before applying a full bill discount.",
    weight: 2.5,
    color: "#c65a9e",
    text: "#faf8f3",
    icon: "star"
  },
  {
    label: "FREE Americano",
    detail: "Customer wins one free Americano.",
    weight: 5,
    color: "#6fc6d6",
    text: "#faf8f3",
    icon: "cup"
  },
  {
    label: "10% OFF Your Bill",
    detail: "Customer wins 10% off their bill.",
    weight: 3.3334,
    color: "#fff2da",
    text: "#12110c",
    icon: "star"
  },
  {
    label: "Free Muffin",
    detail: "Customer wins one free muffin.",
    weight: 2.5,
    color: "#fff2da",
    text: "#12110c",
    icon: "muffin"
  },
  {
    label: "Better Luck Next Time",
    detail: "No prize this spin. Invite the next customer to try.",
    weight: 20,
    color: "#f0645a",
    text: "#faf8f3",
    icon: "flower"
  },
  {
    label: "30% OFF Cake",
    detail: "Customer wins 30% off any cake.",
    weight: 2.5,
    color: "#fff2da",
    text: "#12110c",
    icon: "cake"
  },
  {
    label: "FREE Coffee for THIS Year",
    detail: "Big coffee prize. Confirm the campaign rules before claiming.",
    weight: 5,
    color: "#eba24e",
    text: "#12110c",
    icon: "cup"
  },
  {
    label: "5% OFF Your Bill",
    detail: "Customer wins 5% off their bill.",
    weight: 3.3333,
    color: "#fff2da",
    text: "#12110c",
    icon: "star"
  },
  {
    label: "20% OFF Your Bill",
    detail: "Customer wins 20% off their bill.",
    weight: 3.3333,
    color: "#6fc6d6",
    text: "#faf8f3",
    icon: "star"
  },
  {
    label: "Better Luck Next Time",
    detail: "No prize this spin. Invite the next customer to try.",
    weight: 20,
    color: "#fff2da",
    text: "#12110c",
    icon: "flower"
  },
  {
    label: "Free Muffin",
    detail: "Customer wins one free muffin.",
    weight: 2.5,
    color: "#eba24e",
    text: "#12110c",
    icon: "muffin"
  },
  {
    label: "FREE Croissant",
    detail: "Customer wins one free croissant.",
    weight: 5,
    color: "#fff2da",
    text: "#12110c",
    icon: "croissant"
  },
  {
    label: "FREE Pastry",
    detail: "Customer wins one free pastry.",
    weight: 5,
    color: "#f0645a",
    text: "#faf8f3",
    icon: "cake"
  }
];

const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
const segmentAngle = (Math.PI * 2) / prizes.length;
let currentRotation = 0;
let isSpinning = false;

function drawIcon(type, x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(2, size * 0.07);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (type === "cup") {
    ctx.strokeRect(-size * 0.28, -size * 0.18, size * 0.42, size * 0.34);
    ctx.beginPath();
    ctx.arc(size * 0.18, -size * 0.01, size * 0.14, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-size * 0.32, size * 0.28);
    ctx.lineTo(size * 0.24, size * 0.28);
    ctx.stroke();
  }

  if (type === "star") {
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const radius = i % 2 === 0 ? size * 0.34 : size * 0.13;
      const angle = -Math.PI / 2 + (i * Math.PI) / 5;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }

  if (type === "croissant") {
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.3, -0.75, 2.35);
    ctx.arc(size * 0.13, 0, size * 0.25, 2.42, -0.85, true);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-size * 0.18, size * 0.08);
    ctx.lineTo(size * 0.13, -size * 0.11);
    ctx.moveTo(-size * 0.06, size * 0.19);
    ctx.lineTo(size * 0.21, size * 0.02);
    ctx.stroke();
  }

  if (type === "cake") {
    ctx.beginPath();
    ctx.moveTo(-size * 0.28, size * 0.22);
    ctx.lineTo(size * 0.28, size * 0.22);
    ctx.lineTo(size * 0.2, -size * 0.18);
    ctx.lineTo(-size * 0.24, -size * 0.08);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-size * 0.16, -size * 0.02);
    ctx.lineTo(size * 0.16, -size * 0.08);
    ctx.stroke();
  }

  if (type === "bean") {
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.22, size * 0.34, -0.55, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-size * 0.03, -size * 0.25);
    ctx.bezierCurveTo(size * 0.12, -size * 0.08, -size * 0.12, size * 0.08, size * 0.04, size * 0.25);
    ctx.stroke();
  }

  if (type === "muffin") {
    ctx.beginPath();
    ctx.moveTo(-size * 0.22, size * 0.06);
    ctx.lineTo(-size * 0.15, size * 0.28);
    ctx.lineTo(size * 0.15, size * 0.28);
    ctx.lineTo(size * 0.22, size * 0.06);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-size * 0.2, size * 0.06);
    ctx.lineTo(-size * 0.12, size * 0.16);
    ctx.lineTo(-size * 0.04, size * 0.06);
    ctx.lineTo(size * 0.04, size * 0.16);
    ctx.lineTo(size * 0.12, size * 0.06);
    ctx.lineTo(size * 0.2, size * 0.06);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, size * 0.02, size * 0.26, size * 0.18, 0, Math.PI, 0, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-size * 0.08, -size * 0.06, size * 0.02, 0, Math.PI * 2);
    ctx.arc(size * 0.07, -size * 0.1, size * 0.02, 0, Math.PI * 2);
    ctx.arc(0, -size * 0.02, size * 0.02, 0, Math.PI * 2);
    ctx.fill();
  }

  if (type === "flower") {
    for (let i = 0; i < 5; i += 1) {
      ctx.save();
      ctx.rotate((i * Math.PI * 2) / 5);
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.2, size * 0.09, size * 0.2, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.05, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawWheel(rotation = 0) {
  const size = canvas.width;
  const center = size / 2;
  const radius = size * 0.47;
  let angle = -Math.PI / 2 + rotation;

  ctx.clearRect(0, 0, size, size);

  prizes.forEach((prize) => {
    const start = angle;
    const end = angle + segmentAngle;
    const mid = start + segmentAngle / 2;

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = prize.color;
    ctx.fill();

    ctx.save();
    ctx.translate(center + Math.cos(mid) * radius * 0.66, center + Math.sin(mid) * radius * 0.66);
    ctx.rotate(mid + Math.PI / 2);
    ctx.fillStyle = prize.text;
    ctx.font = "300 25px Taviraj, Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    wrapText(prize.label, 0, 0, radius * 0.28, 30);
    ctx.restore();

    drawIcon(
      prize.icon,
      center + Math.cos(mid) * radius * 0.28,
      center + Math.sin(mid) * radius * 0.28,
      42,
      prize.text
    );

    angle = end;
  });

  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(189, 83, 33, 0.36)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(center, center, size * 0.074, 0, Math.PI * 2);
  ctx.fillStyle = "#ef4f22";
  ctx.fill();

  ctx.save();
  ctx.translate(center, center);
  drawWheatMark(size * 0.08);
  ctx.restore();
}

function drawWheatMark(size) {
  ctx.strokeStyle = "#faf8f3";
  ctx.lineWidth = Math.max(2, size * 0.06);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(0, size * 0.24);
  ctx.lineTo(0, -size * 0.25);
  ctx.moveTo(0, size * 0.06);
  ctx.quadraticCurveTo(-size * 0.18, -size * 0.02, -size * 0.22, -size * 0.24);
  ctx.moveTo(0, size * 0.02);
  ctx.quadraticCurveTo(size * 0.18, -size * 0.08, size * 0.18, -size * 0.31);
  ctx.moveTo(0, -size * 0.08);
  ctx.quadraticCurveTo(-size * 0.09, -size * 0.22, 0, -size * 0.42);
  ctx.quadraticCurveTo(size * 0.12, -size * 0.23, 0, -size * 0.08);
  ctx.stroke();
}

function wrapText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });

  lines.push(line);
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((lineText, index) => {
    ctx.fillText(lineText, x, startY + index * lineHeight);
  });
}

function pickPrize() {
  let target = Math.random() * totalWeight;
  for (const prize of prizes) {
    target -= prize.weight;
    if (target <= 0) return prize;
  }
  return prizes[prizes.length - 1];
}

function getPrizeCenterAngle(prize) {
  const index = prizes.indexOf(prize);
  return -Math.PI / 2 + index * segmentAngle + segmentAngle / 2;
}

function spin() {
  if (isSpinning) return;
  isSpinning = true;
  spinButton.disabled = true;

  const prize = pickPrize();
  const targetAngle = getPrizeCenterAngle(prize);
  const pointerAngle = -Math.PI / 2;
  const extraTurns = 6 + Math.floor(Math.random() * 3);
  const finalRotation = extraTurns * Math.PI * 2 + pointerAngle - targetAngle;
  const startRotation = currentRotation;
  const rotationChange = finalRotation - (startRotation % (Math.PI * 2));
  const duration = 5200;
  const startedAt = performance.now();

  resultTitle.textContent = "Spinning";
  resultCopy.textContent = "Wait for the wheel to stop before announcing the prize.";

  function animate(now) {
    const elapsed = now - startedAt;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    currentRotation = startRotation + rotationChange * eased;
    drawWheel(currentRotation);

    if (progress < 1) {
      requestAnimationFrame(animate);
      return;
    }

    currentRotation %= Math.PI * 2;
    isSpinning = false;
    spinButton.disabled = false;
    resultTitle.textContent = prize.label;
    resultCopy.textContent = prize.detail;
  }

  requestAnimationFrame(animate);
}

function resetGame() {
  if (isSpinning) return;
  resultTitle.textContent = "Tap spin to play";
  resultCopy.textContent = "Show the customer the wheel and let them spin.";
}

spinButton.addEventListener("click", spin);
resetButton.addEventListener("click", resetGame);
drawWheel();