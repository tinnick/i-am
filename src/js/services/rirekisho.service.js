export class RirekishoService {
    localStorageKey = '履歴書s';
    storageCopy = [];

    constructor(storageKey) {
        if (storageKey) {
            this.localStorageKey = storageKey;
        }

        this.storageCopy = this.getAll();
    }

    get(name) {
        return this.storageCopy.find(item => item.name === name);
    }
    
    getAll() {
        return JSON.parse(localStorage.getItem(this.localStorageKey));
    }
    
    push(data) {
        const itemIndex = this.storageCopy.findIndex(item => item.name === data.name);
        
        if (itemIndex < 0) {
            this.storageCopy.push(data);
        } else {
            this.storageCopy[itemIndex] = data;
        }
        
        this.sync();
    }
    
    update(data) {
        const itemIndex = this.storageCopy.findIndex(item => item.name === data.name);
        
        if (itemIndex < 0) {
            this.storageCopy.push(data);
        } else {
            const currentData = this.storageCopy[itemIndex];

            this.storageCopy[itemIndex] = Object.assign(currentData, data);
        }

        this.sync();
    }
    
    delete(name) {
        const itemIndex = this.storageCopy.findIndex(item => item.name === name);

        if (itemIndex < 0) {
            return;
        } else {
            this.storageCopy.splice(itemIndex, 1);
        }
        
        this.sync();
    }
    
    sync() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.storageCopy));
    }
}

export const rirekishoService = new RirekishoService();