import "./index.scss";

const Message = ({ message, loading }) => {
  return (
    <>
      {(message || loading) && (
        <div className="message">
          <div>
            {loading && (
              <div className="message__loading">
                <ion-icon name="reload-outline"></ion-icon>
              </div>
            )}
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
