import { useState } from "react";

const useModal = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalBody, setModalBody] = useState("");

	const openModal = (title, body, cancel, submit) => {
		setShowModal(true);

		if (title) {
			setModalTitle(title);
		}
		if (body) {
			setModalBody(body);
		}

		if (!cancel && !submit) {
			closeModal();
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
		openModal,
		closeModal,
	};
};

export default useModal;
