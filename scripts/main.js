const APP_VERSION = "v6.8.5";
const VERSION_HISTORY = [
    {
        version: "v6.8.5",
        date: "2026-09-30",
        changes: [
            "Виправлено пошук та пагінацію у таблиці «Словник юніта»: фільтрація тепер застосовується до всього масиву карток (по слову, перекладу та контексту) перед накладанням ліміту сторінки"
        ]
    },
    {
        version: "v6.8.4",
        date: "2026-09-30",
        changes: [
            "Автоматичне завантаження 4-колонкових даних модуля у вкладку «Таблиця» при редагуванні",
            "Автоактивація вкладки таблиці для модулів із контекстом та приховування початкової дропзони",
            "Компактна панель дій над таблицею (кнопки додавання рядка, заміни файлу та лічильник слів)",
            "Повний захист контекстних речень від стирання при редагуванні та збереженні"
        ]
    },
    {
        version: "v6.8.3",
        date: "2026-09-30",
        changes: [
            "Виправлено перенесення номерів рядків у прев'ю-таблиці імпорту: встановлено фіксовану ширину 58px та сувору заборону white-space: nowrap"
        ]
    },
    {
        version: "v6.8.2",
        date: "2026-09-30",
        changes: [
            "Розширено контейнер редактора модулів до 1150px без горизонтального скролу",
            "Повноцінний скрол та відображення всіх імпортованих рядків таблиці прев'ю",
            "Додано можливість швидкого інлайн-редагування слів, перекладу та контексту (contenteditable)"
        ]
    },
    {
        version: "v6.8.0",
        date: "2026-09-30",
        changes: [
            "Додано підтримку імпорту Excel (.xlsx, .xls) та CSV з 4 колонками (Слово, Переклад, Контекст, Переклад контексту)",
            "Впроваджено вкладки та Drag-and-Drop дропзону в редакторі створення/редагування модулів",
            "Інтерактивна таблиця попереднього перегляду імпортованих слів та контекстних речень",
            "Умовна доступність контекстних режимів квізу (деактивація режимів для модулів без контексту)"
        ]
    },
    {
        version: "v6.7.6",
        date: "2026-09-30",
        changes: [
            "Візуальний рефакторинг кнопок карток: замінено суцільні яскраві плашки редагування/видалення на легкі прозорі іконки зі стриманим hover-ефектом",
            "Модернізація нижньої панелі дій (Bottom Bar): переведено кнопки імпорту, бекапів та очищення в стильний контурний outline/stroke режим"
        ]
    },
    {
        version: "v6.7.5",
        date: "2026-09-30",
        changes: [
            "Додано інтерактивну зірочку (★) на картки юнітів для закріплення у списку",
            "Закріплені картки автоматично закріплюються нагорі списку",
            "Додано панель статусних фільтрів модулів: «Всі», «★ Обрані», «В процесі», «Нові», «Засвоєні»",
            "Збереження закріплених модулів у LocalStorage та резервних копіях"
        ]
    },
    {
        version: "v6.7.4",
        date: "2026-09-30",
        changes: [
            "Усунено спойлер в автоозвучці (TTS) для контекстних режимів: цільове слово маскується до перевірки відповіді",
            "Замінено випадаючий список кількості питань на швидкі сегментовані кнопки-чіпи (5, 20, 40, 60, 100, 150, Всі)"
        ]
    },
    {
        version: "v6.7.3",
        date: "2026-09-30",
        changes: [
            "Дефолтний фільтр аналітики прогресу встановлено на «Сьогодні» для миттєвого перегляду денних результатів"
        ]
    },
    {
        version: "v6.7.2",
        date: "2026-09-30",
        changes: [
            "Виправлено локалізацію: прибрано шаблон картка(ок) у дашборді модулів",
            "Впроваджено універсальну функцію плюралізації getPlural() для числівників (картки, дні, слова)"
        ]
    },
    {
        version: "v6.7.1",
        date: "2026-09-30",
        changes: [
            "Рефакторинг хедера: об'єднано стрік і кнопку календаря в інтерактивний чіп-бейдж",
            "Оптимізовано модальне вікно календаря: усунено внутрішній скролбар, компактна сітка",
            "Покращено копірайтинг та структуру карток метрик активності (серія, місячний обсяг, рекорд дня, якість)"
        ]
    },
    {
        version: "v6.7.0",
        date: "2026-09-30",
        changes: [
            "Додано інтерактивний Календар активності з Duolingo/GitHub Heatmap (навігація місяців, стрік, продуктивність)",
            "Збереження щоденної активності у LocalStorage (myquiz_activity)",
            "Покращено мобільний UX (<480px): зручні тач-кнопки (min 48px), компактні відступи, захист від горизонтального скролу",
            "Оптимізовано фокус тренування (приховування панелі керування під час тесту)",
            "Оновлено дизайн шапки зі швидким доступом до календаря"
        ]
    },
    {
        version: "v6.6.0",
        date: "2026-09-30",
        changes: [
            "Базова версія перед впровадженням політики версіонування",
            "Виправлено рендер карток зі словами в контексті (парсинг HTML-тегів)",
            "Покращено синтез мовлення (TTS) для контекстних речень",
            "Додано інтерактивну модалку історії версій (Changelog)"
        ]
    }
];

function openChangelogModal() {
    const modal = document.getElementById('changelog-modal');
    if (!modal) return;
    const listEl = document.getElementById('changelog-list');
    if (listEl) {
        listEl.innerHTML = VERSION_HISTORY.map(item => `
            <div class="changelog-item">
                <div class="changelog-header">
                    <span class="changelog-version">${item.version}</span>
                    <span class="changelog-date">${item.date}</span>
                </div>
                <ul class="changelog-changes">
                    ${item.changes.map(ch => `<li>${ch}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }
    modal.classList.add('active');
}

function closeChangelogModal() {
    const modal = document.getElementById('changelog-modal');
    if (modal) modal.classList.remove('active');
}

// Ініціалізація та завантаження локальних даних користувача
if (typeof DEFAULT_MODULES === 'undefined') window.DEFAULT_MODULES = {};

let SAVED_USER_DATA = JSON.parse(localStorage.getItem('my_quiz_modules')) || {};
let ALL_DATA = Object.assign({}, DEFAULT_MODULES, SAVED_USER_DATA);

let MEMORY_STATS = JSON.parse(localStorage.getItem('my_quiz_mem_stats')) || {};
let STREAK_DATA = JSON.parse(localStorage.getItem('my_quiz_streak')) || { count: 0, lastDate: "" };
let ACTIVITY_DATA = JSON.parse(localStorage.getItem('myquiz_activity')) || {};
let PINNED_MODULES = JSON.parse(localStorage.getItem('my_quiz_pinned_modules')) || [];
let CUSTOM_CONTEXT_DATA = JSON.parse(localStorage.getItem('my_quiz_custom_context')) || {};
let currentModuleFilter = 'all';
let currentEditTab = 'text';
let excelParsedData = [];
let calendarViewDate = new Date();

function getLocalDateKey(dateObj = new Date()) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function syncActivityDataFromLogs() {
    let hasNew = false;
    if (Object.keys(ACTIVITY_DATA).length === 0 && MEMORY_STATS) {
        Object.values(MEMORY_STATS).forEach(item => {
            if (item && Array.isArray(item.log)) {
                item.log.forEach(entry => {
                    if (entry && entry.date) {
                        const dateKey = getLocalDateKey(new Date(entry.date));
                        if (!ACTIVITY_DATA[dateKey]) {
                            ACTIVITY_DATA[dateKey] = { cardsReviewed: 0, correct: 0, timeSpentSec: 0 };
                        }
                        ACTIVITY_DATA[dateKey].cardsReviewed += 1;
                        if (entry.isCorrect) ACTIVITY_DATA[dateKey].correct += 1;
                        ACTIVITY_DATA[dateKey].timeSpentSec += Math.round((entry.timeSpentMs || 0) / 1000);
                        hasNew = true;
                    }
                });
            }
        });
        if (hasNew) {
            localStorage.setItem('myquiz_activity', JSON.stringify(ACTIVITY_DATA));
        }
    }
}
syncActivityDataFromLogs();

function recordDailyActivity(isCorrect, timeSpentMs = 0) {
    const dateKey = getLocalDateKey();
    if (!ACTIVITY_DATA[dateKey]) {
        ACTIVITY_DATA[dateKey] = { cardsReviewed: 0, correct: 0, timeSpentSec: 0 };
    }
    ACTIVITY_DATA[dateKey].cardsReviewed += 1;
    if (isCorrect) ACTIVITY_DATA[dateKey].correct += 1;
    ACTIVITY_DATA[dateKey].timeSpentSec += Math.round((timeSpentMs || 0) / 1000);
    localStorage.setItem('myquiz_activity', JSON.stringify(ACTIVITY_DATA));
}

/**
 * Універсальна функція плюралізації (відмінювання числівників) для української мови
 * @param {number} n - число
 * @param {[string, string, string]} forms - форми: [1, 2-4, 5-0] (наприклад, ['картка', 'картки', 'карток'])
 * @param {boolean} [includeNumber=true] - чи додавати саме число до результату
 * @returns {string}
 */
function getPlural(n, forms, includeNumber = true) {
    const num = Math.abs(Number(n) || 0);
    const lastTwo = num % 100;
    const lastOne = num % 10;
    let word = forms[2];
    if (lastTwo < 11 || lastTwo > 19) {
        if (lastOne === 1) {
            word = forms[0];
        } else if (lastOne >= 2 && lastOne <= 4) {
            word = forms[1];
        }
    }
    return includeNumber ? `${num} ${word}` : word;
}

const MONTH_NAMES_UA = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
];

const MONTH_NAMES_GENITIVE_UA = [
    'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
    'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
];

function openCalendarModal() {
    const modal = document.getElementById('calendar-modal');
    if (!modal) return;
    calendarViewDate = new Date();
    renderCalendar();
    modal.classList.add('active');
}

function closeCalendarModal() {
    const modal = document.getElementById('calendar-modal');
    if (modal) modal.classList.remove('active');
}

function changeCalendarMonth(delta) {
    calendarViewDate.setMonth(calendarViewDate.getMonth() + delta);
    renderCalendar();
}

function renderCalendar() {
    const gridEl = document.getElementById('cal-days-grid');
    const titleEl = document.getElementById('cal-month-title');
    if (!gridEl || !titleEl) return;

    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();

    titleEl.textContent = `${MONTH_NAMES_UA[month]} ${year}`;

    const firstDate = new Date(year, month, 1);
    const firstDayOfWeek = (firstDate.getDay() + 6) % 7;
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDateNum = today.getDate();

    let cellsHtml = '';

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const dayNum = prevMonthDays - i;
        cellsHtml += `<div class="cal-day cal-day-inactive">${dayNum}</div>`;
    }

    let monthTotalCards = 0;
    let monthTotalCorrect = 0;
    let bestDayNum = null;
    let maxCardsInDay = 0;

    for (let d = 1; d <= totalDaysInMonth; d++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const dayStat = ACTIVITY_DATA[dateKey];
        const count = dayStat ? (dayStat.cardsReviewed || 0) : 0;
        const correct = dayStat ? (dayStat.correct || 0) : 0;
        const timeSec = dayStat ? (dayStat.timeSpentSec || 0) : 0;

        monthTotalCards += count;
        monthTotalCorrect += correct;

        if (count > maxCardsInDay) {
            maxCardsInDay = count;
            bestDayNum = d;
        }

        let lvlClass = 'lvl-0';
        if (count >= 1 && count <= 10) lvlClass = 'lvl-1';
        else if (count >= 11 && count <= 20) lvlClass = 'lvl-2';
        else if (count > 20) lvlClass = 'lvl-3';

        const isToday = isCurrentMonth && d === todayDateNum;
        const todayClass = isToday ? ' is-today' : '';

        let tooltip = `${d} ${MONTH_NAMES_GENITIVE_UA[month]}: ${getPlural(count, ['картка', 'картки', 'карток'])}`;
        if (count > 0) {
            tooltip += ` (${correct} вірно${timeSec > 0 ? `, ~${Math.round(timeSec / 60)} хв` : ''})`;
        }

        cellsHtml += `
            <div class="cal-day ${lvlClass}${todayClass}" title="${tooltip}" data-date="${dateKey}">
                <span class="cal-day-num">${d}</span>
                ${count > 0 ? `<span class="cal-day-badge">${count}</span>` : ''}
            </div>
        `;
    }

    const totalFilled = firstDayOfWeek + totalDaysInMonth;
    const nextMonthDaysNeeded = totalFilled % 7 === 0 ? 0 : 7 - (totalFilled % 7);
    for (let d = 1; d <= nextMonthDaysNeeded; d++) {
        cellsHtml += `<div class="cal-day cal-day-inactive">${d}</div>`;
    }

    gridEl.innerHTML = cellsHtml;

    const streakEl = document.getElementById('cal-stat-streak');
    const monthCardsEl = document.getElementById('cal-stat-month-cards');
    const bestDayEl = document.getElementById('cal-stat-best-day');
    const bestDayLbl = document.getElementById('cal-stat-best-day-lbl');
    const accuracyEl = document.getElementById('cal-stat-accuracy');

    if (streakEl) streakEl.textContent = getPlural(STREAK_DATA.count || 0, ['день поспіль', 'дні поспіль', 'днів поспіль']);
    if (monthCardsEl) monthCardsEl.textContent = getPlural(monthTotalCards, ['картка', 'картки', 'карток']);
    if (bestDayEl) {
        if (bestDayNum && maxCardsInDay > 0) {
            bestDayEl.textContent = getPlural(maxCardsInDay, ['картка', 'картки', 'карток']);
            if (bestDayLbl) {
                bestDayLbl.textContent = `Рекорд за день (${bestDayNum} ${MONTH_NAMES_GENITIVE_UA[month].slice(0, 3)}.)`;
            }
        } else {
            bestDayEl.textContent = '0 карток';
            if (bestDayLbl) {
                bestDayLbl.textContent = 'Рекорд за день (—)';
            }
        }
    }
    if (accuracyEl) {
        if (monthTotalCards > 0) {
            const acc = Math.round((monthTotalCorrect / monthTotalCards) * 100);
            accuracyEl.textContent = `${acc}%`;
        } else {
            accuracyEl.textContent = '0%';
        }
    }
}

