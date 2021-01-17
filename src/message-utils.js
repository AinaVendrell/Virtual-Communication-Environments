sendMessage = (input) => {
  if (input.value !== '') {
    {
      const msg = { type: 'text', username: 'jd', text: input.value }
      server.sendMessage(JSON.stringify(msg), Object.keys(server.clients))
      showMessage(input.value, server.user_id, 'user-message')
      input.value = ''
    }
  }
}

showMessage = (text, author_id, className) => {
  if (text === '') return
  const time = new Date().toLocaleString('es-ES').substring(10, 15)
  //   const m = {
  //     author: author_id,
  //     msg: text,
  //     date: d,
  //   }

  //   console.log('messages', m)

  var str = `
  <div class="message ${className}">
    <div class="text">
      ${
        author_id !== server.user_id
          ? `<p class="name">${author_id}</p>`
          : `<p></p>`
      }
      ${text}
      <div class="time">${time}</div>
    </div>
  </div>
`
  const messagesContainer = document.querySelector('.chat-messages')
  messagesContainer.insertAdjacentHTML('beforeend', str)
  if (className === 'user-message') messagesContainer.scrollTop = 1000000
  updateLastMessage(text, author_id, time, className)
}

// undates the last message info of the messages list on the left
updateLastMessage = (text, author_id, time, className) => {
  const container = document.getElementById(server.room.name) // TODO: canviar room per variable
  const lastMsg = container.querySelector('.last-message')
  if (className === 'user-message') lastMsg.innerText = 'You: ' + text
  else lastMsg.innerText = author_id + ': ' + text
  container.querySelector('.time').innerText = time
}
