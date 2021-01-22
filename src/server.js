const server = new SillyClient()

connectServer = () => {
  server.connect('wss://ecv-etic.upf.edu/node/9000/ws', [roomName])
}

server.on_ready = (my_id) => {
  console.log('redy to use', my_id)
}

server.on_message = (author_id, msg) => {
  const data = JSON.parse(msg)
  console.log('data', data)
  if (data[roomName]) {
    DB = data
    loadPreviousMessages(DB[roomName], true)
    addUsers(DB.users)
  } else if (data.type === 'username') {
    addUser(data.user)
  } else if (data.type === 'text')
    showMessage(data, author_id, 'friend-message', roomName)
  else if (data.type === 'private') {
    showMessage(data, author_id, 'friend-message', author_id)
  }
}

server.on_user_connected = (user_id) => {
  console.log('Somebody has connected to the room', user_id)
  const oldestClient = Object.keys(server.clients)[0]
  if (oldestClient === server.user_id) {
    // the log of messages will not contain the private messages
    const msgDB = {
      users: DB.users,
      [roomName]: DB[roomName],
    }
    server.sendMessage(JSON.stringify(msgDB), user_id)
  }
}

server.on_user_disconnected = (user_id) => {
  console.log('Somebody has disconnected from the room', user_id)
  deleteUser(user_id)
}

server.on_room_info = function (info) {
  DB[roomName] = []
  contactSelected = info.name
  const user = {
    id: server.user_id,
    username: username,
    active: true,
    avatar: avatar,
  }
  DB.users.push(user)
  addRoomName()
  addProfile(user)

  // send my user information to the other users
  const msg = { type: 'username', user: user }
  server.sendMessage(JSON.stringify(msg))
}
