import { send, init } from 'emailjs-com'
import regex from './regex'

const sendBtn    = document.querySelector('button')
const textarea   = document.querySelector('textarea')
const inputEmail = document.querySelector('input')

const li     = document.querySelectorAll('li')
const slider = document.querySelectorAll('div.container-slide')

let emailInfo = {}

init("user_D1VtWdi9f1ACxdt1MrBsn")

li.forEach(el => {
  
   el.addEventListener('click', () => {

    emailInfo.dest = el.dataset.email
    slider[0].classList.add('slide-animation-down')

  })

})

slider.forEach((el, i) => {

  el.addEventListener('animationend', () => {

    el.classList.remove('slide-animation-down')
    el.style.display = 'none'

  })

})

let error = false

sendBtn.addEventListener('click', () => {

  if (textarea.value !== "" && regex.test(inputEmail.value)) {

    emailInfo.expeditor = inputEmail.value
    emailInfo.post = textarea.value

    send('knitsell_noreply_gmail_com', 'contact', emailInfo)
      .then(res => {
        // affiche le message de réussite de l'envoie du message 
        slider[2].classList.add('slide-animation-down')

      })
      .catch(error => {
        // affiche le message d'erreur 
        slider[2].classList.add('slide-animation-down')
        slider[3].firstElementChild.textContent = 'L\'envoi de votre message a échoué'
        slider[3].firstElementChild.style.color = '#e74c3c'

        console.log(error)

      })
      slider[1].classList.add('slide-animation-down')

  } else if (!error) {

    let p = document.createElement('p')
    let sliderTwo = document.getElementById('slider-two')

    p.classList.add('data-error')
    p.textContent = 'Veuillez remplir correctement les champs ci-dessus.'

    sliderTwo.insertBefore(p, sliderTwo.lastElementChild)
    error = !error

  }

})
