import React, { useEffect, useReducer } from "react";
import StartQuiz from "./StartQuiz";
import Question from "./Question";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";

const initialState = {
	questions: [],
	// 'loading', 'error', 'ready', 'active', 'finished'
	status: "loading",
	questionIndex: 0,
	answer: null,
	score: 0,
	highscore: 0,
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
		case "nextQuestion":
			return {
				...currState,
				questionIndex: currState.questionIndex + 1,
				answer: null,
			};
		case "finish":
			return {
				...currState,
				status: "finished",
				highscore:
					currState.score > currState.highscore
						? currState.score
						: currState.highscore,
			};
		case "restart":
			return {
				...initialState,
				questions: currState.questions,
				status: "ready",
			};

		default:
			throw new Error("Action unknown");
	}
}

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { questions, status, questionIndex, answer, score, highscore } =
		state;
	const numQuestions = questions.length;
	const totalPossibleScore = questions.reduce(
		(prev, curr) => prev + curr.points,
		0,
	);

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
					<>
						<ProgressBar
							numQuestions={numQuestions}
							index={questionIndex}
							score={score}
							totalPossibleScore={totalPossibleScore}
							answer={answer}
						/>
						<Question
							question={questions[questionIndex]}
							dispatch={dispatch}
							answer={answer}
						/>
						<NextButton
							dispatch={dispatch}
							answer={answer}
							index={questionIndex}
							numQuestions={numQuestions}
						/>
					</>
				)}
				{status === "finished" && (
					<FinishScreen
						score={score}
						totalPossibleScore={totalPossibleScore}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
};

export default App;
