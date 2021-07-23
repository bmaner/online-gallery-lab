export function inputBtnClick(e, inputRef) {
  e.preventDefault();
  inputRef.current.click();
}

// export function project_stackHandler(project_stack, setProject_stack, id) {
//   // const arr = [];
//   // for (let el of project_stackArr) {
//   //   if (el === true) {
//   //     arr.push(el);
//   //   }
//   // }
//   // setProject_stack(arr);
//   setProject_stack([...project_stack, id]);
// }
