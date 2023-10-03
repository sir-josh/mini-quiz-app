import React from "react";

const NextButton = ({ dispatch, answer }) => {
	if (answer === null) return null;
	return (
		<div
			className="btn btn-ui"
			onClick={() => dispatch({ type: "nextQuestion" })}>
			NextButton
		</div>
	);
};

export default NextButton;
