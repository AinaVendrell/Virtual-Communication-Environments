sendMessage = (input) => {
  if (input.value !== '') {
    {
      if (Array.isArray(recivers)) var type = 'text'
      else var type = 'private'
      const msg = { type: type, username: 'jd', text: input.value }
      server.sendMessage(JSON.stringify(msg), recivers)

      if (Array.isArray(recivers)) var where = server.room.name
      else var where = recivers

      showMessage(input.value, server.user_id, 'user-message', where)
      input.value = ''
    }
  }
}

showMessage = (text, author_id, className, where) => {
  if (text === '') return
  const time = new Date().toLocaleString('es-ES').substring(10, 15)
  const m = {
    author: author_id,
    msg: text,
    time: time,
  }

  if (!DB[where]) DB[where] = []
  DB[where].push(m)

  if (Array.isArray(recivers)) var a = server.room.name
  else var a = recivers

  if (a === where) {
    const templete = document.getElementById('templete')
    const msg = templete.querySelector('.message').cloneNode(true)
    msg.className = 'message ' + className
    if (author_id !== server.user_id)
      msg.querySelector('.name').innerText = author_id
    msg.querySelector('.msg').innerText = text
    msg.querySelector('.time').innerText = time

    const messagesContainer = document.querySelector('.chat-messages')
    messagesContainer.appendChild(msg)
    if (className === 'user-message') messagesContainer.scrollTop = 1000000
  }

  updateLastMessage(text, author_id, time, className, where)
}

// undates the last message info of the messages list on the left
updateLastMessage = (text, author_id, time, className, reciver) => {
  const container = document.getElementById(reciver) // TODO: canviar room per variable
  const lastMsg = container.querySelector('.last-message')
  if (className === 'user-message') lastMsg.innerText = 'You: ' + text
  else lastMsg.innerText = author_id + ': ' + text
  container.querySelector('.time').innerText = time
}

loadPreviousMessages = (messages) => {
  const messagesContainer = document.querySelector('.chat-messages')
  messagesContainer.innerHTML = ''
  var className = undefined
  messages.map((m) => {
    if (m.author === server.user_id) className = 'user-message'
    else className = 'friend-message'
    const templete = document.getElementById('templete')
    const msg = templete.querySelector('.message').cloneNode(true)
    msg.className = 'message ' + className
    if (m.author !== server.user_id)
      msg.querySelector('.name').innerText = m.author
    msg.querySelector('.msg').innerText = m.msg
    msg.querySelector('.time').innerText = m.time
    messagesContainer.appendChild(msg)
  })

  messagesContainer.scrollTop = 1000000
  if (messages.length > 0) {
    var l = messages.length - 1
    var lastMsg = messages[l]
    if (Array.isArray(recivers)) var a = server.room.name
    else var a = recivers
    updateLastMessage(lastMsg.msg, lastMsg.author, lastMsg.time, className, a)
  }
}

privateMessage = (text, author_id) => {
  const m = {
    author: author_id,
    msg: text,
    time: new Date().toLocaleString('es-ES').substring(10, 15),
  }

  if (!DB[author_id]) DB[author_id] = []
  DB[author_id].push(m)

  if (recivers === author_id) loadPreviousMessages(DB[author_id])
  else
    updateLastMessage(
      text,
      author_id,
      new Date().toLocaleString('es-ES').substring(10, 15),
      'friend-message',
      author_id
    )
}
