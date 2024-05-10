document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('rhymeForm');
    form.addEventListener('submit', function(event) {
        reset()
        event.preventDefault();
        getRhyme(event);
    });
    const resetbutton = document.getElementById('reset');
    resetbutton.addEventListener('click', function() {
        reset()
    });
});

function getRhyme(event) {
    const word = event.target.word.value;
    fetch('https://api.api-ninjas.com/v1/rhyme?word=' + word, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'API_KEY'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        document.getElementById('caption').innerHTML = 'Words that rhyme with the word: "'+ word + '" are....'
        let res = document.getElementById('result');
        for (var i=0; i < result.length; i++){
            res.innerHTML += result[i] + '<br>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'rhymeData') {
    document.getElementById('caption').innerHTML = 'Words that rhyme with the word: "'+ message.word + '" are....';
    let res = document.getElementById('result');
    for (var i=0; i < message.rhymes.length; i++){
        res.innerHTML += message.rhymes[i] + '<br>';
    }  
  }
});