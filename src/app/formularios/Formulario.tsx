import Dashboard from "../dashboard/Components/Dashboard";
import Loading from "../dashboard/Components/Loading";
import { useDashboard } from "../dashboard/hooks/useDashboard";
import "./assets/index.css";

const Formulario = () => {
  const {
    cardsInfo,
    dataTable,
    filteredData,
    handleSelectChange,
    loading,
    questions,
    selectedQuestion,
    selectedQuestionId,
  } = useDashboard({ surveyType: 2 }); // la 2 es para la encuesta de los datos encuestados

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
};

export default Formulario;
