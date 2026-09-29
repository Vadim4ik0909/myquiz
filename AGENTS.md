# AGENTS.md — AI Assistant Instructions & Safety Rules

Перед будь-яким редагуванням коду аналізуй [`Design.md`](file:///Users/user/Desktop/my-quiz-local/Design.md) та [`Project.md`](file:///Users/user/Desktop/my-quiz-local/Project.md).

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
   - HTML розмітка: [`index.html`](file:///Users/user/Desktop/my-quiz-local/index.html)
   - CSS стилі: [`style.css`](file:///Users/user/Desktop/my-quiz-local/style.css)
   - JS логіка: [`scripts/main.js`](file:///Users/user/Desktop/my-quiz-local/scripts/main.js)
