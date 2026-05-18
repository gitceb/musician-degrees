# ArtistLink

ArtistLink is a music discovery game inspired by the Wikipedia speedrun game.

The goal is to navigate from one artist to another using only music collaborations, features, and album appearances.

For example:

Kendrick Lamar  
→ "All The Stars"  
→ SZA  
→ "Rich Baby Daddy"  
→ Drake

The app focuses on music discovery and graph-style navigation through artist connections.

## Features

- Navigate between artists through real collaborations
- Track number of moves taken
- Randomized start and target artists
- Album and track-based connection system
- Responsive React frontend
- Interactive music discovery gameplay

## Built With

- React
- TypeScript
- Vite
- CSS

## How It Works

Each artist acts as a node in a graph.

Connections between artists are stored as:
- featured tracks
- album appearances
- collaborations

The player traverses the graph by selecting connected artists.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/your-username/artistlink.git
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

## Future Improvements

- Spotify API integration
- Producer/writer connection mode
- Artist graph visualization

## Screenshots

Coming soon.
