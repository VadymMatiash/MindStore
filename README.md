Запуск проекту

1. Для того щоб запустити проект ви повинні встановити npm, з офіційного сайту Node.
2. Викликати командний рядок у місці де ви хочете розмітити проект і ввести команду "git clone https://github.com/VadymMatiash/MindStore" у powershell.
3. Після клонування проекту вікрити папку з проектом.
4. Ввести команду "npm install" у powershell
5. Ввести команду "npm run client-install" у powershell
6. Ввести команду "npm run build" у powershell.
7. Ввести команду "npm run start" у powershell
8. Відкрити у браузері посилання http://localhost:5001

Запустк проекту за допомогою Docker

1. Ввести команду docker build -t rgr . у консолі з папки проекту
2. Ввести команду docker run -d -p 5001:5001 rgr
3. Відкрити у браузері посилання http://localhost:5001