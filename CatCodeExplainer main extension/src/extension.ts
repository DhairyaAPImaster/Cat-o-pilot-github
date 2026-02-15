import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

let explainerPanel: vscode.WebviewView | undefined;
let welcomePanel: vscode.WebviewPanel | undefined;

export async function activate(ctx: vscode.ExtensionContext) {
  const selectProvider = async (): Promise<'gemini' | 'hackclub' | undefined> => {
    const provider = await vscode.window.showQuickPick(
      ['Gemini AI', 'Hackclub AI (no API key needed)'],
      { placeHolder: 'Select your AI provider' }
    );

    if (!provider) return undefined;
    if (provider === 'Gemini AI') return 'gemini';
    return 'hackclub';
  };

  const promptForApiKey = async (reason?: string) => {
    const provider = await selectProvider();
    if (!provider) {
      vscode.window.showErrorMessage('AI provider selection is required.');
      return undefined;
    }

    await ctx.globalState.update('aiProvider', provider);

    if (provider === 'hackclub') {
      vscode.window.showInformationMessage('Hackclub AI configured! No API key needed. Meow! 🐱');
      return 'HACKCLUB_NO_KEY';
    }

    const message = reason ? `Enter your Gemini API key (${reason}):` : 'Please enter your Gemini API key:';
    const key = await vscode.window.showInputBox({
      prompt: message,
      password: true,
      placeHolder: 'AIza...'
    });
    if (key) {
      await ctx.globalState.update('geminiApiKey', key);
      vscode.window.showInformationMessage('Gemini API key has been set!');
    }
    return key;
  };

  const explainerProvider = new CatExplainerProvider(ctx);

  ctx.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'catcodeExplainer',
      explainerProvider,
      { webviewOptions: { retainContextWhenHidden: true } }
    )
  );

  ctx.subscriptions.push(
    vscode.commands.registerCommand('catcode.resetApiKey', async () => {
      await promptForApiKey('API key reset');
    })
  );

  ctx.subscriptions.push(
    vscode.commands.registerCommand('catcode.enterApiKey', async () => {
      await promptForApiKey('manual entry');
    })
  );

  ctx.subscriptions.push(
    vscode.commands.registerCommand('catcode.selectProvider', async () => {
      await promptForApiKey('provider selection');
    })
  );

  ctx.subscriptions.push(
    vscode.commands.registerCommand('catcode.playWelcomeVideo', async () => {
      playWelcomeVideo(ctx);
    })
  );

  let provider = ctx.globalState.get<string>('aiProvider');
  let apiKey = provider === 'hackclub'
    ? 'HACKCLUB_NO_KEY'
    : ctx.globalState.get<string>('geminiApiKey');

  if (!apiKey || !provider) {
    const configured = await promptForApiKey('first-time setup');
    if (!configured) {
      vscode.window.showWarningMessage('CatCode Explainer is not configured yet. You can set it up later via "CatCode: Select AI Provider".');
    } else {
      playWelcomeVideo(ctx);
    }
  } else {
    const config = vscode.workspace.getConfiguration('catcode');
    const promptOnActivate = config.get<boolean>('promptForApiKeyOnActivate', true);

    if (promptOnActivate && provider !== 'hackclub') {
      const action = await vscode.window.showInformationMessage(
        'Gemini API Key already saved. Do you want to re-enter it?',
        'Re-enter',
        'Keep'
      );

      if (action === 'Re-enter') {
        await promptForApiKey('re-enter');
      }
    }
  }
}

export function deactivate() {}

