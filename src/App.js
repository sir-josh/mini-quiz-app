import React from "react";
import Header from "./Header";
import Main from "./Main";

const App = () => {
	return (
		<div className="app">
			<Header />
      <Main>
        <p>1/5</p>
        <p>React Quiz</p>
      </Main>
		</div>
	);
};

export default App;
