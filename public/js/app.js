const form = document.querySelector('form');
const paraLoading = document.getElementById('loading');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = document.getElementById('name').value;
    const para = document.getElementById('para');

    paraLoading.innerText = 'Loading....';
    fetch(`http://localhost:3000/weather?address=${inputText}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                paraLoading.innerText = '';
                para.innerText = data.error;
            }
            else {
                paraLoading.innerText = '';
                para.innerText = `showing weather for ${data.location}, temperature is ${data.temperature}°C and having ${data.Forecasting} weather.`
            }
        })
        .catch((e) => {
            console.log(e);
            console.log('OOPs somthing is wrong! Error was occured');
        })

})


