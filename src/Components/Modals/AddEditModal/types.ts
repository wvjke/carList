import { ModalType } from "../../CarList/types";

export interface AddEditModalProps {
    open: boolean;
    onClose: () => void;
    itemId: string;
    type: ModalType;
}
