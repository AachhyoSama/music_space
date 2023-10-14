# Music Space

Music space is a full stack house party app where anybody can create an online house party, invite friends with a unique code and take control of the music. This app is created using Django in the backend and ReactJS for frontend. 
Spotify API is used to pull song details of the host of the house party host.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Project Running](#project-running)

## Getting Started

You can clone the project and get up to the pre-requisites.

### Prerequisites

List the prerequisites that users need to have installed before they can start using your project. For example:
- Python (>=3.6)
- Node.js
- npm

### Installation

```bash
# Clone the repository
git clone git@github.com:AachhyoSama/music_space.git
cd music_space

# Set up the Django backend
pip install django djangorestframework
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

# Set up the React frontend
cd music_space_frontend
npm install
npm run dev
```

### Project Running
Now go to the browser and go to this link:
https://127.0.0.1:8000

You can check the code in the source code. Enjoy!!