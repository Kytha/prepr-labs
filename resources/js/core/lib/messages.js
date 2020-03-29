import { store } from "react-notifications-component";

const error = err => {
    return {
        title: "Error!",
        message: err.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: false
        }
    };
};

export const dispatchError = err => {
    store.addNotification(error(err));
};

export const dispatchSuccess = (title, msg) => {
    store.addNotification({
        title: title,
        message: msg,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: false
        }
    });
};
