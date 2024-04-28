import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import React from "react";


interface ModalProps {
    closeModal: () => void;
    children: React.ReactNode;
    size: any
}

const MentorAssignmentModal: React.FC<ModalProps> = ({ closeModal, children, size }) => {

    const handleOpen = (value: any) => size = value;

    return (
        <>
            <Dialog
                open={
                    size === "xs" ||
                    size === "sm" ||
                    size === "md" ||
                    size === "lg" ||
                    size === "xl" ||
                    size === "xxl"
                }
                size={size}
                handler={handleOpen}
                placeholder={undefined}
            >
                <DialogHeader placeholder={undefined}>Its a simple dialog.</DialogHeader>
                <DialogBody placeholder={undefined}>
                    {children}
                </DialogBody>
                <DialogFooter placeholder={undefined}>
                    <Button
                        variant="text"
                        color="red"
                        className="mr-1"
                        placeholder={undefined}
                        onClick={() => closeModal()}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        placeholder={undefined}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default MentorAssignmentModal;