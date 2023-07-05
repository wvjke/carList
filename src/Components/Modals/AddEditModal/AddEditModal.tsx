import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AddEditModalProps } from "./types";
import { Formik, Field, Form } from "formik";
import "./addEditModal.scss";
import { ICar, ModalType } from "../../CarList/types";
import { useSelector } from "react-redux";
import { ICarState } from "../../../redux/slices/cars";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchCars } from "../../../redux/slices/cars";
import { AppDispatch } from "../../../redux/store";
import { Button, TextField, Checkbox, InputAdornment } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const AddEditModal: React.FC<AddEditModalProps> = ({
    open,
    onClose,
    type,
    itemId,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const cars: ICar[] = useSelector(
        (state: { cars: ICarState }) => state.cars.cars.items
    );

    let isDisabled = false;

    let initialValues: ICar | undefined = cars.find((car) => car.id === itemId);

    if (type === ModalType.Edit && initialValues) {
        isDisabled = true;
    } else {
        initialValues = {
            company: "",
            model: "",
            vin: "",
            color: "",
            year: 2010,
            price: "",
            availability: false,
        };
    }

    const handleSubmit = async (car: ICar) => {
        car.price = `$${Number(car.price).toFixed(2)}`;
        car.vin = car.vin.toUpperCase();
        if (type === ModalType.Add) {
            try {
                await axios.post(
                    `https://cars-791d0-default-rtdb.europe-west1.firebasedatabase.app/cars.json`,
                    car
                );
                onClose();
                toast.success("Car added succesfully");
                setTimeout(() => {
                    dispatch(fetchCars());
                }, 1500);
            } catch (error) {
                toast.error("Car adding error");
            }
        } else {
            try {
                const updatedData = {
                    color: car.color,
                    price: car.price,
                    availability: car.availability,
                };
                await axios.patch(
                    `https://cars-791d0-default-rtdb.europe-west1.firebasedatabase.app/cars/${car.id}.json`,
                    updatedData
                );
                onClose();
                toast.success("Car edited succesfully");
                setTimeout(() => {
                    dispatch(fetchCars());
                }, 1500);
            } catch (error) {
                toast.error("Car editing error");
            }
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
                theme="dark"
            />
            <Modal open={open} onClose={onClose}>
                <Fade in={open}>
                    <div
                        className="modal modal_addEdit"
                        style={{
                            backgroundColor:
                                localStorage.getItem("theme") === "light"
                                    ? "white"
                                    : "black",
                        }}
                    >
                        <h3 className="modal_addEdit_title">
                            {type === ModalType.Add
                                ? "Add a car"
                                : "Edit a car"}
                        </h3>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            <Form className="form">
                                <Field
                                    as={TextField}
                                    required
                                    label="Company"
                                    type="text"
                                    name="company"
                                    fullWidth
                                    disabled={isDisabled}
                                />
                                <Field
                                    as={TextField}
                                    required
                                    label="Model"
                                    type="text"
                                    name="model"
                                    fullWidth
                                    disabled={isDisabled}
                                />
                                <Field
                                    as={TextField}
                                    required
                                    label="VIN"
                                    type="text"
                                    name="vin"
                                    fullWidth
                                    disabled={isDisabled}
                                />
                                <Field
                                    as={TextField}
                                    required
                                    label="Year"
                                    type="number"
                                    inputProps={{
                                        min: 1900,
                                        max: 2023,
                                    }}
                                    name="year"
                                    fullWidth
                                    disabled={isDisabled}
                                />
                                <Field
                                    as={TextField}
                                    required
                                    label="Color"
                                    type="text"
                                    name="color"
                                    fullWidth
                                />
                                <div className="form_price">
                                    <Field
                                        id="price"
                                        as={TextField}
                                        required
                                        label="Price"
                                        type="number"
                                        name="price"
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    $
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <div className="form_availability">
                                        <div>Availability</div>
                                        <Field
                                            as={Checkbox}
                                            type="checkbox"
                                            label="Availability"
                                            name="availability"
                                        />
                                    </div>
                                </div>
                                <Button
                                    variant="contained"
                                    color="success"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Formik>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default AddEditModal;
