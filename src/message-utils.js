sendMessage = (input) => {
  if (input.value !== '') {
    {
      const msg = { username: username, content: input.value }
      if (contactSelected === roomName) {
        msg.type = 'text'
        server.sendMessage(JSON.stringify(msg), Object.keys(server.clients))
      } else {
        msg.type = 'private'
        server.sendMessage(JSON.stringify(msg), contactSelected)
      }
      showMessage(msg, server.user_id, 'user-message', contactSelected)
      input.value = ''
    }
  }
}

showMessage = (msg, author_id, className, conversation) => {
  msg.time = new Date().toLocaleString('es-ES').substring(10, 15)
  msg.author_id = author_id
  // if it's the first message of the private conversation we add an emprty array in the database with the reciver user_id as key
  if (!DB[conversation]) DB[conversation] = []
  DB[conversation].push(msg)

  // if the message that we are showing belongs to the conversation that we have selected we show it
  if (contactSelected === conversation) {
    var isRoom = contactSelected === roomName
    show(msg, className, isRoom)
    const messagesContainer = document.querySelector('.chat-messages')
    if (className === 'user-message') messagesContainer.scrollTop = 1000000
  }

  // in all cases we what to update the last message of the left menu
  updateLastMessage(msg, className, conversation)
}

loadPreviousMessages = (messages, isRoom) => {
  const messagesContainer = document.querySelector('.chat-messages')
  messagesContainer.innerHTML = ''
  var className = undefined
  messages.map((m) => {
    className =
      m.author_id === server.user_id ? 'user-message' : 'friend-message'
    show(m, className, isRoom)
  })
  messagesContainer.scrollTop = 1000000
  if (messages.length > 0) {
    var lastMsg = messages[messages.length - 1]
    updateLastMessage(lastMsg, className, contactSelected)
  }
}

show = (message, className, isRoom) => {
  const templete = document.getElementById('templete')
  const msg = templete.querySelector('.message').cloneNode(true)
  msg.className = 'message ' + className
  // just show the username when the messages is from a room and doesn't belong to the user
  if (message.author_id !== server.user_id && isRoom)
    msg.querySelector('.name').innerText = message.username
  msg.querySelector('.msg').innerText = message.content
  msg.querySelector('.time').innerText = message.time
  const messagesContainer = document.querySelector('.chat-messages')
  messagesContainer.appendChild(msg)
}

// undates the last message info of the messages list on the left
updateLastMessage = (msg, className, reciver) => {
  console.log('reciver', reciver)
  const container = document.getElementById(reciver)
  const lastMsg = container.querySelector('.last-message')
  if (className === 'user-message') lastMsg.innerText = 'You: ' + msg.content
  else if (reciver !== roomName) lastMsg.innerText = msg.content
  else lastMsg.innerText = msg.username + ': ' + msg.content

  container.querySelector('.time').innerText = msg.time
}
