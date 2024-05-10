chrome.contextMenus.onClicked.addListener(genericOnClick);

function genericOnClick(info) {
  switch (info.menuItemId) {
    case 'selection':
      let selectedWord = info.selectionText; // find selected word 
      console.log('Selected Word:', selectedWord);
      RHYME(selectedWord)
      break;
    case 'link':
      console.log('Clicked on link');
      break;
    default:
      console.log('Unknown context menu item clicked');
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

  chrome.contextMenus.create(
    { title: 'Oops', parentId: 999, id: 'errorItem' },
    function () {
      if (chrome.runtime.lastError) {
        console.log('Got expected error: ' + chrome.runtime.lastError.message);
      }
    }
  );
});

function RHYME(word) {
  fetch('https://api.api-ninjas.com/v1/rhyme?word=' + word, {
    headers: {
      'X-Api-Key': 'API_KEY'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(result => {
    for (var i=0; i < result.length; i++){
      console.log(result[i]);
  }

  })
  .catch(error => {
    console.error('Error:', error);
  });
}
