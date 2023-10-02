import React from "react";

const StartQuiz = ({ numQuestions, dispatch }) => {
	return (
		<div className="start">
			<h2>Welcome to The React Quiz!</h2>
			<h3>{numQuestions} questions to test your React mastery</h3>
			<p className="timeout">You have X minutes to finish the quiz</p>

			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "start" })}>
				Let's Start
			</button>
		</div>
	);
};

export default StartQuiz;
