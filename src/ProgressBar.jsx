import React from "react";

const ProgressBar = ({
	index,
	numQuestions,
	score,
	totalPossibleScore,
	answer,
}) => {
	return (
		<header className="progress">
			<progress
				max={numQuestions}
				value={index + Number(answer !== null)}
			/>
			<p>
				Question <strong>{index + 1}</strong> / {numQuestions}
			</p>
			<p>
				Question <strong>{score}</strong> / {totalPossibleScore}
			</p>
		</header>
	);
};

export default ProgressBar;
