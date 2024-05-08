chrome.contextMenus.onClicked.addListener(genericOnClick);

function genericOnClick(info) {
  switch (info.menuItemId) {
    case 'selection':
      let selectedWord = info.selectionText; // find selected word 
      break;
  }
}
chrome.runtime.onInstalled.addListener(function () {
    let contexts = [
        'page',
        'selection',
        'link',
        'editable',
        'image',
        'video',
        'audio'
      ];
  for (let i = 0; i < contexts.length; i++) {
    let context = contexts[i];
    let title = "Click to get Rhymes for ";
    chrome.contextMenus.create({
      title: title,
      contexts: [context],
      id: context
    });
  }

  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  chrome.contextMenus.create(
    { title: 'Oops', parentId: 999, id: 'errorItem' },
    function () {
      if (chrome.runtime.lastError) {
        console.log('Got expected error: ' + chrome.runtime.lastError.message);
      }
    }
  );
});