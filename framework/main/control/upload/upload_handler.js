dom = {
    dropArea: null,
    fileInput: null,
    uploadBtn: null,
    clearBtn: null,
    fileMeta: null,
    statusEl: null,
    visualGuide: null,
    videoPreview: null,
};

function init() {
    attachDropHandlers();

    dom.fileInput.addEventListener("change", (e) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelection(file);
    });

    dom.uploadBtn.addEventListener("click", () => {
        if (!selectedFile) return;
        UploadView.setStatus("Uploading...");
        UploadView.disableActions();

        uploadFile(selectedFile,
            () => {
                UploadView.setStatus("Upload successful!");
                handleClear();
            },
            (err) => {
                UploadView.setStatus("Upload failed: " + err);
                UploadView.enableActions();
            }
        );
    });

    dom.clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClear();
    });
    dom.uploadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadFile(selectedFile, null, null);
    })
}

function handleFileSelection(file) {
    setSelectedFile(file);
    UploadView.displayFileInfo(file);
    UploadView.enableUploadBtn();
    UploadView.setStatus("");

    dom.visualGuide.hidden = true;
    UploadView.hideVideoPreview();

    if (file.type.startsWith("video/")) {
        UploadView.showVideoPreview(file);
    }
}

function handleClear(e) {
    clearSelectedFile();
    UploadView.clearUI();
}

function attachDropHandlers() {
    ["dragenter", "dragover"].forEach(evt =>
        dom.dropArea.addEventListener(evt, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dom.dropArea.classList.add("dragover");
        })
    );

    ["dragleave", "drop"].forEach(evt =>
        dom.dropArea.addEventListener(evt, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dom.dropArea.classList.remove("dragover");
        })
    );

    dom.dropArea.addEventListener("drop", (e) => {
        const file = e.dataTransfer?.files?.[0];
        if (file) handleFileSelection(file);
    });

    dom.dropArea.addEventListener("click", () => dom.fileInput.click());
}