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
  const data = JSON.parse(msg)
  if (data[server.room.name]) {
    DB = data
    loadPreviousMessages(DB[server.room.name])
  } else if (data.type === 'request') {
    server.sendMessage(JSON.stringify(DB), author_id)
  }
  if (data.type === 'text')
    showMessage(data.text, author_id, 'friend-message', server.room.name)
  else if (data.type === 'private') {
    privateMessage(data.text, author_id)
  }
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
  DB.users = []
  DB[server.room.name] = []

  console.log('info', info)
  other_users = info.clients.filter((u) => {
    return u != server.user_id
  })
  addRoomName(info.name)
  addUsers(other_users)
  addProfile(server.user_id)
  recivers = Object.keys(server.clients)

  const msg = { type: 'request', username: server.user_id }

  var oldestClient = Object.keys(server.clients)[0]
  if (oldestClient !== server.user_id) {
    server.sendMessage(JSON.stringify(msg), oldestClient)
  }

  contacts = document.querySelectorAll('.contact')
  contacts.forEach((c) => {
    c.addEventListener('click', (e) => selectUser(contacts, c))
  })
}
