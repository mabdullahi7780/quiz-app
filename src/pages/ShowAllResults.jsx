import { useState } from "react";
import { getAllData } from "../data/storage";
import { useNavigate } from "react-router-dom";
import { ResultsPopup } from "../components/Results/ResultsPopup";
import { setQuiz } from "../data/questions";
import "primeicons/primeicons.css";
import "./ShowAllResults.css";
import { columns } from "../data/table_data";

function ShowAllResults() {
  const navigate = useNavigate();
  const data = getAllData();

  if (!data || data.length === 0) {
    return (
      <div className="no-results-container">
        <h1>No Quiz Attempts Yet</h1>
        <p>Take a quiz to see your results here!</p>
        <button onClick={() => navigate("/")}>Take Quiz</button>
      </div>
    );
  }

  const [rows, setRows] = useState(data);
  const [sorting, setSorting] = useState({ column: "Name", order: "asc" });

  const sortTable = (newSorting) => {
    setSorting(newSorting);

    const sortedData = [...data].sort((a, b) => {
      const columnKey = newSorting.column.toLowerCase();

      const aValue = a[columnKey];
      const bValue = b[columnKey];
      console.log("aValue is: ", aValue);
      console.log("bValue is: ", bValue);
      if (aValue < bValue) {
        return newSorting.order === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return newSorting.order === "asc" ? 1 : -1;
      }
      return 0;
    });

    setRows(sortedData);
  };

  const handleViewDetails = (result) => {
    if (result.quiz) {
      setQuiz(result.quiz);
      console.log("Set quiz to:", result.quiz);
    }

    setSelectedResult(result);
  };

  const HeaderCell = ({ column, sorting, sortTable }) => {
    const isDescSorted = sorting.column === column && sorting.order === "desc";
    const isAscSorted = sorting.column === column && sorting.order === "asc";
    const futureSortingOrder = isDescSorted ? "asc" : "desc";

    return (
      <th
        onClick={() => sortTable({ column, order: futureSortingOrder })}
        className="sortable-header"
      >
        <div className="header-content">
          <span>{column}</span>
          {isDescSorted && <span className="sort-arrow">▼</span>}
          {isAscSorted && <span className="sort-arrow">▲</span>}
        </div>
      </th>
    );
  };

  const Header = ({ columns, sorting, sortTable }) => {
    return (
      <thead>
        <tr>
          {columns.map((c, i) => (
            <HeaderCell
              key={i}
              column={c}
              sorting={sorting}
              sortTable={sortTable}
            />
          ))}
        </tr>
      </thead>
    );
  };

  const Content = ({ entries }) => {
    return (
      <tbody>
        {entries.map((d, i) => (
          <tr key={`${d.name}-${d.date}-${i}`}>
            <td>{d.name}</td>
            <td>{d.quiz}</td>
            <td>{d.score}</td>
            <td>{d.date}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="all-results-container">
      <div className="all-results-header">
        <h1>All Quiz Results</h1>
        <p>View your complete quiz history</p>
      </div>
      <div className="results-table-wrapper">
        <table>
          <Header columns={columns} sorting={sorting} sortTable={sortTable} />
          <Content entries={rows} />
        </table>
      </div>
    </div>
  );
}

{
  /* Results Popup
      {selectedResult && (
        <ResultsPopup
          answers={selectedResult.user_answers}
          onClose={() => {
            setSelectedResult(null);
            setSelectedRow(null);
          }}
          quizName={selectedResult.quiz}
        />
      )} */
}

export default ShowAllResults;
