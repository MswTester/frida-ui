rpc.exports = {
    // Memory
    alloc: (size: number) => Memory.alloc(size),
    readByteArray: (address: NativePointer, size: number) => address.readByteArray(size),
    readUtf8String: (address: NativePointer) => address.readUtf8String(),
    readUtf16String: (address: NativePointer) => address.readUtf16String(),
    writeByteArray: (address: NativePointer, bytes: ArrayBuffer) => address.writeByteArray(bytes),
    writeUtf8String: (address: NativePointer, str: string) => address.writeUtf8String(str),
    writeUtf16String: (address: NativePointer, str: string) => address.writeUtf16String(str),
    // Process
    enumerateModules: () => Process.enumerateModules(),
    enumerateRanges: (protection: string) => Process.enumerateRanges(protection),
    enumerateThreads: () => Process.enumerateThreads(),
    findModuleByAddress: (address: NativePointer) => Process.findModuleByAddress(address),
    findModuleByName: (name: string) => Process.findModuleByName(name),
    // Module
    enumerateExports: (module: Module) => module.enumerateExports(),
    enumerateImports: (module: Module) => module.enumerateImports(),
    enumerateSymbols: (module: Module) => module.enumerateSymbols(),
    // Thread
    enumerateBacktrace: (context: CpuContext) => Thread.backtrace(context),
    // Interceptor
    attach: (target: NativePointer, callbacks: InvocationListenerCallbacks) => Interceptor.attach(target, callbacks),
    detachAll: () => Interceptor.detachAll(),
    // Java
    choose: (className: string) => Java.use(className),
    enumerateLoadedClasses: () => Java.enumerateLoadedClassesSync(),
    perform: (className: string, method: string, ...args: any[]) => Java.perform(() => Java.use(className)[method](...args)),
}