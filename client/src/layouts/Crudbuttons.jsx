import '../styles/Crudbutton.css'

function Crudbuttons() {

  return (
    <div className="crudbuttonlist">

      <button
        className="form-btn"
        type="submit"
        name="action"
        value="show"
      >
        Show
      </button>

      <button
        className="form-btn btn-clear"
        type="submit"
        name="action"
        value="clear"
      >
        Clear
      </button>

      <button
        className="form-btn btn-add"
        type="submit"
        name="action"
        value="add"
      >
        Add
      </button>

      <button
        className="form-btn btn-update"
        type="submit"
        name="action"
        value="update"
      >
        Update
      </button>

      <button
        className="form-btn btn-delete"
        type="submit"
        name="action"
        value="delete"
      >
        Delete
      </button>

    </div>
  )
}

export default Crudbuttons