let selectedModule = ''; let questions = []; let currentIndex = 0; let score = 0;
let isShowingAnswer = false; let configMaterial = 'words'; let configMode = 'choice'; let configTarget = 'ua'; let editingModuleOriginalName = '';
let currentChoices = [];
let isMenuRendered = false;
let currentActiveScreen = 'menu-screen';
let selectedTimeFilter = 'today';

let wordStartTime = 0;
let currentWordDuration = 0;
let sessionLogs = [];
let timerTimeout = null;
let currentCombo = 0;

// Словник відповідності номерів юнітів їхнім офіційним назвам згідно з підручником
const BOOK_TITLES = {
    "1": "Unit 1: People and communities",
    "2": "Unit 2: Housing and home environment",
    "3": "Unit 3: School and education",
    "4": "Unit 4: Work and career",
    "5": "Unit 5: Family and social life",
    "6": "Unit 6: Food and nutrition",
    "7": "Unit 7: Shopping and services",
    "8": "Unit 8: Travelling and tourism",
    "10": "Unit 10: Sport and fitness",
    "11": "Unit 11: Health and medical care",
    "12": "Unit 12: Science and technology",
    "13": "Unit 13: Nature and environment",
    "14": "Unit 14: Society and law",
    "15": "Unit 15: Global English / Culture"
};

function startWordTimer() {
    wordStartTime = Date.now();
}

// Форматування секунд у зручний рядок (години / хвилини / секунди)
function formatTime(totalSec) {
    if (!totalSec || totalSec <= 0) return "0с";
    let hrs = Math.floor(totalSec / 3600);
    let min = Math.floor((totalSec % 3600) / 60);
    let sec = totalSec % 60;
    if (hrs > 0) {
        return `${hrs} год ${min} хв ${sec < 10 ? '0' : ''}${sec} сек`;
    }
    if (min === 0) return `${sec} сек`;
    return `${min} хв ${sec < 10 ? '0' : ''}${sec} сек`;
}

