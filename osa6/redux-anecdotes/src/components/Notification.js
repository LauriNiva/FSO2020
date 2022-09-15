import { useSelector, connect } from 'react-redux';

const Notification = (props) => {
  // const notification = useSelector(state => state.notifications.message);
  const notification = props.notification;
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: notification === '' ? 'hidden' : 'visible'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notifications.message 
  }
}

// export default Notification
export default connect(mapStateToProps)(Notification)