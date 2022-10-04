// Base class
import Component from '../../Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

// Constants
const CLASS_DROP_AREA = 'drop-area';

export default class FileComponent extends Component {
    constructor(root, model) {
        super({ root, style, template, model });

        // Data
        this._responseType = this.model.options.responseType || 'dataURL';

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._setFileName(this.model.value);
        if (this._contain) this._addContainClass();
        this._setupEventListeners();
    }

    destroyed() {
        this._removeEventListeners();
    }

    /**
     * Private
     */
    _bindHandlers() {
        this._dropHandler = this._dropHandler.bind(this);
        this._dragEnterHandler = this._dragEnterHandler.bind(this);
        this._dragOverHandler = this._dragOverHandler.bind(this);
        this._dragLeaveHandler = this._dragLeaveHandler.bind(this);
        this._fileInputChangeHandler = this._fileInputChangeHandler.bind(this);
        this._fileLoadedHandler = this._fileLoadedHandler.bind(this);
    }

    _setupEventListeners() {
        this.$el.addEventListener('drop', this._dropHandler);
        this.$el.addEventListener('dragenter', this._dragEnterHandler);
        this.$el.addEventListener('dragover', this._dragOverHandler);
        this.$el.addEventListener('dragleave', this._dragLeaveHandler);
        this.$refs.fileInput.addEventListener('change', this._fileInputChangeHandler);
    }

    _removeEventListeners() {
        this.$el.removeEventListener('drop', this._dropHandler);
        this.$el.removeEventListener('dragenter', this._dragEnterHandler);
        this.$el.removeEventListener('dragover', this._dragOverHandler);
        this.$el.removeEventListener('dragleave', this._dragLeaveHandler);
    }

    _addContainClass() {
        this.$el.classList.add('contain');
    }

    _handleFile(file) {
        const reader = new FileReader();
        reader.onloadend = this._fileLoadedHandler;
        reader[this._getReadAsFunction(this._responseType)](file);
    }

    _getReadAsFunction(responseType) {
        switch (responseType) {
            case 'arrayBuffer': return 'readAsArrayBuffer';
            case 'binaryString': return 'readAsBinaryString';
            case 'dataURL': return 'readAsDataURL';
            case 'text': return 'readAsText';
        }
    }

    _setFileName(name) {
        this.$refs.fileName.textContent = name;
    }

    _showDropArea() {
        this.$refs.inputContainer.classList.add(CLASS_DROP_AREA);
    }

    _hideDropArea() {
        this.$refs.inputContainer.classList.remove(CLASS_DROP_AREA);
    }

    /**
     * Handlers
     */
    _dropHandler(e) {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        this._handleFile(file);
        this._hideDropArea();
    }

    _dragEnterHandler(e) {
        e.preventDefault();
        this._showDropArea();
    }

    _dragOverHandler(e) {
        e.preventDefault();
    }

    _dragLeaveHandler(e) {
        if (!this.$el.contains(e.fromElement)) {
            this._hideDropArea();
        }
    }

    _fileLoadedHandler(e) {
        const file = e.target.result;
        this.model.triggerOnChange(file);
    }

    _fileInputChangeHandler(e) {
        const file = this.$refs.fileInput.files[0];
        this._handleFile(file);
        this._setFileName(file.name);
        this.model.value = file.name;
    }
}

window.customElements.define('dddd-file', FileComponent);
