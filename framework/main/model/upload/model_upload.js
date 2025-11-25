//===================================================
const DataBaseEndpoint = 'insertDataBaseEndpoint';
//===================================================

let selectedFile = null;

function setSelectedFile(file) {
    selectedFile = file;
}

function clearSelectedFile() {
    selectedFile = null;
}

function formatBytes(bytes) {
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
    return text.replace(/[&<>"']/g, m => map[m]);
}

function uploadFile(file, onSuccess, onError) {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const metadata = {
        originalFileName: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
    };
    formData.append('metadata', JSON.stringify(metadata));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', DataBaseEndpoint, true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            onSuccess();
        } else {
            onError(xhr.statusText);
        }
    };

    xhr.onerror = () => onError("Upload error");

    xhr.send(formData);
}