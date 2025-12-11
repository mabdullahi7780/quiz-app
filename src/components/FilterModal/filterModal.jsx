import "./filterModal.css";
import { getAllData } from "../../data/storage";

function FilterModal({ onClose, onApplyFilters }) {
  const data = getAllData();

  const getAllNames = () => {
    let names = new Set();
    data.forEach((entry) => {
      names.add(entry.name);
    });
    return names;
  };

  const getAllQuizNames = () => {
    let quizNames = new Set();
    data.forEach((entry) => {
      quizNames.add(entry.quiz);
    });
    return quizNames;
  };

  const finalNames = Array.from(getAllNames());
  const finalQuizNames = Array.from(getAllQuizNames());

  const handleApply = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const filters = {
      quiz: formData.get("quizzes"),
      name: formData.get("names"),
    };
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Filter Results</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleApply}>
          <div className="modal-body">
            <div className="filter-group">
              <label htmlFor="quiz">Quiz:</label>
              <select name="quizzes" id="quiz">
                <option value="">All Quizzes</option>
                {finalQuizNames.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="names">Name:</label>
              <select name="names" id="names">
                <option value="">All Names</option>
                {finalNames.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="apply-button">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterModal;