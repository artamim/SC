import '../styles/Crudbutton.css';

function Crudbuttons({ handleShow, handleClear, handleAdd, handleUpdate, handleDelete, isDisabled }) {
  return (
    <div className="crudbuttonlist">
      <button
        className="form-btn"
        type="button"
        onClick={handleShow}
        disabled={isDisabled}
      >
        Show
      </button>
      <button
        className="form-btn btn-clear"
        type="button"
        onClick={handleClear}
        disabled={isDisabled}
      >
        Clear
      </button>
      <button
        className="form-btn btn-add"
        type="button"
        onClick={handleAdd}
        disabled={isDisabled}
      >
        Add
      </button>
      <button
        className="form-btn btn-update"
        type="button"
        onClick={handleUpdate}
        disabled={isDisabled}
      >
        Update
      </button>
      <button
        className="form-btn btn-delete"
        type="button"
        onClick={handleDelete}
        disabled={isDisabled}
      >
        Delete
      </button>
    </div>
  );
}

export default Crudbuttons;
