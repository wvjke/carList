import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AddEditModalProps } from "./types";
import { Formik, Field, Form, FormikHelpers } from "formik";
import "./addEditModal.scss";
import { ICar, ModalType } from "../../CarList/types";
import { useSelector } from "react-redux";
import { ICarState } from "../../../redux/slices/cars";
import { v4 as uuidv4 } from "uuid";

const AddEditModal: React.FC<AddEditModalProps> = ({
    open,
    onClose,
    type,
    itemId,
}) => {
    const cars: ICar[] = useSelector(
        (state: { cars: ICarState }) => state.cars.cars.items
    );

    let isDisabled = false;

    let initialValues: ICar | undefined = cars.find((car) => car.id === itemId);

    if (type === ModalType.Edit && initialValues) {
        isDisabled = true;
        console.log(initialValues);
    } else {
        initialValues = {
            id: parseInt(uuidv4().replace(/-/g, ""), 16),
            company: "",
            model: "",
            vin: "",
            color: "",
            year: 2010,
            price: 0,
            availability: false,
        };
    }

    const onSubmit = (values: ICar) => {
        const newCar: ICar = values;
        console.log(newCar);
    };

    return (
        <div>
            <Modal open={open} onClose={onClose}>
                <Fade in={open}>
                    <div className="modal modal_addEdit">
                        <h3 className="modal_addEdit_title">Signup</h3>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(
                                values: ICar,
                                { setSubmitting }: FormikHelpers<ICar>
                            ) => {
                                setTimeout(() => {
                                    onSubmit(values);
                                    setSubmitting(false);
                                }, 500);
                            }}
                        >
                            <Form>
                                <div>
                                    <Field
                                        id="company"
                                        name="company"
                                        placeholder="Company"
                                        required
                                        disabled={isDisabled}
                                    />
                                </div>
                                <div>
                                    <Field
                                        id="model"
                                        name="model"
                                        placeholder="Model"
                                        required
                                        disabled={isDisabled}
                                    />
                                </div>
                                <div>
                                    <Field
                                        id="vin"
                                        name="vin"
                                        placeholder="VIN"
                                        required
                                        disabled={isDisabled}
                                    />
                                </div>
                                <div>
                                    <Field
                                        id="year"
                                        name="year"
                                        placeholder="Year"
                                        required
                                        type="number"
                                        min="1900"
                                        max="2023"
                                        step="1"
                                        disabled={isDisabled}
                                    />
                                </div>
                                <div>
                                    <Field
                                        id="color"
                                        name="color"
                                        placeholder="Color"
                                        required
                                    />
                                </div>
                                <div>
                                    <Field
                                        id="price"
                                        name="price"
                                        placeholder="Price"
                                        required
                                    />
                                </div>
                                <div>
                                    <span>Availability</span>
                                    <Field
                                        id="availability"
                                        name="availability"
                                        placeholder="Availability"
                                        type="checkbox"
                                    />
                                </div>

                                <button type="submit">Submit</button>
                            </Form>
                        </Formik>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default AddEditModal;
