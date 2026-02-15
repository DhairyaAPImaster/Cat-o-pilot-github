# CatCode Explainer 🐱

A VS Code extension that uses Google's Gemini AI to explain your code in a friendly, cat-themed interface. yep.

## Features

✅ **Gemini AI Integration** - Get accurate code explanations powered by Google's Gemini Pro model  
✅ **Continuous Conversations** - Ask follow-up questions and maintain conversation context  
✅ **File Upload Support** - Upload reference files to provide additional context  
✅ **Cat Animations** - Adorable cat images that change based on the interaction state  
✅ **Code Formatting** - Properly formatted code blocks in responses  
✅ **Workspace Analysis** - Automatically reads your project files for better context  
✅ **Voice Input** - Ask questions by speaking with built-in voice recognition

## Setup

1. **Install the Extension**
   - Press `F5` in VS Code to run the extension in debug mode
   - Or package and install it using `vsce package`

2. **Enter Your Gemini API Key**
   - When you first activate the extension, you'll be prompted to enter your Gemini API Key
   - Get your free API key from: https://makersuite.google.com/app/apikey
   - The key is securely stored in your VS Code global state

3. **Start Using**
   - Click on the CatCode Explainer icon in the Activity Bar
   - Ask any question about your code!

## Usage

### Basic Questions
- "What does this project do?"
- "Explain this function"
- "How does this code work?"

### With File Upload
1. Click the 📎 Upload Files button
2. Select reference files (code, documentation, etc.)
3. Ask questions that reference the uploaded content

### Select Code First
1. Select code in your editor
2. Ask about the selected code in CatCode Explainer
3. The extension will provide context-aware explanations

### Clear Conversation
- Click the 🗑️ button to clear conversation history and start fresh

### Voice Input
- Click the 🎤 button to start speaking
- The transcript will be sent automatically when you finish

### Reset API Key
- Use Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
- Run: "CatCode: Reset Gemini API Key"

### Re-enter API Key (alternate)
- Use Command Palette
- Run: "CatCode: Enter Gemini API Key"

### Choose Gemini Model
- Settings → **CatCode: Gemini Model**, or
- Command Palette → "CatCode: Select Gemini Model"

### Prompt On Startup
- Settings → **CatCode: Prompt For Api Key On Activate**

## Cat States

- **Thinking Cat** 🤔 - Ready to answer your questions
- **Loading Cat** ⏳ - Processing your request
- **Response Cat** 😺 - Just provided an answer

## Commands

- `catcode.resetApiKey` - Reset your Gemini API Key

## Requirements

- VS Code version 1.80.0 or higher
- A valid Gemini API Key (free tier available)
- Internet connection for API calls

## Privacy

- Your API key is stored locally in VS Code's global state
- Code is sent to Google's Gemini API for analysis
- No data is stored or logged by the extension itself

## Issues & Feedback

If you encounter any issues or have suggestions, please let us know!

## Enjoy!

Meow! 🐱 Have fun exploring your code with your friendly cat assistant!
