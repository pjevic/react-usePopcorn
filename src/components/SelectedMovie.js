/** @format */

export default function SelectedMovie({ selectedID, onCloseMovie }) {
  return (
    <div className="details">
      <button onClick={onCloseMovie} className="btn-back">
        &larr;
      </button>
      {selectedID}
    </div>
  );
}
