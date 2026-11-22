# minecraft-entity-view – frontend

React 19 app with Vite, TanStack Router, Leaflet and Tailwind CSS. It shows the live map (`/map`) and the statistics
(`/entities`) and receives its data from the backend over WebSocket.

```bash
npm run dev     # development server on port 7790
npm run build   # production build into dist/
npm start       # serve the build on port 7790
```

Settings are read from the `.env` in the repository root at build time. See the
[documentation](https://www.marco-starker.de/en/projects/minecraft-entity-view/docs) and the
[README](../../README.md) of the repository.
