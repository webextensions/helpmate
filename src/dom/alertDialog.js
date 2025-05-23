/* global document, HTMLElement */

const alertDialog = (message) => {
    const dialog = document.createElement('dialog');
    document.body.append(dialog);

    const itemsToInsert = Array.isArray(message) ? message : [message];

    for (const item of itemsToInsert) {
        if (item instanceof HTMLElement) {
            dialog.append(item);
        } else if (typeof item?.innerHTML === 'string') {
            const div = document.createElement('div');
            div.innerHTML = item.innerHTML;
            const children = div.children;
            for (const child of children) {
                dialog.append(child);
            }
        } else {
            const textNode = document.createTextNode(item);
            dialog.append(textNode);
        }
    }

    dialog.addEventListener(
        'click',
        function (evt) {
            if (evt.target === dialog) {
                dialog.close();
            }
        }
    );

    dialog.showModal();
};

export { alertDialog };
