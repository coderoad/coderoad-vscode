import channel from './index'

const messageBusReceiver = () => {
	// update state based on response from editor
	const listener = 'message'
	window.addEventListener(listener, channel.receive)
	return () => {
		window.removeEventListener(listener, channel.receive)
	}
}

export default messageBusReceiver