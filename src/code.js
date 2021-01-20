const textInput = document.getElementById('input-message')

textInput.addEventListener('keydown', (e) => {
  e.key === 'Enter' && sendMessage(textInput)
})

const b = document.getElementById('send-button')
b.addEventListener('click', (e) => {
  sendMessage(textInput)
})

const server = new SillyClient()

connectServer = () => {
  server.connect('wss://ecv-etic.upf.edu/node/9000/ws', [roomName])
}

server.on_ready = (my_id) => {
  console.log('redy to use', my_id)
}

server.on_message = (author_id, msg) => {
  console.log('JSOON', msg)
  const data = JSON.parse(msg)

  // si m'esta arribant la info dels missatges anteriors
  if (data[server.room.name]) {
    console.log('DB rebut', data)
    DB = data
    loadPreviousMessages(DB[server.room.name], true) // ho guardo i carrego els missatges de la room
    addUsers(DB['users'])
    contacts = document.querySelectorAll('.contact')
    contacts.forEach((c) => {
      c.addEventListener('click', (e) => selectUser(contacts, c))
    })

    // si m'estan demanant la info dels missatge anterior envio la DB a l'autor
  } else if (data.type === 'request') {
    var DBB = {}
    DBB[server.room.name] = DB[server.room.name]
    DBB.users = DB.users
    console.log('DB enviat', DBB)
    server.sendMessage(JSON.stringify(DBB), author_id)
  } else if (data.type === 'username') {
    addUser(data.user)
    contacts = document.querySelectorAll('.contact')
    contacts.forEach((c) => {
      c.addEventListener('click', (e) => selectUser(contacts, c))
    })
  }

  // si el missagte es public
  if (data.type === 'text')
    showMessage(data.text, author_id, 'friend-message', server.room.name)
  // si el missagte és privat
  else if (data.type === 'private') {
    showMessage(data.text, author_id, 'friend-message', author_id)
  }
}

server.on_user_connected = (user_id) => {
  console.log('Somebody has connected to the room', user_id)
  console.log(server.clients)
}

server.on_user_disconnected = (user_id) => {
  console.log('Somebody has disconnected from the room', user_id)
  deleteUser(user_id)
}

server.on_room_info = function (info) {
  DB.users = []
  DB[server.room.name] = []

  const r = server.user_id % 24
  var u = {
    id: server.user_id,
    username: username,
    active: true,
    avatar: avatar,
  }

  DB.users.push(u)

  other_users = info.clients.filter((u) => {
    return u != server.user_id
  })
  addRoomName()

  addProfile(u)

  contactSelected = info.name

  const msg1 = { type: 'username', user: u }
  server.sendMessage(JSON.stringify(msg1))

  var oldestClient = Object.keys(server.clients)[0]
  // enviar request de missatges a l'usuari més antic en cas que no sigui jo
  if (oldestClient !== server.user_id) {
    const msg = { type: 'request', username: server.user_id }
    server.sendMessage(JSON.stringify(msg), oldestClient)
  }
}

var roomName = 'prova'
var username = 'user1'
var avatar = `src/assets/avatar/user_0.png`

connectServer()
