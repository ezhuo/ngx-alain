import * as common from './object';
import { app } from '../config.inc';

export default class Storage {
    private $cache = null;

    static local() {
        return new Storage('localStorage');
    }

    static session() {
        return new Storage('sessionStorage');
    }

    constructor($cache) {
        this.$cache = window[$cache];
    }

    private getKey(k) {
        return app.key.toString() + '-' + k;
    }

    set(key, value) {
        if (common.isObject(value) || common.isArray(value)) {
            return this.$cache.setItem(this.getKey(key), JSON.stringify(value));
        } else {
            return this.$cache.setItem(this.getKey(key), value);
        }
    }

    get(key) {
        return this.$cache.getItem(this.getKey(key));
    }

    remove(key) {
        return this.$cache.removeItem(this.getKey(key));
    }

    clear() {
        return this.$cache.clear();
    }

    exists(key) {
        return this.get(this.getKey(key)) || false;
    }
}
