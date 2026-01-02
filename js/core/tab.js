function toggleTabs(event) {
  const target = event.target;

  let tabContentId = target.getAttribute("data-targetId");

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const parentTabButtons = document.querySelectorAll(".parent-tab-button");

  resetTabButtons(tabButtons);
  hideAllTabContents(tabContents);
  resetParentTabs(parentTabButtons);

  if (isParentTab(target)) {
    activateParentTab(target);
  } else {
    handleChildOrNormalTab(target, parentTabButtons);
    tabContentId = resolveParentTabContent(target, tabContentId);
  }

  showTabContent(tabContentId);
}

/* ================= Helper Functions ================= */

function resetTabButtons(buttons) {
  buttons.forEach((btn) => btn.classList.remove("bg-blue-100", "text-black"));
}

function hideAllTabContents(contents) {
  contents.forEach((content) => content.classList.add("hidden"));
}

function resetParentTabs(parentTabs) {
  parentTabs.forEach((btn) => {
    btn.classList.remove("bg-blue-600");
    btn.classList.add("bg-blue-500", "text-white");
  });
}

function isParentTab(target) {
  return target.classList.contains("parent-tab-button");
}

function activateParentTab(target) {
  target.classList.add("bg-blue-600", "text-white");
  target.classList.remove("bg-blue-100", "text-blue-700");
}

function handleChildOrNormalTab(target) {
  target.classList.add("bg-blue-100", "text-black");

  if (target.hasAttribute("data-parentTabBtnId")) {
    const parentBtnId = target.getAttribute("data-parentTabBtnId");
    document
      .getElementById(parentBtnId)
      .classList.add("bg-blue-100", "text-black");
  }

  if (target.classList.contains("add-slide-btn")) {
    setupCancelSlideButton(target);
  }
  if (target.classList.contains("edit-slide-btn")) {
    setupCancelSlideButton(target, "edit");
  }
}

function resolveParentTabContent(target, tabContentId) {
  if (
    target.classList.contains("tab-button") &&
    target.classList.contains("has-parent-tab")
  ) {
    const parentTabId = target.getAttribute("data-parentTabId");

    document
      .querySelector(`[data-targetId="${parentTabId}"]`)
      .classList.add("bg-blue-100", "text-black");

    return parentTabId;
  }

  return tabContentId;
}

function setupCancelSlideButton(target, cancelBtnFor = "add") {
  let cancelBtn = document.querySelector(".cancel-slide-addition");

  if (cancelBtnFor != "add") {
    cancelBtn = document.querySelector(".cancel-slide-edition");
  }

  cancelBtn.classList.add("has-parent-tab");
  cancelBtn.setAttribute(
    "data-parentTabId",
    target.getAttribute("data-parentTabId")
  );
}

function showTabContent(tabContentId) {
  document.getElementById(tabContentId).classList.remove("hidden");
}

export { toggleTabs };
