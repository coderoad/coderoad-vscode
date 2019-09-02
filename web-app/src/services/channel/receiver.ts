import {receive} from './index'

const messageBusReceiver = () => {
	// update state based on response from editor
	const listener = 'message'
	window.addEventListener(listener, receive)
	return () => {
		window.removeEventListener(listener, receive)
	}
}

export default messageBusReceiver