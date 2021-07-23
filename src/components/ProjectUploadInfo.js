import React, { useRef } from 'react';
import TextInputGender from './TextInputGender';
import CheckboxInputGender from './CheckboxInputGender';
import ImageUploaderOne from './ImageUploaderOne';
import ImageUploaderMany from './ImageUploaderMany';

function ProjectUploadInfo({
  project_info,
  project_name,
  project_thumbnail,
  setProject_info,
  setProject_name,
  setProject_thumbnail,
  postHandler,
  project_stackHandler,
  stackArray,
  curFiles,
  setCurFiles,
}) {
  const {
    project_team,
    project_introduction,
    project_feature,
    project_github,
    project_front_stack,
    project_back_stack,
    project_deploy_stack,
    project_url,
  } = project_info;
  const textInputData = [
    ['프로젝트 팀', 'project_team', project_team],
    ['프로젝트 소개', 'project_introduction', project_introduction],
    ['프로젝트 기능', 'project_feature', project_feature],
    ['프로젝트 깃허브', 'project_github', project_github],
    ['FE 스택', 'project_front_stack', project_front_stack],
    ['BE 스택', 'project_back_stack', project_back_stack],
    ['배포 기술 스택', 'project_deploy_stack', project_deploy_stack],
    ['프로젝트 도메인 주소', 'project_url', project_url],
  ];

  function onChangeHandler(e, property) {
    const copied = Object.assign({}, project_info);
    copied[property] = e.target.value; //copied.property로는 변수일경우 할당을 못함....ㅠㅠㅠㅠ
    setProject_info(copied);
  }

  return (
    <>
      <div className="project_name">
        <div className="subject_wrapper">
          프로젝트명<span className="required">(필수)</span>
        </div>
        <input
          type="text"
          name="project_name"
          className="input_small"
          value={project_name}
          onChange={e => setProject_name(e.target.value)}
        />
      </div>
      <ImageUploaderOne
        project_info_detail={'프로필 썸네일'}
        required={'(필수)'}
        stateName={project_thumbnail}
        stateFunc={setProject_thumbnail}
        condition_subject={'등록조건'}
        condition_desc={'170x280(px), 25KB 이하, jpg, jpeg, png만 가능'}
      />
      <ImageUploaderMany
        project_info_detail={'프로젝트 사진'}
        required={'(필수)'}
        stateName={curFiles}
        stateFunc={setCurFiles}
        condition_subject={'등록조건'}
        condition_desc1={'다중 등록 가능하고, 등록 후 설명을 쓸 수 있어요.'}
        condition_desc2={
          '1120x450(px),  150KB 이하, jpg, jpeg, png, gif만 가능'
        }
      />
      <div className="project_stack" style={{ display: 'flex' }}>
        <div className="subject_wrapper">
          프로젝트 주요스택<span className="required">(필수)</span>
        </div>
        <div
          className="checkboxInputContainer"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginBottom: '24px',
          }}
        >
          {stackArray.map((el, idx) => {
            return (
              <CheckboxInputGender
                stackName={el}
                index={idx}
                project_stackHandler={project_stackHandler}
              />
            );
          })}
        </div>
      </div>
      <div className="project_term" style={{ display: 'flex' }}>
        프로젝트 기간(opt):
        <input
          type="date"
          value={project_info.project_start}
          onChange={e => onChangeHandler(e, 'project_start')}
        />
        ~
        <input
          type="date"
          value={project_info.project_end}
          onChange={e => onChangeHandler(e, 'project_end')}
        />
      </div>
      <div className="textInputContainer">
        {textInputData.map(el => {
          return (
            <TextInputGender
              inputname={el[0]}
              detailString={el[1]}
              detailState={el[2]}
              project_info={project_info}
              onChangeHandler={onChangeHandler}
            />
          );
        })}
      </div>
      <button type="submit">
        display none넣고 ref로 잡아서 업로드 버튼 누르면 실행되게 하자
      </button>
    </>
  );
}

export default ProjectUploadInfo;
