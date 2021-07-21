import React from 'react';
import Gallery from './pages/Gallery';
import Nav from './components/Nav';
import ImageUploaderSignUp from './components/ImageUploader(signUp)';
import ImageUploaderProject from './components/ImageUploader(project)';

function App() {
  return (
    <div className="App">
      {/* Project Name */}
      {/* <Gallery /> */}
      {/* <Nav /> */}
      {/* <ImageUploaderSignUp /> */}
      <ImageUploaderProject />
    </div>
  );
}

export default App;
