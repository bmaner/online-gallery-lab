import React from 'react';
import Carousel from 'react-bootstrap-carousel';

function Modal({ modalOn, setModalOn, curFiles, descriptions }) {
  return (
    <>
      {modalOn && curFiles ? (
        <div className="modalBackdrop">
          <div
            className="modalView"
            onClick={() => {
              setModalOn(!modalOn);
            }}
          >
            {curFiles.map((curFile, idx) => {
              return (
                <div className="projectInfo">
                  <img
                    key={`imgKey${idx}`}
                    src={URL.createObjectURL(curFile)}
                    className="preview"
                  />
                </div>
                // <Carousel>
                //   <Carousel.Item interval={1000}>
                //     <img
                //       className="presentationImg"
                //       src={URL.createObjectURL(curFile)}
                //       alt={`image${idx}`}
                //     />
                //     <Carousel.Caption>
                //       <h3>First slide label</h3>
                //       <p>
                //         Nulla vitae elit libero, a pharetra augue mollis
                //         interdum.
                //       </p>
                //     </Carousel.Caption>
                //   </Carousel.Item>
                // </Carousel>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;

// sudo npm install react-bootstrap-validation --save