function setTimeFilter(filterKey) {
    selectedTimeFilter = filterKey;
    document.querySelectorAll('.time-filter-btn').forEach(btn => {
        if (btn.getAttribute('data-time') === filterKey) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    renderDetailedStats();
}

function handleNavToggle() {
    if (currentActiveScreen === 'stats-screen') {
        switchScreen('menu-screen');
    } else {
        switchScreen('stats-screen');
    }
}

let selectedQuizLimit = '20';

function setQuizLimit(limitVal) {
    selectedQuizLimit = String(limitVal);
    document.querySelectorAll('.count-chip-btn').forEach(btn => {
        if (btn.getAttribute('data-limit') === selectedQuizLimit) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    saveUserSettings();
}

function getSelectedQuizLimit() {
    return selectedQuizLimit || '20';
}

// Збереження параметрів користувача у LocalStorage
function saveUserSettings() {
    const materialVal = document.querySelector('input[name="quiz-material"]:checked')?.value || 'words';
    const modeVal = document.querySelector('input[name="quiz-mode"]:checked')?.value || 'choice';
    const langVal = document.querySelector('input[name="quiz-lang"]:checked')?.value || 'ua';
    const limitVal = getSelectedQuizLimit();
    const audioVal = document.getElementById('auto-audio-toggle')?.checked ?? false;
    const trackTimeVal = document.getElementById('track-time-toggle')?.checked ?? true;
    const timerModeVal = document.getElementById('timer-mode-toggle')?.checked ?? false;
    const hardOnlyVal = document.getElementById('hard-only-toggle')?.checked ?? false;

    const settingsObj = {
        material: materialVal,
        mode: modeVal,
        lang: langVal,
        limit: limitVal,
        audio: audioVal,
        trackTime: trackTimeVal,
        timerMode: timerModeVal,
        hardOnly: hardOnlyVal
    };
    localStorage.setItem('my_quiz_settings', JSON.stringify(settingsObj));
}

// Завантаження збережених налаштувань
function loadUserSettings() {
    const saved = JSON.parse(localStorage.getItem('my_quiz_settings'));
    if (!saved) {
        const matWords = document.getElementById('material-words');
        if (matWords) matWords.checked = true;
        handleMaterialChange();
        const modeChoice = document.getElementById('mode-choice');
        if (modeChoice) modeChoice.checked = true;
        const langEn = document.getElementById('lang-en');
        if (langEn) langEn.checked = true;
        setQuizLimit('20');
        document.getElementById('auto-audio-toggle').checked = false;
        document.getElementById('track-time-toggle').checked = true;
        document.getElementById('timer-mode-toggle').checked = false;
        document.getElementById('hard-only-toggle').checked = false;
        return;
    }

    if (saved.material) {
        const matRadio = document.querySelector(`input[name="quiz-material"][value="${saved.material}"]`);
        if (matRadio) matRadio.checked = true;
    }
    handleMaterialChange();

    if (saved.mode) {
        let modeVal = saved.mode;
        if (modeVal === 'context-match') modeVal = 'context-slot';
        const modeRadio = document.querySelector(`input[name="quiz-mode"][value="${modeVal}"]`);
        if (modeRadio) modeRadio.checked = true;
    }
    if (saved.lang) {
        const langRadio = document.querySelector(`input[name="quiz-lang"][value="${saved.lang}"]`);
        if (langRadio) langRadio.checked = true;
    }
    if (saved.limit) {
        setQuizLimit(saved.limit);
    } else {
        setQuizLimit('20');
    }
    if (saved.audio !== undefined) document.getElementById('auto-audio-toggle').checked = saved.audio;
    if (saved.trackTime !== undefined) document.getElementById('track-time-toggle').checked = saved.trackTime;
    if (saved.timerMode !== undefined) document.getElementById('timer-mode-toggle').checked = saved.timerMode;
    if (saved.hardOnly !== undefined) document.getElementById('hard-only-toggle').checked = saved.hardOnly;
}

function handleMaterialChange() {
    const materialVal = document.querySelector('input[name="quiz-material"]:checked')?.value || 'words';
    const wordsContainer = document.getElementById('mode-control-words');
    const contextContainer = document.getElementById('mode-control-context');
    const langGroup = document.getElementById('level-lang-group');

    if (materialVal === 'words') {
        if (wordsContainer) wordsContainer.style.display = 'grid';
        if (contextContainer) contextContainer.style.display = 'none';
        if (langGroup) langGroup.style.display = 'block';

        const currentMode = document.querySelector('input[name="quiz-mode"]:checked')?.value;
        if (!currentMode || !['choice', 'write'].includes(currentMode)) {
            const choiceBtn = document.getElementById('mode-choice');
            if (choiceBtn) choiceBtn.checked = true;
        }
    } else {
        if (wordsContainer) wordsContainer.style.display = 'none';
        if (contextContainer) contextContainer.style.display = 'grid';
        if (langGroup) langGroup.style.display = 'none';

        const currentMode = document.querySelector('input[name="quiz-mode"]:checked')?.value;
        if (!currentMode || !['context-slot', 'context-write'].includes(currentMode)) {
            const slotBtn = document.getElementById('mode-context-slot');
            if (slotBtn) slotBtn.checked = true;
        }
    }
}

function toggleMobileMenu() {
    const bar = document.getElementById('sticky-bar');
    bar.classList.toggle('mobile-open');
}

function stopLiveTimer() {
    if (timerTimeout) {
        clearTimeout(timerTimeout);
        timerTimeout = null;
    }
}

// Універсальна функція перемикання екранних форм (SPA)
function switchScreen(screenId) {
    stopLiveTimer();
    currentActiveScreen = screenId;
    document.body.classList.toggle('in-quiz', screenId === 'quiz-screen');
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) targetScreen.classList.add('active');

    const statsPanel = document.getElementById('stats-panel');
    const navToggleBtn = document.getElementById('nav-toggle-btn');

    if (screenId === 'menu-screen') {
        if (statsPanel) statsPanel.style.display = 'flex';
        if (navToggleBtn) {
            navToggleBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>';
            navToggleBtn.title = 'Детальна статистика';
            navToggleBtn.setAttribute('aria-label', 'Детальна статистика');
        }
        updateStreakAndGlobalStats();
        isMenuRendered = false;
        renderMenu();
    } else if (screenId === 'stats-screen') {
        if (statsPanel) statsPanel.style.display = 'flex';
        if (navToggleBtn) {
            navToggleBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>';
            navToggleBtn.title = 'Головне меню';
            navToggleBtn.setAttribute('aria-label', 'Головне меню');
        }
        renderDetailedStats();
    } else {
        if (statsPanel && (screenId === 'quiz-screen' || screenId === 'result-screen')) {
            statsPanel.style.display = 'none';
        }
    }
}

function autoExpandTextarea(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

// Автоматичний імпорт текстових файлів словників (.txt)
function handleBulkImport(input) {
    const files = input.files;
    if (files.length === 0) return;

    let loadedCount = 0;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        let unitNumber = file.name.match(/\d+/)?.[0];
        let moduleName = (unitNumber && BOOK_TITLES[unitNumber]) ? BOOK_TITLES[unitNumber] : file.name.replace('.txt', '').replace(/_/g, ' ');

        reader.onload = function (e) {
            const text = e.target.result;
            const lines = text.split('\n');
            const parsedWords = {};

            lines.forEach(line => {
                let parts = line.split('\t');
                if (parts.length < 2) parts = line.split(' - ');
                if (parts.length < 2) parts = line.split('-');

                if (parts.length >= 2) {
                    const en = parts[0].trim().replace(/\s+/g, ' ');
                    const ua = parts[1].trim();
                    if (en && ua && !en.startsWith('[source')) {
                        parsedWords[en] = ua;
                    }
                }
            });

            if (Object.keys(parsedWords).length > 0) {
                ALL_DATA[moduleName] = parsedWords;
                SAVED_USER_DATA[moduleName] = parsedWords;
            }

            loadedCount++;
            if (loadedCount === files.length) {
                localStorage.setItem('my_quiz_modules', JSON.stringify(SAVED_USER_DATA));
                alert(`🚀 Автоімпорт завершено! Синхронізовано модулів: ${loadedCount}.`);
                isMenuRendered = false;
                renderMenu();
            }
        };
        reader.readAsText(file);
    }
}

// Експорт резервної копії (Бэкап у форматі JSON)
function exportBackupJSON() {
    const backupData = {
        version: "6.8.0",
        date: new Date().toISOString(),
        modules: SAVED_USER_DATA,
        stats: MEMORY_STATS,
        streak: STREAK_DATA,
        activity: ACTIVITY_DATA,
        pinned: PINNED_MODULES,
        customContext: CUSTOM_CONTEXT_DATA,
        settings: JSON.parse(localStorage.getItem('my_quiz_settings')) || {}
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my_quiz_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Відновлення даних із резервної копії JSON
function importBackupJSON(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.modules) {
                SAVED_USER_DATA = data.modules;
                ALL_DATA = Object.assign({}, DEFAULT_MODULES, SAVED_USER_DATA);
                localStorage.setItem('my_quiz_modules', JSON.stringify(SAVED_USER_DATA));
            }
            if (data.stats) {
                MEMORY_STATS = data.stats;
                localStorage.setItem('my_quiz_mem_stats', JSON.stringify(MEMORY_STATS));
            }
            if (data.streak) {
                STREAK_DATA = data.streak;
                localStorage.setItem('my_quiz_streak', JSON.stringify(STREAK_DATA));
            }
            if (data.activity) {
                ACTIVITY_DATA = data.activity;
                localStorage.setItem('myquiz_activity', JSON.stringify(ACTIVITY_DATA));
            }
            if (data.pinned && Array.isArray(data.pinned)) {
                PINNED_MODULES = data.pinned;
                localStorage.setItem('my_quiz_pinned_modules', JSON.stringify(PINNED_MODULES));
            }
            if (data.customContext) {
                CUSTOM_CONTEXT_DATA = data.customContext;
                localStorage.setItem('my_quiz_custom_context', JSON.stringify(CUSTOM_CONTEXT_DATA));
            }
            if (data.settings) {
                localStorage.setItem('my_quiz_settings', JSON.stringify(data.settings));
                loadUserSettings();
            }
            alert('✅ Бэкап успішно відновлено!');
            isMenuRendered = false;
            switchScreen('menu-screen');
        } catch (err) {
            alert('❌ Помилка зчитування JSON файлу.');
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (confirm('Повністю очистити додаток та видалити прогрес?')) {
        localStorage.clear();
        SAVED_USER_DATA = {}; ALL_DATA = Object.assign({}, DEFAULT_MODULES); MEMORY_STATS = {}; STREAK_DATA = { count: 0, lastDate: "" }; ACTIVITY_DATA = {}; PINNED_MODULES = []; CUSTOM_CONTEXT_DATA = {};
        isMenuRendered = false;
        loadUserSettings();
        renderMenu(); updateStreakAndGlobalStats();
    }
}

// Підрахунок детальної статистики заучених слів у модулі
function getModuleDetailedStats(name) {
    const wordPairs = Object.keys(ALL_DATA[name] || {});
    const total = wordPairs.length;
    if (total === 0) return { total: 0, learned: 0, learning: 0, unlearned: 0, progressPct: 0, displayPct: "0%" };

    let learned = 0;
    let learning = 0;

    wordPairs.forEach(enWord => {
        const statKey = `${name}_${enWord}`;
        const m = MEMORY_STATS[statKey];
        if (m && m.score <= 0 && m.history?.length > 0 && m.history[m.history.length - 1] === true) {
            learned++;
        } else if (m && m.history?.length > 0) {
            learning++;
        }
    });

    const unlearned = total - learned - learning;
    const exactPct = (learned / total) * 100;

    let displayPct = "0%";
    if (exactPct > 0 && exactPct < 1) {
        displayPct = exactPct.toFixed(1) + "%";
    } else {
        displayPct = Math.round(exactPct) + "%";
    }

    return { total, learned, learning, unlearned, progressPct: exactPct, displayPct };
}

function calculateModuleProgress(name) {
    return getModuleDetailedStats(name);
}

function setModuleFilter(filterKey) {
    currentModuleFilter = filterKey;
    document.querySelectorAll('.module-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filterKey);
    });
    renderMenu();
}

function togglePinModule(name) {
    const index = PINNED_MODULES.indexOf(name);
    if (index === -1) {
        PINNED_MODULES.push(name);
    } else {
        PINNED_MODULES.splice(index, 1);
    }
    localStorage.setItem('my_quiz_pinned_modules', JSON.stringify(PINNED_MODULES));
    renderMenu();
}

// Рендеринг списку модулів на головному екрані
function renderMenu() {
    const container = document.getElementById('modules-container');
    if (!container) return;
    container.innerHTML = '';

    const allKeys = Object.keys(ALL_DATA);

    if (allKeys.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">📦</div>
                <h3>Тут поки порожньо</h3>
                <p>Завантажте .txt файли через кнопку нижче або створіть свій перший модуль вручну!</p>
                <button class="main-btn" onclick="openCreateScreen()" style="margin-top:15px;">+ Створити модуль</button>
            </div>
        `;
        isMenuRendered = true;
        return;
    }

    // Фільтрація модулів відповідно до обраного чіпа
    let filteredKeys = allKeys.filter(name => {
        const stats = calculateModuleProgress(name);
        const isPinned = PINNED_MODULES.includes(name);

        switch (currentModuleFilter) {
            case 'favorite':
                return isPinned;
            case 'in_progress':
                return stats.progressPct > 0 && stats.progressPct < 100;
            case 'new':
                return stats.progressPct === 0;
            case 'completed':
                return stats.progressPct >= 100;
            case 'all':
            default:
                return true;
        }
    });

    // Сортування: закріплені (pinned) завжди першими, далі за номером юніта
    filteredKeys.sort((a, b) => {
        const isPinnedA = PINNED_MODULES.includes(a);
        const isPinnedB = PINNED_MODULES.includes(b);
        if (isPinnedA !== isPinnedB) {
            return isPinnedB ? 1 : -1;
        }
        let numA = parseInt(a.match(/\d+/)?.[0]) || 999;
        let numB = parseInt(b.match(/\d+/)?.[0]) || 999;
        return numA - numB;
    });

    const fragment = document.createDocumentFragment();

    if (filteredKeys.length === 0) {
        const emptyFilter = document.createElement('div');
        emptyFilter.className = 'empty-filter-state';
        emptyFilter.style.gridColumn = '1 / -1';
        emptyFilter.textContent = 'Немає модулів у цій категорії';
        fragment.appendChild(emptyFilter);
    } else {
        filteredKeys.forEach(name => {
            const stats = calculateModuleProgress(name);
            const isPinned = PINNED_MODULES.includes(name);
            const item = document.createElement('div');
            item.className = 'module-item';
            item.setAttribute('data-name', name);

            item.innerHTML = `
                <div class="module-top" data-action="open">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; width:100%; gap:8px;">
                        <div class="module-name-click" style="display:flex; align-items:flex-start; gap:8px; flex:1;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; margin-top:3px; color:var(--accent);"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                            <div>
                                <strong>${name}</strong>
                                <div style="font-size:13px; color:var(--subtext); margin-top:3px;">${getPlural(stats.total, ['картка', 'картки', 'карток'])}</div>
                            </div>
                        </div>
                        <button type="button" class="pin-module-btn ${isPinned ? 'pinned' : ''}" data-action="pin" title="${isPinned ? 'Відкріпити модуль' : 'Закріпити модуль'}" aria-label="${isPinned ? 'Відкріпити модуль' : 'Закріпити модуль'}">${isPinned ? '★' : '☆'}</button>
                    </div>
                </div>
                <div data-action="open">
                    <div style="font-size: 11px; color: var(--subtext); display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span>Заучено (${stats.learned}/${stats.total}):</span>
                        <span style="font-weight:bold; color:var(--green);">${stats.displayPct}</span>
                    </div>
                    <div class="progress-track"><div class="progress-bar" style="width: ${Math.max(stats.progressPct, stats.learned > 0 ? 2 : 0)}%"></div></div>
                </div>
                <div class="actions-block">
                    <button class="action-btn-small edit-btn" data-action="edit" title="Редагувати" aria-label="Редагувати"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button>
                    <button class="action-btn-small delete-btn" data-action="delete" title="Видалити" aria-label="Видалити"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                </div>
            `;
            fragment.appendChild(item);
        });
    }

    const addCard = document.createElement('div');
    addCard.className = 'module-item-add';
    addCard.setAttribute('data-action', 'create');
    addCard.innerHTML = `
        <span class="add-icon">+</span>
        <span>Add unit</span>
    `;
    fragment.appendChild(addCard);

    container.appendChild(fragment);
    isMenuRendered = true;
}

document.getElementById('modules-container').addEventListener('click', function (e) {
    const btn = e.target.closest('[data-action]');
    const card = e.target.closest('.module-item, .module-item-add');
    if (!card) return;

    const action = btn ? btn.getAttribute('data-action') : card.getAttribute('data-action') || 'open';
    const name = card.getAttribute('data-name');

    if (action === 'create') {
        openCreateScreen();
    } else if (action === 'pin' && name) {
        e.stopPropagation();
        togglePinModule(name);
    } else if (action === 'open' && name) {
        openSetup(name);
    } else if (action === 'edit' && name) {
        e.stopPropagation();
        openEditScreen(name);
    } else if (action === 'delete' && name) {
        e.stopPropagation();
        deleteModule(name);
    }
});

function filterLogsByTime(logs, filterKey) {
    if (!logs || !Array.isArray(logs)) return [];
    if (filterKey === 'all') return logs;

    const now = new Date();
    let startBound = 0;

    if (filterKey === 'today') {
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);
        startBound = startOfDay.getTime();
    } else if (filterKey === 'week') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(startOfWeek.getDate() - 7);
        startOfWeek.setHours(0, 0, 0, 0);
        startBound = startOfWeek.getTime();
    } else if (filterKey === 'month') {
        const startOfMonth = new Date(now);
        startOfMonth.setDate(startOfMonth.getDate() - 30);
        startOfMonth.setHours(0, 0, 0, 0);
        startBound = startOfMonth.getTime();
    }

    return logs.filter(entry => entry.date && entry.date >= startBound);
}

function sanitizeMemoryStats() {
    if (!MEMORY_STATS || typeof MEMORY_STATS !== 'object') return;
    Object.keys(MEMORY_STATS).forEach(statKey => {
        const item = MEMORY_STATS[statKey];
        if (item && item.log && Array.isArray(item.log)) {
            item.log.forEach(entry => {
                if (!entry.timeSpentMs || entry.timeSpentMs > 7200000 || entry.timeSpentMs < 0) {
                    entry.timeSpentMs = 3000;
                }
            });
        }
    });
}

function calculateGlobalModeAnalytics(timeFilter) {
    sanitizeMemoryStats();
    let summary = {
        write: { correct: 0, total: 0 },
        choice: { correct: 0, total: 0 },
        ua: { correct: 0, total: 0 },
        en: { correct: 0, total: 0 }
    };

    Object.keys(ALL_DATA).forEach(moduleName => {
        const wordPairs = Object.keys(ALL_DATA[moduleName] || {});
        wordPairs.forEach(enWord => {
            const statKey = `${moduleName}_${enWord}`;
            const item = MEMORY_STATS[statKey];
            if (item && item.log && Array.isArray(item.log)) {
                const filtered = filterLogsByTime(item.log, timeFilter);
                filtered.forEach(entry => {
                    const modeKey = entry.mode === 'choice' ? 'choice' : 'write';
                    summary[modeKey].total++;
                    if (entry.isCorrect) summary[modeKey].correct++;

                    const langKey = entry.lang === 'en' ? 'en' : 'ua';
                    summary[langKey].total++;
                    if (entry.isCorrect) summary[langKey].correct++;
                });
            }
        });
    });

    return summary;
}

function getUnitAnalyticsForPeriod(moduleName, filterKey) {
    sanitizeMemoryStats();
    let correct = 0;
    let total = 0;
    let totalTimeMs = 0;
    const wordPairs = Object.keys(ALL_DATA[moduleName] || {});

    wordPairs.forEach(enWord => {
        const statKey = `${moduleName}_${enWord}`;
        const item = MEMORY_STATS[statKey];
        if (item && item.log && Array.isArray(item.log)) {
            const filtered = filterLogsByTime(item.log, filterKey);
            filtered.forEach(e => {
                total++;
                if (e.isCorrect) correct++;
                if (e.timeSpentMs && e.timeSpentMs > 0 && e.timeSpentMs < 7200000) {
                    totalTimeMs += e.timeSpentMs;
                }
            });
        }
    });

    const pct = total > 0 ? Math.round((correct / total) * 100) + '%' : '0%';

    let formattedTime = "0с";
    if (totalTimeMs > 0) {
        let sec = Math.round(totalTimeMs / 1000);
        formattedTime = formatTime(sec);
    }

    return { correct, total, pct, timeFormatted: formattedTime };
}

function getModuleActivityMetrics(moduleName) {
    let lastPracticed = 0;
    let totalAttempts = 0;
    const wordPairs = Object.keys(ALL_DATA[moduleName] || {});

    wordPairs.forEach(enWord => {
        const statKey = `${moduleName}_${enWord}`;
        const item = MEMORY_STATS[statKey];
        if (item) {
            if (item.log && item.log.length > 0) {
                totalAttempts += item.log.length;
                const latestInWord = item.log[item.log.length - 1].date;
                if (latestInWord && latestInWord > lastPracticed) {
                    lastPracticed = latestInWord;
                }
            } else if (item.stats) {
                const totalFromStats = (item.stats.modes?.write?.total || 0) + (item.stats.modes?.choice?.total || 0);
                totalAttempts += totalFromStats;
            }
        }
    });

    return { lastPracticed, totalAttempts };
}

function renderDetailedStats() {
    sanitizeMemoryStats();

    document.querySelectorAll('.time-filter-btn').forEach(btn => {
        if (btn.getAttribute('data-time') === selectedTimeFilter) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    const modeContainer = document.getElementById('mode-analytics-container');
    if (modeContainer) {
        const data = calculateGlobalModeAnalytics(selectedTimeFilter);
        const calcPct = (c, t) => t > 0 ? Math.round((c / t) * 100) + '%' : '0%';

        modeContainer.innerHTML = `
            <div class="analytics-item" style="border-color: var(--accent);">
                <div class="analytics-item-title">📝 Тест (Ручне введення)</div>
                <div class="analytics-item-val">${calcPct(data.write.correct, data.write.total)}</div>
                <div class="analytics-item-sub">${data.write.correct} з ${data.write.total} вірно</div>
            </div>
            <div class="analytics-item" style="border-color: var(--purple);">
                <div class="analytics-item-title">🕹️ Вибір (4 варіанти)</div>
                <div class="analytics-item-val">${calcPct(data.choice.correct, data.choice.total)}</div>
                <div class="analytics-item-sub">${data.choice.correct} з ${data.choice.total} вірно</div>
            </div>

            <div class="analytics-item" style="border-color: var(--green);">
                <div class="analytics-item-title">🇺🇦 Питання з українського слова</div>
                <div class="analytics-item-val">${calcPct(data.ua.correct, data.ua.total)}</div>
                <div class="analytics-item-sub">${data.ua.correct} з ${data.ua.total} вірно</div>
            </div>
            <div class="analytics-item" style="border-color: var(--subtext);">
                <div class="analytics-item-title">🇬🇧 Питання з англійського слова</div>
                <div class="analytics-item-val">${calcPct(data.en.correct, data.en.total)}</div>
                <div class="analytics-item-sub">${data.en.correct} з ${data.en.total} вірно</div>
            </div>
        `;
    }

    const container = document.getElementById('stats-grid-container');
    if (!container) return;
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const sortedModuleNames = Object.keys(ALL_DATA).sort((a, b) => {
        const metricsA = getModuleActivityMetrics(a);
        const metricsB = getModuleActivityMetrics(b);

        if (metricsA.lastPracticed !== metricsB.lastPracticed) {
            return metricsB.lastPracticed - metricsA.lastPracticed;
        }

        if (metricsA.totalAttempts !== metricsB.totalAttempts) {
            return metricsB.totalAttempts - metricsA.totalAttempts;
        }

        let numA = parseInt(a.match(/\d+/)?.[0]) || 999;
        let numB = parseInt(b.match(/\d+/)?.[0]) || 999;
        return numA - numB;
    });

    sortedModuleNames.forEach(moduleName => {
        const stats = getModuleDetailedStats(moduleName);
        const unitPeriodStats = getUnitAnalyticsForPeriod(moduleName, selectedTimeFilter);

        const learnedPct = stats.total > 0 ? (stats.learned / stats.total) * 100 : 0;
        const learningPct = stats.total > 0 ? (stats.learning / stats.total) * 100 : 0;
        const unlearnedPct = stats.total > 0 ? (stats.unlearned / stats.total) * 100 : 0;

        const card = document.createElement('div');
        card.className = 'stats-card';

        card.innerHTML = `
            <h4 style="display:flex; align-items:center; gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent); flex-shrink:0;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> ${moduleName}</h4>
            <div class="stats-row"><span>Всього слів:</span> <strong>${stats.total}</strong></div>
            <div class="stats-row"><span style="color:var(--green);">Заучено:</span> <strong>${stats.learned}</strong></div>
            <div class="stats-row"><span style="color:var(--orange);">В процесі:</span> <strong>${stats.learning}</strong></div>
            <div class="stats-row"><span style="color:var(--subtext);">Ще не вчено:</span> <strong>${stats.unlearned}</strong></div>
            
            <div class="stats-row" style="margin-top:10px; border-top: 1px dashed #45475a; padding-top:8px;">
                <span style="color:var(--accent);">Точність за період:</span> 
                <strong>${unitPeriodStats.pct} (${unitPeriodStats.correct}/${unitPeriodStats.total})</strong>
            </div>
            <div class="stats-row">
                <span style="color:var(--orange); display:inline-flex; align-items:center; gap:4px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Чистий час тренувань:</span> 
                <strong>${unitPeriodStats.timeFormatted}</strong>
            </div>

            <div class="progress-track" style="margin-top:10px; display:flex; background:#1e1e2e; height:8px; border-radius:4px; overflow:hidden;">
                <div style="width: ${learnedPct}%; background: var(--green); height: 100%; transition: width 0.3s ease;" title="Заучено: ${stats.learned}"></div>
                <div style="width: ${learningPct}%; background: var(--orange); height: 100%; transition: width 0.3s ease;" title="В процесі: ${stats.learning}"></div>
                <div style="width: ${unlearnedPct}%; background: #45475a; height: 100%; transition: width 0.3s ease;" title="Ще не вчено: ${stats.unlearned}"></div>
            </div>
        `;
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

function switchEditTab(tabName) {
    currentEditTab = tabName;
    document.querySelectorAll('.edit-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });
    const tabText = document.getElementById('tab-content-text');
    const tabTable = document.getElementById('tab-content-table');
    if (tabText) tabText.classList.toggle('active', tabName === 'text');
    if (tabTable) tabTable.classList.toggle('active', tabName === 'table');

    if (tabName === 'table') {
        const textVal = document.getElementById('new-module-words')?.value.trim() || '';
        if ((!excelParsedData || excelParsedData.length === 0) && textVal) {
            excelParsedData = [];
            textVal.split('\n').forEach(line => {
                let parts = line.split(' - ');
                if (parts.length < 2) parts = line.split(' — ');
                if (parts.length < 2) parts = line.split(' – ');
                if (parts.length >= 2) {
                    const en = parts[0].trim();
                    const ua = parts[1].trim();
                    const rawCtx = getContextForWord(en);
                    const parsedCtx = parseContextString(rawCtx);
                    excelParsedData.push({
                        word: en,
                        translation: ua,
                        context: parsedCtx ? parsedCtx.enSentence : '',
                        contextTranslation: parsedCtx ? parsedCtx.uaTranslation : ''
                    });
                }
            });
            if (excelParsedData.length > 0) {
                renderExcelPreview(excelParsedData);
            }
        } else if (excelParsedData && excelParsedData.length > 0) {
            renderExcelPreview(excelParsedData);
        }
    } else if (tabName === 'text') {
        if (excelParsedData && excelParsedData.length > 0) {
            const validItems = excelParsedData.filter(i => i.word && i.translation);
            if (validItems.length > 0) {
                const wordsText = validItems.map(i => `${i.word} - ${i.translation}`).join('\n');
                const textarea = document.getElementById('new-module-words');
                if (textarea) textarea.value = wordsText;
            }
        }
    }
}

function parseCSVToRows(text) {
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length === 0) return [];
    const firstLine = lines[0];
    let delimiter = ',';
    if (firstLine.includes('\t')) delimiter = '\t';
    else if (firstLine.includes(';')) delimiter = ';';
    else if (firstLine.includes(',')) delimiter = ',';

    return lines.map(line => {
        const result = [];
        let curr = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"' || char === "'") {
                inQuotes = !inQuotes;
            } else if (char === delimiter && !inQuotes) {
                result.push(curr.trim().replace(/^["']|["']$/g, ''));
                curr = '';
            } else {
                curr += char;
            }
        }
        result.push(curr.trim().replace(/^["']|["']$/g, ''));
        return result;
    });
}

function processImportedRows(rawRows) {
    if (!rawRows || rawRows.length === 0) {
        alert('Файл порожній');
        return;
    }

    let rows = rawRows.filter(r => Array.isArray(r) && r.some(cell => String(cell).trim().length > 0));
    if (rows.length === 0) {
        alert('Не знайдено рядків для імпорту');
        return;
    }

    const firstRowStr = rows[0].map(c => String(c).toLowerCase().trim()).join(' ');
    if (firstRowStr.includes('word') || firstRowStr.includes('слово') || firstRowStr.includes('english') || firstRowStr.includes('term') || firstRowStr.includes('translation') || firstRowStr.includes('переклад')) {
        rows = rows.slice(1);
    }

    excelParsedData = rows.map(r => {
        return {
            word: String(r[0] || '').trim(),
            translation: String(r[1] || '').trim(),
            context: String(r[2] || '').trim(),
            contextTranslation: String(r[3] || '').trim()
        };
    }).filter(item => item.word && item.translation);

    if (excelParsedData.length === 0) {
        alert('⚠️ Не знайдено коректних пар слів. Перевірте наявність 1-ї та 2-ї колонок (English, Переклад).');
        return;
    }

    renderExcelPreview(excelParsedData);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function setupExcelPreviewEditing() {
    const tbody = document.getElementById('excel-preview-tbody');
    if (!tbody || tbody.dataset.bound) return;
    tbody.dataset.bound = 'true';

    const updateValue = (e) => {
        const cell = e.target.closest('[contenteditable="true"]');
        if (!cell) return;
        const index = parseInt(cell.getAttribute('data-index'), 10);
        const field = cell.getAttribute('data-field');
        if (!isNaN(index) && field && excelParsedData[index]) {
            excelParsedData[index][field] = cell.innerText.trim();
        }
    };

    tbody.addEventListener('input', updateValue);
    tbody.addEventListener('blur', updateValue, true);
}

function renderExcelPreview(data) {
    const uploadWrapper = document.getElementById('excel-upload-zone-wrapper');
    const container = document.getElementById('excel-preview-container');
    const countEl = document.getElementById('excel-preview-count');
    const tbody = document.getElementById('excel-preview-tbody');
    if (!container || !tbody) return;

    if (data && data.length > 0) {
        if (uploadWrapper) uploadWrapper.style.display = 'none';
        container.style.display = 'block';
        if (countEl) {
            countEl.innerText = `У модулі ${getPlural(data.length, ['слово', 'слова', 'слів'])}`;
        }
    } else {
        if (uploadWrapper) uploadWrapper.style.display = 'block';
        container.style.display = 'none';
        tbody.innerHTML = '';
        return;
    }

    tbody.innerHTML = '';
    const fragment = document.createDocumentFragment();
    data.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="col-idx" style="color:var(--subtext); font-family:monospace; text-align:center; white-space:nowrap !important; width:58px; min-width:58px; max-width:65px;">${idx + 1}</td>
            <td contenteditable="true" data-field="word" data-index="${idx}" title="Клікніть для редагування"><strong>${escapeHtml(item.word)}</strong></td>
            <td contenteditable="true" data-field="translation" data-index="${idx}" title="Клікніть для редагування">${escapeHtml(item.translation)}</td>
            <td contenteditable="true" data-field="context" data-index="${idx}" style="color:var(--text);" title="Клікніть для редагування">${escapeHtml(item.context || '')}</td>
            <td contenteditable="true" data-field="contextTranslation" data-index="${idx}" style="color:var(--subtext);" title="Клікніть для редагування">${escapeHtml(item.contextTranslation || '')}</td>
        `;
        fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
    setupExcelPreviewEditing();
}

function addNewTableRow() {
    if (!excelParsedData) excelParsedData = [];
    excelParsedData.push({
        word: '',
        translation: '',
        context: '',
        contextTranslation: ''
    });
    renderExcelPreview(excelParsedData);

    const tbody = document.getElementById('excel-preview-tbody');
    if (tbody && tbody.lastElementChild) {
        const firstEditableCell = tbody.lastElementChild.querySelector('td[contenteditable="true"]');
        if (firstEditableCell) {
            firstEditableCell.focus();
            firstEditableCell.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function clearExcelImport() {
    excelParsedData = [];
    const fileInput = document.getElementById('excel-file-input');
    if (fileInput) fileInput.value = '';
    const uploadWrapper = document.getElementById('excel-upload-zone-wrapper');
    if (uploadWrapper) uploadWrapper.style.display = 'block';
    const container = document.getElementById('excel-preview-container');
    if (container) container.style.display = 'none';
    const tbody = document.getElementById('excel-preview-tbody');
    if (tbody) tbody.innerHTML = '';
}

function loadExcelOrCsvFile(file) {
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const text = e.target.result;
                const rows = parseCSVToRows(text);
                processImportedRows(rows);
            } catch (err) {
                alert('Помилка при обробці CSV: ' + err.message);
            }
        };
        reader.readAsText(file, 'utf-8');
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                if (typeof XLSX === 'undefined') {
                    alert('Бібліотека читання Excel ще завантажується. Зачекайте секунду.');
                    return;
                }
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
                processImportedRows(rawRows);
            } catch (err) {
                alert('Помилка при читанні Excel: ' + err.message);
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Непідтримуваний формат файлу. Будь ласка, оберіть файл .xlsx, .xls або .csv');
    }
}

function handleExcelFileUpload(event) {
    const file = event.target?.files?.[0];
    if (!file) return;
    loadExcelOrCsvFile(file);
}

function setupExcelDropzone() {
    const dropzone = document.getElementById('excel-drop-zone');
    if (!dropzone || dropzone.dataset.bound) return;
    dropzone.dataset.bound = 'true';

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('dragover');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files && files.length > 0) {
            loadExcelOrCsvFile(files[0]);
        }
    }, false);
}

function openCreateScreen() {
    editingModuleOriginalName = '';
    document.getElementById('create-screen-title').innerText = '✨ Новий модуль';
    document.getElementById('new-module-name').value = '';
    document.getElementById('new-module-words').value = '';
    clearExcelImport();
    switchEditTab('text');
    setupExcelDropzone();
    switchScreen('create-screen');
}

function openEditScreen(name) {
    editingModuleOriginalName = name;
    document.getElementById('create-screen-title').innerText = '✏️ Редагування модуля';
    document.getElementById('new-module-name').value = name;

    const modulePairs = Object.entries(ALL_DATA[name] || {});
    let wordsText = '';
    excelParsedData = [];

    modulePairs.forEach(([en, ua]) => {
        wordsText += `${en} - ${ua}\n`;
        const rawCtx = getContextForWord(en);
        const parsedCtx = parseContextString(rawCtx);
        excelParsedData.push({
            word: en,
            translation: ua,
            context: parsedCtx ? parsedCtx.enSentence : '',
            contextTranslation: parsedCtx ? parsedCtx.uaTranslation : ''
        });
    });

    document.getElementById('new-module-words').value = wordsText.trim();

    const hasCtx = excelParsedData.some(item => Boolean(item.context && item.context.trim()));

    if (excelParsedData.length > 0) {
        renderExcelPreview(excelParsedData);
    } else {
        clearExcelImport();
    }

    if (hasCtx) {
        switchEditTab('table');
    } else {
        switchEditTab('text');
    }

    setupExcelDropzone();
    switchScreen('create-screen');
}

function hasModuleContext(moduleId) {
    if (!moduleId || !ALL_DATA[moduleId]) return false;
    const pairs = Object.entries(ALL_DATA[moduleId]);
    return pairs.some(([en]) => {
        const rawCtx = getContextForWord(en);
        return Boolean(rawCtx && rawCtx.trim());
    });
}

function countUnitContextWords(name) {
    if (!ALL_DATA[name]) return 0;
    const pairs = Object.entries(ALL_DATA[name]);
    let count = 0;
    pairs.forEach(([en]) => {
        const rawCtx = getContextForWord(en);
        if (rawCtx && getMaskedContext(en, rawCtx)) count++;
    });
    return count;
}

function checkUnitContextAvailability(name) {
    const hasCtx = hasModuleContext(name);
    const contextCount = countUnitContextWords(name);
    const contextRadio = document.getElementById('material-context');
    const wordsRadio = document.getElementById('material-words');
    const labelContext = document.querySelector('label[for="material-context"]');
    const matchModeRadio = document.getElementById('mode-context-match');
    const labelMatchMode = document.querySelector('label[for="mode-context-match"]');

    if (!hasCtx || contextCount === 0) {
        if (contextRadio) {
            contextRadio.disabled = true;
            if (contextRadio.checked && wordsRadio) {
                wordsRadio.checked = true;
            }
        }
        if (labelContext) {
            labelContext.style.opacity = '0.5';
            labelContext.style.cursor = 'not-allowed';
            labelContext.title = 'Немає контексту: у цьому модулі відсутні контекстні речення';
            labelContext.innerText = '📖 Слова в контексті (немає контексту)';
        }
        if (matchModeRadio) {
            matchModeRadio.disabled = true;
        }
        if (labelMatchMode) {
            labelMatchMode.style.opacity = '0.5';
            labelMatchMode.title = 'Немає контексту';
        }
        handleMaterialChange();
    } else {
        if (contextRadio) {
            contextRadio.disabled = false;
        }
        if (labelContext) {
            labelContext.style.opacity = '1';
            labelContext.style.cursor = 'pointer';
            labelContext.title = '📖 Слова в контексті';
            labelContext.innerText = '📖 Слова в контексті';
        }
        if (matchModeRadio) {
            matchModeRadio.disabled = contextCount < 4;
        }
        if (labelMatchMode) {
            labelMatchMode.style.opacity = contextCount < 4 ? '0.5' : '1';
            labelMatchMode.title = contextCount < 4 ? 'Потрібно мінімум 4 контекстних речення' : '';
        }
    }
}

function openSetup(name) {
    selectedModule = name;
    document.getElementById('setup-title').innerText = `Тренажер: ${name}`;
    const searchInput = document.getElementById('unit-table-search');
    if (searchInput) searchInput.value = '';
    checkUnitContextAvailability(name);
    renderUnitWordsTable(name, '');
    switchScreen('setup-screen');
}

function getUnitPageSize(moduleName) {
    const saved = JSON.parse(localStorage.getItem('my_quiz_unit_pagesize')) || {};
    return saved[moduleName] || '25';
}

function setUnitPageSize(moduleName, size) {
    const saved = JSON.parse(localStorage.getItem('my_quiz_unit_pagesize')) || {};
    saved[moduleName] = size;
    localStorage.setItem('my_quiz_unit_pagesize', JSON.stringify(saved));
}

function changeUnitPageSize(val) {
    if (!selectedModule) return;
    setUnitPageSize(selectedModule, val);
    const searchInput = document.getElementById('unit-table-search');
    const query = searchInput ? searchInput.value : '';
    renderUnitWordsTable(selectedModule, query);
}

function filterUnitWordsTable(query) {
    if (!selectedModule) return;
    renderUnitWordsTable(selectedModule, query);
}

function renderUnitWordsTable(moduleName, query = '') {
    const searchInput = document.getElementById('unit-table-search');
    if (searchInput && typeof query === 'string' && searchInput.value !== query) {
        searchInput.value = query;
    }

    const pageSize = getUnitPageSize(moduleName);
    const selectEl = document.getElementById('unit-page-size-select');
    if (selectEl) selectEl.value = pageSize;

    const tbody = document.getElementById('unit-table-body');
    const counterEl = document.getElementById('unit-table-counter');
    if (!tbody) return;
    tbody.innerHTML = '';

    const wordsObj = ALL_DATA[moduleName] || {};
    const allPairs = Object.entries(wordsObj);
    const totalCount = allPairs.length;

    if (totalCount === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--subtext);">Модуль порожній</td></tr>`;
        if (counterEl) counterEl.innerText = '0 / 0';
        return;
    }

    const cleanQuery = (query || '').trim().toLowerCase();

    // 1. Спочатку фільтруємо весь масив карток модуля
    const filteredPairs = allPairs.filter(([en, ua]) => {
        if (!cleanQuery) return true;
        const rawCtx = getContextForWord(en) || '';
        return (
            en.toLowerCase().includes(cleanQuery) ||
            ua.toLowerCase().includes(cleanQuery) ||
            rawCtx.toLowerCase().includes(cleanQuery)
        );
    });

    // 2. Оновлюємо лічильник результатів
    if (counterEl) {
        if (cleanQuery) {
            counterEl.innerText = `Знайдено ${filteredPairs.length} з ${totalCount}`;
        } else {
            const limit = pageSize === 'all' ? totalCount : Math.min(parseInt(pageSize) || 25, totalCount);
            counterEl.innerText = `${limit} / ${totalCount}`;
        }
    }

    if (filteredPairs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--subtext);">Нічого не знайдено за запитом «${escapeHtml(query)}»</td></tr>`;
        return;
    }

    // 3. Застосовуємо пагінацію до відфільтрованих результатів
    let pairsToRender = filteredPairs;
    if (pageSize !== 'all') {
        const limit = parseInt(pageSize) || 25;
        pairsToRender = filteredPairs.slice(0, limit);
    }

    // 4. Рендеримо видимі рядки
    const fragment = document.createDocumentFragment();
    pairsToRender.forEach(([en, ua]) => {
        const statKey = `${moduleName}_${en}`;
        const m = MEMORY_STATS[statKey];

        let statusBadge = '<span style="color:#4a4b5e;">— не вчено</span>';
        if (m && m.score <= 0 && m.history?.length > 0 && m.history[m.history.length - 1] === true) {
            statusBadge = '<span style="color:#4f9e5a;">✅ Заучено</span>';
        } else if (m && m.history?.length > 0) {
            statusBadge = '<span style="color:#8a6e3a;">🔄 В процесі</span>';
        }

        const ctxRaw = getContextForWord(en);
        let ctxHtml = '';
        if (ctxRaw) {
            const match = ctxRaw.match(/^(.+?)\s*(\([^)]+\))\s*$/);
            if (match) {
                ctxHtml = `${escapeHtml(match[1])} <em>${escapeHtml(match[2])}</em>`;
            } else {
                ctxHtml = escapeHtml(ctxRaw);
            }
        } else {
            ctxHtml = '<span style="color:#3a3b4e;">—</span>';
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${escapeHtml(en)}</strong></td>
            <td>${escapeHtml(ua)}</td>
            <td>${ctxHtml}</td>
            <td>${statusBadge}</td>
        `;
        fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
}

function saveModule() {
    const nameInput = document.getElementById('new-module-name');
    const name = nameInput ? nameInput.value.trim() : '';
    if (!name) {
        alert('Введіть назву модуля');
        return;
    }

    const parsedWords = {};

    if (currentEditTab === 'table') {
        if (!excelParsedData || excelParsedData.length === 0) {
            alert('Завантажте файл Excel або CSV із словами чи додайте рядки');
            return;
        }
        excelParsedData.forEach(item => {
            const word = item.word ? item.word.trim() : '';
            const trans = item.translation ? item.translation.trim() : '';
            if (word && trans) {
                parsedWords[word] = trans;
                if (item.context && item.context.trim()) {
                    const ctxEn = item.context.trim();
                    const ctxUa = item.contextTranslation ? item.contextTranslation.trim() : '';
                    const ctxString = ctxUa ? `${ctxEn} (${ctxUa})` : ctxEn;
                    CUSTOM_CONTEXT_DATA[word] = ctxString;
                    CUSTOM_CONTEXT_DATA[word.toLowerCase()] = ctxString;
                }
            }
        });
        localStorage.setItem('my_quiz_custom_context', JSON.stringify(CUSTOM_CONTEXT_DATA));
    } else {
        const text = document.getElementById('new-module-words').value.trim();
        if (!text) {
            alert('Введіть хоча б одну пару слів');
            return;
        }
        text.split('\n').forEach(line => {
            let parts = line.split(' - ');
            if (parts.length < 2) parts = line.split(' — ');
            if (parts.length < 2) parts = line.split(' – ');
            if (parts.length >= 2) {
                const en = parts[0].trim();
                const ua = parts[1].trim();
                parsedWords[en] = ua;

                // Запобігання втраті контексту для збережених слів
                if (excelParsedData && excelParsedData.length > 0) {
                    const matchItem = excelParsedData.find(item => item.word && item.word.toLowerCase() === en.toLowerCase());
                    if (matchItem && matchItem.context && matchItem.context.trim()) {
                        const ctxEn = matchItem.context.trim();
                        const ctxUa = matchItem.contextTranslation ? matchItem.contextTranslation.trim() : '';
                        const ctxString = ctxUa ? `${ctxEn} (${ctxUa})` : ctxEn;
                        CUSTOM_CONTEXT_DATA[en] = ctxString;
                        CUSTOM_CONTEXT_DATA[en.toLowerCase()] = ctxString;
                    }
                }
            }
        });
        localStorage.setItem('my_quiz_custom_context', JSON.stringify(CUSTOM_CONTEXT_DATA));
    }

    if (Object.keys(parsedWords).length === 0) {
        alert('Не вдалося розпізнати жодного слова. Перевірте правильність заповнення.');
        return;
    }

    if (editingModuleOriginalName && editingModuleOriginalName !== name) {
        delete ALL_DATA[editingModuleOriginalName];
        delete SAVED_USER_DATA[editingModuleOriginalName];
    }

    ALL_DATA[name] = parsedWords;
    SAVED_USER_DATA[name] = parsedWords;
    localStorage.setItem('my_quiz_modules', JSON.stringify(SAVED_USER_DATA));
    isMenuRendered = false;
    switchScreen('menu-screen');
}

function deleteModule(name) {
    if (confirm(`Видалити "${name}"?`)) {
        delete ALL_DATA[name]; delete SAVED_USER_DATA[name];
        localStorage.setItem('my_quiz_modules', JSON.stringify(SAVED_USER_DATA));
        isMenuRendered = false;
        renderMenu();
    }
}

function updateStreakAndGlobalStats() {
    const todayStr = new Date().toDateString();
    if (STREAK_DATA.lastDate !== todayStr && STREAK_DATA.lastDate) {
        const diffDays = Math.ceil(Math.abs(new Date(todayStr) - new Date(STREAK_DATA.lastDate)) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) STREAK_DATA.count = 0;
        localStorage.setItem('my_quiz_streak', JSON.stringify(STREAK_DATA));
    }

    const streakEl = document.getElementById('stat-streak');
    if (streakEl) {
        const count = STREAK_DATA.count || 0;
        streakEl.innerHTML = count > 0 ? `🔥 ${count}-й день активності` : `🔥 0 днів активності`;
    }

    let totalLearned = 0;
    Object.values(MEMORY_STATS).forEach(m => {
        if (m && m.score <= 0 && m.history && m.history.length > 0 && m.history[m.history.length - 1] === true) {
            totalLearned++;
        }
    });

    const totalWordsEl = document.getElementById('stat-total-words');
    if (totalWordsEl) totalWordsEl.innerHTML = `🧠 ${totalLearned} вивчено`;
}

function cleanTextForTTS(text) {
    if (!text) return '';
    return text
        .replace(/<[^>]*>/g, '')
        .replace(/\([^)]*\)/g, '')
        .replace(/^[a-zA-Z\s]+:\s*/, '')
        .replace(/[\/\;]/g, ', ')
        .replace(/\[\s*\.{3}\s*\]/g, '...')
        .replace(/\[\s*[a-zA-Z_]+\s*\]/g, '...')
        .trim();
}

// Синтез мовлення (Web Speech API) для вимоги англійських слів
function speakText(text, lang = 'en-US') {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const cleaned = cleanTextForTTS(text);
        const utterance = new SpeechSynthesisUtterance(cleaned || text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
}

function getMaskedContextSentenceForTTS(enWord, maskWith = '...') {
    const rawCtx = getContextForWord(enWord);
    const parsed = parseContextString(rawCtx);
    const sentence = parsed ? parsed.enSentence : (rawCtx || enWord);
    if (!sentence || !enWord) return sentence;

    const escapedEn = enWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedEn}\\b`, 'gi');
    if (regex.test(sentence)) {
        return sentence.replace(regex, maskWith);
    }
    const subRegex = new RegExp(escapedEn, 'gi');
    if (subRegex.test(sentence)) {
        return sentence.replace(subRegex, maskWith);
    }
    return sentence;
}

