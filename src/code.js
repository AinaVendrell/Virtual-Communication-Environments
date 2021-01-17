const textInput = document.querySelector('input')

textInput.addEventListener('keydown', (e) => {
  e.key === 'Enter' && sendMessage(textInput)
})

const b = document.querySelector('#send-button')
b.addEventListener('click', (e) => sendMessage(textInput))

const server = new SillyClient()
server.connect('wss://ecv-etic.upf.edu/node/9000/ws', 'PROOOVA')
//server.connect('wss://tamats.com:55000', 'PROOOVA')

server.on_ready = (my_id) => {
  console.log('redy to use', my_id)
}

server.on_message = (author_id, msg) => {
  //   console.log('msg', msg)
  //   console.log('author_id', author_id)
  const data = JSON.parse(msg)
  showMessage(data.text, author_id, 'friend-message')
}

server.on_user_connected = (user_id) => {
  console.log('Somebody has connected to the room', user_id)
  console.log(server.clients)
  addUser(user_id)
  //   server.loadData('mykey', function (data) {
  //     console.log(data)
  //   }) //should print mydata

  contacts = document.querySelectorAll('.contact')
  contacts.forEach((c) => {
    c.addEventListener('click', (e) => selectUser(contacts, c))
  })
}

server.on_user_disconnected = (user_id) => {
  console.log('Somebody has disconnected from the room', user_id)
  deleteUser(user_id)
}

server.on_room_info = function (info) {
  console.log('info', info)
  other_users = info.clients.filter((u) => {
    return u != server.user_id
  })
  addRoomName(info.name)
  addUsers(other_users)
  addProfile(server.user_id)

  contacts = document.querySelectorAll('.contact')
  contacts.forEach((c) => {
    c.addEventListener('click', (e) => selectUser(contacts, c))
  })
}
