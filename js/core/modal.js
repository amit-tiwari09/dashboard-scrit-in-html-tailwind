let uploadedImages = [];

function openModal(modalBtnId) {
  const modal = document.getElementById(`${modalBtnId}`);
  modal.classList.remove("hidden");
  modal.classList.add("modal-enter");
}

function closeModal(modalBtnId) {
  const modal = document.getElementById(`${modalBtnId}`);
  modal.classList.remove("modal-enter");
  modal.classList.add("modal-exit");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("modal-exit");
  }, 500);
}

function handleImageUpload(event) {
  const input = event.target;

  const previewSectionId = input.getAttribute("data-previewSectionId");
  if (!previewSectionId) return;

  const files = Array.from(input.files);
  const previewSection = document.querySelector(`#${previewSectionId}`);
  const previewContainer = previewSection.querySelector("#imagePreview");

  // If multiple uploads are not allowed, clear existing images
  if (!input.hasAttribute("multiple")) {
    uploadedImages = uploadedImages.filter(
      (img) => img.previewSectionId !== previewSectionId
    );
    previewContainer.innerHTML = "";
  }

  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        uploadedImages.push({
          name: file.name,
          data: e.target.result,
          size: file.size,
        });

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "relative group";

        imageWrapper.innerHTML = `
                            <img src="${
                              e.target.result
                            }" class="w-full h-24 object-cover rounded-lg border-2 border-gray-100" alt="Preview">
                            <button type="button" data-previewSectionId="${previewSectionId}" data-index="${
          uploadedImages.length - 1
        }"
                                class="remove-uploaded-image absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs font-bold hover:bg-red-600"
                            >
                                ×
                            </button>
                        `;

        previewContainer.appendChild(imageWrapper);
        previewSection.classList.remove("hidden");
      };

      reader.readAsDataURL(file);
    }
  });
}

// function removeImage(event) {
//   const previewSectionId = event.target.getAttribute("data-previewSectionId");

//   const index = Number(event.target.getAttribute("data-index"));
//   const previewSection = document.querySelector(`#${previewSectionId}`);
//   const previewContainer = previewSection.querySelector("#imagePreview");

//   if (!previewSectionId) return;

//   uploadedImages.splice(index, 1);
//   previewContainer.children[index].remove();

//   if (uploadedImages.length === 0) {
//     previewSection.classList.add("hidden");
//   }
// }

function removeImage(event) {
  const button = event.target;
  const previewSectionId = button.getAttribute("data-previewSectionId");
  const index = Number(button.getAttribute("data-index"));
  const previewSection = document.querySelector(`#${previewSectionId}`);
  const previewContainer = previewSection.querySelector("#imagePreview");

  if (!previewSectionId) return;

  // Remove the image from uploadedImages for this section
  const sectionImages = uploadedImages.filter(
    (img) => img.previewSectionId === previewSectionId
  );
  const imageToRemove = sectionImages[index];

  if (imageToRemove) {
    // Remove from global uploadedImages array
    const globalIndex = uploadedImages.indexOf(imageToRemove);
    if (globalIndex > -1) uploadedImages.splice(globalIndex, 1);

    // Remove from DOM
    previewContainer.children[index].remove();

    // Reassign indices for remaining buttons in this section
    Array.from(previewContainer.children).forEach((child, i) => {
      const btn = child.querySelector(".remove-uploaded-image");
      if (btn) btn.setAttribute("data-index", i);
    });
  }

  // Hide preview section if no images left in this section
  const remainingSectionImages = uploadedImages.filter(
    (img) => img.previewSectionId === previewSectionId
  );
  if (remainingSectionImages.length === 0) {
    previewSection.classList.add("hidden");
  }
}

export { openModal, closeModal, handleImageUpload, removeImage };
