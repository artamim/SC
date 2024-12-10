import '../styles/Crudbutton.css'

function Crudbuttons() {

  return (
    <div className="crudbuttonlist">

      <button
        className="form-btn"
        type="button"
        onClick={() => handleAction("handleShow")}
      >
        Show
      </button>
      <button
        className="form-btn btn-clear"
        type="button"
        onClick={() => handleAction("handleClear")}
      >
        Clear
      </button>
      <button
        className="form-btn btn-add"
        type="button"
        onClick={() => handleAction("handleAdd")}
      >
        Add
      </button>
      <button
        className="form-btn btn-update"
        type="button"
        onClick={() => handleAction("handleUpdate")}
      >
        Update
      </button>
      <button
        className="form-btn btn-delete"
        type="button"
        onClick={() => handleAction("handleDelete")}
      >
        Delete
      </button>

    </div>
  )
}

export default Crudbuttons
