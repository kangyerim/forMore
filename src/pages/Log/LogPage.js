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
			<div className="h-14"></div>
			{timeLineList &&
				timeLineList.map((item) => {
					return <LogItem key={item.uid} {...item} />;
				})}
		</>
	);
};

export default LogPage;
