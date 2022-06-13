class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [];
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        let h = this.hashCode(key);
        for (let i = h; i < this.length; i++) {
            if (this.hashTable[i] != null && this.hashTable[i].key == key) {
                return this.hashTable[i].value;
            }
        }
        return null;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {   
        let h = this.hashCode(key);
        for (let i = h; i < this.length; i++) {
            if (this.hashTable[i] != null && this.hashTable[i].key == key) {
                this.hashTable[i] = null;
                this.size--;
                return;
            }
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {
        let h = this.hashCode(key);
        for (let i = h; i < this.length; i++) {
            if (this.hashTable[i] == null) {
                this.hashTable[i] = new KeyValuePair(key, item);
                this.size++;
                return;
            }
            if (this.hashTable[i].key == key) {
                this.hashTable[i] = new KeyValuePair(key, item);
                return;
            }
        }

        let baseLen = this.length;
        let putted = false;
        let tTable = this.hashTable;
        while (!putted) {
            this.length = this.length * 2;
            this.hashTable = [];
            for (let i = 0; i < this.length; i++) {
                this.hashTable[i] = null;
            }
            for (let i = 0; i < baseLen; i++) {
                if (tTable[i] != null) {
                    let th = this.hashCode(tTable[i].key);
                    for (let j = th; j < this.length; j++) {
                        if (this.hashTable[j] == null) {
                            this.hashTable[j] = tTable[i];
                            putted = true;
                            break;
                        }
                    }
                    if (!putted) {
                        break;
                    }
                }
            }
            // resize failed, try to resize again.
            if (!putted) {
                continue;
            }
            // resize success, so try to put item again.
            h = this.hashCode(key);
            for (let i = h; i < this.length; i++) {
                if (this.hashTable[i] == null) {
                    this.hashTable[i] = new KeyValuePair(key, item);
                    this.size++;
                    putted = false;
                    break;
                }
                if (this.hashTable[i].key == key) {
                    this.hashTable[i] = new KeyValuePair(key, item);
                    putted = false;
                    break;
                }
            }
            // if put item failed, resize again.
            putted = !putted;
        }
    }
    
    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};