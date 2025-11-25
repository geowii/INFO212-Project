

class UploadView {

    static displayFileInfo(file) {
        dom.fileMeta.innerHTML = `
            <strong>Selected file:</strong> ${escapeHtml(file.name)}<br>
            Type: ${escapeHtml(file.type || '—')} · 
            Size: ${formatBytes(file.size)} · 
            Last modified: ${new Date(file.lastModified).toLocaleString()}
        `;
    }

    static enableUploadBtn() {
        dom.uploadBtn.disabled = false;
    }

    static disableUpload() {
        dom.uploadBtn.disabled = true;
    }

    static disableActions() {
        dom.uploadBtn.disabled = true;
        dom.clearBtn.disabled = true;
    }

    static enableActions() {
        dom.uploadBtn.disabled = false;
        dom.clearBtn.disabled = false;
    }

    static showVideoPreview(file) {
        const url = URL.createObjectURL(file);
        dom.videoPreview.src = url;
        dom.videoPreview.hidden = false;
    }

    static hideVideoPreview() {
        dom.videoPreview.hidden = true;
    }

    static setStatus(msg) {
        dom.statusEl.textContent = msg;
    }

    static clearUI() {
        dom.fileMeta.textContent = "";
        dom.fileInput.value = "";
        UploadView.hideVideoPreview();
        dom.visualGuide.hidden = false;
    }
}