function playWelcomeVideo(ctx: vscode.ExtensionContext) {
  if (welcomePanel) {
    welcomePanel.dispose();
  }

  welcomePanel = vscode.window.createWebviewPanel(
    'catcodeWelcome',
    'CatCode Explainer - Welcome Video',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [ctx.extensionUri]
    }
  );

  const videoUri = welcomePanel.webview.asWebviewUri(
    vscode.Uri.joinPath(ctx.extensionUri, 'extension welcome video', 'welcome.mp4')
  );

  welcomePanel.webview.html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CatCode Explainer - Welcome</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .container {
      max-width: 900px;
      width: 90%;
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      text-align: center;
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 2em;
    }
    .subtitle {
      color: #666;
      margin-bottom: 30px;
      font-size: 1.1em;
    }
    video {
      width: 100%;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      margin: 20px 0;
    }
    .controls {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 30px;
    }
    button {
      padding: 12px 30px;
      border: none;
      border-radius: 8px;
      font-size: 1em;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .close-btn {
      background: #667eea;
      color: white;
    }
    .close-btn:hover {
      background: #764ba2;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    .meow {
      display: inline-block;
      margin-left: 10px;
      font-size: 1.5em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to CatCode Explainer! <span class="meow">🐱</span></h1>
    <p class="subtitle">Your friendly AI cat coding assistant</p>
    <video controls autoplay>
      <source src="${videoUri}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="controls">
      <button class="close-btn" onclick="vscode.postMessage({command: 'close'})">Close Video</button>
    </div>
  </div>
  <script>
    const vscode = acquireVsCodeApi();
  </script>
</body>
</html>`;

  welcomePanel.onDidDispose(() => {
    welcomePanel = undefined;
  }, undefined, ctx.subscriptions);
}

class CatExplainerProvider implements vscode.WebviewViewProvider {
  private conversationHistory: Array<any> = [];

  constructor(private ctx: vscode.ExtensionContext) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    ctx: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ) {
    explainerPanel = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.ctx.extensionUri]
    };

    webviewView.webview.html = this.getHtmlContent(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (msg: any) => {
      if (msg.command === 'explain') {
        try {
          webviewView.webview.postMessage({
            command: 'loading',
            isLoading: true
          });

          webviewView.webview.postMessage({
            command: 'responseStart'
          });

          const explanation = await this.generateExplanationStreamed(
            msg.query,
            msg.selectedText,
            msg.fileName,
            msg.uploadedFiles,
            (delta) => {
              webviewView.webview.postMessage({
                command: 'responseDelta',
                delta
              });
            }
          );
          
          webviewView.webview.postMessage({
            command: 'responseDone',
            text: explanation,
            isLoading: false
          });
        } catch (error: any) {
          webviewView.webview.postMessage({
            command: 'error',
            text: `Meow! 😿 Error: ${error.message}`,
            isLoading: false
          });
        }
      } else if (msg.command === 'clearHistory') {
        this.conversationHistory = [];
        webviewView.webview.postMessage({
          command: 'historyCleared'
        });
      }
    });
  }

  private async generateExplanationStreamed(
    query: string,
    selectedText: string | null,
    fileName: string | null,
    uploadedFiles: Array<{ name: string; content: string }> | null,
    onDelta: (delta: string) => void
  ): Promise<string> {
    const provider = this.ctx.globalState.get<string>('aiProvider', 'gemini');

    const allFiles = await this.readWorkspace();
    let contextText = this.buildContext(allFiles, selectedText, fileName, uploadedFiles);

    if (provider === 'hackclub') {
      const userMessage = {
        role: 'user',
        content: `${contextText}\n\nUser Question: ${query}`
      };
      const messages = [...this.conversationHistory, userMessage];

      let response = '';
      try {
        response = await this.callHackclubAPIStream(messages, onDelta);
      } catch {
        response = await this.callHackclubAPI(messages);
        onDelta(response);
      }

      const finalResponse = `${response}\n\nmeow 🐱`;

      this.conversationHistory.push(userMessage);
      this.conversationHistory.push({
        role: 'assistant',
        content: finalResponse
      });

      return finalResponse;
    } else {
      const apiKey = this.ctx.globalState.get<string>('geminiApiKey');
      if (!apiKey) {
        throw new Error('Gemini API Key not found. Please restart VS Code to set it up.');
      }

      this.conversationHistory.push({
        role: 'user',
        parts: [{ text: `${contextText}\n\nUser Question: ${query}` }]
      });

      let response = '';
      try {
        response = await this.callGeminiAPIStream(apiKey, this.conversationHistory, onDelta);
      } catch {
        response = await this.callGeminiAPI(apiKey, this.conversationHistory);
        onDelta(response);
      }

      const finalResponse = `${response}\n\nmeow 🐱`;

      this.conversationHistory.push({
        role: 'model',
        parts: [{ text: finalResponse }]
      });

      return finalResponse;
    }
  }

  private async callGeminiAPI(
    apiKey: string, 
    messages: Array<{ role: string; parts: Array<{ text: string }> }>
  ): Promise<string> {
    const body = {
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4000,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_NONE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_NONE'
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_NONE'
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE'
        }
      ]
    };

    const postData = JSON.stringify(body);

    const geminiModel = this.ctx.globalState.get<string>('geminiModel', 'gemini-1.5-flash');

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              reject(new Error(`Gemini API error: ${res.statusCode} - ${data}`));
              return;
            }

            const jsonData = JSON.parse(data);
            
            if (jsonData.candidates && jsonData.candidates[0] && jsonData.candidates[0].content) {
              resolve(jsonData.candidates[0].content.parts[0].text);
            } else {
              reject(new Error('No response from Gemini API'));
            }
          } catch (error: any) {
            reject(new Error(`Failed to parse Gemini API response: ${error.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Failed to call Gemini API: ${error.message}`));
      });

      req.write(postData);
      req.end();
    });
  }

  private async callGeminiAPIStream(
    apiKey: string,
    messages: Array<{ role: string; parts: Array<{ text: string }> }>,
    onDelta: (delta: string) => void
  ): Promise<string> {
    const body = {
      contents: messages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4000,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_NONE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_NONE'
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_NONE'
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE'
        }
      ]
    };

    const postData = JSON.stringify(body);
    const geminiModel = this.ctx.globalState.get<string>('geminiModel', 'gemini-1.5-flash');

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/${geminiModel}:streamGenerateContent?alt=sse&key=${apiKey}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let buffer = '';
        let fullText = '';

        res.on('data', (chunk) => {
          buffer += chunk.toString();
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const data = trimmed.replace(/^data:\s*/, '');
            if (!data || data === '[DONE]') continue;

            try {
              const jsonData = JSON.parse(data);
              const parts = jsonData?.candidates?.[0]?.content?.parts;
              if (!parts || parts.length === 0) continue;
              const delta = parts.map((p: any) => p.text || '').join('');
              if (!delta) continue;
              fullText += delta;
              onDelta(delta);
            } catch {
              // Ignore JSON parse errors for partial chunks
            }
          }
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode !== 200) {
            reject(new Error(`Gemini API error: ${res.statusCode}`));
            return;
          }
          resolve(fullText);
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Failed to call Gemini API: ${error.message}`));
      });

      req.write(postData);
      req.end();
    });
  }

  private async callHackclubAPI(
    messages: Array<{ role: string; content: string }>
  ): Promise<string> {
    const hackclubModel = this.ctx.globalState.get<string>('hackclubModel', 'qwen/qwen3-32b');

    const body = {
      model: hackclubModel,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: 0.7,
      max_tokens: 4000
    };

    const postData = JSON.stringify(body);

    const hackclubKey = process.env.HACKCLUB_API_KEY
      || this.getEnvValueFromFile(path.join(this.ctx.extensionPath, '.env'), 'HACKCLUB_API_KEY');
    if (!hackclubKey || hackclubKey === 'your_hackclub_api_key_here') {
      throw new Error('HACKCLUB_API_KEY not found or not set in .env file. Please add your API key to the .env file.');
    }

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'ai.hackclub.com',
        path: '/proxy/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hackclubKey}`,
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            if (res.statusCode === 401) {
              reject(new Error(`Hackclub API error 401: Invalid or expired API key. Please update HACKCLUB_API_KEY in secrets.`));
              return;
            }

            if (res.statusCode !== 200) {
              reject(new Error(`Hackclub API error: ${res.statusCode} - ${data}`));
              return;
            }

            const jsonData = JSON.parse(data);
            
            if (jsonData.choices && jsonData.choices[0] && jsonData.choices[0].message) {
              resolve(jsonData.choices[0].message.content);
            } else {
              reject(new Error('No response from Hackclub API'));
            }
          } catch (error: any) {
            reject(new Error(`Failed to parse Hackclub API response: ${error.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Failed to call Hackclub API: ${error.message}`));
      });

      req.write(postData);
      req.end();
    });
  }

  private async callHackclubAPIStream(
    messages: Array<{ role: string; content: string }>,
    onDelta: (delta: string) => void
  ): Promise<string> {
    const hackclubModel = this.ctx.globalState.get<string>('hackclubModel', 'qwen/qwen3-32b');

    const body = {
      model: hackclubModel,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature: 0.7,
      max_tokens: 4000,
      stream: true
    };

    const postData = JSON.stringify(body);

    const hackclubKey = process.env.HACKCLUB_API_KEY
      || this.getEnvValueFromFile(path.join(this.ctx.extensionPath, '.env'), 'HACKCLUB_API_KEY');
    if (!hackclubKey || hackclubKey === 'your_hackclub_api_key_here') {
      throw new Error('HACKCLUB_API_KEY not found or not set in .env file. Please add your API key to the .env file.');
    }

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'ai.hackclub.com',
        path: '/proxy/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hackclubKey}`,
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let buffer = '';
        let fullText = '';

        res.on('data', (chunk) => {
          buffer += chunk.toString();
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const data = trimmed.replace(/^data:\s*/, '');
            if (!data || data === '[DONE]') continue;

            try {
              const jsonData = JSON.parse(data);
              const delta = jsonData?.choices?.[0]?.delta?.content
                || jsonData?.choices?.[0]?.message?.content
                || '';
              if (!delta) continue;
              fullText += delta;
              onDelta(delta);
            } catch {
              // Ignore JSON parse errors for partial chunks
            }
          }
        });

        res.on('end', () => {
          if (res.statusCode === 401) {
            reject(new Error('Hackclub API error 401: Invalid or expired API key. Please update HACKCLUB_API_KEY in secrets.'));
            return;
          }

          if (res.statusCode && res.statusCode !== 200) {
            reject(new Error(`Hackclub API error: ${res.statusCode}`));
            return;
          }

          resolve(fullText);
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Failed to call Hackclub API: ${error.message}`));
      });

      req.write(postData);
      req.end();
    });
  }

  private getEnvValueFromFile(filePath: string, key: string): string | undefined {
    try {
      if (!fs.existsSync(filePath)) return undefined;
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex === -1) continue;
        const k = trimmed.slice(0, eqIndex).trim();
        if (k !== key) continue;
        let value = trimmed.slice(eqIndex + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        return value;
      }
    } catch {
      return undefined;
    }
    return undefined;
  }

  private buildContext(
    files: Map<string, string>, 
    selected: string | null, 
    file: string | null,
    uploadedFiles: Array<{ name: string; content: string }> | null
  ): string {
    let context = 'You are an expert cat coding assistant. Provide detailed, comprehensive code explanations with specific code examples from the files. Reference exact line numbers and variable names. Include code snippets to illustrate your points. Be thorough but focused on what the user asked. Always end with "meow 🐱".\n\n';

    if (file) {
      context += `=== CURRENT FILE (Full Content) ===\n${this.addLineNumbers(file)}\n\n`;
    }

    if (files.size > 0) {
      context += '=== OTHER OPEN FILES (Snippets) ===\n';
      for (const [path, content] of files) {
        context += `FILE: ${path}\n${this.addLineNumbers(content.substring(0, 500))}...\n\n`;
      }
    }
    
    if (selected) {
      context += `\n=== SELECTED CODE ===\n${this.addLineNumbers(selected)}\n\n`;
    }

    if (uploadedFiles && uploadedFiles.length > 0) {
      const limitedFiles = uploadedFiles.slice(0, 5);
      context += '\n=== UPLOADED REFERENCE FILES ===\n';
      for (const uf of limitedFiles) {
        context += `FILE: ${uf.name}\n${this.addLineNumbers(uf.content)}\n\n`;
      }
    }
    
    return context;
  }

  private addLineNumbers(content: string): string {
    return content
      .split('\n')
      .map((line, index) => `${index + 1}:${line}`)
      .join('\n');
  }

  private async readWorkspace(): Promise<Map<string, string>> {
    const stuff = new Map<string, string>();
    const folders = vscode.workspace.workspaceFolders;

    if (!folders) return stuff;

    const openEditors = vscode.window.tabGroups.all
      .flatMap(group => group.tabs)
      .map(tab => (tab.input as any)?.uri)
      .filter(uri => uri && uri.scheme === 'file');

    for (const uri of openEditors) {
      try {
        const content = fs.readFileSync(uri.fsPath, 'utf-8');
        if (content.length < 50000) {
          const relPath = path.relative(folders[0].uri.fsPath, uri.fsPath);
          stuff.set(relPath, content);
        }
      } catch {}
    }

    return stuff;
  }

  private getHtmlContent(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.ctx.extensionUri, 'sidebar', 'main.js')
    );

    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.ctx.extensionUri, 'sidebar', 'style.css')
    );

    const thinkingCatUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.ctx.extensionUri, 'cat-images', 'thinking.png')
    );

    const loadingCatUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.ctx.extensionUri, 'cat-images', 'loading cat.png')
    );

    const errorCatUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.ctx.extensionUri, 'cat-images', 'error cat.png')
    );

    const finalResponseCatUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.ctx.extensionUri, 'cat-images', 'final response provided.png')
    );

    const deleteButtonUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.ctx.extensionUri, 'assets', 'delete-button.svg')
    );

    const meowUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.ctx.extensionUri, 'cat-sounds', 'meow.mp3')
    );

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CatCode Explainer</title>
  <link rel="stylesheet" href="${styleUri}">
</head>
<body>
  <div class="container">
    <div class="header">
      <img id="cat-icon" src="${thinkingCatUri}" alt="cat" class="cat-icon" />
      <h1>CatCode Explainer</h1>
    </div>

    <div class="controls">
      <label class="meow-toggle">
        <input type="checkbox" id="meow-toggle-checkbox" checked />
        <span>🔊 Play meow sound after each response</span>
      </label>
    </div>

    <div class="chat-container">
      <div id="chat" class="chat"></div>
    </div>

    <div class="file-upload-area">
      <input type="file" id="file-upload" multiple accept=".txt,.md,.js,.ts,.py,.java,.cpp,.c,.cs,.html,.css,.json" style="display: none;" />
      <button id="upload-btn" class="upload-btn" title="Upload reference files">📎 Upload Files</button>
      <div id="uploaded-files" class="uploaded-files"></div>
    </div>

    <div class="input-area">
      <textarea
        id="query"
        placeholder="Ask the cat about your code..."
        class="input"
        rows="2"
      ></textarea>
      <div class="button-group">
        <button id="clear-btn" class="clear-btn" title="Clear conversation">
          <img src="${deleteButtonUri}" alt="Delete" style="width: 16px; height: 16px; vertical-align: middle;">
        </button>
        <button id="send" class="send-btn">Send</button>
      </div>
    </div>
  </div>

  <audio id="meow-sound" src="${meowUri}"></audio>

  <script>
    const thinkingCat = '${thinkingCatUri}';
    const loadingCat = '${loadingCatUri}';
    const errorCat = '${errorCatUri}';
    const finalCat = '${finalResponseCatUri}';
    const deleteButtonIcon = '${deleteButtonUri}';
  </script>
  <script src="${scriptUri}"></script>
</body>
</html>`;
  }
}
