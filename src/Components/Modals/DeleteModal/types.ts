import { ModalType } from "../../CarList/types";

export interface DeleteModalProps {
    open: boolean;
    itemId: number;
    onClose: () => void;
}
