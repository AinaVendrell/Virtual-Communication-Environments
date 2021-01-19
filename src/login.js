var roomName = undefined
var username = undefined
var avatar = undefined

const loginButton = document.getElementById('login-button')
loginButton.addEventListener('click', (e) => logIn())

logIn = () => {
  const usernameInput = document.getElementById('username')
  const roomnameInput = document.getElementById('roomname')
  if (usernameInput.value === '') return
  if (roomnameInput.value === '') return
  if (!avatar) return
  const login = document.getElementById('login')
  login.style = 'display: none'
  const app = document.getElementById('app')
  app.style = 'display: true'
  username = usernameInput.value
  roomName = roomnameInput.value
  connectServer()
}

var avatarList = ''
for (var i = 0; i <= 23; i++) {
  avatarList =
    avatarList +
    `<a class="avatar-choisse">
        <img src="src/assets/avatar/user_${i}.png" />
            </a>`
}
document.querySelector('.dropdown-content').innerHTML = avatarList

var avatarChoisse = document.querySelectorAll('.avatar-choisse')
avatarChoisse.forEach((a) => {
  a.addEventListener('click', (e) => {
    selectAvatar(a)
  })
})

selectAvatar = (a) => {
  console.log('aaa', a)
  avatar = a.querySelector('img').src
  console.log('avaaatar', avatar)
  var img = document.querySelector('.dropbtn').querySelector('img')
  img.src = avatar
}
