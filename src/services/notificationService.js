import Vue from 'vue';

function notifySuccess(notification) {
    Vue.notify({
        group: 'alert',
        text: notification,
        type: 'success',
        position: 'top left',
    });
}

function notifyError(notification) {
    Vue.notify({
        group: 'alert',
        text: notification,
        type: 'error',
        position: 'top left',
    });
}

function notifyWarning(notification) {
    Vue.notify({
        group: 'alert',
        text: notification,
        type: 'warn',
        position: 'top left',
    });
}

export { notifySuccess, notifyError, notifyWarning };
