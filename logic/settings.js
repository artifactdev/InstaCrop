
const defaultConfig = {
    width: 1080,
    height: 1350,
    blur: 20,
    darkeness : 0.3
};

let config = {
    width: 1080,
    height: 1350,
    blur: 20,
    darkeness : 0.3
};

document.addEventListener("DOMContentLoaded", function() {
    const settingsForm =  document.getElementById('settingForm');
    const saveButton = document.getElementById('saveButton');
    const resetButton = document.getElementById('resetButton');

    const init = function() {
        tinybind.bind(settingsForm, { config: config });
        prepareConfig();

        saveButton.addEventListener('click', function() {
            console.log(config)
            saveConfig(config);
        });

        resetButton.addEventListener('click', function() {
            resetConfig();
        })
    }

    let prepareConfig = function() {
        config.width = isInStorage('width')  ? parseInt(getItem('width')) : 1080;
        config.height = isInStorage('height')  ? parseInt(getItem('height')) : 1350;
        config.blur = isInStorage('blur')  ? parseInt(getItem('blur')) : 20;
        config.darkeness = isInStorage('darkeness')  ? parseFloat(getItem('darkeness')) : 0.3;
        console.log(config);
    }

    let saveConfig = function(configItems) {
        console.log(configItems);
        setItem('width',configItems.width);
        setItem('height',configItems.height);
        setItem('blur',configItems.blur);
        setItem('darkeness',configItems.darkeness);
    }

    let resetConfig = function() {
        console.log(defaultConfig)
        saveConfig(defaultConfig);
        prepareConfig();
    }

    const isInStorage = function(key) {
        var item = window.localStorage.getItem(key);
        console.log('key', item)
        if (item !== null) {
            return true;
        } else {
            return false;
        }
    }

    const getItem = function(key) {
        return window.localStorage.getItem(key);
    }

    const setItem = function(key, value) {
        window.localStorage.setItem(key,value);
    }

    init();
});

