import { useState } from "react";
import { Link } from "react-router-dom";

const App = () => {
	const [isUserLogin, setIsUserLogin] = useState(false);

	return (
		<>
			<span>isUserLogin :</span>
			{isUserLogin ? "true" : "false"}
			<button>
				<Link to="/auth">login</Link>
			</button>
		</>
	);
};

export default App;
