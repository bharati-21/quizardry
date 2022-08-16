import React from "react";
import ReactDOM from "react-dom";

import { QuizFormModal } from "components";
import { useQuizFormModal } from "contexts";

const ModalPortal = () => {
	const {
		quizFormModalState: { modalIsOpen },
	} = useQuizFormModal();
	return ReactDOM.createPortal(
		modalIsOpen ? <QuizFormModal /> : null,
		document.getElementById("modal-portal")!
	);
};

export { ModalPortal };
