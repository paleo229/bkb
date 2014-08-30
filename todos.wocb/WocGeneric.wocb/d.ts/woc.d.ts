declare module Woc {

  // ##
  // ## These interfaces are implemented by the user classes
  // ##

  // Service:
  // constructor: function (sc: Woc.ServiceContext)
  // constructor: function (ac: Woc.ApplicationContext, sc: Woc.ServiceContext)

  /**
   * constructor: function (cc: Woc.ComponentContext, props: any)
   * constructor: function (ac: Woc.ApplicationContext, cc: Woc.ComponentContext, props: any)
   */
  interface Component {
    attachTo?(...elements: HTMLElement[]): Component;
    detach?(): Component;
    show?(): Component;
    hide?(): Component;
    setEnabled?(b: boolean): Component;
    destructInDOM?(): void;
    destruct?(): void;
  }

  interface Initializer {
    init(): void;
  }

  interface StartingPointService {
    start(element: HTMLElement): void;
  }

  interface TemplateEngineService {
    makeProcessor(tplStr: string, prop: EmbedProperties): TemplateProcessor;
  }

  interface EmbedProperties {
    name: string;
    baseUrl: string;
  }

  /**
   * constructor: function (ctc: ComponentTypeContext, tplStr: string)
   */
  interface TemplateProcessor {
    getContextMethods(): {[index: string]: Function};
  }

  interface Dialog {
    getDialogElement(): any;
    setDialogOpened(): void;
    setDialogClosed(): void;
  }

  /**
   * The services that implement this interface can be declared as an alias of Woc.Dialogs
   */
  interface Dialogs {
    /**
     * @param dialog Woc.Dialog
     * @param forcedOpen boolean
     * @param hideBelow boolean
     * @returns {number} The dialog ID
     */
    addDialog(dialog: Dialog, forcedOpen?, hideBelow?): number;
    openDialog(dialogId: number): void;
    closeDialog(dialogId: number): boolean;
    removeDialog(dialogId: number): void;
    /**
     *
     * @param dialogElem
     * @param setClosedCallback
     * @param forcedOpen boolean
     * @param hideBelow boolean
     * @returns Function A callback for closing the dialog (the callback returns TRUE when dialog is closed, FALSE when the dialog remains)
     */
    openDisposableDialog(dialogElem, setClosedCallback?: Function, forcedOpen?, hideBelow?): Function;
    clearDialogs(): boolean;
    showInfo(msgHtml: string): void;
    showWarning(msgHtml: string): void;
    reportError(e): void;
    /**
     * @param msgHtml
     * @param buttonList [{'label': string, 'callback': Function, 'ajax'?: boolean}]
     */
    showConfirm(msgHtml: string, buttonList: any[]): void;
  }

  /**
   * The services that implement this interface can be declared as an alias of Woc.Log
   */
  interface Log {
    error(msg: any): void;
    info(msg: any): void;
    warning(msg: any): void;
    trace(msg: any): void;
    wrap(cb: () => void): void;
  }

  // ##
  // ## Contexts
  // ##

  interface AppProperties {
    /**
     * The root URL for the Woc application
     */
    wocUrl: string;
    /**
     * The base URL for links to pages or external resources
     */
    baseUrl: string;
  }

  interface AppConfig extends AppProperties {
    /**
     * The relative URL of the application page to open first
     */
    firstRelUrl: string;
  }

  interface BundleLoadingOptions {
    name: string;
    version: string;
    autoLoadCss: boolean;
    w: boolean;
  }

  interface ApplicationContext {
    appConfig: AppConfig;
    appProperties: AppProperties;
    loadBundles(optList: BundleLoadingOptions[]): Promise<void>;
    start(el: HTMLElement, startingPointName: string, preload?: BundleLoadingOptions[]): Promise<void>;
    getDebugTree(): {};
  }

  interface SingletonContext {
    getService<S>(serviceName: string): S;
    getService(serviceName: string): any;
    createComponent<C>(componentName: string, props?: {}): C;
    createComponent(componentName: string, props?: {}): any;
    removeComponent(c: Component, fromDOM?: boolean): void;
    removeComponent(cList: Component[], fromDOM?: boolean): void;
    hasLibrary(libName: string): boolean;
    hasLibrary(libName: string[]): boolean;
    evalLibrary(libName: string): void;
    evalLibrary(libName: string[]): void;
    evalService(serviceName: string): void;
    evalService(serviceName: string[]): void;
    evalComponent(componentName: string): void;
    evalComponent(componentName: string[]): void;
    getName(): string;
    getBaseUrl(): string;
    appConfig: AppConfig;
  }

  interface ServiceContext extends SingletonContext {
  }

  interface InitializerContext extends SingletonContext {
  }

  interface ComponentContext {
    getService<S>(serviceName: string): S;
    getService(serviceName: string): any;
    createComponent<C>(componentName: string, props?: {}): C;
    createComponent(componentName: string, props?: {}): any;
    removeComponent(c: Component, fromDOM?: boolean): void;
    removeComponent(cList: Component[], fromDOM?: boolean): void;
    hasLibrary(libName: string): boolean;
    hasLibrary(libName: string[]): boolean;
    evalLibrary(libName: string): void;
    evalLibrary(libName: string[]): void;
    evalService(serviceName: string): void;
    evalService(serviceName: string[]): void;
    evalComponent(componentName: string): void;
    evalComponent(componentName: string[]): void;
    getName(): string;
    getBaseUrl(): string;
    appProperties: AppProperties;
  }

  // ##
  // ## Ajax service
  // ##

  interface Ajax {
    /**
     * * method: 'GET|POST|PUT|DELETE|HEAD'
     * * rDataType: 'json|script|text' [default: 'json']
     * * sAsJson: contains the parameter name
     */
    ajax(method: string, url: string, opt?: {
          sData?: {};
          rDataType?: string;
          sAsJson?: string;
        }): Promise<any>;

    /**
     * * rDataType: 'json|script|text' [default: 'json']
     * * sAsJson: contains the parameter name
     */
    get(url: string, opt?: {
          sData?: {};
          rDataType?: string;
          sAsJson?: string;
        }): Promise<any>;

    /**
     * * rDataType: 'json|script|text' [default: 'json']
     * * sAsJson: contains the parameter name
     */
    head(url: string, opt?: {
          sData?: {};
          rDataType?: string;
          sAsJson?: string;
        }): Promise<any>;

    /**
     * * rDataType: 'json|script|text' [default: 'json']
     * * sAsJson: contains the parameter name
     */
    post(url: string, opt?: {
          sData?: {};
          rDataType?: string;
          sAsJson?: string;
        }): Promise<any>;

    /**
     * * rDataType: 'json|script|text' [default: 'json']
     * * sAsJson: contains the parameter name
     */
    put(url: string, opt?: {
          sData?: {};
          rDataType?: string;
          sAsJson?: string;
        }): Promise<any>;

    /**
     * * rDataType: 'json|script|text' [default: 'json']
     * * sAsJson: contains the parameter name
     */
    delete(url: string, opt?: {
          sData?: {};
          rDataType?: string;
          sAsJson?: string;
        }): Promise<any>;
  }
}

