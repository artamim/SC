import '../styles/Crudbutton.css';

function Crudbuttons({ handleShow, handleClear, handleAdd, handleUpdate, handleDelete }) {
  return (
    <div className="crudbuttonlist">
      <button
        className="form-btn"
        type="button"
        onClick={handleShow}
      >
        Show
      </button>
      <button
        className="form-btn btn-clear"
        type="button"
        onClick={handleClear}
      >
        Clear
      </button>
      <button
        className="form-btn btn-add"
        type="button"
        onClick={handleAdd}
      >
        Add
      </button>
      <button
        className="form-btn btn-update"
        type="button"
        onClick={handleUpdate}
      >
        Update
      </button>
      <button
        className="form-btn btn-delete"
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default Crudbuttons;
