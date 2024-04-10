import "./card.css";

const Card = ({
  name,
  description,
  editTask,
  id,
  removeTask,
  handleState,
  state,
}) => {
  return (
    <>
      <div className="card">
        <div className="card-header h4">{name}</div>
        <div className="card-body">
          <p className="card-text">{description}</p>
          <div className="status">
            <label>Status</label>
            <select
              className="form-select form-select-sm filter-dropDown"
              value={state}
              aria-label="Small select example"
              onChange={() => {
                handleState(id);
              }}
            >
              <option value={false}>Not Completed</option>
              <option value={true}>Completed</option>
            </select>
          </div>
        </div>
        <div className="col button">
          <button
            className="btn btn-primary"
            onClick={() => {
              editTask(id);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              removeTask(id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
