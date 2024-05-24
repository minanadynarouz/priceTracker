import React, { useEffect } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import Image from 'next/image';

interface SuccessDialogProps {
    message: string;
    onClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3500);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Transition appear show as={React.Fragment}>
            <Dialog as="div" onClose={onClose} className="dialog-container">
                <div className="min-h-screen px-4 text-center">
                    <TransitionChild
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </TransitionChild>

                    <span className="inline-block h-screen align-middle" aria-hidden="true" />

                    <TransitionChild
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="dialog-content-success">
                            <Image
                                src="/assets/icons/success.svg"
                                alt="success"
                                width={60}
                                height={60}
                                className="mx-auto"
                            />
                            <h4 className="dialog-head_text">{message}</h4>
                            <div className="loader" />
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SuccessDialog;
