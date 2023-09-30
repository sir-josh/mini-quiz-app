import React, { useEffect, useReducer } from "react";
import StartQuiz from "./StartQuiz";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
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
	const [{questions, status}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

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
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && <StartQuiz numQuestions={numQuestions} />}
			</Main>
		</div>
	);
};

export default App;
