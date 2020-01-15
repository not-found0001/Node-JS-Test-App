console.log("Hello I Am Here")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:8000/weather?location=' + location)
    .then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                console.log(location)
                messageOne.textContent = data.location
                messageTwo.textContent = `Weather Condition ${data.weather}.Temperature ${data.temperature}
                                          Degree Celsius.Rain Possibility ${data.rainPossibility}%.`
            }
        })
    })
})

