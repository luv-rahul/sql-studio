import MonacoEditor from "../components/MonacoEditor";
import ProblemStatement from "./ProblemStatement";
import Navbar from "./Navbar";
import ProblemsList from "./ProblemsList";

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
