let pt = Module.findExportByName(null, "ptrace")
if(pt){
    Interceptor.attach(pt, {
        onEnter: function (args) {
            console.log("[🔥] ptrace() 호출됨, 우회 처리");
            
            // `PTRACE_TRACEME` 요청이면, 무력화
            if (args[0].toInt32() === 0) {
                console.log("[🚀] Anti-Debugging 우회 성공!");
                this.returnValue = 0; // ptrace() 호출을 무력화
            }
        }
    });
}

rpc.exports = {
    // Memory
    alloc: (size: number) => Memory.alloc(size),
    readByteArray: (address: NativePointer, size: number) => address.readByteArray(size),
    readU8: (address: NativePointer) => address.readU8(),
    readU16: (address: NativePointer) => address.readU16(),
    readU32: (address: NativePointer) => address.readU32(),
    readS8: (address: NativePointer) => address.readS8(),
    readS16: (address: NativePointer) => address.readS16(),
    readS32: (address: NativePointer) => address.readS32(),
    readFloat: (address: NativePointer) => address.readFloat(),
    readDouble: (address: NativePointer) => address.readDouble(),
    readUtf8String: (address: NativePointer) => address.readUtf8String(),
    readUtf16String: (address: NativePointer) => address.readUtf16String(),
    writeByteArray: (address: NativePointer, bytes: ArrayBuffer) => address.writeByteArray(bytes),
    writeU8: (address: NativePointer, value: number) => address.writeU8(value),
    writeU16: (address: NativePointer, value: number) => address.writeU16(value),
    writeU32: (address: NativePointer, value: number) => address.writeU32(value),
    writeS8: (address: NativePointer, value: number) => address.writeS8(value),
    writeS16: (address: NativePointer, value: number) => address.writeS16(value),
    writeS32: (address: NativePointer, value: number) => address.writeS32(value),
    writeFloat: (address: NativePointer, value: number) => address.writeFloat(value),
    writeDouble: (address: NativePointer, value: number) => address.writeDouble(value),
    writeUtf8String: (address: NativePointer, str: string) => address.writeUtf8String(str),
    writeUtf16String: (address: NativePointer, str: string) => address.writeUtf16String(str),
    protect: (address: NativePointer, size: number, protection: string) => Memory.protect(address, size, protection),
    scanSync: (address: NativePointer, size: number, pattern: string) => Memory.scanSync(address, size, pattern),
    // Process
    arch: () => Process.arch,
    enumerateModules: () => Process.enumerateModules(),
    enumerateRanges: (protection: string) => Process.enumerateRanges(protection),
    enumerateMallocRanges: () => Process.enumerateMallocRanges(),
    enumerateThreads: () => Process.enumerateThreads(),
    findModuleByAddress: (address: NativePointer) => Process.findModuleByAddress(address),
    findModuleByName: (name: string) => Process.findModuleByName(name),
    findRangeByAddress: (address: NativePointer) => Process.findRangeByAddress(address),
    // Module
    base: (module: Module) => module.base,
    name: (module: Module) => module.name,
    size: (module: Module) => module.size,
    enumerateExports: (module: Module) => module.enumerateExports(),
    enumerateImports: (module: Module) => module.enumerateImports(),
    enumerateSymbols: (module: Module) => module.enumerateSymbols(),
    ensureInitialized: (name: string) => Module.ensureInitialized(name),
    // Thread
    enumerateBacktrace: (context: CpuContext) => Thread.backtrace(context),
    // Interceptor
    attach: (target: NativePointer, callbacks: InvocationListenerCallbacks) => Interceptor.attach(target, callbacks),
    detachAll: () => Interceptor.detachAll(),
    // Java
    choose: (className: string) => Java.use(className),
    enumerateLoadedClasses: () => Java.enumerateLoadedClassesSync(),
    perform: (className: string, method: string, ...args: any[]) => Java.perform(() => Java.use(className)[method](...args)),
    // ObjC
    chooseObjC: (className: string) => ObjC.classes[className],
    enumerateObjCClasses: () => ObjC.classes,
}

