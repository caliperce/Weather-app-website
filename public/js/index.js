
console.log('Its loaded!')

const weatherform= document.querySelector('form')
const search= document.querySelector('#items-NEW')
const message_one=document.querySelector('#message-one')
const message_two=document.querySelector('#message-two-location')
const message_four=document.querySelector('#temperature')
const message_five=document.querySelector('#desc')
const answer=document.querySelector('#ans')
message_one.textContent='Weather Updates'

function addBorder() {
    myDiv.style.border = '1px solid black'; // Add a black border
    myDiv.style.padding = '10px'; // Optional: Add padding for aesthetics
}


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)
    if(!(location===0)){
        fetch('http://localhost:3000/weather?address='+location+'').then((response) =>{
            response.json().then((data)=>{
                if(data.error){
                    message_two.textContent='Enter the address correctly!'
                    console.log('Wrong!')
                }
                else{

                    

                    message_two.textContent=data.location
                    message_four.textContent=data.forecast.temp
                    message_five.textContent=data.forecast.desc
        
                    console.log(data.location)
                    console.log(data.forecast)
                }
            })
        })
    }
    else{
        console.log('Enter address  above!')
    }
})