import { useState } from "react";
import Editor from "@monaco-editor/react";
import Result from "./Result";
import { MONACO_EDITOR_TABS } from "../utils/constants";

const MonacoEditor = () => {
  const [activeTab, setActiveTab] = useState("code");
  console.log(activeTab);
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
            defaultValue="-- Write your SQL query here"
          />
        )}

        {activeTab === "result" && <Result />}
      </div>
    </div>
  );
};

export default MonacoEditor;
