let ranges:RangeDetails[] = [];
let modules:Module[] = [];

function getMemoryValue(address:string, type:string) {
    var value = null;
    switch (type) {
        case "byte":
        case "S8":
        case "uint8":
            value = ptr(address).readS8();
            break;
        case "short":
        case "S16":
        case "uint16":
            value = ptr(address).readS16();
            break;
        case "int":
        case "S32":
        case "uint32":
            value = ptr(address).readS32();
            break;
        case "long":
        case "S64":
        case "uint64":
            value = ptr(address).readS64();
            break;
        case "float":
            value = ptr(address).readFloat();
            break;
        case "double":
            value = ptr(address).readDouble();
            break;
        case "pointer":
            value = ptr(address).readPointer();
            break;
        case "string":
            value = ptr(address).readUtf8String();
            break;
        default:
            break;
    }
    return value;
}

function getMemoryProtection(address:string) {
    let ranges = Process.enumerateRanges({
        protection: "---",
        coalesce: true,
    });

    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (ptr(address).compare(range.base) >= 0 && ptr(address).compare(range.base.add(range.size)) < 0) {
            return range.protection;
        }
    }
    return null;
}

function setMemoryValue(address:string, type:string, value:any){
    switch (type) {
        case "byte":
        case "S8":
        case "uint8":
            ptr(address).writeS8(value);
            break;
        case "short":
        case "S16":
        case "uint16":
            ptr(address).writeS16(value);
            break;
        case "int":
        case "S32":
        case "uint32":
            ptr(address).writeS32(value);
            break;
        case "long":
        case "S64":
        case "uint64":
            ptr(address).writeS64(value);
            break;
        case "float":
            ptr(address).writeFloat(value);
            break;
        case "double":
            ptr(address).writeDouble(value);
            break;
        case "pointer":
            ptr(address).writePointer(value);
            break;
        case "string":
            ptr(address).writeUtf8String(value);
            break;
        default:
            break;
    }
}

function setMemoryProtection(address:string, protection:string){
    var ranges = Process.enumerateRanges({
        protection: protection,
        coalesce: true,
    });
    for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (ptr(address).compare(range.base) >= 0 && ptr(address).compare(range.base.add(range.size)) < 0) {
            return range.protection;
        }
    }
    return null;
}

function scanMemoryAsync(base: NativePointer, size: number, pattern: string): Promise<MemoryScanMatch[]> {
    return new Promise((resolve, reject) => {
        let results: MemoryScanMatch[] = [];

        Memory.scan(base, size, pattern, {
            onMatch: (address, size) => {
                results.push({ address, size });
            },
            onComplete: () => {
                resolve(results);
            },
            onError: (err) => {
                reject(err);
            }
        });
    });
}

function matchesPattern(data: ArrayBuffer, pattern: string): boolean {
    const bytes = new Uint8Array(data);  // ArrayBuffer를 바이트 배열로 변환
    const patternBytes = pattern.split(" ").map((b) => (b === "??" ? null : parseInt(b, 16)));

    if (bytes.length < patternBytes.length) return false;

    for (let i = 0; i < patternBytes.length; i++) {
        if (patternBytes[i] !== null && bytes[i] !== patternBytes[i]) {
            return false;
        }
    }
    return true;
}


rpc.exports = {
    // Memory
    readMemory: (address:string, type:string) => getMemoryValue(address, type),
    getMemoryProtect: (address:string) => getMemoryProtection(address),
    writeMemory: (address:string, type:string, value:any) => setMemoryValue(address, type, value),
    setMemoryProtect: (address:string, protection:string) => setMemoryProtection(address, protection),
    // Module
    getRanges: () => {
        ranges = Process.enumerateRanges({
            protection: "---",
            coalesce: true,
        });
        return ranges;
    },
    getModules: () => {
        modules = Process.enumerateModules();
        return modules;
    },
    // Scan
    scanRanges: async (idxs: number[], pattern: string) => {
        const scanPromises = idxs.map(async (idx) => {
            const range = ranges[idx];
            return scanMemoryAsync(range.base, range.size, pattern);
        });
        const resultsArray = await Promise.all(scanPromises);
        return resultsArray.flat();
    },
    scanModules: async (idxs: number[], pattern: string) => {
        const scanPromises = idxs.map(async (idx) => {
            const module = modules[idx];
            return scanMemoryAsync(module.base, module.size, pattern);
        });
        const resultsArray = await Promise.all(scanPromises);
        return resultsArray.flat();
    },
    nextScan: async (ptrs: string[], pattern: string) => {
        let pointers:NativePointer[] = ptrs.map(pt => ptr(pt));
        const bytes = pattern.split(' ').length;
        pointers = pointers.filter(p => {
            try{
                const data = p.readByteArray(bytes);
                if (data === null) return false;
                return matchesPattern(data, pattern);
            } catch(e) {
                return false;
            }
        });
    },
    // Process
    arch: () => Process.arch,
    // Custom
    eval: (str: string) => eval(str),
}
