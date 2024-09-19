// popup.js
document.getElementById('applySort').addEventListener('click', function () {
    const sortType = document.getElementById('sort-type').value;
    const order = document.getElementById('order').value;
  
    // Send a message to the content script to apply the selected sorting
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: applySorting,
        args: [sortType, order]
      });
    });
  });
  
  function applySorting(sortType, order) {
    let results = Array.from(document.querySelectorAll('ytd-video-renderer'));
  
    results.sort((a, b) => {
      let aCount = 0, bCount = 0;
  
      if (sortType === 'viewCount') {
        // Get view count
        aCount = parseInt(a.querySelector('#metadata-line span').innerText.replace(/\D/g, ''));
        bCount = parseInt(b.querySelector('#metadata-line span').innerText.replace(/\D/g, ''));
      } else if (sortType === 'likeCount') {
        // Get like count
        const aLikes = a.querySelector('yt-formatted-string[aria-label*=" like"]');
        const bLikes = b.querySelector('yt-formatted-string[aria-label*=" like"]');
        if (aLikes && bLikes) {
          aCount = parseInt(aLikes.getAttribute('aria-label').replace(/\D/g, ''));
          bCount = parseInt(bLikes.getAttribute('aria-label').replace(/\D/g, ''));
        }
      }
  
      // Sort ascending or descending based on user selection
      return order === 'asc' ? aCount - bCount : bCount - aCount;
    });
  
    // Reorder the video results on the page
    let parent = document.querySelector('ytd-item-section-renderer #contents');
    results.forEach(video => parent.appendChild(video));
  }
  