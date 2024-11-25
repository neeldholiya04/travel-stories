
# Travel Stories Map Application

## Overview
This project is a **Travel Stories Map Application** that allows users to create and share their travel experiences by marking locations on a map. Users can upload a story with an image, description, and geographical location, which is then displayed on an interactive Google Map.

---

## Features
- Interactive Google Map integration using `@react-google-maps/api`.
- Users can add markers to the map and associate stories with them.
- Stories include a title, description, and an uploaded image.
- View, update, and delete stories directly from the map.
- Dynamic geolocation to center the map based on the user's location.
- Customizable map styles and controls.

---

## Technologies Used
### Frontend:
- React
- Tailwind CSS
- Google Maps API
- Axios

### Backend:
- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL
- Multer (for handling file uploads)

### Additional Tools:
- dotenv (for environment variable management)

---

## Prerequisites
- **Node.js**: v16 or above
- **PostgreSQL**: v12 or above
- **Google Maps API Key**: Required for map integration

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/neeldholiya04/travel-stories.git
cd travel-stories
```

### 2. Backend Setup
#### a. Navigate to the backend directory
```bash
cd backend
```

#### b. Install Dependencies
```bash
npm install
```

#### c. Configure Environment Variables
Create a `.env` file in the `backend` directory with the following content:
```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
PORT=5000
```

#### d. Start PostgreSQL
Ensure your PostgreSQL service is running and create the database specified in the `.env` file.

#### e. Run Migrations
Synchronize the Sequelize models with the database:
```bash
node index.js
```

#### f. Start the Backend Server
```bash
npm start
```

### 3. Frontend Setup
#### a. Navigate to the frontend directory
```bash
cd ../frontend
```

#### b. Install Dependencies
```bash
npm install
```

#### c. Configure Environment Variables
Create a `.env` file in the `frontend` directory with the following content:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_API_BASE_URL= base_api_url
```

Replace `your_google_maps_api_key` with your actual API key obtained from the [Google Cloud Console](https://console.cloud.google.com/).

#### d. Start the Frontend Development Server
```bash
npm run dev
```

---

## Project Structure
```
travel-stories/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── config/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── package.json
├── README.md
```

---

## Key Files and Directories
### Backend
- `controllers/storyController.js`: Handles story-related business logic.
- `routes/storyRoutes.js`: API routes for story management.
- `models/story.js`: Sequelize model for the `Story` entity.
- `config/db.js`: Database connection setup.

### Frontend
- `components/Map.jsx`: Displays the interactive Google Map.
- `components/StoryForm.jsx`: Form for adding new stories.
- `services/storyService.js`: Handles API calls to the backend.

---

## Usage
1. **Add a Story**:
   - Click on the map to select a location.
   - Fill out the form with a title, description, and image, then save the story.
2. **View Stories**:
   - Click on markers on the map to view associated stories.
3. **Delete Stories**:
   - Click the delete button in the story list to remove a story.

---