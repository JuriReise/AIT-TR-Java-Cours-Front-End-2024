const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
resizeCanvas(); // Устанавливаем размер при запуске

// Обновляем размер при изменении окна
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Параметры существа
const numLegs = 12; // Количество ног
const legSegments = 10; // Сегменты на ноге
const segmentLength = 15; // Длина сегмента
const stepFrequency = 0.1; // Частота шага (ускорена)
const moveSpeed = 0.12; // Скорость движения центра
const maxLegDistance = 150; // Максимальная длина ног

// Центр существа
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let targetX = centerX;
let targetY = centerY;

// Генерация звёзд для фона
const stars = Array.from({ length: 300 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    opacity: Math.random() * 0.5 + 0.3,
}));

// Ноги
let legs = [];
for (let i = 0; i < numLegs; i++) {
    legs.push({
        baseAngle: (Math.PI * 2 * i) / numLegs,
        currentX: centerX,
        currentY: centerY,
        targetX: centerX,
        targetY: centerY,
        phase: Math.random() * Math.PI * 2,
    });
}

// Обработка движения мышки
canvas.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

// Рисование звёздного неба
function drawStars() {
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });
}

// Обновление положения ног
function updateLegs() {
    legs.forEach((leg) => {
        if (Math.sin(leg.phase) > 0.95) {
            const dx = Math.cos(leg.baseAngle + Math.random() * 0.5) * maxLegDistance;
            const dy = Math.sin(leg.baseAngle + Math.random() * 0.5) * maxLegDistance;
            leg.targetX = centerX + dx;
            leg.targetY = centerY + dy;
        }

        leg.currentX += (leg.targetX - leg.currentX) * 0.3; // Ускоряем ноги
        leg.currentY += (leg.targetY - leg.currentY) * 0.3;
        leg.phase += stepFrequency;
    });
}

// Обновление центра
function updateCenter() {
    centerX += (targetX - centerX) * moveSpeed; // Ускоряем движение центра
    centerY += (targetY - centerY) * moveSpeed;
}

// Рисование ноги
function drawLeg(leg) {
    let x = centerX;
    let y = centerY;

    ctx.beginPath();
    ctx.moveTo(x, y);

    const dx = (leg.currentX - x) / legSegments;
    const dy = (leg.currentY - y) / legSegments;

    for (let i = 0; i < legSegments; i++) {
        const wave = Math.sin(performance.now() * 0.002 + i * 0.5) * 2;
        x += dx + wave;
        y += dy + wave;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "rgba(100, 200, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(100, 200, 255, 0.8)";
    ctx.shadowBlur = 15;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.shadowBlur = 20;
    ctx.fill();
}

// Основная анимация
function animate() {
    drawStars(); // Рисуем звёздное небо

    updateLegs(); // Обновляем ноги
    updateCenter(); // Обновляем центр

    // Рисуем центральное тело
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.shadowColor = "rgba(180, 220, 255, 0.8)";
    ctx.shadowBlur = 50;
    ctx.fill();

    // Рисуем ноги
    legs.forEach((leg) => drawLeg(leg));

    requestAnimationFrame(animate);
}

animate();
