document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('rhymeForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        reset();
        if (event.submitter.id === 'rhsubmit') {
            getRhyme(event);
        } else if (event.submitter.id === 'sysubmit' || event.submitter.id ==='asubmit') {
            getSynonym(event);
        }
    });

    const resetbutton = document.getElementById('reset');
    resetbutton.addEventListener('click', function() {
        reset();
    });
});

function getRhyme(event) {
    const word = event.target.word.value;
    fetch('https://api.api-ninjas.com/v1/rhyme?word=' + word, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'API__KEY'
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

function reset() {
    document.getElementById('caption').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}

function getSynonym(event) {
    const word = event.target.word.value;
    fetch('https://api.api-ninjas.com/v1/thesaurus?word=' + word, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'API__KEY'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        if (event.submitter.id==='sysubmit'){
            document.getElementById('caption').innerHTML = 'Synonyms for the word: "'+ word + '" are....'
            let res = document.getElementById('result');
            if (result.synonyms && result.synonyms.length > 0) {
                for (let i = 0; i < result.synonyms.length; i++) {
                    res.innerHTML += result.synonyms[i] + '<br>';
                }
            }
        }
        else if (event.submitter.id==='asubmit') {
            console.log(result)
            document.getElementById('caption').innerHTML = 'Antonyms for the word: "'+word+'"are...'
            let res = document.getElementById('result')
            if (result.antonyms && result.antonyms.length > 0) {
                for (let i = 0; i < result.antonyms.length; i++) {
                    res.innerHTML += result.antonyms[i] + '<br>';
                }
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
