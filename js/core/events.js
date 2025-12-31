import {
  closeModal,
  handleImageUpload,
  openModal,
  removeImage,
} from "./modal.js";
import { handleMenuClick, markActiveMenu, toggleSidebar } from "./sidebar.js";

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("toggle-sidebar")) {
    toggleSidebar();
  }

  if (event.target.classList.contains("has-submenu")) {
    handleMenuClick(event.target.id);
  }

  if (event.target.classList.contains("open-modal")) {
    openModal(event.target.getAttribute("data-targetModalId"));
  }

  if (event.target.classList.contains("close-modal")) {
    closeModal(event.target.getAttribute("data-targetModalId"));
  }

  if (event.target.classList.contains("remove-uploaded-image")) {
    removeImage(event);
  }
});

markActiveMenu();

// document.addEventListener("change", function (event) {
//   if (event.target.classList.contains("image-upload-preview")) {
//     handleImageUpload(event);
//   }
// });
