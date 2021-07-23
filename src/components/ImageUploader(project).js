import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import ProjectUploadInfo from './ProjectUploadInfo';

function ImageUploaderProject() {
  const [project_info, setProject_info] = useState({
    project_start: '',
    project_end: '',
    project_team: '',
    project_introduction: '',
    project_feature: '',
    project_github: '',
    project_front_stack: '',
    project_back_stack: '',
    project_deploy_stack: '',
    project_url: '',
  });
  const [project_name, setProject_name] = useState(''); //필수
  const [project_stack, setProject_stack] = useState([]); //필수
  const [project_thumbnail, setProject_thumbnail] = useState(''); //필수
  const [curFiles, setCurFiles] = useState(''); //필수
  const [descriptions, setDescription] = useState(); //필수
  const [modalOn, setModalOn] = useState(false);

  const stackArray = [
    'JavaScript',
    'SQL',
    'Python',
    'Java',
    'C#',
    'PHP',
    'etc.',
  ];
  useEffect(() => {
    const descElemArray = document.querySelectorAll('.descriptionInput');
    setDescription(descElemArray);
    console.log(descriptions);
  }, [curFiles, project_info]);

  function project_stackHandler(checked, itemName) {
    if (checked && !project_stack.includes(stackArray[itemName])) {
      setProject_stack([...project_stack, stackArray[itemName]]);
    } else {
      setProject_stack(
        project_stack.filter(el => {
          return el !== stackArray[itemName];
        })
      );
    }
  }

  function postHandler() {
    const formData = new FormData();
    for (let i = 0; i < curFiles.length; i++) {
      formData.append(
        i,
        // JSON.stringify({ text: descriptions[i].value, image: curFiles[i] })
        { text: descriptions[i].value, image: curFiles[i] }
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
    <div className="projectUploadPageContainer">
      <ProjectUploadInfo
        project_name={project_name}
        setProject_name={setProject_name}
        postHandler={postHandler}
        project_thumbnail={project_thumbnail}
        setProject_thumbnail={setProject_thumbnail}
        project_info={project_info}
        setProject_info={setProject_info}
        project_stackHandler={project_stackHandler}
        stackArray={stackArray}
        curFiles={curFiles}
        setCurFiles={setCurFiles}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
    </div>
  );
}

export default ImageUploaderProject;
