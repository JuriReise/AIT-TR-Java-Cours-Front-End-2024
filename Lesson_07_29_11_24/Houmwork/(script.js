// Получаем все карточки
const cards = document.querySelectorAll('.card');

// Переменная для хранения текущего аудио
let currentAudio = null;

// Навешиваем обработчики событий на каждую карточку
cards.forEach(card => {
    const audioSrc = card.getAttribute('data-audio'); // Получаем путь к аудио
    const audio = new Audio(audioSrc); // Создаём объект Audio

    // Запускаем аудио при наведении
    card.addEventListener('mouseenter', () => {
        if (currentAudio) {
            currentAudio.pause(); // Останавливаем текущее аудио, если оно играет
            currentAudio.currentTime = 0;
        }
        audio.play(); // Воспроизводим новое аудио
        currentAudio = audio; // Сохраняем текущее аудио
    });

    // Останавливаем аудио при уходе мыши
    card.addEventListener('mouseleave', () => {
        audio.pause();
        audio.currentTime = 0; // Сбрасываем аудио в начало
    });
});
