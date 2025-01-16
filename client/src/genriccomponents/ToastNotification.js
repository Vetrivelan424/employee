// ToastNotification.js
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';

const TOAST_CONTAINER_ID = 'my-toast-container';

const ToastNotification = () => {
  return (
    <ToastContainer
      containerId={TOAST_CONTAINER_ID}
      position="top-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="light"
      transition={Zoom}
      limit={1}  // Only one toast will be shown at a time
    />
  );
};

const defaultToastOptions = {
  autoClose: 5000,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Zoom,
  containerId: TOAST_CONTAINER_ID,
};

let currentToastId = null;

export const showToast = (type, message, position = "top-right") => {
  // If there's an active toast, dismiss it immediately
  if (currentToastId && !toast.isActive(currentToastId)) {
    toast.dismiss(currentToastId);
  }

  // Merge the position into the toast options
  const toastOptions = {
    ...defaultToastOptions,
    position,
  };

  // Show the new toast and store its ID
  switch (type) {
    case 'success':
      currentToastId = toast.success(message, toastOptions);
      break;
    case 'error':
      currentToastId = toast.error(message, toastOptions);
      break;
    case 'warning':
      currentToastId = toast.warning(message, toastOptions);
      break;
    case 'info':
      currentToastId = toast.info(message, toastOptions);
      break;
    default:
      currentToastId = toast(message, toastOptions);
  }
};

export default ToastNotification;