function speakCurrentWord() {
    if (currentIndex < questions.length) {
        const currentObj = questions[currentIndex];
        if (configMode.startsWith('context-')) {
            if (isShowingAnswer) {
                const rawCtx = getContextForWord(currentObj.en);
                const parsed = parseContextString(rawCtx);
                const sentenceToSpeak = parsed ? parsed.enSentence : currentObj.en;
                speakText(sentenceToSpeak || currentObj.en, 'en-US');
            } else {
                const maskedSentence = getMaskedContextSentenceForTTS(currentObj.en, '...');
                speakText(maskedSentence || '...', 'en-US');
            }
        } else {
            speakText(currentObj.en, 'en-US');
        }
    }
}

function formatContextPrompt(item, mode) {
    const en = item.en;
    const hasContext = typeof CONTEXT_DATA !== 'undefined';
    const rawCtx = hasContext ? (CONTEXT_DATA[en] || CONTEXT_DATA[en.toLowerCase()] || '') : '';
    if (!rawCtx) {
        return item.question || item.ua || item.en;
    }

    const parsed = parseContextString(rawCtx);
    const sentence = parsed ? parsed.enSentence : rawCtx;
    const translation = parsed ? parsed.uaTranslation : '';

    const escapedEn = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedEn}\\b`, 'gi');

    let maskedSentence = sentence;
    if (regex.test(sentence)) {
        if (mode === 'context-write') {
            const hint = en.charAt(0) + '_'.repeat(Math.max(1, en.length - 1));
            maskedSentence = sentence.replace(regex, `<span class="blank">[ ${hint} ]</span>`);
        } else {
            maskedSentence = sentence.replace(regex, `<span class="blank">[ ... ]</span>`);
        }
    } else {
        const subRegex = new RegExp(escapedEn, 'gi');
        if (subRegex.test(sentence)) {
            if (mode === 'context-write') {
                const hint = en.charAt(0) + '_'.repeat(Math.max(1, en.length - 1));
                maskedSentence = sentence.replace(subRegex, `<span class="blank">[ ${hint} ]</span>`);
            } else {
                maskedSentence = sentence.replace(subRegex, `<span class="blank">[ ... ]</span>`);
            }
        } else {
            if (mode === 'context-write') {
                const hint = en.charAt(0) + '_'.repeat(Math.max(1, en.length - 1));
                maskedSentence = sentence + ` <span class="blank">[ ${hint} ]</span>`;
            } else {
                maskedSentence = sentence + ` <span class="blank">[ ... ]</span>`;
            }
        }
    }

    return `
        <div class="context-prompt-wrap">
            <div class="context-prompt-sentence">${maskedSentence}</div>
            ${translation ? `<div class="context-prompt-sub">(${translation})</div>` : ''}
        </div>
    `;
}

function generateQuiz() {
    saveUserSettings();
    configMaterial = document.querySelector('input[name="quiz-material"]:checked')?.value || 'words';
    configMode = document.querySelector('input[name="quiz-mode"]:checked')?.value || 'choice';
    if (configMaterial === 'words') {
        configTarget = document.querySelector('input[name="quiz-lang"]:checked')?.value || 'ua';
    } else {
        configTarget = 'en';
    }
    const limitVal = getSelectedQuizLimit();
    const isHardOnly = document.getElementById('hard-only-toggle')?.checked ?? false;

    let originalPairs = Object.entries(ALL_DATA[selectedModule]);

    if (configMaterial === 'context' || configMode.startsWith('context-')) {
        const contextPairs = originalPairs.filter(pair => {
            const raw = getContextForWord(pair[0]);
            return Boolean(raw && getMaskedContext(pair[0], raw));
        });
        const minRequired = configMode === 'context-match' ? 4 : 1;
        if (contextPairs.length >= minRequired) {
            originalPairs = contextPairs;
        } else {
            alert('⚠️ Для цього модуля ще не додано речення контексту. Оберіть режим "Окремі слова".');
            configMaterial = 'words';
            configMode = 'choice';
            const matWords = document.getElementById('material-words');
            if (matWords) matWords.checked = true;
            handleMaterialChange();
            return;
        }
    }

    if (isHardOnly) {
        const hardPairs = originalPairs.filter(pair => {
            const statKey = `${selectedModule}_${pair[0]}`;
            const m = MEMORY_STATS[statKey];
            return !m || m.score > 0 || (m.history && m.history.includes(false));
        });
        if (hardPairs.length > 0) {
            originalPairs = hardPairs;
        } else {
            alert('🎉 Чудово! У цьому модулі немає складних слів. Запускаємо стандартне тренування.');
        }
    }

    let pool = [];
    originalPairs.forEach(pair => {
        const statKey = `${selectedModule}_${pair[0]}`;
        const wordStat = MEMORY_STATS[statKey] || { score: 2, history: [] };
        let weight = Math.max(1, wordStat.score);
        for (let i = 0; i < weight; i++) {
            const isContext = configMaterial === 'context' || configMode.startsWith('context-');
            pool.push({
                en: pair[0],
                ua: pair[1],
                question: isContext ? pair[0] : (configTarget === 'ua' ? pair[1] : pair[0]),
                answer: isContext ? pair[0] : (configTarget === 'ua' ? pair[0] : pair[1])
            });
        }
    });
    pool.sort(() => Math.random() - 0.5);
    questions = []; let usedEn = new Set();
    pool.forEach(item => { if (!usedEn.has(item.en)) { questions.push(item); usedEn.add(item.en); } });

    let targetLimit = limitVal === 'max' ? originalPairs.length : parseInt(limitVal);
    questions = questions.slice(0, Math.min(targetLimit, originalPairs.length));

    currentIndex = 0; score = 0; currentCombo = 0; sessionLogs = [];
    switchScreen('quiz-screen'); showQuestion();
}

function startMistakesOnlyQuiz() {
    const errorLogs = sessionLogs.filter(item => !item.isCorrect);
    if (errorLogs.length === 0) return;

    questions = errorLogs.map(log => ({
        en: log.question === log.answer ? log.question : (log.answer.match(/[a-zA-Z]/) ? log.answer : log.question),
        ua: log.question === log.answer ? log.answer : (log.answer.match(/[a-zA-Z]/) ? log.question : log.answer),
        question: log.question,
        answer: log.answer
    }));

    currentIndex = 0; score = 0; currentCombo = 0; sessionLogs = [];
    switchScreen('quiz-screen'); showQuestion();
}

function toggleTranslationHint(btn) {
    const hintText = btn.nextElementSibling;
    if (hintText) {
        if (hintText.style.display === 'none' || !hintText.style.display) {
            hintText.style.display = 'inline-block';
            btn.innerText = '🙈 Сховати';
        } else {
            hintText.style.display = 'none';
            btn.innerText = '👁️ Переклад';
        }
    }
}

function getContextForWord(enWord) {
    if (!enWord) return '';
    const lower = enWord.toLowerCase();
    if (typeof CUSTOM_CONTEXT_DATA !== 'undefined' && CUSTOM_CONTEXT_DATA) {
        if (CUSTOM_CONTEXT_DATA[enWord]) return CUSTOM_CONTEXT_DATA[enWord];
        if (CUSTOM_CONTEXT_DATA[lower]) return CUSTOM_CONTEXT_DATA[lower];
    }
    if (typeof CONTEXT_DATA !== 'undefined' && CONTEXT_DATA) {
        if (CONTEXT_DATA[enWord]) return CONTEXT_DATA[enWord];
        if (CONTEXT_DATA[lower]) return CONTEXT_DATA[lower];
        const keys = Object.keys(CONTEXT_DATA);
        for (let k of keys) {
            if (k.toLowerCase() === lower || k.toLowerCase().includes(lower)) {
                return CONTEXT_DATA[k];
            }
        }
    }
    return '';
}

function parseContextString(rawCtx) {
    if (!rawCtx) return null;
    const match = rawCtx.match(/^(.*?)(?:\s*\((.*?)\))?$/);
    if (!match) return { enSentence: rawCtx.trim(), uaTranslation: '' };
    return {
        enSentence: (match[1] || rawCtx).trim(),
        uaTranslation: (match[2] || '').trim()
    };
}

function getMaskedContext(enWord, rawCtx) {
    if (!enWord || !rawCtx) return null;
    const parsed = parseContextString(rawCtx);
    if (!parsed || !parsed.enSentence) return null;

    const escapedEn = enWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const testRegex = new RegExp(`\\b${escapedEn}\\b`, 'i');

    let masked = parsed.enSentence;
    if (testRegex.test(masked)) {
        const replaceRegex = new RegExp(`\\b${escapedEn}\\b`, 'gi');
        masked = masked.replace(replaceRegex, '<span class="blank">[ ... ]</span>');
    } else {
        const subTestRegex = new RegExp(escapedEn, 'i');
        if (subTestRegex.test(masked)) {
            const subReplaceRegex = new RegExp(escapedEn, 'gi');
            masked = masked.replace(subReplaceRegex, '<span class="blank">[ ... ]</span>');
        } else {
            masked = parsed.enSentence + ' <span class="blank">[ ... ]</span>';
        }
    }

    return {
        word: enWord,
        enMasked: masked,
        enFull: parsed.enSentence,
        uaTrans: parsed.uaTranslation
    };
}

function showQuestion() {
    const inputEl = document.getElementById('user-input'); const msgEl = document.getElementById('result-msg');
    const btnEl = document.getElementById('action-btn'); const writeBlock = document.getElementById('write-block'); const choiceBlock = document.getElementById('choice-block');
    isShowingAnswer = false; if (msgEl) msgEl.innerText = '';
    const isWriteType = configMode === 'write' || configMode === 'context-write';
    if (btnEl) { btnEl.innerText = 'Перевірити (Enter ↵)'; btnEl.style.display = isWriteType ? 'block' : 'none'; }

    if (currentIndex < questions.length) {
        const currentObj = questions[currentIndex];
        const comboBadgeHtml = currentCombo >= 2 ? `<span class="combo-badge">⚡ ${currentCombo}x COMBO!</span>` : '';
        document.getElementById('quiz-progress').innerHTML = `Картка ${currentIndex + 1} з ${questions.length} | Рахунок: ${score} ${comboBadgeHtml}`;

        const wordEl = document.getElementById('target-word');
        if (configMode.startsWith('context-')) {
            wordEl.innerHTML = formatContextPrompt(currentObj, configMode);
        } else {
            wordEl.innerText = currentObj.question;
        }

        const autoAudio = document.getElementById('auto-audio-toggle').checked;
        if (autoAudio && (configTarget === 'en' || configMode.startsWith('context-'))) {
            speakCurrentWord();
        }

        if (isWriteType) {
            writeBlock.style.display = 'block'; choiceBlock.style.display = 'none';
            if (inputEl) { 
                inputEl.value = ''; 
                inputEl.disabled = false; 
                inputEl.placeholder = configMode === 'context-write'
                    ? 'Введіть пропущене слово...'
                    : (configTarget === 'ua' ? 'Введіть переклад англійською...' : 'Введіть переклад українською...');
                setTimeout(() => inputEl.focus(), 20); 
            }
        } else {
            writeBlock.style.display = 'none'; choiceBlock.style.display = 'grid'; generateChoices(currentObj);
        }

        startWordTimer();
    } else {
        stopLiveTimer();
        const todayStr = new Date().toDateString();
        if (STREAK_DATA.lastDate !== todayStr) {
            STREAK_DATA.count += 1;
            STREAK_DATA.lastDate = todayStr;
            localStorage.setItem('my_quiz_streak', JSON.stringify(STREAK_DATA));
        }
        renderSessionSummary();
    }
}

function renderSessionSummary() {
    let totalSessionMs = sessionLogs.reduce((acc, curr) => acc + curr.timeMs, 0);
    let totalSec = Math.round(totalSessionMs / 1000);
    let avgSec = sessionLogs.length > 0 ? (totalSec / sessionLogs.length).toFixed(1) : '0';

    const successLogs = sessionLogs.filter(item => item.isCorrect);
    const errorLogs = sessionLogs.filter(item => !item.isCorrect);
    const errorCount = errorLogs.length;

    const successRowsHtml = successLogs.length > 0 ? successLogs.map(log => `
        <div class="word-time-row correct">
            <span>✅ <strong>${log.question}</strong> → ${log.answer}</span>
            <span class="word-time-val">${(log.timeMs / 1000).toFixed(1)}s</span>
        </div>
    `).join('') : '<div style="color:var(--subtext); font-size:13px; padding:10px;">Немає вірних відповідей</div>';

    const errorRowsHtml = errorLogs.length > 0 ? errorLogs.map(log => `
        <div class="word-time-row incorrect">
            <span>❌ <strong>${log.question}</strong> → <span style="color:var(--red);">${log.userAnswer || 'Помилка'}</span> (Вірно: ${log.answer})</span>
            <span class="word-time-val">${(log.timeMs / 1000).toFixed(1)}s</span>
        </div>
    `).join('') : '<div style="color:var(--subtext); font-size:13px; padding:10px;">Чудово! Жодної помилки! 🎉</div>';

    const resultContainerBox = document.getElementById('result-container-box');
    if (resultContainerBox) {
        resultContainerBox.innerHTML = `
            <h2 style="color:var(--accent); margin-bottom:10px; text-align:center;">📊 Результати тесту</h2>
            
            <div class="session-summary-grid">
                <div class="summary-stat-card">
                    <div class="summary-stat-val" style="color:var(--green);">${score} / ${questions.length}</div>
                    <div class="summary-stat-lbl">Вірно</div>
                </div>
                <div class="summary-stat-card">
                    <div class="summary-stat-val" style="color:var(--red);">${errorCount}</div>
                    <div class="summary-stat-lbl">Кількість помилок</div>
                </div>
                <div class="summary-stat-card">
                    <div class="summary-stat-val">${formatTime(totalSec)}</div>
                    <div class="summary-stat-lbl">Загальний час</div>
                </div>
                <div class="summary-stat-card">
                    <div class="summary-stat-val">${avgSec}s</div>
                    <div class="summary-stat-lbl">Сер. час / слово</div>
                </div>
            </div>

            <div class="summary-columns-grid">
                <div class="summary-column-box success-border">
                    <div class="summary-col-header" style="color:var(--green);">
                        <span>✅ Успішні слова</span>
                        <span>${successLogs.length}</span>
                    </div>
                    <div class="word-time-list">${successRowsHtml}</div>
                </div>

                <div class="summary-column-box error-border">
                    <div class="summary-col-header" style="color:var(--red);">
                        <span>❌ Зроблено помилок</span>
                        <span>${errorLogs.length}</span>
                    </div>
                    <div class="word-time-list">${errorRowsHtml}</div>
                </div>
            </div>

            ${errorCount > 0 ? `<button class="main-btn btn-mistakes" onclick="startMistakesOnlyQuiz()">🔁 Опрацювати помилки (${getPlural(errorCount, ['слово', 'слова', 'слів'])})</button>` : ''}
            <button class="main-btn" onclick="switchScreen('menu-screen')" style="margin-top:15px;">Повернутися до меню</button>
        `;
    }

    switchScreen('result-screen');
}

function generateChoices(currentObj) {
    const choiceBlock = document.getElementById('choice-block'); choiceBlock.innerHTML = '';
    
    if (configMode === 'context-match') {
        choiceBlock.classList.add('context-match-grid');
        const targetCtxRaw = getContextForWord(currentObj.en);
        const targetObj = getMaskedContext(currentObj.en, targetCtxRaw);

        if (!targetObj) {
            alert('⚠️ Для цього слова відсутнє речення контексту. Повертаємося до налаштувань.');
            handleBackNavigation();
            return;
        }

        const modulePairs = Object.entries(ALL_DATA[selectedModule]);
        let distractorObjs = [];

        const otherWords = modulePairs
            .map(p => ({ en: p[0], ua: p[1] }))
            .filter(w => w.en.toLowerCase() !== currentObj.en.toLowerCase())
            .sort(() => Math.random() - 0.5);

        for (let wItem of otherWords) {
            if (distractorObjs.length >= 3) break;
            const ctx = getContextForWord(wItem.en);
            if (!ctx) continue;
            const obj = getMaskedContext(wItem.en, ctx);
            if (obj && !distractorObjs.some(d => d.word.toLowerCase() === obj.word.toLowerCase())) {
                distractorObjs.push(obj);
            }
        }

        if (distractorObjs.length < 3 && typeof CONTEXT_DATA !== 'undefined') {
            const allCtxKeys = Object.keys(CONTEXT_DATA)
                .filter(k => k.toLowerCase() !== currentObj.en.toLowerCase())
                .sort(() => Math.random() - 0.5);
            for (let k of allCtxKeys) {
                if (distractorObjs.length >= 3) break;
                if (distractorObjs.some(d => d.word.toLowerCase() === k.toLowerCase())) continue;
                const obj = getMaskedContext(k, CONTEXT_DATA[k]);
                if (obj) distractorObjs.push(obj);
            }
        }

        const allOptions = [
            { ...targetObj, isCorrect: true },
            ...distractorObjs.map(d => ({ ...d, isCorrect: false }))
        ].sort(() => Math.random() - 0.5);

        currentChoices = allOptions;

        allOptions.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'choice-btn context-card';
            btn.innerHTML = `
                <div class="context-card-top">
                    <span class="sentence-text">${opt.enMasked}</span>
                    <span class="key-hint">${idx + 1}</span>
                </div>
                ${opt.uaTrans ? `<div class="context-card-sub">(${opt.uaTrans})</div>` : ''}
            `;
            btn.onclick = () => selectContextMatchChoice(btn, opt, allOptions);
            choiceBlock.appendChild(btn);
        });
        return;
    }

    choiceBlock.classList.remove('context-match-grid');
    generateStandardChoices(currentObj);
}

function generateStandardChoices(currentObj) {
    const choiceBlock = document.getElementById('choice-block');
    const isContextMode = configMode.startsWith('context-');
    let allAnswersPool = Object.entries(ALL_DATA[selectedModule]).map(pair => {
        if (isContextMode) return pair[0];
        return configTarget === 'ua' ? pair[0] : pair[1];
    });
    let pool = allAnswersPool.filter(ans => ans.toLowerCase() !== currentObj.answer.toLowerCase()).sort(() => Math.random() - 0.5);
    let finalChoices = [currentObj.answer, pool[0], pool[1], pool[2]].filter(Boolean).sort(() => Math.random() - 0.5);
    currentChoices = finalChoices;

    finalChoices.forEach((choice, idx) => {
        const btn = document.createElement('button'); btn.className = 'choice-btn';
        btn.innerHTML = `<span>${choice}</span><span class="key-hint">${idx + 1}</span>`;
        btn.onclick = () => selectChoice(btn, choice, currentObj.answer); choiceBlock.appendChild(btn);
    });
}

function selectContextMatchChoice(clickedBtn, selectedOpt, allOptions) {
    if (isShowingAnswer) return;
    isShowingAnswer = true;
    stopLiveTimer();
    currentWordDuration = Date.now() - wordStartTime;

    const msgEl = document.getElementById('result-msg');
    const btnEl = document.getElementById('action-btn');
    if (btnEl) btnEl.style.display = 'none';

    const currentObj = questions[currentIndex];
    const isCorrect = selectedOpt.isCorrect;

    const allBtns = document.querySelectorAll('.choice-btn.context-card');

    if (isCorrect) {
        currentCombo++;
        score++;
        clickedBtn.classList.add('correct');
        const textSpan = clickedBtn.querySelector('.sentence-text') || clickedBtn.querySelector('.context-card-text');
        if (textSpan) textSpan.innerText = selectedOpt.enFull;

        if (msgEl) {
            msgEl.className = 'result success';
            msgEl.innerText = currentCombo >= 2 ? `🔥 Точно в ціль! (Combo x${currentCombo})` : '🔥 Точно в ціль!';
        }
    } else {
        currentCombo = 0;
        clickedBtn.classList.add('incorrect');

        allOptions.forEach((opt, idx) => {
            if (opt.isCorrect && allBtns[idx]) {
                allBtns[idx].classList.add('correct-outline');
                const textSpan = allBtns[idx].querySelector('.sentence-text') || allBtns[idx].querySelector('.context-card-text');
                if (textSpan) textSpan.innerText = opt.enFull;
            }
        });

        if (msgEl) {
            msgEl.className = 'result error';
            msgEl.innerText = `❌ Схибив!`;
        }
    }

    updateMemoryAlgorithm(currentObj, isCorrect, currentWordDuration);

    sessionLogs.push({
        question: currentObj.question,
        answer: currentObj.answer,
        userAnswer: selectedOpt.enFull || selectedOpt.enMasked,
        isCorrect: isCorrect,
        timeMs: currentWordDuration
    });

    setTimeout(() => {
        currentIndex++;
        showQuestion();
    }, 900);
}

function generateChoices(currentObj) {
    const choiceBlock = document.getElementById('choice-block'); choiceBlock.innerHTML = '';
    const isContextMode = configMode.startsWith('context-');
    let allAnswersPool = Object.entries(ALL_DATA[selectedModule]).map(pair => {
        if (isContextMode) return pair[0];
        return configTarget === 'ua' ? pair[0] : pair[1];
    });
    let pool = allAnswersPool.filter(ans => ans.toLowerCase() !== currentObj.answer.toLowerCase()).sort(() => Math.random() - 0.5);
    let finalChoices = [currentObj.answer, pool[0], pool[1], pool[2]].filter(Boolean).sort(() => Math.random() - 0.5);
    currentChoices = finalChoices;

    finalChoices.forEach((choice, idx) => {
        const btn = document.createElement('button'); btn.className = 'choice-btn';
        btn.innerHTML = `<span>${choice}</span><span class="key-hint">${idx + 1}</span>`;
        btn.onclick = () => selectChoice(btn, choice, currentObj.answer); choiceBlock.appendChild(btn);
    });
}

function selectChoice(clickedBtn, selectedAnswer, correctAnswer) {
    if (isShowingAnswer) return;
    isShowingAnswer = true;
    stopLiveTimer();
    currentWordDuration = Date.now() - wordStartTime;

    const msgEl = document.getElementById('result-msg');
    const btnEl = document.getElementById('action-btn');
    if (btnEl) { btnEl.style.display = 'block'; btnEl.innerText = 'Далі (Enter ↵)'; }

    const isCorrect = isFuzzyMatch(selectedAnswer, correctAnswer);
    const currentObj = questions[currentIndex];

    // Highlight slot in prompt if in context-slot mode
    if (configMode === 'context-slot') {
        const slotEl = document.querySelector('#target-word .blank');
        if (slotEl) {
            if (isCorrect) {
                slotEl.innerText = correctAnswer;
                slotEl.style.background = 'var(--green)';
                slotEl.style.color = '#11111b';
                slotEl.style.borderColor = 'var(--green)';
            } else {
                slotEl.style.background = 'var(--red)';
                slotEl.style.color = '#11111b';
                slotEl.style.borderColor = 'var(--red)';
            }
        }
    }

    document.querySelectorAll('.choice-btn').forEach(btn => {
        const span = btn.querySelector('span:not(.key-hint)') || btn;
        if (span.innerText.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
            btn.style.background = 'var(--green)';
            btn.style.color = '#11111b';
            btn.style.borderColor = 'var(--green)';
        }
    });

    if (isCorrect) {
        currentCombo++;
        score++;
        if (clickedBtn) {
            clickedBtn.style.background = 'var(--green)';
            clickedBtn.style.color = '#11111b';
        }
        if (msgEl) {
            msgEl.className = 'result success';
            msgEl.innerText = currentCombo >= 2 ? `🔥 Правильно! (Combo x${currentCombo})` : '🔥 Правильно!';
        }
    } else {
        currentCombo = 0;
        if (clickedBtn) {
            clickedBtn.style.background = 'var(--red)';
            clickedBtn.style.color = '#11111b';
        }
        if (msgEl) {
            msgEl.className = 'result error';
            msgEl.innerText = `❌ Схибив! (Вірно: ${correctAnswer})`;
        }
    }

    updateMemoryAlgorithm(currentObj, isCorrect, currentWordDuration);

    sessionLogs.push({
        question: currentObj.question,
        answer: currentObj.answer,
        userAnswer: selectedAnswer,
        isCorrect: isCorrect,
        timeMs: currentWordDuration
    });
}

function handleQuizSubmit() {
    if (configMode === 'write' || configMode === 'context-write') {
        const inputEl = document.getElementById('user-input'); const msgEl = document.getElementById('result-msg'); const btnEl = document.getElementById('action-btn');
        const currentObj = questions[currentIndex];
        if (!isShowingAnswer) {
            stopLiveTimer();
            currentWordDuration = Date.now() - wordStartTime;

            const userAns = inputEl.value;
            const isCorrect = isFuzzyMatch(userAns, currentObj.answer);
            inputEl.disabled = true; isShowingAnswer = true;

            if (isCorrect) {
                currentCombo++;
            } else {
                currentCombo = 0;
            }

            updateMemoryAlgorithm(currentObj, isCorrect, currentWordDuration);

            sessionLogs.push({
                question: currentObj.question,
                answer: currentObj.answer,
                userAnswer: userAns || 'Порожня відповідь',
                isCorrect: isCorrect,
                timeMs: currentWordDuration
            });

            if (isCorrect) { score++; msgEl.className = 'result success'; msgEl.innerText = currentCombo >= 2 ? `🔥 Точно в ціль! (Combo x${currentCombo})` : '🔥 Точно в ціль!'; }
            else { msgEl.className = 'result error'; msgEl.innerText = `❌ Правильно: ${currentObj.answer}`; }
            btnEl.innerText = 'Далі (Enter ↵)';
        } else { currentIndex++; showQuestion(); }
    } else {
        if (isShowingAnswer) { currentIndex++; showQuestion(); }
    }
}

function normalizeText(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/^(to|a|an|the)\s+/i, '')
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .replace(/\s+/g, " ");
}

function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

// Нечіткий пошук та перевірка варіацій відповідей (Fuzzy Match)
function isFuzzyMatch(userInput, targetAnswer) {
    const normUser = normalizeText(userInput);
    const normTarget = normalizeText(targetAnswer);

    if (!normUser) return false;
    if (normUser === normTarget) return true;

    const rawVariants = [targetAnswer];
    targetAnswer.split(/[\/\(\);,]/).forEach(part => {
        const trimmed = part.trim();
        if (trimmed) rawVariants.push(trimmed);
    });

    targetAnswer.split(/[:]/).forEach(part => {
        const trimmed = part.trim();
        if (trimmed) rawVariants.push(trimmed);
    });

    const targetVariants = Array.from(new Set(rawVariants.map(v => normalizeText(v)).filter(v => v.length > 0)));

    for (let variant of targetVariants) {
        if (normUser === variant) return true;
        const dist = levenshteinDistance(normUser, variant);
        const maxAllowedDiff = variant.length > 7 ? 2 : (variant.length > 3 ? 1 : 0);
        if (dist <= maxAllowedDiff) return true;
    }

    return false;
}

// Алгоритм інтервального повторення та збереження статистики пам'яті
function updateMemoryAlgorithm(currentObj, isCorrect, timeSpentMs = 0) {
    const enWord = currentObj.en;
    if (!enWord) return;

    const statKey = `${selectedModule}_${enWord}`;
    if (!MEMORY_STATS[statKey]) {
        MEMORY_STATS[statKey] = {
            score: 2,
            history: [],
            log: [],
            stats: {
                modes: { write: { correct: 0, total: 0 }, choice: { correct: 0, total: 0 }, context: { correct: 0, total: 0 } },
                langs: { ua: { correct: 0, total: 0 }, en: { correct: 0, total: 0 } }
            }
        };
    }

    const item = MEMORY_STATS[statKey];

    if (isCorrect) {
        item.score = Math.max(0, item.score - 1);
        item.history.push(true);
    } else {
        item.score += 2;
        item.history.push(false);
    }

    if (item.history.length > 5) item.history.shift();
    if (!item.log) item.log = [];

    const activeMode = (configMode === 'choice' || configMode === 'context-slot' || configMode === 'context-match') ? 'choice' : 'write';
    const activeLang = configTarget === 'en' ? 'en' : 'ua';

    item.log.push({
        date: Date.now(),
        mode: activeMode,
        lang: activeLang,
        isCorrect: isCorrect,
        timeSpentMs: timeSpentMs
    });

    if (item.log.length > 100) item.log.shift();

    if (!item.stats) {
        item.stats = {
            modes: { write: { correct: 0, total: 0 }, choice: { correct: 0, total: 0 }, context: { correct: 0, total: 0 } },
            langs: { ua: { correct: 0, total: 0 }, en: { correct: 0, total: 0 } }
        };
    }
    if (!item.stats.modes[activeMode]) item.stats.modes[activeMode] = { correct: 0, total: 0 };
    item.stats.modes[activeMode].total++;
    if (isCorrect) item.stats.modes[activeMode].correct++;

    if (!item.stats.langs[activeLang]) item.stats.langs[activeLang] = { correct: 0, total: 0 };
    item.stats.langs[activeLang].total++;
    if (isCorrect) item.stats.langs[activeLang].correct++;

    recordDailyActivity(isCorrect, timeSpentMs);
    scheduleSaveMemoryStats();
}

let saveMemoryStatsTimer = null;
function scheduleSaveMemoryStats() {
    if (saveMemoryStatsTimer) return;
    saveMemoryStatsTimer = setTimeout(() => {
        localStorage.setItem('my_quiz_mem_stats', JSON.stringify(MEMORY_STATS));
        saveMemoryStatsTimer = null;
    }, 200);
}
window.addEventListener('beforeunload', () => {
    if (saveMemoryStatsTimer) {
        clearTimeout(saveMemoryStatsTimer);
        localStorage.setItem('my_quiz_mem_stats', JSON.stringify(MEMORY_STATS));
    }
});

function stopQuizSession() {
    stopLiveTimer();
    isShowingAnswer = false;
    currentIndex = 0;
    score = 0;
    currentCombo = 0;
    sessionLogs = [];
    if (timerTimeout) {
        clearTimeout(timerTimeout);
        timerTimeout = null;
    }
}

function handleBackNavigation() {
    if (currentActiveScreen === 'quiz-screen') {
        stopQuizSession();
        if (selectedModule) {
            openSetup(selectedModule);
        } else {
            switchScreen('menu-screen');
        }
        return;
    }

    if (currentActiveScreen === 'setup-screen') {
        switchScreen('menu-screen');
        return;
    }

    if (currentActiveScreen === 'stats-screen' || currentActiveScreen === 'create-screen' || currentActiveScreen === 'result-screen') {
        switchScreen('menu-screen');
        return;
    }

    switchScreen('menu-screen');
}

// Обробка глобальних гарячих клавіш (Enter, Space, Esc, цифри вибору)
document.addEventListener('keydown', function (e) {
    const quizScreen = document.getElementById('quiz-screen');
    const changelogModal = document.getElementById('changelog-modal');

    if (e.key === 'Escape') {
        const calendarModal = document.getElementById('calendar-modal');
        if (calendarModal && calendarModal.classList.contains('active')) {
            e.preventDefault();
            closeCalendarModal();
            return;
        }
        if (changelogModal && changelogModal.classList.contains('active')) {
            e.preventDefault();
            closeChangelogModal();
            return;
        }
        e.preventDefault();
        handleBackNavigation();
        return;
    }

    if (!quizScreen.classList.contains('active')) return;

    const isInputActive = (document.activeElement?.tagName === 'INPUT' && !document.activeElement?.disabled) || document.activeElement?.tagName === 'TEXTAREA';

    if ((e.key === 'r' || e.key === 'R') && !isInputActive) {
        e.preventDefault();
        speakCurrentWord();
        return;
    }

    if ((e.key === ' ' || e.key === 'Spacebar') && isShowingAnswer && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        currentIndex++;
        showQuestion();
        return;
    }

    if (e.key === 'Enter') {
        e.preventDefault();
        handleQuizSubmit();
        return;
    }

    if (['choice', 'context-slot', 'context-match'].includes(configMode) && !isShowingAnswer) {
        if (['1', '2', '3', '4'].includes(e.key)) {
            const choiceIndex = parseInt(e.key) - 1;
            const choiceBtns = document.querySelectorAll('.choice-btn');
            if (choiceBtns[choiceIndex]) {
                choiceBtns[choiceIndex].click();
            }
        }
    }
});

window.onload = function () {
    loadUserSettings();
    setupExcelDropzone();
    switchScreen('menu-screen');
};

(function () {
    const btn = document.getElementById('scroll-top-btn');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });
})();
