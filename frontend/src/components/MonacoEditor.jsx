import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Result from "./Result";
import { MONACO_EDITOR_TABS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setQueryValue } from "../slice/appSlice";

const MonacoEditor = () => {
  const [activeTab, setActiveTab] = useState("code");
  const dispatch = useDispatch();
  const { queryValue, queryResult } = useSelector((store) => store.app);

  const handleEditorChange = (value) => {
    dispatch(setQueryValue(value));
  };

  useEffect(() => {
    if (queryResult) {
      const timer = setTimeout(() => setActiveTab("result"), 0);
      return () => clearTimeout(timer);
    }
  }, [queryResult]);

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="tabs-container">
          {MONACO_EDITOR_TABS.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span
                className={`material-symbols-outlined ${activeTab === tab.id ? "code-icon" : "result-icon"}`}
              >
                {tab.icon}
              </span>
              {tab.name}
            </div>
          ))}
        </div>
        <div className="ai-btn">
          <span className="ai-help-text">Hint:</span>
          <span className="material-symbols-outlined ai-help-btn">
            wand_stars
          </span>
        </div>
      </div>

      <div className="editor-body">
        {activeTab === "code" && (
          <Editor
            width="50vw"
            theme="vs-dark"
            defaultLanguage="sql"
            defaultValue={queryValue}
            onChange={handleEditorChange}
          />
        )}

        {(activeTab === "result" || queryResult) && (
          <Result
            data={queryResult}
          />
        )}
      </div>
    </div>
  );
};

export default MonacoEditor;
