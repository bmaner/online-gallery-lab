// export function deleteHandler(e, curFiles, setCurFiles) {
//   console.log(e.target.parentElement);
//   const deleteId = e.target.parentElement.children[1].id;
//   const filteredCurFiles = curFiles.filter(
//     curFile => curFile !== curFiles[deleteId]
//   );
//   setCurFiles(filteredCurFiles);
// }
export function deleteHandler(e, curFiles, setCurFiles) {
  const deleteId = e.target.parentElement.id;
  const filteredCurFiles = curFiles.filter(
    curFile => curFile !== curFiles[deleteId]
  );
  setCurFiles(filteredCurFiles);
}
export function inputFilesHandler(input, setCurFiles) {
  const imageFiles = input.current.files; //imageFiles는 객체형식
  const fileArray = Object.values(imageFiles); //배열 형식
  setCurFiles(fileArray);
}

export function addFilesHandler(addAnother, curFiles, setCurFiles) {
  const imageFiles = addAnother.current.files;
  const fileArray = Object.values(imageFiles);
  setCurFiles(curFiles.concat(fileArray));
}

export function addFileHandler(selectThumbnail, setProject_thumbnail) {
  const imageFiles = selectThumbnail.current.files;
  setProject_thumbnail(imageFiles[0]);
}
