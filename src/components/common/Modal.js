import ReactDom from "react-dom";
const Modal = ({ title, body, onHandleCancel, onHandleSubmit, emitModalButtonAction }) => {
	const OverlayMoadal = ({ title, body, onHandleCancel, onHandleSubmit }) => {
		const onHandleButton = (runOrNot) => {
			emitModalButtonAction(runOrNot);
		};

		return (
			<>
				<div className="absolute inset-0 top-20 min-h-fit  mx-auto p-5 border w-96 shadow-lg rounded-md bg-white z-10">
					<div className="fmt-3 text-center">
						{title && <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>}
						{body && (
							<div className="mt-2 px-7 py-3">
								{" "}
								<span className="text-sm text-gray-500">{body}</span>
							</div>
						)}

						<div className="flex justify-evenly">
							{onHandleCancel && (
								<div className="items-center px-4 py-3">
									<button
										onClick={() => onHandleButton(false)}
										className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
									>
										취소
									</button>
								</div>
							)}
							{onHandleSubmit && (
								<div className="items-center px-4 py-3">
									<button
										onClick={() => onHandleButton(true)}
										className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
									>
										{onHandleSubmit}
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"></div>
			</>
		);
	};

	return (
		<>
			{document &&
				ReactDom.createPortal(
					<OverlayMoadal
						title={title}
						body={body}
						onHandleCancel={onHandleCancel}
						onHandleSubmit={onHandleSubmit}
						emitModalButtonAction={emitModalButtonAction}
					/>,
					document.querySelector("#overlay-root")
				)}
		</>
	);
};

export default Modal;
