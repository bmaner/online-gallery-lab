import React, { useRef } from 'react';
import { addFileHandler } from '../utils/fileHandler';
import { inputBtnClick } from '../utils/etc';

function ImageUploaderOne({
  project_info_detail,
  required,
  stateName,
  stateFunc,
  condition_subject,
  condition_desc,
}) {
  const inputRef = useRef(null);
  return (
    <div className="ImageUploaderOneCon">
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={e => addFileHandler(inputRef, stateFunc)}
      />
      <div className="subject_wrapper">
        {project_info_detail}
        {required === '' ? null : <span className="required">{required}</span>}
      </div>
      <div className="input_file_wrapper">
        <>
          {stateName ? (
            <div
              className="img_preview"
              onClick={e => inputBtnClick(e, inputRef)}
              style={{
                backgroundImage: `url('${URL.createObjectURL(stateName)}')`,
                backgroundSize: 'cover',
              }}
            ></div>
          ) : (
            <div
              className="img_preview"
              onClick={e => inputBtnClick(e, inputRef)}
            >
              <img src="website_icon/camera.png" alt="camera" />
            </div>
          )}
          <div className="img_condition">
            <div className="condition_subject">{condition_subject}</div>
            <p className="condition_desc">{condition_desc}</p>
          </div>
        </>
      </div>
    </div>
  );
}

export default ImageUploaderOne;
