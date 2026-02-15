# CatCode Explainer 🐱

A friendly VS Code extension where cats explain what your code does (mostly).

## Features

- **Cat Icon in Activity Bar**: Click the cat icon to open the explainer
- **Chat Interface**: Ask the cats about your code, no pressure
- **Workspace Context**: The extension automatically reads your entire project
- **Friendly Explanations**: Cats explain code in a simple, helpful way
- **Meow Sounds**: A satisfying meow plays when the cat responds

## Usage

1. Install the extension
2. Click the cat icon (🐱) in the Activity Bar (left sidebar)
3. Ask the cat questions like:
   - "Explain this line"
   - "Explain this file"
   - "Explain what this project does"
4. The cat will respond with friendly explanations

## API Key & Model

- Re-enter your Gemini API key: Command Palette → **CatCode: Reset Gemini API Key**
- Choose the Gemini model:
   - Settings → **CatCode: Gemini Model**, or
   - Command Palette → **CatCode: Select Gemini Model**
- To always be prompted on startup, enable **CatCode: Prompt For Api Key On Activate** in Settings

## How It Works

The extension:
- Reads the entire workspace folder for context
- Ignores `node_modules`, `.git`, `dist`, `build` folders
- Detects selected text in the editor
- Tracks the current file you're viewing
- Generates friendly, beginner-friendly explanations

## Cat Behavior 🐱

The cats:
- Explain what code does
- Explain code flow and purpose
- Connect different files logically
- Keep explanations simple and friendly
- Are curious and helpful

The cats will NOT:
- Criticize your code
- Suggest improvements or fixes
- Mention bugs
- Be negative in any way

## Project Structure

```
CatCodeExplainer/
├─ src/
│  └─ extension.ts          # Main extension code
├─ sidebar/
│  ├─ index.html            # Sidebar HTML
│  ├─ main.js               # Sidebar JavaScript
│  └─ style.css             # Sidebar styles
├─ cat-images/
│  ├─ cat1.svg              # Cat image 1
│  └─ cat2.svg              # Cat image 2
├─ assets/
│  ├─ cat-icon.svg          # Activity Bar icon
│  └─ meow.mp3              # Meow sound
├─ package.json             # Extension manifest
└─ tsconfig.json            # TypeScript config
```

## Development

### Install dependencies
```bash
npm install
```

### Compile TypeScript
```bash
npm run compile
```

### Watch for changes
```bash
npm run watch
```

### Run in VS Code
Press `F5` to open the extension in a new VS Code window (requires VS Code Extension Development Host).

## Notes

- The meow sound file is currently a placeholder. Replace it with an actual MP3 audio file for the best experience
- The explanation logic is mocked/hardcoded to demonstrate the concept. In a real version, this would use an LLM API.
- The extension respects your workspace's `.gitignore` and ignores common build directories.

## Author

Built during a hackathon by a friendly dev who likes cats 🐱

## License

MIT
