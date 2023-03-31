import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TimerPage = () => {
	const params = useParams();

	useEffect(() => {
		console.log("˚₊·—̳͟͞͞♡  params:", params);
	}, []);

	return <></>;
};

export default TimerPage;
