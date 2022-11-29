import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authenSlice } from "../src/store/authenSlice";

const App = () => {
	const [isUserLogin, setIsUserLogin] = useState(true);
	// const userInfo = useSelector((state) => state.authen);
	// console.log(userInfo);

	return (
		<>
			<h1 className="text-3xl font-bold underline">for More ( )</h1>
			<button>
				<Link to="/auth">login</Link>
			</button>
		</>
	);
};

export default App;
