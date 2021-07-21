import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

//추가하는 사진의 수에 따라서 description input 태그도 늘어난다.
//늘어나는 많큼 state를 늘리는 건 실제로 비효율 적이다. 그리고 실제로 자동으로 state가 설정되게할 방법이 있는지 의심된다.
//사진의 수 만큼 map하여 input 태그를 생성하고 value를 하나의 state로 하면 하나의 input창에 입력된 것이 모든 input창에 똑같이 적용된다. 그러므로 해당 방법은 X
//document.querySelectorAll로 같은 element나 같은 classname의 element를 모두 하나의 배열로 불러올 수 있음을 생각해냄.
//반복문으로 이 배열을 순회하며 .value를 하니 해당 input창에 적혀있는 value를 뽑을 수 있었음.
//이 value들을 빈배열에 넣고 이를 formdata에 imgfile과 함께 append 하였다.
//console.log로 확인 가능하였음

function ImageUploaderProject() {
  const input = useRef(null);
  const addAnother = useRef(null);
  const [curFiles, setCurFiles] = useState('');
  const [modalOn, setModalOn] = useState(false);
  const [descriptions, setDescription] = useState();
  //   const [selected, setSelected] = useState(null);
  //   const descriptions = [];
  //   const [description, setDescription] = useState('');

  useEffect(() => {
    const descElemArray = document.querySelectorAll('.descriptionInput');
    setDescription(descElemArray);
  }, [curFiles]);

  function deleteHandler(e) {
    const deleteId = e.target.parentElement.children[1].id;
    // console.log(e.target.parentElement.children[1].id);
    const filteredCurFiles = curFiles.filter(
      curFile => curFile !== curFiles[deleteId]
    );
    setCurFiles(filteredCurFiles);
    // console.log(curFiles.length);
  }

  function inputFileHandler() {
    const imageFiles = input.current.files; //imageFiles는 객체형식
    // console.log(Object.values(imageFiles));
    const fileArray = Object.values(imageFiles); //배열 형식
    setCurFiles(fileArray);
    // setSelected(e.target.files);
    // console.log(e.target.files);
  }

  function addFileHandler() {
    const imageFiles = addAnother.current.files;
    const fileArray = Object.values(imageFiles);
    // console.log('fileArray', fileArray);
    setCurFiles(curFiles.concat(fileArray));
    // console.log('curFiles', curFiles);
  }

  function InputBtnClick1(e) {
    e.preventDefault();
    input.current.click();
  }

  function InputBtnClick2(e) {
    e.preventDefault();
    addAnother.current.click();
  }

  //   project_content:
  //   [  {text: ~~~~ ,  image: buffer },  {text: ~~~~ ,  image: buffer }, {text: ~~~~ ,  image: buffer }]

  //FormData는 하나의 객체 append해서 넣을경우
  // {
  //     'image': file`,
  // }
  //따라서 인덱스마다 객체가 있는 형식으로 가야되지 않을까?
  // {
  //     0: {
  //         'image': file,
  //         'text': 'text'
  //     }
  //     1: {
  //         'image': file,
  //         'text': 'text'
  //     }
  //     2: {
  //         'image': file,
  //         'text': 'text'
  //     }
  //     3: {
  //         'image': file,
  //         'text': 'text'
  //     }
  // }

  function postHandler() {
    //server에 form data를 전송하는 부분
    // const descriptions = document.querySelectorAll('.descriptionInput');
    const formData = new FormData();
    for (let i = 0; i < curFiles.length; i++) {
      formData.append(
        i,
        JSON.stringify({ text: descriptions[i].value, image: curFiles[i] })
        // { text: descriptions[i].value, image: curFiles[i] }
      );
    }

    for (let el of formData.entries()) {
      console.log(el);
    }
    return axios //preview화면에서 업로드 버튼을 누르면 post요청이 일어나고 로딩화면으로 전환, profile화면으로 redirection 그리고 get으로 post해놓은 data를 불러온다 200ok 떨어지면 로딩화면 off
      .post('api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        alert('성공');
      })
      .catch(err => {
        alert('실패');
      });
  }

  function previewHanlder() {
    setModalOn(!modalOn);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className="imageUploaderContainer">
        <div className="contextCon">
          {curFiles.length === 0 ? (
            <h1>Choose images to upload (PNG, JPG, GIF)</h1>
          ) : (
            <div>
              {curFiles.map((curFile, idx) => {
                return (
                  <div className="projectInfo">
                    <img
                      key={`imgKey${idx}`}
                      src={URL.createObjectURL(curFile)}
                      className="preview"
                    />
                    <div
                      className="imgIndexImgName"
                      id={idx}
                      key={idx}
                      style={{
                        border: '1px solid red',
                        marginBottom: '10px',
                      }}
                    >
                      번호 {idx} <br />
                      사진이름 {curFile.name}
                    </div>
                    <input
                      className="descriptionInput"
                      type="text"
                      placeholder="사진에 대한 설명을 적어보세요!"
                    />
                    <span
                      style={{
                        width: '50px',
                        height: '50px',
                        fontSize: '20px',
                      }}
                      onClick={e => deleteHandler(e)}
                    >
                      ❌
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {curFiles.length !== 0 ? (
        <div>
          <input
            ref={addAnother}
            type="file"
            name="image_upload"
            accept=".png, .jpg, .jpeg .gif"
            onChange={e => addFileHandler(e)}
            multiple
            style={{ display: 'none' }}
          />
          <span
            style={{
              width: '50px',
              height: '50px',
              fontSize: '20px',
            }}
            onClick={e => InputBtnClick2(e)}
          >
            ➕
          </span>
        </div>
      ) : (
        <div>
          <input //input tag를 display none이나 opacity 0으로하고 useRef로 불러와서 click하면 다른 예쁜 div태그에서 파일고르는 view를 띄울 수 있다.(mdn도 그것을 추천함)
            ref={input}
            type="file"
            name="images_upload"
            accept=".png, .jpg, .jpeg .gif"
            onChange={e => inputFileHandler(e)}
            multiple
            style={{ display: 'none' }}
          />
          <span
            style={{
              width: '50px',
              height: '50px',
              fontSize: '20px',
            }}
            onClick={e => InputBtnClick1(e)}
          >
            ➕➕
          </span>
        </div>
      )}

      <button
        className="previewBtn"
        type="button"
        onClick={() => previewHanlder()}
      >
        preview
      </button>
      <Modal
        modalOn={modalOn}
        setModalOn={setModalOn}
        descriptions={descriptions}
        curFiles={curFiles}
      />
    </div>
  );
}

export default ImageUploaderProject;

// https://stackoverflow.com/questions/58200373/how-to-append-child-to-react-element appendchild구현
// https://developer.mozilla.org/ko/docs/Web/HTML/Element/Input/file 공식문서
// https://basketdeveloper.tistory.com/70 미리보기 포함
// https://velog.io/@edie_ko/React-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EA%B8%B0-with-Axios
// https://kyounghwan01.github.io/blog/React/image-upload/#formdata-%E1%84%92%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BC
// https://ndb796.tistory.com/222 정보전달하는 부분
