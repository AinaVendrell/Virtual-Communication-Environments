var roomName = undefined
var username = undefined

const loginButton = document.getElementById('login-button')
loginButton.addEventListener('click', (e) => logIn())

logIn = () => {
  const usernameInput = document.getElementById('username')
  const roomnameInput = document.getElementById('roomname')
  if (usernameInput.value === '') return
  if (roomnameInput.value === '') return
  const login = document.getElementById('login')
  login.style = 'display: none'
  const app = document.getElementById('app')
  app.style = 'display: true'
  username = usernameInput.value
  roomName = roomnameInput.value
  connectServer()
}
