var DB = {}
var contactSelected = []

addRoomName = () => {
  // add room name to the messages list on the left
  const room = document.querySelector('.contact')
  room.id = roomName
  room.querySelector('.contact-name').innerText = roomName

  // add room name to the header
  var name = document.createElement('h1')
  name.innerText = roomName
  document.querySelector('#chat-header').appendChild(name)
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
  contact.id = user.id
  contact.querySelector('.contact-name').innerText = user.username
  contact.querySelector('.avatar').src = user.avatar
  const contactsList = document.querySelector('#contacts-list')
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

// deletes the profile of the users that leave the room
deleteUser = (id) => {
  const container = document.querySelector('#contacts-list')
  const contact = document.getElementById(id)
  contact.style = 'pointer-events:none; opacity: 0.3'
  contact && container.removeChild(contact)
  contact && container.appendChild(contact)

  DB.users.find((u) => u.id === id).active = false
}

//
selectUser = (contacts, selectedContact) => {
  var id = selectedContact.id
  selectedContact.className = 'contact selected'

  // unselect the other contacts
  contacts.forEach((el) => {
    if (el !== selectedContact) el.className = 'contact'
  })

  if (id === server.room.name) var image = 'src/assets/group_white.svg'
  else var image = DB.users.find((u) => u.id === id).avatar

  // update header with the info of the selected contact
  const headerInfo = document.querySelector('#chat-header')
  const currentName = headerInfo.querySelector('h1')
  var newName = document.createElement('h1')
  if (id === server.room.name) newName.innerText = server.room.name
  else newName.innerText = DB.users.find((u) => u.id === id).username
  headerInfo.replaceChild(newName, currentName)

  const currentImage = headerInfo.querySelector('img')
  var newImage = document.createElement('img')
  newImage.className = 'avatar'
  newImage.src = image
  headerInfo.replaceChild(newImage, currentImage)

  contactSelected = id
  var isRoom = id === server.room.name
  loadPreviousMessages(DB[contactSelected] || [], isRoom)
}
