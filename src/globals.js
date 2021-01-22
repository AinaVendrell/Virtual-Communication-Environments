var DB = { users: [] }
var contactSelected = []

var roomName = undefined
var username = undefined
var avatar = undefined

// var roomName = 'prova'
// var username = 'user1'
// var avatar = `src/assets/avatar/user_0.png`

const textInput = document.getElementById('input-message')

textInput.addEventListener('keydown', (e) => {
  e.key === 'Enter' && sendMessage(textInput)
})

const b = document.getElementById('send-button')
b.addEventListener('click', (e) => {
  sendMessage(textInput)
})
