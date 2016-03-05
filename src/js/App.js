import Device from './Components/Device';

class ResolutionTester9000 {

    /**
     * [constructor description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    constructor(options) {
        this.storeNamespace = 'rt9000';
        this.url = document.querySelector('#url');
        this.oldUrl = '';
        this.factory = document.querySelector('#factory');
        this.output = document.querySelector('#output');
        this.devices = [];

        if (this.url) {
            this.url.addEventListener('keydown', this.onUrlKeyDown.bind(this));
            this.url.addEventListener('change', this.onUrlChange.bind(this));
        }

        if (this.factory) {
            this.factory.addEventListener('submit', this.onFactorySubmit.bind(this));
        }

        // restore old devices
        this.restore();

        // before leaving, save current devices
        addEventListener('beforeunload', this.onUnload.bind(this));
    }

    /**
     * The factory has created new devices.
     *
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    onFactorySubmit(e) {
        let elements = e.currentTarget.elements;
        let custom = {
            url: this.url.value
        };

        // don't do normal form action
        e.preventDefault();

        // check if any predefined device has been checked
        for (var i = 0; i < elements.length; i++) {
            let element = elements[i];

            // save custom fields
            if (element.name === 'width') {
                custom.width = element.value;
            } else if (element.name === 'height') {
                custom.height = element.value;
            } else if (element.name === 'label') {
                custom.label = element.value;
            }

            // element not checked
            if (element.checked !== true) {
                continue;
            }

            // get options for this device
            let options = JSON.parse(element.value);

            // add url
            options.url = this.url.value;

            // create device
            this.createDevice(options);

            // reset checked state
            element.checked = undefined;
        }

        // check if custom device has been defined
        if (custom.width && custom.height) {
            this.createDevice(custom);
        }

        // hide factory
        this.factory.classList.remove('visible');
    }

    /**
     * Watch the url input field while keys are being pressed down.
     *
     * @param {KeyEvent} e Original event.
     */
    onUrlKeyDown(e) {
        let key = e.which || e.keyCode || 0;

        // enter has been pressed
        if (key === 13) {
            return this.onUrlChange(e);
        }
    }

    /**
     * Once the source url has changed update all devices.
     *
     * @param {Event} e Original event.
     */
    onUrlChange(e) {
        let url = this.url.value;

        // no new url given
        if (this.oldUrl === url) {
            return;
        }

        // update all devices
        this.devices.forEach((device) => {
            device.url = url;
        });

        // save old url
        localStorage.setItem(
            `${this.storeNamespace}.url`,
            this.oldUrl = url
        );
    }

    /**
     * [onDeviceClose description]
     * @param  {[type]} device [description]
     * @return {[type]}        [description]
     */
    onDeviceClose(device) {
        let index = this.devices.indexOf(device);

        // device not listed, strange
        if (index < 0) {
            return;
        }

        // remove device from list
        this.devices.splice(index, 1);
    }

    /**
     * [onUnload description]
     * @return {[type]} [description]
     */
    onUnload() {
        let devices = [];

        // export devices
        this.devices.forEach((device) => {
            devices.push(device.export());
        });

        // save exported devices as JSON
        localStorage.setItem(
            `${this.storeNamespace}.devices`,
            JSON.stringify(devices)
        );
    }

    /**
     * [createDevice description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    createDevice(options) {
        let device = new Device(options);

        // add close handler to device
        device.onClose = (device) => this.onDeviceClose(device);

        // inject device screen to output
        this.output.appendChild(device.screen);

        // save device
        this.devices.push(device);
    }

    /**
     * [restore description]
     * @return {[type]} [description]
     */
    restore() {
        let oldDevices = JSON.parse(localStorage.getItem(`${this.storeNamespace}.devices`)) || [];
        let oldUrl = localStorage.getItem(`${this.storeNamespace}.url`);

        // recreate devices
        oldDevices.forEach((options) => this.createDevice(options));

        // set old url as new url
        this.url.value = localStorage.getItem(`${this.storeNamespace}.url`);

        // kick url change handler
        this.onUrlChange();
    }
}

// go
new ResolutionTester9000();
