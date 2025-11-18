//===================================================
const DataBaseEndpoint = 'insertDataBaseEndpoint';
//===================================================

const drop_area = document.getElementById('drop_area');
const input_file = document.getElementById('input_file');
const upload_button = document.getElementById('upload_button');
const clear_button = document.getElementById('clear_button');
const fileMeta = document.getElementById('fileMeta');
const statusEl = document.getElementById('statusEl');
const visual_guide = document.getElementById('visual_guide');

let selectedFile = null;

function formatBYTES(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${Math.round(bytes / (1024 ** i), 2)} ${sizes[i]}`;
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

function showFile(file) {
    selectedFile = file;
    
    fileMeta.innerHTML =   
    `<strong>Selected file:</strong> ${escapeHtml(file.name)}<br>
    Type: ${escapeHtml(file.type || '—')} · 
    Size: ${formatBYTES(file.size)} · 
    Last modified: ${new Date(file.lastModified).toLocaleString()}`;
    
    upload_button.disabled = false;
    statusEl.textContent = '';

    const videoPreview = document.getElementById('video_preview');
    videoPreview.hidden = true;

    visual_guide.hidden = true;

    if (file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        videoPreview.src = url;
        videoPreview.hidden = false;
    }
}

function clearSelection() {
    selectedFile = null;
    fileMeta.textContent = '';
    upload_button.disabled = true;
    statusEl.textContent = '';
    input_file.value = '';
    document.getElementById('video_preview').hidden = true;
    visual_guide.hidden = false;
}

function uploadFile(file) {
    if (!file) return;
    upload_button.disabled = true;
    clear_button.disabled = true;
    statusEl.textContent = 'Uploading...';

    const formData = new FormData();
    formData.append('file', file);
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


(function attachDropHandlers() {
    ['dragenter', 'dragover'].forEach(evt => 
        drop_area.addEventListener(evt, (e) => {
            e.preventDefault();
            e.stopPropagation();
            drop_area.classList.add('dragover');
        })
    );
    ['dragleave', 'drop'].forEach(evt => 
        drop_area.addEventListener(evt, (e) => {
            e.preventDefault();
            e.stopPropagation();
            drop_area.classList.remove('dragover');
        })
    );
    drop_area.addEventListener('drop', (e) => {
        const f = e.dataTransfer?.files?.[0];
        if (f) showFile(f);
    });
    
    drop_area.addEventListener('click', () => input_file.click());
})();

    input_file.addEventListener('change', (e) => {
        const f = e.target.files?.[0];
        if (f) showFile(f);
    });

    upload_button.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!selectedFile) return;
        uploadFile(selectedFile);
        statusEl.textContent = 'Uploading...';
    });

    clear_button.addEventListener('click', (e) => {
        e.stopPropagation();
        clearSelection();
    });




    

