export default class Device {

    /**
     * [constructor description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    constructor(options) {

        // make sure options is an object
        options = (typeof options === 'object' && options) || {};

        // create iframe
        this.iframe = document.createElement('iframe');
        this.iframe.classList.add('iframe');

        // create close button
        this.closeButton = document.createElement('button');
        this.closeButton.addEventListener('click', this.onCloseButtonClicked.bind(this));
        this.closeButton.classList.add(
            'plain-button',
            'close',
            'gimme-seizure',
            '-hardcore'
        );

        // create screen
        this.screen = document.createElement('div');
        this.screen.classList.add('device-screen');

        // add components to screen
        this.screen.appendChild(this.iframe);
        this.screen.appendChild(this.closeButton);

        // set up device
        this.width = parseInt(options.width || 400, 10);
        this.height = parseInt(options.height || 400, 10);
        this.url = options.url || '';

        // screen should be resizable
        if (options.resizable) {
            this.screen.classList.add('-resizable');
            this.screen.dataset.resizable = true;
        }

        if (options.label) {
            this.label = options.label;
        }
    }

    onCloseButtonClicked(e) {
        this.screen.parentNode.removeChild(this.screen);

        // if callback is given, run it
        if (typeof this.onClose === 'function') {
            this.onClose(this);
        }
    }

    export() {
        return {
            width: this.width,
            height: this.height,
            label: this.label
        };
    }

    /**
     * [url description]
     * @return {[type]} [description]
     */
    get url() {
        return this.iframe.src;
    }

    /**
     * [url description]
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    set url(url) {
        this.iframe.src = url;
    }

    /**
     * [width description]
     * @return {[type]} [description]
     */
    get width() {
        return this.iframe.width;
    }

    /**
     * [width description]
     * @param  {[type]} width [description]
     * @return {[type]}     [description]
     */
    set width(width) {
        this.iframe.width = width;
        this.screen.dataset.width = width;
    }

    /**
     * [height description]
     * @return {[type]} [description]
     */
    get height() {
        return this.iframe.height;
    }

    /**
     * [height description]
     * @param  {[type]} height [description]
     * @return {[type]}     [description]
     */
    set height(height) {
        this.iframe.height = height;
        this.screen.dataset.height = height;
    }

    /**
     * [label description]
     * @return {[type]} [description]
     */
    get label() {
        return this.screen.dataset.label;
    }

    /**
     * [label description]
     * @param  {[type]} label [description]
     * @return {[type]}     [description]
     */
    set label(label) {
        this.screen.dataset.label = label;
    }
}
