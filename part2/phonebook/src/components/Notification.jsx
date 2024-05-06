const Notification = (props) => {

	const success = {
		color: 'green',
		background: 'lightgrey',
		font_size: 20,
		border_style: 'solid',
		border_radius: 5,
		padding: 10,
		margin_bottom: 10
	}
	
	const error = {
		color: 'red',
		background: 'lightgrey',
		font_size: 20,
		border_style: 'solid',
		border_radius: 5,
		padding: 10,
		margin_bottom: 10
	}
	
	let message = props.message
	if(message === null) return null
  if(message.includes("ERROR")) {
		return (
			<div style={error} className="error">
				{message}
			</div>
		);
	} else {
		return (
			<div style={success} className="error">
				{message}
			</div>
		);
	}
}

export default Notification;