// ##
// ## Utils
// ##

declare module Woc {
  function globalEval(script: string): void;
  function toClass(s: string): any;
}

// Type definitions for es6-promise
// Project: https://github.com/jakearchibald/ES6-Promise
// Definitions by: François de Campredon <https://github.com/fdecampredon/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface Thenable<R> {
  then<U>(onFulfilled?: (value: R) => Thenable<U>,  onRejected?: (error: any) => Thenable<U>): Thenable<U>;
  then<U>(onFulfilled?: (value: R) => Thenable<U>, onRejected?: (error: any) => U): Thenable<U>;
  then<U>(onFulfilled?: (value: R) => Thenable<U>, onRejected?: (error: any) => void): Thenable<U>;
  then<U>(onFulfilled?: (value: R) => U, onRejected?: (error: any) => Thenable<U>): Thenable<U>;
  then<U>(onFulfilled?: (value: R) => U, onRejected?: (error: any) => U): Thenable<U>;
  then<U>(onFulfilled?: (value: R) => U, onRejected?: (error: any) => void): Thenable<U>;
}

declare class Promise<R> implements Thenable<R> {
  /**
   * If you call resolve in the body of the callback passed to the constructor,
   * your promise is fulfilled with result object passed to resolve.
   * If you call reject your promise is rejected with the object passed to resolve.
   * For consistency and debugging (eg stack traces), obj should be an instanceof Error.
   * Any errors thrown in the constructor callback will be implicitly passed to reject().
   */
  constructor(callback: (resolve : (result?: R) => void, reject: (error: any) => void) => void);
  /**
   * If you call resolve in the body of the callback passed to the constructor,
   * your promise will be fulfilled/rejected with the outcome of thenable passed to resolve.
   * If you call reject your promise is rejected with the object passed to resolve.
   * For consistency and debugging (eg stack traces), obj should be an instanceof Error.
   * Any errors thrown in the constructor callback will be implicitly passed to reject().
   */
  constructor(callback: (resolve : (thenable?: Thenable<R>) => void, reject: (error: any) => void) => void);

