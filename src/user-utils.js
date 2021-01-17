addRoomName = (roomName) => {
  // add room name to the messages list on the left
  const room = document.querySelector('.contact')
  room.id = roomName
  room.querySelector('.contact-name').innerText = roomName

  // add room name to the header
  var name = document.createElement('h1')
  name.innerText = roomName
  document.querySelector('#chat-header').appendChild(name)
}

// function after reciving the room info that adds all the user contacts to the messages list on the left
addUsers = (users) => {
  users.map((u) => {
    addUser(u)
  })
}

addUser = (id) => {
  const r = id % 24
  var str = `<div class='contact' id=${id}>
      <img class='avatar' src='assets/avatar/user_${r}.png' />
      <div class='sumary-message'>
        <h1 class='contact-name'>${id}</h1>
        <p class='last-message'></p>
      </div>
      <p class='time'></p>
    </div>`

  const contactsList = document.querySelector('#contacts-list')
  contactsList.insertAdjacentHTML('beforeend', str)
  contactsList.scrollTop = 1000000
}

// adds the profile of the new users
addProfile = (id) => {
  const r = id % 24
  var str = `
    <img class='avatar' src='assets/avatar/user_${r}.png' />
    <p>${id}</p>
`

  const profile = document.querySelector('#my-profile')
  profile.insertAdjacentHTML('beforeend', str)
}

// deletes the profile of the users that leave the room
deleteUser = (id) => {
  const container = document.querySelector('#contacts-list')
  const contact = document.getElementById(id)
  contact && container.removeChild(contact)
}

selectUser = (contacts, selectedContact) => {
  var id = selectedContact.id
  selectedContact.className = 'contact selected'

  // unselect the other contacts
  contacts.forEach((el) => {
    if (el !== selectedContact) el.className = 'contact'
  })

  const r = id % 24
  if (id == server.room.name) var image = 'assets/group_white.svg'
  else var image = `assets/avatar/user_${r}.png`

  // update header with the info of the selected contact
  const headerInfo = document.querySelector('#chat-header')
  const currentName = headerInfo.querySelector('h1')
  var newName = document.createElement('h1')
  newName.innerText = id
  headerInfo.replaceChild(newName, currentName)

  const currentImage = headerInfo.querySelector('img')
  var newImage = document.createElement('img')
  newImage.className = 'avatar'
  newImage.src = image
  headerInfo.replaceChild(newImage, currentImage)
}
