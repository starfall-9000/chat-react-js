import * as types from '../constants/ActionTypes'
import { addUser, messageReceived, populateUsersList } from '../actions'

// const WebSocket = require('ws')

const setupSocket = (dispatch, username) => {
  // const port = process.env.PORT || 8989
  // const socket = new WebSocket('ws://localhost:8989')
  const socket = new WebSocket('wss://still-beach-82653.herokuapp.com')

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: types.ADD_USER,
        name: username
      })
    )
  }
  socket.onmessage = event => {
    const data = JSON.parse(event.data)
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author))
        break
      case types.ADD_USER:
        dispatch(addUser(data.name))
        break
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users))
        break
      default:
        break
    }
  }

  return socket
}

export default setupSocket
