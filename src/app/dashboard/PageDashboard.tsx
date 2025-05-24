import Dashboard from "./Components/Dashboard";
import Loading from "./Components/Loading";
import { useDashboard } from "./hooks/useDashboard";

function PageDashboard() {
  const {
    cardsInfo,
    dataTable,
    filteredData,
    handleSelectChange,
    loading,
    questions,
    selectedQuestion,
    selectedQuestionId,
  } = useDashboard({ surveyType: 1 }); // la 1 es para la encuesta de los datos quemados

  return loading ? (
    <Loading />
  ) : (
    <>
      {/* {filteredData?.length === 2 ? ( */}
      <Dashboard
        data={filteredData}
        answers={questions}
        cardsInfo={cardsInfo}
        dataTable={dataTable}
        selectedQuestion={selectedQuestion}
        handleSelectChange={handleSelectChange}
        selectedQuestionId={selectedQuestionId}
      />
      {/* ) : null} */}
    </>
  );
}

export default PageDashboard;
