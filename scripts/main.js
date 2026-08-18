// Ініціалізація та завантаження локальних даних користувача
    if (typeof DEFAULT_MODULES === 'undefined') window.DEFAULT_MODULES = {};

    let SAVED_USER_DATA = JSON.parse(localStorage.getItem('my_quiz_modules')) || {};
    let ALL_DATA = Object.assign({}, DEFAULT_MODULES, SAVED_USER_DATA);

    let MEMORY_STATS = JSON.parse(localStorage.getItem('my_quiz_mem_stats')) || {};
    let STREAK_DATA = JSON.parse(localStorage.getItem('my_quiz_streak')) || { count: 0, lastDate: "" };

    let selectedModule = ''; let questions = []; let currentIndex = 0; let score = 0;
    let isShowingAnswer = false; let configMode = 'write'; let configTarget = 'ua'; let editingModuleOriginalName = '';
    let currentChoices = [];
    let isMenuRendered = false;
    let currentActiveScreen = 'menu-screen';
    let isGrammarQuiz = false;
    let selectedTimeFilter = 'all';

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

    // Форматування секунд у зручний рядок (хвилі / секунди)
    function formatTime(totalSec) {
        let min = Math.floor(totalSec / 60);
        let sec = totalSec % 60;
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

    // Збереження параметрів користувача у LocalStorage
    function saveUserSettings() {
        const modeVal = document.querySelector('input[name="quiz-mode"]:checked')?.value || 'write';
        const langVal = document.querySelector('input[name="quiz-lang"]:checked')?.value || 'ua';
        const limitVal = document.getElementById('quiz-limit-select')?.value || '20';
        const audioVal = document.getElementById('auto-audio-toggle')?.checked ?? false;
        const trackTimeVal = document.getElementById('track-time-toggle')?.checked ?? true;
        const timerModeVal = document.getElementById('timer-mode-toggle')?.checked ?? false;
        const hardOnlyVal = document.getElementById('hard-only-toggle')?.checked ?? false;

        const settingsObj = { 
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
            document.getElementById('mode-choice').checked = true;
            document.getElementById('lang-en').checked = true;
            document.getElementById('quiz-limit-select').value = '20';
            document.getElementById('auto-audio-toggle').checked = false;
            document.getElementById('track-time-toggle').checked = true;
            document.getElementById('timer-mode-toggle').checked = false;
            document.getElementById('hard-only-toggle').checked = false;
            return;
        }

        if (saved.mode) {
            const modeRadio = document.querySelector(`input[name="quiz-mode"][value="${saved.mode}"]`);
            if (modeRadio) modeRadio.checked = true;
        }
        if (saved.lang) {
            const langRadio = document.querySelector(`input[name="quiz-lang"][value="${saved.lang}"]`);
            if (langRadio) langRadio.checked = true;
        }
        if (saved.limit) {
            const selectEl = document.getElementById('quiz-limit-select');
            if (selectEl) selectEl.value = saved.limit;
        }
        if (saved.audio !== undefined) document.getElementById('auto-audio-toggle').checked = saved.audio;
        if (saved.trackTime !== undefined) document.getElementById('track-time-toggle').checked = saved.trackTime;
        if (saved.timerMode !== undefined) document.getElementById('timer-mode-toggle').checked = saved.timerMode;
        if (saved.hardOnly !== undefined) document.getElementById('hard-only-toggle').checked = saved.hardOnly;
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
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

        

        const targetScreen = document.getElementById(screenId);
        if (targetScreen) targetScreen.classList.add('active');
        
        const statsPanel = document.getElementById('stats-panel');
        const navToggleBtn = document.getElementById('nav-toggle-btn');
        
        if (screenId === 'menu-screen') {
            if (statsPanel) statsPanel.style.display = 'flex';
            if (navToggleBtn) navToggleBtn.innerText = '📊 Детальна статистика';
            updateStreakAndGlobalStats();
            isMenuRendered = false;
            renderMenu();
        } else if (screenId === 'stats-screen') {
            if (statsPanel) statsPanel.style.display = 'flex';
            if (navToggleBtn) navToggleBtn.innerText = '🏠 Повернутися до головного меню';
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

            reader.onload = function(e) {
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
            version: "6.5",
            date: new Date().toISOString(),
            modules: SAVED_USER_DATA,
            stats: MEMORY_STATS,
            streak: STREAK_DATA,
            settings: JSON.parse(localStorage.getItem('my_quiz_settings')) || {}
        };
        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `my_quiz_backup_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Відновлення даних із резервної копії JSON
    function importBackupJSON(input) {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
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
            SAVED_USER_DATA = {}; ALL_DATA = Object.assign({}, DEFAULT_MODULES); MEMORY_STATS = {}; STREAK_DATA = { count: 0, lastDate: "" };
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

    // Рендеринг списку модулів на головному екрані
    function renderMenu() {
        const container = document.getElementById('modules-container');
        if (!container) return;
        container.innerHTML = '';
        
        const sortedKeys = Object.keys(ALL_DATA).sort((a, b) => {
            let numA = parseInt(a.match(/\d+/)?.[0]) || 999;
            let numB = parseInt(b.match(/\d+/)?.[0]) || 999;
            return numA - numB;
        });

        if (sortedKeys.length === 0) {
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

        const fragment = document.createDocumentFragment();

        // Grammar Card injection
        const grammarCard = document.createElement('div');
        grammarCard.className = 'module-item grammar-card';
        grammarCard.innerHTML = `
            <div class="module-top" onclick="openGrammarHub()">
                <div class="module-name-click" style="font-size: 18px;">
                    ⏳ <strong style="color: var(--purple);">Часи граматика</strong>
                    <div style="font-size:13px; color:var(--subtext); margin-top:5px; font-weight:normal;">Всі часи (Tenses)</div>
                </div>
            </div>
        `;
        fragment.appendChild(grammarCard);


        sortedKeys.forEach(name => {
            const stats = calculateModuleProgress(name);
            const item = document.createElement('div');
            item.className = 'module-item';
            item.setAttribute('data-name', name);
            
            item.innerHTML = `
                <div class="module-top" data-action="open">
                    <div class="module-name-click">
                        📂 <strong>${name}</strong>
                        <div style="font-size:13px; color:var(--subtext); margin-top:5px;">${stats.total} картка(ок)</div>
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
                    <button class="action-btn-small edit-btn" data-action="edit">✏️</button>
                    <button class="action-btn-small delete-btn" data-action="delete">❌</button>
                </div>
            `;
            fragment.appendChild(item);
        });

        container.appendChild(fragment);
        isMenuRendered = true;
    }

    document.getElementById('modules-container').addEventListener('click', function(e) {
        const btn = e.target.closest('[data-action]');
        const card = e.target.closest('.module-item');
        if (!card) return;

        if (card.classList.contains('grammar-card')) {
            openGrammarHub();
            return;
        }

        const name = card.getAttribute('data-name');
        const action = btn ? btn.getAttribute('data-action') : 'open';

        if (action === 'open') {
            openSetup(name);
        } else if (action === 'edit') {
            e.stopPropagation();
            openEditScreen(name);
        } else if (action === 'delete') {
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

    function calculateGlobalModeAnalytics(timeFilter) {
        let summary = {
            write: { correct: 0, total: 0 },
            choice: { correct: 0, total: 0 },
            ua: { correct: 0, total: 0 },
            en: { correct: 0, total: 0 }
        };

        Object.values(MEMORY_STATS).forEach(item => {
            if (item.log) {
                const filtered = filterLogsByTime(item.log, timeFilter);
                filtered.forEach(entry => {
                    const modeKey = entry.mode === 'choice' ? 'choice' : 'write';
                    summary[modeKey].total++;
                    if (entry.isCorrect) summary[modeKey].correct++;

                    const langKey = entry.lang === 'en' ? 'en' : 'ua';
                    summary[langKey].total++;
                    if (entry.isCorrect) summary[langKey].correct++;
                });
            } else if (timeFilter === 'all' && item.stats) {
                if (item.stats.modes?.write) { summary.write.correct += item.stats.modes.write.correct || 0; summary.write.total += item.stats.modes.write.total || 0; }
                if (item.stats.modes?.choice) { summary.choice.correct += item.stats.modes.choice.correct || 0; summary.choice.total += item.stats.modes.choice.total || 0; }
                if (item.stats.langs?.ua) { summary.ua.correct += item.stats.langs.ua.correct || 0; summary.ua.total += item.stats.langs.ua.total || 0; }
                if (item.stats.langs?.en) { summary.en.correct += item.stats.langs.en.correct || 0; summary.en.total += item.stats.langs.en.total || 0; }
            }
        });

        return summary;
    }

    function getUnitAnalyticsForPeriod(moduleName, filterKey) {
        let correct = 0;
        let total = 0;
        let totalTimeMs = 0;
        const wordPairs = Object.keys(ALL_DATA[moduleName] || {});

        wordPairs.forEach(enWord => {
            const statKey = `${moduleName}_${enWord}`;
            const item = MEMORY_STATS[statKey];
            if (item && item.log) {
                const filtered = filterLogsByTime(item.log, filterKey);
                filtered.forEach(e => {
                    total++;
                    if (e.isCorrect) correct++;
                    if (e.timeSpentMs) totalTimeMs += e.timeSpentMs;
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

    function renderDetailedStats() {
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

        // Grammar Card injection
        const grammarCard = document.createElement('div');
        grammarCard.className = 'module-item grammar-card';
        grammarCard.innerHTML = `
            <div class="module-top" onclick="openGrammarHub()">
                <div class="module-name-click" style="font-size: 18px;">
                    ⏳ <strong style="color: var(--purple);">Часи граматика</strong>
                    <div style="font-size:13px; color:var(--subtext); margin-top:5px; font-weight:normal;">Всі часи (Tenses)</div>
                </div>
            </div>
        `;
        fragment.appendChild(grammarCard);


        Object.keys(ALL_DATA).forEach(moduleName => {
            const stats = getModuleDetailedStats(moduleName);
            const unitPeriodStats = getUnitAnalyticsForPeriod(moduleName, selectedTimeFilter);

            const learnedPct = stats.total > 0 ? (stats.learned / stats.total) * 100 : 0;
            const learningPct = stats.total > 0 ? (stats.learning / stats.total) * 100 : 0;

            const card = document.createElement('div');
            card.className = 'stats-card';
            card.innerHTML = `
                <h4>📂 ${moduleName}</h4>
                <div class="stats-row"><span>Всього слів:</span> <strong>${stats.total}</strong></div>
                <div class="stats-row"><span style="color:var(--green);">Заучено:</span> <strong>${stats.learned}</strong></div>
                <div class="stats-row"><span style="color:var(--orange);">В процесі:</span> <strong>${stats.learning}</strong></div>
                <div class="stats-row"><span style="color:var(--subtext);">Ще не вчено:</span> <strong>${stats.unlearned}</strong></div>
                
                <div class="stats-row" style="margin-top:10px; border-top: 1px dashed #45475a; padding-top:8px;">
                    <span style="color:var(--accent);">Точність за період:</span> 
                    <strong>${unitPeriodStats.pct} (${unitPeriodStats.correct}/${unitPeriodStats.total})</strong>
                </div>
                <div class="stats-row">
                    <span style="color:var(--orange);">⏱️ Чистий час тренувань:</span> 
                    <strong>${unitPeriodStats.timeFormatted}</strong>
                </div>

                <div class="progress-track" style="margin-top:10px; display:flex; background:#1e1e2e;">
                    <div style="width: ${learnedPct}%; background: var(--green); height: 100%; transition: width 0.3s ease;" title="Заучено: ${stats.displayPct}"></div>
                    <div style="width: ${learningPct}%; background: var(--orange); height: 100%; transition: width 0.3s ease;" title="В процесі"></div>
                </div>
            `;
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    }

    function openCreateScreen() {
        editingModuleOriginalName = '';
        document.getElementById('create-screen-title').innerText = '✨ Новий модуль';
        document.getElementById('new-module-name').value = '';
        document.getElementById('new-module-words').value = '';
        switchScreen('create-screen');
    }

    function openEditScreen(name) {
        editingModuleOriginalName = name;
        document.getElementById('create-screen-title').innerText = '✏️ Редагування модуля';
        document.getElementById('new-module-name').value = name;
        let wordsText = '';
        Object.entries(ALL_DATA[name]).forEach(([en, ua]) => { wordsText += `${en} - ${ua}\n`; });
        document.getElementById('new-module-words').value = wordsText.trim();
        switchScreen('create-screen');
    }

    function openSetup(name) { 
        selectedModule = name; 
        document.getElementById('setup-title').innerText = `Тренажер: ${name}`; 
        renderUnitWordsTable(name);
        switchScreen('setup-screen'); 
    }

    function filterUnitWordsTable(query) {
        const q = (query || '').toLowerCase().trim();
        const rows = document.querySelectorAll('#unit-table-body tr');
        rows.forEach(tr => {
            const text = tr.innerText.toLowerCase();
            tr.style.display = (!q || text.includes(q)) ? '' : 'none';
        });
    }

    function renderUnitWordsTable(moduleName) {
        const searchInput = document.getElementById('unit-table-search');
        if (searchInput) searchInput.value = '';

        const tbody = document.getElementById('unit-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';

        const wordsObj = ALL_DATA[moduleName] || {};
        const pairs = Object.entries(wordsObj);

        if (pairs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--subtext);">Модуль порожній</td></tr>`;
            return;
        }

        const hasContext = typeof CONTEXT_DATA !== 'undefined';
        const fragment = document.createDocumentFragment();

        // Grammar Card injection
        const grammarCard = document.createElement('div');
        grammarCard.className = 'module-item grammar-card';
        grammarCard.innerHTML = `
            <div class="module-top" onclick="openGrammarHub()">
                <div class="module-name-click" style="font-size: 18px;">
                    ⏳ <strong style="color: var(--purple);">Часи граматика</strong>
                    <div style="font-size:13px; color:var(--subtext); margin-top:5px; font-weight:normal;">Всі часи (Tenses)</div>
                </div>
            </div>
        `;
        fragment.appendChild(grammarCard);

        pairs.forEach(([en, ua]) => {
            const statKey = `${moduleName}_${en}`;
            const m = MEMORY_STATS[statKey];
            
            let statusBadge = '<span style="color:#4a4b5e;">— не вчено</span>';
            if (m && m.score <= 0 && m.history?.length > 0 && m.history[m.history.length - 1] === true) {
                statusBadge = '<span style="color:#4f9e5a;">✅ Заучено</span>';
            } else if (m && m.history?.length > 0) {
                statusBadge = '<span style="color:#8a6e3a;">🔄 В процесі</span>';
            }

            const ctxRaw = hasContext ? (CONTEXT_DATA[en] || '') : '';
            let ctxHtml = '';
            if (ctxRaw) {
                const match = ctxRaw.match(/^(.+?)\s*(\([^)]+\))\s*$/);
                if (match) {
                    ctxHtml = `${match[1]} <em>${match[2]}</em>`;
                } else {
                    ctxHtml = ctxRaw;
                }
            } else {
                ctxHtml = '<span style="color:#3a3b4e;">—</span>';
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${en}</strong></td>
                <td>${ua}</td>
                <td>${ctxHtml}</td>
                <td>${statusBadge}</td>
            `;
            fragment.appendChild(tr);
        });

        tbody.appendChild(fragment);
    }

    function saveModule() {
        const name = document.getElementById('new-module-name').value.trim();
        const text = document.getElementById('new-module-words').value.trim();
        if (!name || !text) return;
        const parsedWords = {};
        text.split('\n').forEach(line => {
            let parts = line.split(' - ');
            if (parts.length >= 2) parsedWords[parts[0].trim()] = parts[1].trim();
        });
        if (editingModuleOriginalName && editingModuleOriginalName !== name) {
            delete ALL_DATA[editingModuleOriginalName]; delete SAVED_USER_DATA[editingModuleOriginalName];
        }
        ALL_DATA[name] = parsedWords; SAVED_USER_DATA[name] = parsedWords;
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
        if (streakEl) streakEl.innerText = `🔥 ${STREAK_DATA.count} днів стрік`;

        let totalLearned = 0;
        Object.values(MEMORY_STATS).forEach(m => {
            if (m && m.score <= 0 && m.history && m.history.length > 0 && m.history[m.history.length - 1] === true) {
                totalLearned++;
            }
        });

        const totalWordsEl = document.getElementById('stat-total-words');
        if (totalWordsEl) totalWordsEl.innerText = `🧠 ${totalLearned} вивчено`;
    }

    function cleanTextForTTS(text) {
        if (!text) return '';
        return text
            .replace(/\([^)]*\)/g, '')
            .replace(/^[a-zA-Z\s]+:\s*/, '')
            .replace(/[\/\;]/g, ', ')
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

    function speakCurrentWord() {
        if (currentIndex < questions.length) {
            const currentObj = questions[currentIndex];
            speakText(currentObj.en, 'en-US');
        }
    }

    
    function openGrammarHub() {
        const container = document.getElementById('grammar-tenses-container');
        container.innerHTML = '';
        
        GRAMMAR_TENSES.forEach(tense => {
            const item = document.createElement('div');
            item.className = 'module-item';
            item.innerHTML = `
                <div class="module-top" onclick="openGrammarTheory('${tense.id}')">
                    <div class="module-name-click">
                        📘 <strong>${tense.name}</strong>
                        <div style="font-size:13px; color:var(--subtext); margin-top:5px; font-weight:normal;">${tense.translate}</div>
                    </div>
                </div>
                <button class="main-btn" style="margin: 10px 0 0 0; padding: 8px;" onclick="startGrammarQuiz('${tense.id}')">Пройти тест</button>
            `;
            container.appendChild(item);
        });
        
        switchScreen('grammar-hub-screen');
    }

    let selectedGrammarTenseId = '';
    function openGrammarTheory(tenseId) {
        selectedGrammarTenseId = tenseId;
        const tense = GRAMMAR_TENSES.find(t => t.id === tenseId);
        if (!tense) return;
        
        document.getElementById('theory-title').innerText = `${tense.name} (${tense.translate})`;
        document.getElementById('theory-desc').innerText = tense.description;
        
        const markersContainer = document.getElementById('theory-markers');
        markersContainer.innerHTML = tense.markers.map(m => `<span class="marker-badge">${m}</span>`).join('');
        
        document.getElementById('formula-plus').innerHTML = tense.formula.plus;
        document.getElementById('formula-minus').innerHTML = tense.formula.minus;
        document.getElementById('formula-question').innerHTML = tense.formula.question;
        
        const btn = document.getElementById('start-grammar-btn');
        btn.onclick = () => startGrammarQuiz(tense.id);
        
        switchScreen('grammar-theory-screen');
    }

    function startGrammarQuiz(tenseId) {
        isGrammarQuiz = true;
        configMode = 'choice';
        configTarget = 'en'; // default for UI display, but we'll override showQuestion logic
        questions = [];
        
        let targetTenses = tenseId === 'all' ? GRAMMAR_TENSES : GRAMMAR_TENSES.filter(t => t.id === tenseId);
        
        targetTenses.forEach(tense => {
            tense.questions.forEach(q => {
                questions.push({
                    en: q.text,
                    ua: tense.name, // Just as a hint
                    question: q.text,
                    answer: q.answer,
                    options: q.options
                });
            });
        });
        
        questions.sort(() => Math.random() - 0.5);
        currentIndex = 0; score = 0; currentCombo = 0; sessionLogs = [];
        
        switchScreen('grammar-quiz-screen');
        showGrammarQuestion();
    }

    function generateQuiz() {
        isGrammarQuiz = false;
        saveUserSettings();
        configMode = document.querySelector('input[name="quiz-mode"]:checked').value;
        configTarget = document.querySelector('input[name="quiz-lang"]:checked').value;
        const limitVal = document.getElementById('quiz-limit-select').value;
        const isHardOnly = document.getElementById('hard-only-toggle')?.checked ?? false;
        
        let originalPairs = Object.entries(ALL_DATA[selectedModule]);

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
                pool.push({ en: pair[0], ua: pair[1], question: configTarget === 'ua' ? pair[1] : pair[0], answer: configTarget === 'ua' ? pair[0] : pair[1] });
            }
        });
        pool.sort(() => Math.random() - 0.5);
        questions = []; let usedEn = new Set();
        pool.forEach(item => { if (!usedEn.has(item.en)) { questions.push(item); usedEn.add(item.en); } });
        
        let targetLimit = limitVal === 'max' ? originalPairs.length : parseInt(limitVal);
        questions = questions.slice(0, Math.min(targetLimit, originalPairs.length));
        
        currentIndex = 0; score = 0; currentCombo = 0; sessionLogs = [];
        switchScreen('grammar-quiz-screen');
        showGrammarQuestion();
    }

    
    function showGrammarQuestion() {
        if (currentIndex < questions.length) {
            const currentObj = questions[currentIndex];
            document.getElementById('grammar-progress').innerText = `Питання ${currentIndex + 1} з ${questions.length} | Рахунок: ${score}`;
            
            const sentenceCard = document.getElementById('grammar-sentence-card');
            const sentenceText = currentObj.en.replace('___', '<span class="grammar-blank"></span>');
            sentenceCard.innerHTML = sentenceText;
            
            const optionsGrid = document.getElementById('grammar-options-grid');
            optionsGrid.innerHTML = '';
            
            currentObj.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'grammar-option-btn';
                btn.innerHTML = `<span>${opt}</span> <span style="font-size:14px; opacity:0.5; background:rgba(0,0,0,0.3); padding:4px 8px; border-radius:6px;">${idx + 1}</span>`;
                btn.onclick = () => handleGrammarAnswer(btn, opt, currentObj);
                optionsGrid.appendChild(btn);
            });
            isShowingAnswer = false;
        } else {
            // Finish grammar quiz — update streak and render results
            stopLiveTimer();
            const todayStr = new Date().toDateString();
            if (STREAK_DATA.lastDate !== todayStr) {
                if (STREAK_DATA.lastDate === new Date(Date.now() - 86400000).toDateString()) {
                    STREAK_DATA.currentStreak++;
                } else {
                    STREAK_DATA.currentStreak = 1;
                }
                STREAK_DATA.lastDate = todayStr;
                localStorage.setItem('my_quiz_streak', JSON.stringify(STREAK_DATA));
                document.getElementById('stat-streak').innerText = `🔥 ${STREAK_DATA.currentStreak} днів стрік`;
            }
            renderSessionSummary();
        }
    }

    function handleGrammarAnswer(btn, selectedOption, currentObj) {
        if (isShowingAnswer) return;
        isShowingAnswer = true;
        
        const isCorrect = selectedOption === currentObj.answer;
        if (isCorrect) score++;
        
        btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        // Find and highlight correct answer when wrong
        if (!isCorrect) {
            const allBtns = document.querySelectorAll('.grammar-option-btn');
            allBtns.forEach(b => {
                const label = b.querySelector('span:first-child');
                if (label && label.textContent.trim() === currentObj.answer) {
                    b.classList.add('correct');
                }
            });
        }
        
        sessionLogs.push({
            question: currentObj.en,
            answer: currentObj.answer,
            userAnswer: isCorrect ? currentObj.answer : selectedOption,
            isCorrect: isCorrect,
            timeMs: 0
        });
        
        setTimeout(() => {
            currentIndex++;
            showGrammarQuestion();
        }, 1500);
    }
    
    document.addEventListener('keydown', function(e) {
        if (currentActiveScreen === 'grammar-quiz-screen' && !isShowingAnswer) {
            if (['1', '2', '3', '4'].includes(e.key)) {
                const choiceIndex = parseInt(e.key) - 1;
                const btns = document.querySelectorAll('.grammar-option-btn');
                if (btns[choiceIndex]) {
                    btns[choiceIndex].click();
                }
            }
        }
    });

    function startMistakesOnlyQuiz() {
        isGrammarQuiz = false;
        const errorLogs = sessionLogs.filter(item => !item.isCorrect);
        if (errorLogs.length === 0) return;

        questions = errorLogs.map(log => ({
            en: log.question === log.answer ? log.question : (log.answer.match(/[a-zA-Z]/) ? log.answer : log.question),
            ua: log.question === log.answer ? log.answer : (log.answer.match(/[a-zA-Z]/) ? log.question : log.answer),
            question: log.question,
            answer: log.answer
        }));

        currentIndex = 0; score = 0; currentCombo = 0; sessionLogs = [];
        switchScreen('grammar-quiz-screen');
        showGrammarQuestion();
    }

    function startWordTimer() {
        stopLiveTimer();
        wordStartTime = Date.now();
        const isTimerMode = document.getElementById('timer-mode-toggle').checked;

        if (isTimerMode) {
            timerTimeout = setTimeout(() => {
                stopLiveTimer();
                handleTimeOut();
            }, 7000);
        }
    }

    function handleTimeOut() {
        if (isShowingAnswer) return;
        const msgEl = document.getElementById('result-msg'); 
        const btnEl = document.getElementById('action-btn');
        isShowingAnswer = true;
        currentCombo = 0;
        currentWordDuration = 7000;

        const currentObj = questions[currentIndex];
        updateMemoryAlgorithm(currentObj, false, currentWordDuration);

        sessionLogs.push({
            question: currentObj.question,
            answer: currentObj.answer,
            userAnswer: "Час вичерпано",
            isCorrect: false,
            timeMs: currentWordDuration
        });

        if (msgEl) {
            msgEl.className = 'result error';
            msgEl.innerText = `⏳ Час вичерпано! Правильно: ${currentObj.answer}`;
        }
        if (btnEl) {
            btnEl.style.display = 'block';
            btnEl.innerText = 'Далі (Enter ↵)';
        }
    }

    function showQuestion() {
        const inputEl = document.getElementById('user-input'); const msgEl = document.getElementById('result-msg');
        const btnEl = document.getElementById('action-btn'); const writeBlock = document.getElementById('write-block'); const choiceBlock = document.getElementById('choice-block');
        isShowingAnswer = false; if (msgEl) msgEl.innerText = '';
        if (btnEl) { btnEl.innerText = 'Перевірити (Enter ↵)'; btnEl.style.display = configMode === 'write' ? 'block' : 'none'; }
        
        if (currentIndex < questions.length) {
            const currentObj = questions[currentIndex];
            const comboBadgeHtml = currentCombo >= 2 ? `<span class="combo-badge">⚡ ${currentCombo}x COMBO!</span>` : '';
            document.getElementById('quiz-progress').innerHTML = `Картка ${currentIndex + 1} з ${questions.length} | Рахунок: ${score} ${comboBadgeHtml}`;
            
            const wordEl = document.getElementById('target-word');
            wordEl.innerText = currentObj.question;
            
            const autoAudio = document.getElementById('auto-audio-toggle').checked;
            if (autoAudio && configTarget === 'en') {
                speakText(currentObj.en, 'en-US');
            }

            if (configMode === 'write') {
                writeBlock.style.display = 'block'; choiceBlock.style.display = 'none';
                if (inputEl) { inputEl.value = ''; inputEl.disabled = false; setTimeout(() => inputEl.focus(), 20); }
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

                ${errorCount > 0 ? `<button class="main-btn btn-mistakes" onclick="startMistakesOnlyQuiz()">🔁 Опрацювати помилки (${errorCount} слів)</button>` : ''}
                <button class="main-btn" onclick="switchScreen('menu-screen')" style="margin-top:15px;">Повернутися до меню</button>
            `;
        }

        switchScreen('result-screen');
    }

    function generateChoices(currentObj) {
        const choiceBlock = document.getElementById('choice-block'); choiceBlock.innerHTML = '';
        
        if (isGrammarQuiz) {
            currentChoices = currentObj.options.slice();
            currentChoices.forEach((choice, idx) => {
                const btn = document.createElement('button'); btn.className = 'choice-btn';
                btn.innerHTML = `<span>${choice}</span><span class="key-hint">${idx + 1}</span>`;
                btn.onclick = () => selectChoice(btn, choice, currentObj.answer); choiceBlock.appendChild(btn);
            });
            return;
        }

        let allAnswersPool = Object.entries(ALL_DATA[selectedModule]).map(pair => configTarget === 'ua' ? pair[0] : pair[1]);
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

        const msgEl = document.getElementById('result-msg'); const btnEl = document.getElementById('action-btn');
        if (btnEl) { btnEl.style.display = 'block'; btnEl.innerText = 'Далі (Enter ↵)'; }
        document.querySelectorAll('.choice-btn').forEach(btn => { 
            if (btn.innerText.toLowerCase().includes(correctAnswer.toLowerCase())) { 
                btn.style.background = 'var(--green)'; btn.style.color = '#11111b'; 
            } 
        });
        
        const isCorrect = isFuzzyMatch(selectedAnswer, correctAnswer);
        const currentObj = questions[currentIndex];
        
        if (isCorrect) {
            currentCombo++;
        } else {
            currentCombo = 0;
        }

        updateMemoryAlgorithm(currentObj, isCorrect, currentWordDuration);
        
        sessionLogs.push({
            question: currentObj.question,
            answer: currentObj.answer,
            userAnswer: selectedAnswer,
            isCorrect: isCorrect,
            timeMs: currentWordDuration
        });

        if (isCorrect) { score++; msgEl.className = 'result success'; msgEl.innerText = currentCombo >= 2 ? `🔥 Правильно! (Combo x${currentCombo})` : '🔥 Правильно!'; }
        else { if (clickedBtn) { clickedBtn.style.background = 'var(--red)'; clickedBtn.style.color = '#11111b'; } msgEl.className = 'result error'; msgEl.innerText = `❌ Схибив!`; }
    }

    function handleQuizSubmit() {
        if (configMode === 'write') {
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

        if (isGrammarQuiz) return;

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

        const activeMode = configMode === 'choice' ? 'choice' : 'write';
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

    // Обробка глобальних гарячих клавіш (Enter, Space, Esc, цифри вибору)
    document.addEventListener('keydown', function(e) {
        const quizScreen = document.getElementById('quiz-screen');
        if (e.key === 'Escape') {
            switchScreen('menu-screen');
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

        if (configMode === 'choice' && !isShowingAnswer) {
            if (['1', '2', '3', '4'].includes(e.key)) {
                const choiceIndex = parseInt(e.key) - 1;
                const choiceBtns = document.querySelectorAll('.choice-btn');
                if (choiceBtns[choiceIndex]) {
                    choiceBtns[choiceIndex].click();
                }
            }
        }
    });

    window.onload = function() { 
        loadUserSettings();
        switchScreen('menu-screen'); 
    };


    (function() {
        const btn = document.getElementById('scroll-top-btn');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });
    })();
