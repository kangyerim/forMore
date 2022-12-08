import { useSelector } from "react-redux";
import MyInfoForm from "../../components/Auth/MyInfoForm";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const MyPage = () => {
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.authen);
	const [isUpdateMode, setUpdateMode] = useState(false);

	const clickedButtonHandler = (action) => {
		console.log("clickedButtonHandler   ", action);

		switch (action) {
			case "navigate":
				navigate("/home");
				break;
			case "changeMode":
				setUpdateMode(!isUpdateMode);
				break;
			case "changePass":
				break;
			case "save":
				break;
		}
	};

	return (
		<>
			<div className="grid grid-cols-1 justify-items-center my-60">
				<MyInfoForm
					userInfo={userInfo}
					isUpdateMode={isUpdateMode}
					emitClickedAction={clickedButtonHandler}
				></MyInfoForm>
			</div>
		</>
	);
};

export default MyPage;
