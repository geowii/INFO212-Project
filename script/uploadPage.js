//===================================================
const DataBaseEndpoint = 'insertDataBaseEndpoint';
//===================================================

const drop_area = document.getElementById('drop-area');
const input_file = document.getElementById('input-file');
const upload_button = document.getElementById('upload-button');
const clear_button = document.getElementById('clear-button');

let selectedFile = null;

function formatBYTES(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${Math.round(bytes / (1024 ** i), 2)} ${sizes[i]}`;
}

function showFile(file) {
    selectedFile = file;
    fileMeta.innerHTML =   
    `<strong>Selected file:</strong> ${escapeHtml(file.name)}<br>
    Type: ${escapeHtml(file.type || '—')} · Size: ${formatBytes(file.size)} · Last modified: ${new Date(file.lastModified).toLocaleString()}`;
    
    upload_button.disabled = false;
    statusEl.textContent = '';
}

function clearSelection() {
    selectedFile = null;
    fileMeta.textContent = '';
    upload_button.disabled = true;
    statusEl.textContent = '';
    input_file.value = '';
}

function uploadFile() {
    if (!file) return;
    upload_button.disabled = true;
    clear_button.disabled = true;
    statusEl.textContent = 'Uploading...';

    const formData = new FormData();
    formData.append('file', File);
    const metadata = {
        originalFileName: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
    };
    formData.append('metadata', JSON.stringify(metadata));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', DataBaseEndpoint, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            statusEl.textContent = 'Upload successful!';
            clearSelection();
        } else {
            statusEl.textContent = 'Upload failed: ${xhr.statusText}';
            upload_button.disabled = false;
            clear_button.disabled = false;
        };
    };
    xhr.onerror = function () {
        statusEl.textContent = 'Upload error. Please try again.';
        upload_button.disabled = false;
        clear_button.disabled = false;
    };
    xhr.send(formData);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
} 

;(function attachDropHandlers() {
    ['dragenter', 'dragover'].forEach(eventName => {
        drop_area.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            drop_area.classList.add('dragover');
        });
    });
    ['dragleave', 'drop'].forEach(eventName => {
        drop_area.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            drop_area.classList.remove('dragover');
        });
    });
    drop_area.addEventListener('drop', (e) => {
        const f = e.dataTransfer?.files?.[0];
        if (f) showFile(f);
    });
    
    drop_area.addEventListener('click', () => fileInput.click());
    });

    fileInput.addEventListener('change', (e) => {
        const f = e.target.files?.[0];
        if (f) showFile(f);
    });

    upload_button.addEventListener('click', () => {
        if (!selectedFile) return;
        uploadFile(selectedFile);
        statusEl.textContent = 'Uploading...';
    });

    clear_button.addEventListener('click', () => {
        clearSelection();
    });



    

