export default class GroupCollection {
    constructor() {
        this._groups = [];
    }

    /**
     * Public
     */
    add(group) {
        this._groups.push(group);
    }

    remove(group) {
        const index = this._groups.indexOf(group);
        if (index > -1) this._groups.splice(index, 1);
    }

    serialize() {
        const groups = [];
        for (let i = 0, len = this._groups.length; i < len; i++) {
            groups.push(this._groups[i].serialize());
        }
        return groups;
    }
}
