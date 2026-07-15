export default function DeleteDialog({
  assetToDelete,
  setAssetToDelete,
  confirmDelete,
}) {

  if (!assetToDelete) return null;

  return (

    <div className="delete-overlay">

      <div className="delete-dialog">

        <h3>Delete Asset?</h3>

        <p>
          <strong>{assetToDelete.id}</strong>
        </p>

        <p>{assetToDelete.description}</p>

        <p className="delete-warning">
          This action cannot be undone.
        </p>

        <div className="delete-actions">

          <button
            className="cancel-button"
            onClick={() => setAssetToDelete(null)}
          >
            Cancel
          </button>

          <button
            className="confirm-delete-button"
            onClick={confirmDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}