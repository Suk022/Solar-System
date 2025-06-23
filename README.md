# Solar System 3D Visualization

A 3D interactive visualization of the solar system created using React, Three.js, and NASA APIs.

## Features

- Interactive 3D solar system with realistic planet textures
- Comprehensive information about each planet
- NASA APOD (Astronomy Picture of the Day) integration
- Asteroid tracking with real-time data
- Random space facts
- Responsive design

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Solar-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up NASA API key:
   - Get a free API key from [NASA API Portal](https://api.nasa.gov/)
   - Create a `.env` file in the root directory
   - Add your API key: `VITE_NASA_API_KEY=your_api_key_here`

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Environment Variables

- `VITE_NASA_API_KEY`: Your NASA API key (required to fetch data for the Live Planet Gallery, featured event section for every planet, APOD, asteroid data, and a random space fact)
- `VITE_BASE_PATH`: Base path for deployment (defaults to "/Solar-system")

## Technologies Used

- React 18
- Three.js
- React Three Fiber
- NASA APIs
- Vite

## Live Deployment Unavailable 

I'm currently facing issues deploying this project on GitHub Pages and other hosting platforms, but I'm actively working on resolving these issues. Meanwhile, feel free to run it locally by following the setup instructions below.

### THANK YOU :)
