import React from 'react';
import ButtonBox from './components/ButtonBox';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        책 읽으쇼!
      </header>
      본문
      <ButtonBox buttonText="도서 추가" handleClickButton={(()=>{console.log('책추가!!!!')})} />
    </div>
  );
}

export default App;
