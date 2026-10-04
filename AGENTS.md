# AGENTS.md — AI Assistant Instructions & Safety Rules

Перед будь-яким редагуванням коду аналізуй [`Design.md`](file:///Users/Диск Д/06 Проекти/my-quiz-local/Design.md) та [`Project.md`](file:///Users/Диск Д/06 Проекти/my-quiz-local/Project.md).

## 🔒 Правила економії токенів та безпеки (Token Saving & Integrity)

1. **Забороно перезаписувати файли цілком (No Full File Overwrites):**
   - Усі зміни у коді виконувати виключно точково (через diffs / `replace_file_content`).
   - Заборонено виводити в чат або перегенеровувати повні файли без нагальної потреби.

2. **Захист даних збереження (Persistence Protection):**
   - Суворо заборонено змінювати або перейменовувати ключі LocalStorage / IndexedDB / localForage:
     - `my_quiz_modules`
     - `my_quiz_mem_stats`
     - `my_quiz_streak`
     - `my_quiz_settings`

3. **Захист нечіткого пошуку та повторення (Core Logic Protection):**
   - Не ламати алгоритми `isFuzzyMatch` (підтримка роздільників `/`, `;`, `,`, `:`, `()` та порівняння Левенштейна) та `updateMemoryAlgorithm`.

4. **Модульна структура:**
   - HTML розмітка: [`index.html`](file:///Users/Диск Д/06 Проекти/my-quiz-local/index.html)
   - CSS стилі: [`style.css`](file:///Users/Диск Д/06 Проекти/my-quiz-local/style.css)
   - JS логіка: [`scripts/main.js`](file:///Users/Диск Д/06 Проекти/my-quiz-local/scripts/main.js)

5. **Режим роботи з Git:**
   - Працювати виключно локально. Не робити комміти чи `git push` без прямого запиту від Вадима (слово «пуш»).

6. **Правило версіонування (Version Control Policy & Changelog):**
   - При кожній новій фічі чи виправленні багу оновлювати `APP_VERSION` (SemVer) у `scripts/main.js`, додавати запис на початок `VERSION_HISTORY`, оновлювати бейдж `#app-version-tag` у `index.html` і повідомляти у відповіді рядок: «Нова версія: vX.X.X (зміни: ...)».

