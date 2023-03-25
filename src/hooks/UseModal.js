import { useState } from "react";

const useModal = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBody, setModalBody] = useState("");
	const [buttonAction, setButtonAction] = useState(false);
	const [useCancelButton, setCancelable] = useState(false);

	const openModal = (title, body, buttonAction, useCancel) => {
		setShowModal(true);

		if (title) {
			setModalTitle(title);
		}
		if (body) {
			setModalBody(body);
		}
		if (!useCancel && !buttonAction) {
			closeModal();
		}
		if (buttonAction) {
			setButtonAction(buttonAction);
		}

		if (useCancel) {
			setCancelable(useCancel);
		}
	};

	const closeModal = (timeout = 3000) => {
		setTimeout(() => {
			setModalTitle("");
			setModalBody("");
			setShowModal(false);
		}, timeout);
	};

	return {
		showModal,
		modalTitle,
		modalBody,
		buttonAction,
		useCancelButton,
		openModal,
		closeModal,
	};
};

export default useModal;
