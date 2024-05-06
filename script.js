document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rhymeForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        getRhyme(event);
    });
});

function getRhyme(event) {
    const word = event.target.word.value;
    fetch('https://api.api-ninjas.com/v1/rhyme?word=' + word, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'YOUR_API_KEY'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        document.getElementById('result').innerHTML = 'Words that rhyme with  ' + word + JSON.stringify(result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
