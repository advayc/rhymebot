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
});

chrome.contextMenus.onClicked.addListener(genericOnClick);

function genericOnClick(info) {
  switch (info.menuItemId) {
    case 'selection':
      let selectedWord = info.selectionText;
      console.log('Selected Word:', selectedWord);
      RHYME(selectedWord);
      break;
    case 'link':
      console.log('Clicked on link');
      break;
    default:
      console.log('Unknown context menu item clicked');
      break;
  }
}

function RHYME(word) {
  fetch('https://api.api-ninjas.com/v1/rhyme?word=' + word, {
    headers: {
      'X-Api-Key': 'API__KEY'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(result => {
    const params = {
      word: word,
      rhymes: result
    };
    const queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
    chrome.windows.create({
      type: 'popup',
      url: chrome.runtime.getURL('main/popup.html') + '?' + queryString,
      width: 400,
      height: 300,
      focused: true
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
