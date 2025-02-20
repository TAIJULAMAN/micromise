import { Select } from "antd";
import { useEffect, useState } from "react";

export default function SelectAndSubmit({
  options,
  Id,
  OnSaveHandler,
  defaultValues,
}) {
  const [openSelect, setOpenSelect] = useState(null);
  const [selectedValues, setSelectedValues] = useState(defaultValues || []);

  useEffect(() => {
    if (defaultValues && defaultValues.length > 0) {
      setSelectedValues(defaultValues);
    }
  }, [defaultValues]);

  // Customize default selected label
  const customizeDefaultSelected = (selected) => {
    return selected && selected.length > 0
      ? `${selected[0].label} (Custom Text)` // Modify the text here as needed
      : "Select a person"; // Fallback text
  };

  return (
    <div>
      <Select
        showSearch
        placeholder="Select a person"
        style={{ width: 180 }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        mode="multiple"
        maxCount={1}
        options={options}
        labelInValue
        // value={selectedValues}
        open={openSelect === Id}
        onDropdownVisibleChange={(visible) => setOpenSelect(visible ? Id : null)}
        onChange={(value) => {
          setSelectedValues(value);
        }}
        dropdownRender={(menu) => {
          return (
            <div className="flex flex-col">
              {menu}
              {/* Custom save and close buttons */}
              <div className="flex gap-2 justify-end items-center p-2">
                <button
                  onClick={() => {
                    if (selectedValues && selectedValues.length > 0) {
                      OnSaveHandler(selectedValues[0].value, Id);
                      setOpenSelect(null);
                    }
                  }}
                  className="text-white bg-[#242424] focus:outline-none p-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setOpenSelect(null)}
                  className="text-white bg-primary focus:outline-none p-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          );
        }}
        // Custom render for the default selected text (without showing multiple)

        value={selectedValues && selectedValues.length > 0 ? selectedValues[0] : null}
        optionLabelProp="label" // To display the customized label in select box
        displayValue={customizeDefaultSelected(selectedValues)}
        labelRender={(label) => (
          <span className="font-bold text-[#242424]">{label.label}</span>
        )}
        // status="error"
      />
    </div>
  );
}
