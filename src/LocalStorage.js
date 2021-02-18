class LocalStorage {
    /**
     * Public
     */
    set(key, object) {
        const value = JSON.parse(localStorage.getItem(key)) || {};
        Object.assign(value, object);
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key, property) {
        const value = JSON.parse(localStorage.getItem(key)) || {};
        return value[property];
    }
}

export default new LocalStorage();
