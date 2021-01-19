sendMessage = (input) => {
  if (input.value !== '') {
    {
      if (contactSelected === server.room.name) var type = 'text'
      else var type = 'private'
      const msg = { type: type, username: 'jd', text: input.value }

      if (contactSelected === server.room.name)
        server.sendMessage(JSON.stringify(msg), Object.keys(server.clients))
      else server.sendMessage(JSON.stringify(msg), contactSelected)

      showMessage(input.value, server.user_id, 'user-message', contactSelected)
      input.value = ''
    }
  }
}

showMessage = (text, author_id, className, conversation) => {
  if (text === '') return
  const time = new Date().toLocaleString('es-ES').substring(10, 15)
  const m = {
    author: author_id,
    msg: text,
    time: time,
  }
  // if it's the first message of the conversation we add an emprty array in the database with key of the reciver
  if (!DB[conversation]) DB[conversation] = []
  DB[conversation].push(m)

  // if the message that we are showing belongs to the conversation that we have selected we show it
  if (contactSelected === conversation) {
    var isRoom = contactSelected === server.room.name
    show(author_id, text, time, className, isRoom)
    const messagesContainer = document.querySelector('.chat-messages')
    if (className === 'user-message') messagesContainer.scrollTop = 1000000
  }

  // in all cases we what to update the last message of the left menu
  updateLastMessage(text, author_id, time, className, conversation)
}

loadPreviousMessages = (messages, isRoom) => {
  const messagesContainer = document.querySelector('.chat-messages')
  messagesContainer.innerHTML = ''
  var className = undefined
  messages.map((m) => {
    if (m.author === server.user_id) className = 'user-message'
    else className = 'friend-message'
    show(m.author, m.msg, m.time, className, isRoom)
  })

  messagesContainer.scrollTop = 1000000
  if (messages.length > 0) {
    var l = messages.length - 1
    var lastMsg = messages[l]
    updateLastMessage(
      lastMsg.msg,
      lastMsg.author,
      lastMsg.time,
      className,
      contactSelected
    )
  }
}

show = (author_id, text, time, className, isRoom) => {
  const templete = document.getElementById('templete')
  const msg = templete.querySelector('.message').cloneNode(true)
  msg.className = 'message ' + className
  if (author_id !== server.user_id && isRoom) {
    var friendUsername = DB.users.find((u) => u.id === author_id).username
    msg.querySelector('.name').innerText = friendUsername
  }
  msg.querySelector('.msg').innerText = text
  msg.querySelector('.time').innerText = time
  const messagesContainer = document.querySelector('.chat-messages')
  messagesContainer.appendChild(msg)
}

// undates the last message info of the messages list on the left
updateLastMessage = (text, author_id, time, className, reciver) => {
  const container = document.getElementById(reciver)
  const lastMsg = container.querySelector('.last-message')
  if (className === 'user-message') lastMsg.innerText = 'You: ' + text
  else if (reciver !== server.room.name) lastMsg.innerText = text
  else {
    var friendUsername = DB.users.find((u) => u.id === author_id).username
    lastMsg.innerText = friendUsername + ': ' + text
  }
  container.querySelector('.time').innerText = time
}
