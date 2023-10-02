import React, { useEffect, useReducer } from "react";
import StartQuiz from "./StartQuiz";
import Question from "./Question";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";

const initialState = {
	questions: [],
	// 'loading', 'error', 'ready', 'active', 'finished'
	status: "loading",
	questionIndex: 0,
	answer: null,
	score: 0,
};

function reducer(currState, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...currState, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...currState, status: "error" };
		case "start":
			return { ...currState, status: "active" };
		case "newAnswer":
			const question = currState.questions.at(currState.questionIndex);

			return {
				...currState,
				answer: action.payload,
				score:
					action.payload === question.correctOption
						? currState.score + question.points
						: currState.score,
			};

		default:
			throw new Error("Action unknown");
	}
}

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { questions, status, questionIndex, answer } = state;
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
				{status === "ready" && (
					<StartQuiz
						numQuestions={numQuestions}
						dispatch={dispatch}
					/>
				)}
				{status === "active" && (
					<Question
						question={questions[questionIndex]}
						dispatch={dispatch}
						answer={answer}
					/>
				)}
			</Main>
		</div>
	);
};

export default App;
