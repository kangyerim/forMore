import { useSelector } from "react-redux";
import MyInfoForm from "../../components/Auth/MyInfoForm";

const MyPage = () => {
	const userInfo = useSelector((state) => state.authen);

	return (
		<>
			<div className="grid grid-cols-1 justify-items-center my-60">
				<MyInfoForm userInfo={userInfo}></MyInfoForm>
			</div>
		</>
	);
};

export default MyPage;
