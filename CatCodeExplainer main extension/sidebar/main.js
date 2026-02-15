const vscode = acquireVsCodeApi();

const chatEl = document.getElementById('chat');
const queryEl = document.getElementById('query');
const sendEl = document.getElementById('send');
const clearBtn = document.getElementById('clear-btn');
const uploadBtn = document.getElementById('upload-btn');
const fileUploadInput = document.getElementById('file-upload');
const uploadedFilesEl = document.getElementById('uploaded-files');
const meowEl = document.getElementById('meow-sound');
const catIcon = document.getElementById('cat-icon');
const meowToggleCheckbox = document.getElementById('meow-toggle-checkbox');

let selectedTxt = null;
let currFile = null;
let uploadedFiles = [];
let isLoading = false;
let playMeowSound = true;
let streamingMessageEl = null;
let streamingTextEl = null;
let streamingBuffer = '';

sendEl.addEventListener('click', async () => {
  const q = queryEl.value.trim();
  submitQuery(q);
});

queryEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendEl.click();
  }
});

meowToggleCheckbox.addEventListener('change', (e) => {
  playMeowSound = e.target.checked;
});

clearBtn.addEventListener('click', () => {
  if (confirm('Clear conversation history? Meow!')) {
    chatEl.innerHTML = '';
    const init = document.createElement('div');
    init.className = 'message cat-message';
    init.innerHTML = `<img src="${thinkingCat}" style="width: 40px; height: 40px; border-radius: 4px; margin-right: 8px; vertical-align: middle;"> Meow! Conversation cleared! Ask me anything about your code!`;
    chatEl.appendChild(init);
    
    vscode.postMessage({
      command: 'clearHistory'
    });
  }
});

uploadBtn.addEventListener('click', () => {
  fileUploadInput.click();
});

fileUploadInput.addEventListener('change', async (e) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target.result;
      uploadedFiles.push({
        name: file.name,
        content: content
      });
      
      updateUploadedFilesList();
    };
    
    reader.readAsText(file);
  }

  fileUploadInput.value = '';
});

function updateUploadedFilesList() {
  uploadedFilesEl.innerHTML = '';
  
  uploadedFiles.forEach((file, index) => {
    const fileTag = document.createElement('div');
    fileTag.className = 'file-tag';
    fileTag.innerHTML = `
      <span>${file.name}</span>
      <button class="remove-file" data-index="${index}">
        <img src="${deleteButtonIcon}" alt="Delete" style="width: 14px; height: 14px; vertical-align: middle;">
      </button>
    `;
    uploadedFilesEl.appendChild(fileTag);
  });

  document.querySelectorAll('.remove-file').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      uploadedFiles.splice(index, 1);
      updateUploadedFilesList();
    });
  });
}

function submitQuery(q) {
  if (isLoading) return;
  if (!q) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'message user-message';
  userMsg.textContent = q;
  chatEl.appendChild(userMsg);
  chatEl.scrollTop = chatEl.scrollHeight;

  queryEl.value = '';
  sendEl.disabled = true;
  isLoading = true;

  catIcon.src = loadingCat;

  vscode.postMessage({
    command: 'explain',
    query: q,
    selectedText: selectedTxt,
    fileName: currFile,
    uploadedFiles: uploadedFiles
  });
}


function showInfoMessage(text) {
  const infoMsg = document.createElement('div');
  infoMsg.className = 'message cat-message';
  infoMsg.innerHTML = `<img src="${thinkingCat}" style="width: 40px; height: 40px; border-radius: 4px; margin-right: 8px; vertical-align: middle;"> ${text}`;
  chatEl.appendChild(infoMsg);
  chatEl.scrollTop = chatEl.scrollHeight;
}

window.addEventListener('message', (event) => {
  const msg = event.data;

  if (msg.command === 'response') {
    handleResponseDone(msg.text);
  }

  if (msg.command === 'responseStart') {
    startStreamingMessage();
  }

  if (msg.command === 'responseDelta') {
    appendStreamingDelta(msg.delta);
  }

  if (msg.command === 'responseDone') {
    handleResponseDone(msg.text || streamingBuffer);
  }

  if (msg.command === 'error') {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'message error-message';
    errorMsg.innerHTML = `<img src="${errorCat}" style="width: 40px; height: 40px; border-radius: 4px; margin-right: 8px; vertical-align: middle;"> ${msg.text}`;
    chatEl.appendChild(errorMsg);
    chatEl.scrollTop = chatEl.scrollHeight;

    clearStreamingState();

    sendEl.disabled = false;
    isLoading = false;

    catIcon.src = errorCat;
    setTimeout(() => {
      catIcon.src = thinkingCat;
    }, 3000);
  }

  if (msg.command === 'loading') {
    if (msg.isLoading) {
      catIcon.src = loadingCat;
    } else {
      catIcon.src = thinkingCat;
    }
  }

  if (msg.command === 'contextUpdate') {
    selectedTxt = msg.selected;
    currFile = msg.file;
  }

  if (msg.command === 'historyCleared') {
  }
});

function formatMessage(text) {
  // basic markdown-ish formatting
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  text = text.replace(/\n/g, '<br>');
  
  return text;
}

function startStreamingMessage() {
  clearStreamingState();
  streamingMessageEl = document.createElement('div');
  streamingMessageEl.className = 'message cat-message';
  streamingTextEl = document.createElement('span');
  streamingTextEl.textContent = '';
  streamingMessageEl.innerHTML = `<img src="${finalCat}" style="width: 40px; height: 40px; border-radius: 4px; margin-right: 8px; vertical-align: middle; flex-shrink: 0;"> `;
  streamingMessageEl.appendChild(streamingTextEl);
  chatEl.appendChild(streamingMessageEl);
  chatEl.scrollTop = chatEl.scrollHeight;
  streamingBuffer = '';
}

function appendStreamingDelta(delta) {
  if (!streamingMessageEl || !streamingTextEl) {
    startStreamingMessage();
  }
  streamingBuffer += delta;
  streamingTextEl.textContent = streamingBuffer;
  chatEl.scrollTop = chatEl.scrollHeight;
}

function handleResponseDone(text) {
  if (!streamingMessageEl) {
    startStreamingMessage();
  }

  const formattedText = formatMessage(text || '');
  if (streamingMessageEl) {
    streamingMessageEl.innerHTML = `<img src="${finalCat}" style="width: 40px; height: 40px; border-radius: 4px; margin-right: 8px; vertical-align: middle; flex-shrink: 0;"> <span>${formattedText}</span>`;
  }

  clearStreamingState();

  if (playMeowSound) {
    try {
      meowEl.currentTime = 0;
      const playPromise = meowEl.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
        }).catch((error) => {
          console.log('Meow sound play failed:', error);
        });
      }
    } catch (e) {
      console.log('Meow sound error:', e);
    }
  }

  sendEl.disabled = false;
  isLoading = false;
  queryEl.focus();

  catIcon.src = finalCat;
  setTimeout(() => {
    catIcon.src = thinkingCat;
  }, 3000);
}

function clearStreamingState() {
  streamingMessageEl = null;
  streamingTextEl = null;
  streamingBuffer = '';
}

window.addEventListener('load', () => {
  const init = document.createElement('div');
  init.className = 'message cat-message';
  init.innerHTML = `<img src="${thinkingCat}" style="width: 40px; height: 40px; border-radius: 4px; margin-right: 8px; vertical-align: middle;"> Meow! I'm here to explain your code using AI! Ask me anything about your project, and you can upload reference files too!`;
  chatEl.appendChild(init);
});
