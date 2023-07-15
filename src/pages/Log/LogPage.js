import { useEffect, useState } from "react";
import useLoggerCollection from "../../hooks/useLoggerCollection";
import LogItem from "./LogItme";

const LogPage = () => {
	const [timeLineList, setTimeLineList] = useState([]);
	const { getLogList } = useLoggerCollection();

	useEffect(() => {
		const fetchData = async () => {
			const myLogList = await getLogList();
			setTimeLineList(myLogList);
		};

		fetchData();
	}, []);

	return (
		<>
			<div>My Logs {timeLineList && timeLineList.length}</div>
		</>
	);
};

export default LogPage;
