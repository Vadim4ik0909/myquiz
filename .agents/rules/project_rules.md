# Antigravity Rules for ADHD Quiz Platform

Перед тим як писати код, створювати нові UI-компоненти або змінювати архітектуру проєкту:

1. **Аналіз дизайну (`Design.md`):**
   Завжди перевіряй та суворо дотримуйся колірної палітри (Dark Catppuccin `#1e1e2e`), типографіки та правил оформлення UI з [`Design.md`](file:///Users/user/Desktop/my-quiz-local/Design.md).

2. **Аналіз архітектури (`Project.md`):**
   Аналізуй контекст з [`Project.md`](file:///Users/user/Desktop/my-quiz-local/Project.md). Зберігай єдність LocalStorage ключів, алгоритм нечіткого порівняння слів `isFuzzyMatch` та структуру баз даних у `database.js`.

3. **Обмеження:**
   Не змінюй існуючі працюючі механізми (стрік, збереження статистики, підтримка 15 модулів), створюй лише чіткі, анімовані та зручні UI рішення.

4. **Обов'язкові стандарти та скіли (Workspace Skills):**
   - [`frontend-clean-architect`](file:///Users/Диск%20Д/06%20Проекти/my-quiz-local/.agents/skills/frontend-clean-architect/SKILL.md): захист від роздування CSS/JS, повна відсутність скролбарів, плавні GPU-анімації без важких DOM-елементів та дублювання подій.
   - [`version-changelog-manager`](file:///Users/Диск%20Д/06%20Проекти/my-quiz-local/.agents/skills/version-changelog-manager/SKILL.md): суворе SemVer версіонування (на базі `v6.9.2`), обов'язкова категоризація на «✨ Нові фічі та покращення» і «🐛 Виправлені баги», автоматичне оновлення бейджів та історії версій.
   - [`ui-ux-design-system`](file:///Users/Диск%20Д/06%20Проекти/my-quiz-local/.agents/skills/ui-ux-design-system/SKILL.md): дотримання темної палітри Catppuccin, гармонійної геометрії, м'яких мікроанімацій без важких тіней та блокуючих оверлеїв.
   - [`code-refactor-cleaner`](file:///Users/Диск%20Д/06%20Проекти/my-quiz-local/.agents/skills/code-refactor-cleaner/SKILL.md): регулярне очищення мертвого коду, застарілих селекторів, запобігання витокам пам'яті в слухачах та таймерах.
