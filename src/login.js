new MeteorEmoji()

const loginButton = document.getElementById('login-button')
loginButton.addEventListener('click', (e) => logIn())

var avatarList = ''
for (var i = 0; i <= 23; i++) {
  avatarList =
    avatarList +
    `<a class="avatar-choice">
        <img src="src/assets/avatar/user_${i}.png" style="height: 50px;width: 50px;" />
      </a>`
}
document.querySelector('.dropdown-content').innerHTML = avatarList

var avatarChoice = document.querySelectorAll('.avatar-choice')
avatarChoice.forEach((a) => {
  a.addEventListener('click', (e) => {
    selectAvatar(a)
  })
})

logIn = () => {
  const login = document.getElementById('login')
  const usernameInput = document.getElementById('username')
  const roomnameInput = document.getElementById('roomname')
  if (usernameInput.value === '' || roomnameInput.value === '' || !avatar) {
    if (usernameInput.value === '')
      login.querySelector('.error-name').innerText =
        'The username field is required'
    else login.querySelector('.error-name').innerText = ''
    if (roomnameInput.value === '')
      login.querySelector('.error-room').innerText =
        'The room field is required'
    else login.querySelector('.error-room').innerText = ''
    if (!avatar)
      login.querySelector('.error-avatar').innerText = 'Please select an avatar'
    else login.querySelector('.error-avatar').innerText = ''
  } else {
    const app = document.getElementById('app')
    login.style.display = 'none'
    app.style = 'display: true'
    username = usernameInput.value
    roomName = roomnameInput.value
    connectServer()
  }
}

selectAvatar = (a) => {
  avatar = a.querySelector('img').src
  var img = document.querySelector('.dropbtn').querySelector('img')
  img.src = avatar
}
