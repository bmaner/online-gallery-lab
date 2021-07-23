import React from 'react';

function TextInputGender({
  inputname,
  detailString,
  detailState,
  project_info,
  onChangeHandler,
}) {
  return (
    <div>
      {inputname}:
      <input
        type="text"
        value={project_info[detailString]}
        onChange={e => onChangeHandler(e, detailString)}
      />
      <br />
    </div>
  );
}

export default TextInputGender;
