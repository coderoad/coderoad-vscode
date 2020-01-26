// import { ClientEvents } from 'typings/events'
// import channel from './index'

// const createReceiveEvent = (action: ClientEvents) => ({
//   data: action,
// })

// mock vscode from client side development
// @ts-ignore
window.acquireVsCodeApi = () => ({
  //   postMessage(action: ClientEvents) {
  //     switch (action.type) {
  //       case 'CHOOSE_CONTINUE':
  //         return setTimeout(() => {
  //           const receiveAction: ClientEvents = {
  //             type: 'TUTORIAL_LOADED',
  //           }
  //           channel.receive(createReceiveEvent(receiveAction))
  //         }, 1000)
  //       case 'TEST_RUN':
  //         return setTimeout(() => {
  //           const receiveAction: ClientEvents = {
  //             type: 'TEST_PASS',
  //             payload: action.payload,
  //           }
  //           channel.receive(createReceiveEvent(receiveAction))
  //         }, 1000)
  //       default:
  //         console.warn(`${action.type} not found in post message mock`)
  //     }
  //   },
})
