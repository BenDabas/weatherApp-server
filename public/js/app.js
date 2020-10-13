console.log('Client side javascript file is loaded !');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageTwo.textContent = 'Loading...';
    messageOne.textContent = '';
    const location = search.value; // value extract what ever in search
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            // parse the json data
            if (data.error) {
                messageTwo.textContent = 'Error: ' + data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecastData;
            }
        });
    });
});
