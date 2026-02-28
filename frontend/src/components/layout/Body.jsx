import MonacoEditor from "../editor/MonacoEditor";
import ProblemStatement from "../../features/problems/ProblemStatement";
import Navbar from "./Navbar";
import ProblemsList from "../../features/problems/ProblemsList";

const Body = () => {
  return (
    <>
      <Navbar />
      <ProblemsList />
      <div className="body">
        <div className="problem-statement">
          <ProblemStatement />
        </div>
        <div className="editor-view">
          <MonacoEditor />
        </div>
      </div>
    </>
  );
};

export default Body;
