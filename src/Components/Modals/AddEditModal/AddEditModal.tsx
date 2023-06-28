import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AddEditModalProps } from "./types";
import "./addEditModal.scss";

const AddEditModal: React.FC<AddEditModalProps> = ({ open, onClose, type }) => {
    return (
        <div>
            <Modal open={open} onClose={onClose}>
                <Fade in={open}>
                    <section className="modal">Modal {type}</section>
                </Fade>
            </Modal>
        </div>
    );
};

export default AddEditModal;
