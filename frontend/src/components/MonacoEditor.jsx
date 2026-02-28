import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Result from "./Result";
import { BASE_URL, MONACO_EDITOR_TABS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setQueryValue } from "../slice/appSlice";
import Modal from "./Modal";

const MonacoEditor = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const dispatch = useDispatch();
  const { queryValue, queryResult, selectedAssignment } = useSelector(
    (store) => store.app,
  );

  const handleEditorChange = (value) => {
    dispatch(setQueryValue(value));
  };

  const question = selectedAssignment ?? "";

  const handleHintSearch = async () => {
    try {
      setModalData("");
      setShowModal(true);
      const response = await fetch(`${BASE_URL}/query/query-hints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          queryValue,
        }),
        credentials: "include",
      });
      if (response.status === 500) {
        setShowModal(false);
        alert("You have exceeded your request limit. Please try again later.");
        return;
      }
      const data = await response.json();
      setModalData(data);
    } catch (error) {
      console.error(error);
    }
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
                className={`material-symbols-outlined ${
                  activeTab === tab.id ? "code-icon" : "result-icon"
                }`}
              >
                {tab.icon}
              </span>
              {tab.name}
            </div>
          ))}
        </div>
        <div onClick={handleHintSearch} className="ai-btn">
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
          <Result data={queryResult} />
        )}
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        data={modalData}
      />
    </div>
  );
};

export default MonacoEditor;
