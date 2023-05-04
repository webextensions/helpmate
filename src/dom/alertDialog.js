/* globals document */

const alertDialog = (message) => {
    const dialogElement = document.createElement('dialog');
    document.body.appendChild(dialogElement);

    dialogElement.innerText = message;

    dialogElement.addEventListener(
        'click',
        function (evt) {
            if (evt.target === dialogElement) {
                dialogElement.close();
            }
        }
    );

    dialogElement.showModal();
};

export { alertDialog };
