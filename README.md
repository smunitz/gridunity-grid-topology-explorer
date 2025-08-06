# Grid Topology Explorer in 3D

## Problem Statement:

As the electric grid becomes increasingly complex, visualizing and understanding grid topology can become more difficult. 2D schematics or spreadsheets quickly become cluttered and overwhelming at scale.

This project explores using interactive 3D visualization to explore and debug electric grid topology.

## Why I Chose It:

I wanted to build something connected to real-world grid operations while also exploring a creative interface. Grid topology is inherently spatial, so using interactive 3D enables more intuitive reasoning and interaction.

This tool:

- Parses and visualizes grid data in the form of substations (nodes) and transmission lines (edges).
- Offers dynamic styling based on region and status.
- Allows interactive filtering and inspection of metadata.
- Helps engineers and planners explore networks from new perspectives to spot anomalies more easily.

It fits within the GridUnity ecosystem as a visual plugin or topology debugging tool.

## How To Run/Test It:

Because modern browsers block `file://` loading of local files for security reasons, use one of the following methods:

### Option 1: Using VS Code Live Server

1. Open this project folder in Visual Studio Code.
2. Install the "Live Server" extension (if not already installed).
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The app will open in your browser at `http://localhost:5500` (or similar).

### Option 2: Using Python (if installed)

1. Open a terminal in this folder.
2. Run:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser to http://localhost:8000.

## Decisions, Tradeoffs, and Next Steps:

### Decisions Made:

- Chose 3D Force Graph (Three.js) for straightforward 3D graph rendering in the browser.
- Used a simplified GeoJSON format with `nodes` and `links` to simulate substation and line metadata.
- Used dynamic coloring based on structured data (region and status).
- Added filtering and interactivity to expose deeper grid structure.

### Tradeoffs:

- Focused on clarity and interactivity rather than ultra-realistic visuals and pretty filtering.
- Limited real-world fidelity (e.g., spatial coordinates are not geo-accurate).
- Mock data used rather than real utility data for simplicity and safety.

### Potential Extensions:

- UI: extended dynamic styling and VR headset compatibility using A-Frame.
- Real-time load or telemetry overlays.
- Fault tracing: highlight critical paths or cascading failures.
- Cluster detection or AI-driven pattern recognition.
- Integration with OpenDSS or PSLF.

## Data Flow Details:

- **GeoJSON Load**: Parses mock grid data (substations and lines).
- **Parser Logic**: Converts to `nodes` and `links` for the graph.
- **3D Scene Rendering**: Uses 3D-force-graph to create the interactive scene.
- **UI Filters**: Allow dynamic filtering by voltage, owner, region.
- **Interaction**: Hovering on a node or edge reveals its metadata in a tooltip.

This project is a demonstration of how interactive tools can empower engineers working with large-scale infrastructure data.
