// Base class
import Component from '../../../baseClasses/Component';

// Style
import style from './style.css';

// Template
import template from './template.html';

// Constants
const CLASS_DROP_AREA = 'drop-area';
const TYPE_THREE = 'TYPE_THREE';
const TYPE_IMAGE = 'TYPE_IMAGE';

export default class ImageComponent extends Component {
    constructor() {
        super({ style, template });
    }

    created() {
        // Data
        this._contain = this.model.options.contain;
        this._previewImage = null;
        this._type = this._getType();

        // Setup
        this._bindHandlers();
    }

    connected() {
        this._addPreviewImage(this.model.value);
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

    _getType() {
        const value = this.model.value;
        if (value.isTexture) {
            return TYPE_THREE;
        } else {
            return TYPE_IMAGE;
        }
    }

    _handleFile(file) {
        const reader = new FileReader();
        reader.onloadend = this._fileLoadedHandler;
        reader.readAsDataURL(file);
    }

    _removePreviewImage() {
        if (this._previewImage) {
            this.$refs.imageContainer.removeChild(this._previewImage);
            this._previewImage = null;
        }
    }

    _addPreviewImage(image) {
        if (!image) return;

        if (this._type === TYPE_THREE) {
            if (this.model.value.image) {
                this._previewImage = document.createElement('img');
                this._previewImage.src = this.model.value.image.src;
                this.$refs.imageContainer.appendChild(this._previewImage);
            }
        } else {
            this._previewImage = document.createElement('img');
            this._previewImage.src = image;
            this.$refs.imageContainer.appendChild(this._previewImage);
        }
    }

    _showDropArea() {
        this.$refs.imageContainer.classList.add(CLASS_DROP_AREA);
    }

    _hideDropArea() {
        this.$refs.imageContainer.classList.remove(CLASS_DROP_AREA);
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
        const image = e.target.result;
        if (this._type === TYPE_THREE) {
            if (this.model.value.image) {
                this.model.value.image.src = image;
            } else {
                this.model.value.image = new Image();
                this.model.value.image.src = image;
            }

            this.model.value.needsUpdate = true;
        } else {
            this.model.value = image;
        }
        this._removePreviewImage();
        this._addPreviewImage(image);
    }

    _fileInputChangeHandler(e) {
        const file = this.$refs.fileInput.files[0];
        this._handleFile(file);
    }
}

window.customElements.define('dddd-image', ImageComponent);
