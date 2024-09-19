// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sort') {
      let { sortType, order } = request;
  
      // Apply the sorting logic (same as in popup.js)
      applySorting(sortType, order);
    }
  });
  