  /**
   * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
   * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
   * Both callbacks have a single parameter , the fulfillment value or rejection reason.
   * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
   * If an error is thrown in the callback, the returned promise rejects with that error.
   *
   * @param onFulfilled called when/if "promise" resolves
   * @param onRejected called when/if "promise" rejects
   */
  then<U>(onFulfilled?: (value: R) => Thenable<U>,  onRejected?: (error: any) => Thenable<U>): Promise<U>;
  /**
   * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
   * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
   * Both callbacks have a single parameter , the fulfillment value or rejection reason.
   * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
   * If an error is thrown in the callback, the returned promise rejects with that error.
   *
   * @param onFulfilled called when/if "promise" resolves
   * @param onRejected called when/if "promise" rejects
   */
  then<U>(onFulfilled?: (value: R) => Thenable<U>, onRejected?: (error: any) => U): Promise<U>;
  /**
   * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
   * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
   * Both callbacks have a single parameter , the fulfillment value or rejection reason.
   * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
   * If an error is thrown in the callback, the returned promise rejects with that error.
   *
   * @param onFulfilled called when/if "promise" resolves
   * @param onRejected called when/if "promise" rejects
   */
  then<U>(onFulfilled?: (value: R) => Thenable<U>,  onRejected?: (error: any) => void): Promise<U>;
  /**
   * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
   * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
   * Both callbacks have a single parameter , the fulfillment value or rejection reason.
   * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
   * If an error is thrown in the callback, the returned promise rejects with that error.
   *
   * @param onFulfilled called when/if "promise" resolves
   * @param onRejected called when/if "promise" rejects
   */
  then<U>(onFulfilled?: (value: R) => U, onRejected?: (error: any) => Thenable<U>): Promise<U>;
  /**
   * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
   * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
   * Both callbacks have a single parameter , the fulfillment value or rejection reason.
   * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
   * If an error is thrown in the callback, the returned promise rejects with that error.
   *
   * @param onFulfilled called when/if "promise" resolves
   * @param onRejected called when/if "promise" rejects
   */
  then<U>(onFulfilled?: (value: R) => U, onRejected?: (error: any) => U): Promise<U>;
  /**
   * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
   * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
   * Both callbacks have a single parameter , the fulfillment value or rejection reason.
   * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
   * If an error is thrown in the callback, the returned promise rejects with that error.
   *
   * @param onFulfilled called when/if "promise" resolves
   * @param onRejected called when/if "promise" rejects
   */
  then<U>(onFulfilled?: (value: R) => U, onRejected?: (error: any) => void): Promise<U>;

  /**
   * Sugar for promise.then(undefined, onRejected)
   *
   * @param onRejected called when/if "promise" rejects
   */
  catch<U>(onRejected?: (error: any) => Thenable<U>): Promise<U>;
  /**
   * Sugar for promise.then(undefined, onRejected)
   *
   * @param onRejected called when/if "promise" rejects
   */
  catch<U>(onRejected?: (error: any) => U): Promise<U>;
  /**
   * Sugar for promise.then(undefined, onRejected)
   *
   * @param onRejected called when/if "promise" rejects
   */
  catch<U>(onRejected?: (error: any) => void): Promise<U>;
}

declare module Promise {
  /**
   * Returns promise (only if promise.constructor == Promise)
   */
  function cast<R>(promise: Promise<R>): Promise<R>;
  /**
   * Make a promise that fulfills to obj.
   */
  function cast<R>(object: R): Promise<R>;

  /**
   * Make a new promise from the thenable.
   * A thenable is promise-like in as far as it has a "then" method.
   * This also creates a new promise if you pass it a genuine JavaScript promise, making it less efficient for casting than Promise.cast.
   */
  function resolve<R>(thenable?: Thenable<R>): Promise<R>;
  /**
   * Make a promise that fulfills to obj. Same as Promise.cast(obj) in this situation.
   */
  function resolve<R>(object?: R): Promise<R>;

  /**
   * Make a promise that rejects to obj. For consistency and debugging (eg stack traces), obj should be an instanceof Error
   */
  function reject(error: any): Promise<any>;

  /**
   * Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects.
   * the array passed to all can be a mixture of promise-like objects and other objects.
   * The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
   */
  function all<R>(promises: Promise<R>[]): Promise<R[]>;

  /**
   * Make a Promise that fulfills when any item fulfills, and rejects if any item rejects.
   */
  function race<R>(promises: Promise<R>[]): Promise<R>;
}

declare module 'es6-promise' {
  var foo: typeof Promise; // Temp variable to reference Promise in local context
  module rsvp {
    export var Promise: typeof foo;
  }
  export = rsvp;
}
