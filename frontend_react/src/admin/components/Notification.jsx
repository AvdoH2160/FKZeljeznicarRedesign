import "./notification.css";

export default function Notification({ notification, onClose }) {
  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      <span>{notification.message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
}