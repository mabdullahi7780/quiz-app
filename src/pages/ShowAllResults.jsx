import { useState, useEffect } from "react";
import { getAllData } from "../data/storage";
import { useNavigate } from "react-router-dom";
import { ResultsPopup } from "../components/Results/ResultsPopup";
import { setQuiz } from "../data/questions";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect } from "primereact/multiselect";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./ShowAllResults.css";

function ShowAllResults() {
  const navigate = useNavigate();
  const data = getAllData();

  // States for row and filters:
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);

  // Filter options
  const [quizOptions, setQuizOptions] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);

  // Selected filters
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  // Applied filters (actual filtering)
  const [appliedFilters, setAppliedFilters] = useState({
    quiz: { value: null, matchMode: FilterMatchMode.IN },
    date: { value: null, matchMode: FilterMatchMode.IN },
  });

  console.log("All data is: ", data);

  // Extract unique values for filter options
  useEffect(() => {
    if (data && data.length > 0) {

      const uniqueQuizzes = [...new Set(data.map((d) => d.quiz))];
      setQuizOptions(
        uniqueQuizzes.map((quiz) => ({ label: quiz, value: quiz }))
      );

      const uniqueDates = [...new Set(data.map((d) => d.date))];
      setDateOptions(uniqueDates.map((date) => ({ label: date, value: date })));
    }
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="no-results-container">
        <h1>No Quiz Attempts Yet</h1>
        <p>Take a quiz to see your results here!</p>
        <button onClick={() => navigate("/")}>Take Quiz</button>
      </div>
    );
  }

  const tableData = data.map((row, i) => ({
    ...row,
    id: `${row.name}-${row.date}-${i}`,
  }));

  const handleViewDetails = (result) => {
    if (result.quiz) {
      setQuiz(result.quiz);
      console.log("Set quiz to:", result.quiz);
    }

    setSelectedResult(result);
  };

  const applyFilters = () => {
    const newFilters = {
      quiz: {
        value: selectedQuizzes.length > 0 ? selectedQuizzes : null,
        matchMode: FilterMatchMode.IN,
      },
      date: {
        value: selectedDates.length > 0 ? selectedDates : null,
        matchMode: FilterMatchMode.IN,
      },
    };

    setAppliedFilters(newFilters);
    setShowFilterDialog(false);
  };

  const clearAllFilters = () => {
    setSelectedQuizzes([]);
    setSelectedDates([]);
    setAppliedFilters({
      quiz: { value: null, matchMode: FilterMatchMode.IN },
      date: { value: null, matchMode: FilterMatchMode.IN },
    });
    setShowFilterDialog(false);
  };

  const hasActiveFilters =
    selectedQuizzes.length > 0 ||
    selectedDates.length > 0;

  const header = (
    <div className="table-header">
      <h2>Quiz Results</h2>
      <div className="filter-actions">
        <Button
          label="Filter"
          icon="pi pi-filter"
          onClick={() => setShowFilterDialog(true)}
          className="filter-button"
        />
        {hasActiveFilters && (
          <Button
            label="Clear Filters"
            icon="pi pi-filter-slash"
            onClick={clearAllFilters}
            className="clear-filter-button"
            severity="secondary"
          />
        )}
      </div>
    </div>
  );

  const filterDialogFooter = (
    <div>
      <Button
        label="Clear All"
        icon="pi pi-times"
        onClick={clearAllFilters}
        className="p-button-text"
      />
      <Button
        label="Apply Filters"
        icon="pi pi-check"
        onClick={applyFilters}
        autoFocus
      />
    </div>
  );

  return (
    <>
      <div className="all-results-wrapper">
        <div className="all-results-container">
          <h1>All Quiz Attempts</h1>

          {/* Data Table */}
          <DataTable
            value={tableData}
            dataKey="id"
            header={header}
            filters={appliedFilters}
            selectionMode="single"
            selection={selectedRow}
            onSelectionChange={(e) => {
              setSelectedRow(e.value);
              handleViewDetails(e.value);
            }}
          >
            <Column field="name" header="Name" sortable />
            <Column field="quiz" header="Quiz Name" sortable />
            <Column
              field="score"
              header="Score"
              sortable
              body={(rowData) =>
                `${rowData.score} / ${rowData.user_answers?.length || 0}`
              }
            />
            <Column field="date" header="Date" sortable />
          </DataTable>
        </div>  
      </div>

      {/* Filter Dialog */}
      <Dialog
        header="Filter Results"
        visible={showFilterDialog}
        style={{ width: "500px" }}
        onHide={() => setShowFilterDialog(false)}
        footer={filterDialogFooter}
        className="filter-dialog"
      >

        <div className="filter-section">
          <label htmlFor="quiz-filter">Filter by Quiz:</label>
          <MultiSelect
            id="quiz-filter"
            value={selectedQuizzes}
            options={quizOptions}
            onChange={(e) => setSelectedQuizzes(e.value)}
            placeholder="Select quizzes"
            display="chip"
            className="filter-multiselect"
          />
        </div>

        <div className="filter-section">
          <label htmlFor="date-filter">Filter by Date:</label>
          <MultiSelect
            id="date-filter"
            value={selectedDates}
            options={dateOptions}
            onChange={(e) => setSelectedDates(e.value)}
            placeholder="Select dates"
            display="chip"
            className="filter-multiselect"
          />
        </div>

        {hasActiveFilters && (
          <div className="active-filters-summary">
            <strong>Active Filters:</strong>
            <ul>
              {selectedQuizzes.length > 0 && (
                <li>Quizzes: {selectedQuizzes.join(", ")}</li>
              )}
              {selectedDates.length > 0 && (
                <li>Dates: {selectedDates.join(", ")}</li>
              )}
            </ul>
          </div>
        )}
      </Dialog>

      {/* Results Popup */}
      {selectedResult && (
        <ResultsPopup
          answers={selectedResult.user_answers}
          onClose={() => {
            setSelectedResult(null);
            setSelectedRow(null);
          }}
          quizName={selectedResult.quiz}
        />
      )}
    </>
  );
}

export default ShowAllResults;