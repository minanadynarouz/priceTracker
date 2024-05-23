import React, { useState, Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import axios from 'axios';

interface Props {
    onClose: () => void;
}

const LoginModel: React.FC<Props> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const url = isRegistering ? '/api/register' : '/api/login';
            const response = await axios.post(url, { email, password });
            console.log(response.data);
            onClose();
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.error || error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Transition appear show as={Fragment}>
            <Dialog as="div" onClose={onClose} className="dialog-container">
                <div className="min-h-screen px-4 text-center">
                    <TransitionChild
                        as={Fragment}
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
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="dialog-content">
                            <div className="flex flex-col">
                                <div className="flex justify-between">
                                    <div className="p-3 border border-gray-200 rounded-10">
                                        <Image
                                            src="/assets/icons/logo.svg"
                                            alt="logo"
                                            width={28}
                                            height={28}
                                        />
                                    </div>
                                    <Image
                                        src="/assets/icons/x-close.svg"
                                        alt="close"
                                        width={24}
                                        height={24}
                                        className="cursor-pointer"
                                        onClick={onClose}
                                    />
                                </div>
                                <h4 className="dialog-head_text">
                                    {isRegistering ? 'Register for ' : 'Login to '}
                                    Price<span className="text-sky-700">Pal</span>
                                </h4>
                                <p className="text-sm text-gray-600 mt-2">
                                    {isRegistering ? 'Create a new account' : 'Insert Your data please'}
                                </p>
                            </div>

                            <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="dialog-input_container">
                                    <Image
                                        src="/assets/icons/mail.svg"
                                        alt="mail"
                                        width={18}
                                        height={18}
                                    />
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="dialog-input"
                                    />
                                </div>

                                <label htmlFor="password" className="text-sm font-medium text-gray-700 mt-5">
                                    Password
                                </label>
                                <div className="dialog-input_container">
                                    <Image
                                        src="/assets/icons/password.svg"
                                        alt="lock"
                                        width={18}
                                        height={18}
                                    />
                                    <input
                                        required
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="dialog-input"
                                    />
                                </div>

                                <button type="submit" className="dialog-btn">
                                    {isSubmitting ? 'Submitting...' : isRegistering ? 'Register' : 'Sign In'}
                                </button>
                            </form>

                            <div className="flex justify-center mt-4">
                                <button
                                    className="text-blue-500"
                                    onClick={() => setIsRegistering(!isRegistering)}
                                >
                                    {isRegistering ? 'Already have an account? Login' : 'New user? Register'}
                                </button>
                            </div>
                            {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
                        </div>

                    </TransitionChild>

                </div>
            </Dialog>

        </Transition>
    );
};

export default LoginModel;
