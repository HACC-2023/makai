import PropTypes from "prop-types";

const DeleteSortedMaterialModal = ({ id, sortedMaterial }) => {
  async function deleteSortedMaterial() {
    try {
      const res = await fetch(`/api/mongo/sorted-material/id/${sortedMaterial._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Successfully deleted organization");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    deleteSortedMaterial();
    document.getElementById(id).close();
  }

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="pb-5 font-bold">DELETE ENTRY</h3>
        <form onSubmit={onSubmit}>
          <div className="w-full">
            Are you sure you want to delete &quot;{sortedMaterial.material}&quot;?
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => document.getElementById(id).close()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Delete
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default DeleteSortedMaterialModal;

DeleteSortedMaterialModal.propTypes = {
  id: PropTypes.string.isRequired,
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};
