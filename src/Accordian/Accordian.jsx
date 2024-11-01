import { useState } from "react";
import data from "./data";

const Accordian = () => {
  const [selected, setSelected] = useState(null);
  const [isMultiSelectionEnable, setIsMultiSelectionEnable] = useState(false);
  const [multiSelection, setMultiSelection] = useState([]);

  const handleSingleSelection = (getCurrentId) => {
    console.log("Single Selection", getCurrentId);
    setSelected(selected === getCurrentId ? null : getCurrentId);
  };

  const handleMultiSelection = (getCurrentId) => {
    console.log("Multi Selection ", getCurrentId);
    const copyMultiSelection = [...multiSelection];
    const checkIdxOfCurrentId = copyMultiSelection.indexOf(getCurrentId);

    if (checkIdxOfCurrentId === -1) copyMultiSelection.push(getCurrentId);
    else copyMultiSelection.splice(checkIdxOfCurrentId, 1);
    setMultiSelection(copyMultiSelection);
  };

  return (
    <div className="accordion container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Accordion </h1>

      <button
        onClick={() => setIsMultiSelectionEnable(!isMultiSelectionEnable)}
        className={`px-4 py-2 mb-6 font-semibold rounded-lg shadow-md transition duration-300 ${
          isMultiSelectionEnable
            ? "bg-red-500 text-white"
            : "bg-blue-500 text-white"
        } hover:bg-opacity-90  block m-auto`}
      >
        {isMultiSelectionEnable ? "Single Selection" : "Multiple Selection"}
      </button>

      {/* Render accordion items */}
      {data.map((dataItem) => {
        const { answer, id, question } = dataItem;

        return (
          <div
            key={id}
            className="accordion-item mb-4 p-4 bg-white rounded-lg shadow-md"
          >
            <div
              onClick={
                isMultiSelectionEnable
                  ? () => handleMultiSelection(id)
                  : () => handleSingleSelection(id)
              }
              className="accordion-title flex justify-between items-center cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{question}</h2>
              <span className="text-2xl">
                {isMultiSelectionEnable
                  ? multiSelection.includes(id)
                    ? "-"
                    : "+"
                  : selected === id
                  ? "−"
                  : "+"}
              </span>
            </div>

            {isMultiSelectionEnable
              ? multiSelection.indexOf(id) !== -1 && (
                  <div className="accordion-content mt-3 text-gray-700">
                    {answer}
                  </div>
                )
              : selected === id && (
                  <div className="accordion-content mt-3 text-gray-700">
                    {answer}
                  </div>
                )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordian;
