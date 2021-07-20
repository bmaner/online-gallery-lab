import React, { useState, useRef } from 'react';
import axios from 'axios';
// https://stackoverflow.com/questions/58200373/how-to-append-child-to-react-element appendchild구현
// https://developer.mozilla.org/ko/docs/Web/HTML/Element/Input/file 공식문서
// https://basketdeveloper.tistory.com/70 미리보기 포함

//본문 미리보기 + portfolio upload 페이지에는 글 작성시 작게 미리보기 화면 구현

function ImageUploader() {
  const input = useRef(null);
  const [defaultImg, setDefaultImg] = useState('');
  const [selected, setSelected] = useState(null);
  const [curFiles, setCurFiles] = useState('');

  function inputFileHandler(e) {
    const imageFiles = input.current.files; //imageFiles는 객체형식
    console.log(Object.values(imageFiles));
    const fileArray = Object.values(imageFiles); //배열 형식
    setCurFiles(fileArray);
    setSelected(e.target.files);
    // console.log(e.target.files);
  }

  function clickHandler(e) {
    setDefaultImg(curFiles[Number(e.target.id)]);
  }

  console.log(defaultImg);

  function postHandler() {
    //server에 form data를 전송하는 부
    const formData = new FormData();
    formData.append('file', selected);

    return axios
      .post('api/upload', formData)
      .then(res => {
        alert('성공');
      })
      .catch(err => {
        alert('실패');
      });
  }
  // https://velog.io/@edie_ko/React-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EA%B8%B0-with-Axios
  // https://kyounghwan01.github.io/blog/React/image-upload/#formdata-%E1%84%92%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BC
  return (
    <div className="imageUploaderContainer">
      {React.createElement(
        'div',
        { className: 'contexCon' },
        curFiles === '' ? (
          <img className="preview" src="images/preview.png" />
        ) : (
          React.createElement('img', {
            className: 'preview',
            src: URL.createObjectURL(defaultImg), //https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
          })
        )
      )}
      <div>
        {curFiles.length !== 0 ? (
          curFiles.map((curFile, idx) => {
            return (
              <div
                className="imgNameimgDesc"
                id={idx}
                key={idx}
                style={{ border: '1px solid red', marginBottom: '10px' }}
                onClick={e => clickHandler(e)}
              >
                번호 {idx} <br />
                사진이름 {curFile.name}
              </div>
            );
          })
        ) : (
          <h1>프로젝트의 사진을 선택해주세요.</h1>
        )}
      </div>
      <input
        ref={input}
        type="file"
        name="image_uploads"
        accept=".png, .jpg, .jpeg"
        onChange={e => inputFileHandler(e)}
        multiple
      />
      <button type="button" onClick={postHandler}>
        Upload!
      </button>
    </div>
  );
}

export default ImageUploader;
