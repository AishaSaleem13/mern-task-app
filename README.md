🐼 Panda Todo App – Next.js Edition










🌟 Features

📝 CRUD Tasks – Add, edit, and delete tasks with ease

✅ Complete Tasks – Toggle tasks as done with checkboxes

📅 Due Dates – Assign dates to tasks for better organization

🔐 Authentication – Sign up, login, and manage tasks per user

🎨 Animated UI – Smooth hover effects, Panda mascot animations, and responsive cards

➕ Floating Add Button – Easily create tasks from anywhere

📋 AllTask Button – Quick access to all tasks

📱 Fully Responsive – Optimized for mobile, tablet, and desktop

🛠 Tech Stack & Libraries
Feature	Library / Tool	Link
Framework	Next.js 14	Next.js

Frontend	React	React

State Management	Redux Toolkit	Redux

Styling	Tailwind CSS	Tailwind

Components	DaisyUI	DaisyUI

Routing	Next.js Pages & App Router	Docs

Backend	Node.js + Express	Node.js

Database	MongoDB + Mongoose	MongoDB
⚡ Installation
# Clone the repo
git clone https://github.com/AishaSaleem13/panda-todo-next.git

# Navigate to project folder
cd panda-todo-next

# Install dependencies
npm install

# Run development server
npm run dev


Open http://localhost:3000
 to view the app.

📝 Project Approach

Full CRUD with Auth: Users can register, login, and manage their own tasks securely.

State Management: Redux Toolkit stores tasks globally, ensuring consistent UI updates.

Date Support: Tasks can have due dates; tasks are sorted or filtered accordingly.

UI/UX Focus: Tailwind + DaisyUI with animations for Panda mascot, smooth hover cards, and floating add button.

Responsive Design: Layout adapts to all screen sizes.

Code Organization: Clean Next.js folder structure, separating components, pages, and API routes.

🎯 Future Improvements

🏷 Task Categories & Priority Tags

🔍 Search & Advanced Filters



🐼 More Interactive Panda Animations

⚡ API Endpoints (Backend)
Method	Endpoint	Description
POST	/api/auth/register	Create new user
POST	/api/auth/login	User login
GET	/api/tasks	Get all tasks for authenticated user
POST	/api/tasks	Create new task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task
Contributing

Fork the repo

Create a new branch (git checkout -b feature-name)

Make your changes

Commit your changes (git commit -m "Description")

Push to branch (git push origin feature-name)

Open a Pull Request
