/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./carList.scss";
import { ICarState } from "../../redux/slices/cars";
import { ICar, ModalType } from "./types";
import { useState, useEffect } from "react";
import AddEditModal from "../Modals/AddEditModal/AddEditModal";
import { Button, Container } from "@mui/material";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import { fetchCars, filterCars } from "../../redux/slices/cars";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import { AppDispatch } from "../../redux/store";
import Fade from "@mui/material/Fade";

const Carlist: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cars: ICar[] = useSelector(
        (state: { cars: ICarState }) => state.cars.cars.items
    );
    const isLoaded = useSelector(
        (state: { cars: ICarState }) => state.cars.cars.status === "loaded"
    );
    const filteredCars: ICar[] = useSelector(
        (state: { cars: ICarState }) => state.cars.cars.filteredItems
    );

    const [inputValue, setInputValue] = useState<string>("");
    const [clickedItemId, setClickedItemId] = useState<string>("");
    const [modalTypeOpen, setModalTypeOpen] = useState<ModalType>(
        ModalType.Add
    );

    const [addEditModalOpen, setAddEditModalOpen] = useState<boolean>(false);
    const handleAddEditModalOpen = () => setAddEditModalOpen(true);
    const handleAddEditModalClose = () => setAddEditModalOpen(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const handleDeleteModalOpen = () => setDeleteModalOpen(true);
    const handleDeleteModalClose = () => {
        dispatch(filterCars(inputValue));
        setDeleteModalOpen(false);
    };

    const columns: GridColDef[] = [
        { field: "company", headerName: "Company", width: 150 },
        { field: "model", headerName: "Model", width: 150 },
        { field: "vin", headerName: "VIN", width: 250 },
        { field: "color", headerName: "Color", width: 100 },
        { field: "year", headerName: "Year", width: 100 },
        { field: "price", headerName: "Price", width: 100 },
        {
            field: "availability",
            headerName: "Availability",
            width: 100,
            align: "center",
        },
        {
            field: "actions",
            headerAlign: "center",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <div>
                    <select
                        defaultValue="default"
                        onChange={(e) => handleSelectChange(e, params.row.id)}
                    >
                        <option value="default" disabled>
                            Select an action
                        </option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                    </select>
                </div>
            ),
        },
    ];

    useEffect(() => {
        dispatch(fetchCars());
    }, []);

    useEffect(() => {
        dispatch(filterCars(inputValue));
    }, [cars]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            dispatch(filterCars(inputValue));
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue]);

    const handleSelectChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        carId: string
    ) => {
        setClickedItemId(carId);
        if (e.target.value === "edit") {
            setModalTypeOpen(ModalType.Edit);
            handleAddEditModalOpen();
        } else {
            handleDeleteModalOpen();
        }
        e.target.value = "default";
    };

    return (
        <>
            {isLoaded ? (
                <>
                    <Fade in={isLoaded}>
                        <section className="car_list">
                            <h1 className="car_list_title">Car List</h1>
                            <DataGrid
                                style={{
                                    outline: "none",
                                    padding: "20px",
                                }}
                                rows={inputValue ? filteredCars : cars}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                disableRowSelectionOnClick
                                disableColumnMenu
                            />
                            <Button
                                sx={{
                                    position: "absolute",
                                    bottom: "2%",
                                    left: "3%",
                                }}
                                variant="contained"
                                color="info"
                                onClick={() => {
                                    setModalTypeOpen(ModalType.Add),
                                        handleAddEditModalOpen();
                                }}
                            >
                                Add
                            </Button>
                            <input
                                id="search"
                                type="text"
                                placeholder="Search..."
                                required
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </section>
                    </Fade>
                    <AddEditModal
                        open={addEditModalOpen}
                        onClose={handleAddEditModalClose}
                        type={modalTypeOpen}
                        itemId={clickedItemId}
                    />
                    <DeleteModal
                        open={deleteModalOpen}
                        onClose={handleDeleteModalClose}
                        itemId={clickedItemId}
                    />
                </>
            ) : (
                <LinearProgress />
            )}
        </>
    );
};

export default Carlist;
