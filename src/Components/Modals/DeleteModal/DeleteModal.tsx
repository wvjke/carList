import { DeleteModalProps } from "./types";
import Modal from "@mui/material/Modal/Modal";
import Fade from "@mui/material/Fade";
import { Button } from "@mui/material";
import "./deleteModal.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteCar } from "../../../redux/slices/cars";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, itemId }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await axios.delete(
                `https://cars-791d0-default-rtdb.europe-west1.firebasedatabase.app/cars/${itemId}.json`
            );
            dispatch(deleteCar(itemId));
            toast.success("Car deleted succesfully");
            onClose();
        } catch (error) {
            toast.error("Car deleting error");
        }
    };

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover={false}
                theme="light"
            />
            <Modal open={open} onClose={onClose}>
                <Fade in={open}>
                    <div
                        className="modal modal_delete"
                        style={{
                            backgroundColor:
                                localStorage.getItem("theme") === "light"
                                    ? "white"
                                    : "black",
                        }}
                    >
                        <h3>Are you sure you want to delete this item?</h3>
                        <div className="modal_delete_btn">
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleDelete}
                            >
                                Confirm
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => onClose()}
                            >
                                Discard
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default DeleteModal;
