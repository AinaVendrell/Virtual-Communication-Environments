// add room name to the messages list on the left  and  add room name to the header
addRoomName = () => {
  const room = document.querySelector('.contact')
  room.id = roomName
  room.addEventListener('click', (e) => selectUser(room))
  room.querySelector('.contact-name').innerText = roomName
  document
    .getElementById('chat-header')
    .querySelector('h1').innerText = roomName
}

// after reciving the room info adds all the user contacts to the messages list on the left
addUsers = (users) => {
  users.map((u) => {
    if (u.id !== server.user_id && u.active) addUser(u)
  })
}

addUser = (user) => {
  DB.users.push(user)
  const templete = document.getElementById('templete')
  const contact = templete.querySelector('.contact').cloneNode(true)
  contact.addEventListener('click', (e) => selectUser(contact))
  contact.id = user.id
  contact.querySelector('.contact-name').innerText = user.username
  contact.querySelector('.avatar').src = user.avatar
  const contactsList = document.querySelector('#contacts-list')
  // to keep the disconnected users on the bottom the new users will be added at the top of the list
  const firstChild = contactsList.firstChild
  if (firstChild) contactsList.insertBefore(contact, firstChild)
  else contactsList.appendChild(contact)
  contactsList.scrollTop = 1000000
}

// adds the profile of the user
addProfile = (user) => {
  const profile = document.querySelector('#my-profile')
  profile.querySelector('.avatar').src = user.avatar
  profile.querySelector('p').innerText = user.username
}

/*
 * when a user leaves the chat its contact will be disabled but the users that were in the chat with him
 * will still be able to see its contact but with less opacity and they will not be able to chat with him
 */
deleteUser = (id) => {
  const container = document.querySelector('#contacts-list')
  const contact = document.getElementById(id)
  if (contact) {
    contact.style = 'pointer-events:none; opacity: 0.3'
    container.removeChild(contact)
    container.appendChild(contact)
  }
  DB.users.find((u) => u.id === id).active = false
}

selectUser = (selectedContact) => {
  const id = selectedContact.id
  contactSelected = id
  selectedContact.className = 'contact selected'

  // unselect the other contacts
  document.querySelectorAll('.contact').forEach((el) => {
    if (el !== selectedContact) el.className = 'contact'
  })

  // update header with the info of the selected contact
  if (id === roomName) {
    var newName = roomName
    var image = 'src/assets/room_white.svg'
  } else {
    var newName = DB.users.find((u) => u.id === id).username
    var image = DB.users.find((u) => u.id === id).avatar
  }
  document.querySelector('#chat-header').querySelector('h1').innerText = newName
  document.querySelector('#chat-header').querySelector('img').src = image

  // load messages with the selected contact
  var isRoom = id === roomName
  loadPreviousMessages(DB[contactSelected] || [], isRoom)
}
