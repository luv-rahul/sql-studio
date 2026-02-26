import MonacoEditor from "../components/MonacoEditor";
import ProblemStatement from "./ProblemStatement";
import Result from "./Result";

const Body = () => {
  return (
    <div className="body">
      <div className="problem-statement">
        <ProblemStatement />
      </div>
      <div className="editor-view">
        <MonacoEditor />
      </div>
    </div>
  );
};

export default Body;
