function toggleTabs(event) {
  let tabcontentId = event.target.getAttribute("data-targetId");
  const tabButons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const parentTabButtons = document.querySelectorAll(".parent-tab-button");

  tabButons.forEach((tab) => {
    tab.classList.remove("bg-blue-100", "text-black");
  });

  tabContents.forEach((content) => {
    content.classList.add("hidden");
  });

  parentTabButtons.forEach((btn) => {
    btn.classList.remove("bg-blue-600");
    btn.classList.remove("text-white");

    btn.classList.add("bg-blue-100", "text-blue-700");
  });

  if (event.target.classList.contains("parent-tab-button")) {
    event.target.classList.add("bg-blue-600");
    event.target.classList.add("text-white");

    event.target.classList.remove("bg-blue-100", "text-blue-700");
  } else {
    if (
      event.target.classList.contains("tab-button") &&
      event.target.classList.contains("has-parent-tab")
    ) {
      let parentTabID = event.target.getAttribute("data-parentTabId");

      tabcontentId = parentTabID;
      document
        .querySelector(`[data-targetId="${parentTabID}"]`)
        .classList.add("bg-blue-100", "text-black");
    } else {
      event.target.classList.add("bg-blue-100", "text-black");

      if (event.target.hasAttribute("data-parentTabBtnId")) {
        let parentTabBtnId = event.target.getAttribute("data-parentTabBtnId");
        document
          .getElementById(`${parentTabBtnId}`)
          .classList.add("bg-blue-100", "text-black");
      }

      if (event.target.classList.contains("add-slide-btn")) {
        const slidePageCancelBtn = document.querySelector(
          ".cancel-slide-addition"
        );

        slidePageCancelBtn.classList.add("has-parent-tab");
        slidePageCancelBtn.setAttribute(
          "data-parentTabId",
          event.target.getAttribute("data-parentTabId")
        );
      }
    }
  }

  document.getElementById(`${tabcontentId}`).classList.remove("hidden");
}

export { toggleTabs };
