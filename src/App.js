import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
	questions: [],
	// 'loading', 'error', 'ready', 'active', 'finished'
	status: "loading",
};

function reducer(currState, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...currState, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...currState, status: "error" };

		default:
			throw new Error("Action unknown");
	}
}

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => {
				dispatch({ type: "dataFailed" });
				console.log(err.message);
			});
	}, []);

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
