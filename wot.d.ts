/// <reference path="Dataset.d.ts" />
declare module wot {
    class Ajax {
        private log;
        private listeners;
        private runningCount;
        constructor(sc: ServiceContext);
        public addListener(cb: Function): void;
        /**
        * <pre><code>opt = {
        * 	'get'?: {
        * 		'baseUrl'?: string,
        * 		'rDataType'?: 'json|script|css|text|detect',
        * 		'attempts'?: integer // on XHR fail or malformed received JSON
        * 	},
        * 	'post'?: {
        * 		'url'?: string,
        * 		'rDataType'?: 'json|script|css|text|detect',
        * 		'sAsJson'?: string, // contains the parameter name
        * 		'attempts'?: integer // on XHR fail or HTTP 400 or malformed received JSON
        * 	}
        * }</code></pre>
        */
        public createCustom(opt: any): CustomAjax;
        /**
        * <pre><code>opt = {
        * 	'method': 'GET|POST|PUT|DELETE',
        * 	'url': string,
        * 	'sData'?: {},
        * 	'done'?: Function,
        * 	'fail'?: Function,
        * 	'rDataType'?: 'json|script|css|text|detect', [default: 'json']
        * 	'sAsJson'?: string, // contains the parameter name
        * 	'attempts'?: integer [default: 1] // on XHR fail or malformed received JSON // TODO
        * }</code></pre>
        */
        public ajax(opt: any): void;
        /**
        * <pre><code>opt = {
        * 	'url': string,
        * 	'sData'?: {},
        * 	'done'?: Function,
        * 	'fail'?: Function,
        * 	'rDataType'?: 'json|script|css|text|detect', [default: 'json']
        * 	'attempts'?: integer [default: 1] // on XHR fail or malformed received JSON
        * }</code></pre>
        */
        public get(opt: any): void;
        /**
        * <pre><code>bundleOpt = {
        * 	'urls': [opt],
        * 	'done'?: Function,
        * 	'fail'?: Function
        * }</code></pre>
        */
        public bundleAjax(bundleOpt: any): void;
        /**
        * <pre><code>opt = {
        * 	'url': string,
        * 	'sData'?: {},
        * 	'done'?: Function,
        * 	'fail'?: Function,
        * 	'rDataType'?: 'json|script|css|text|detect', [default: 'json']
        * 	'sAsJson'?: string, // contains the parameter name
        * 	'attempts'?: integer [default: 1] // on XHR fail or HTTP 400 or malformed received JSON
        * }</code></pre>
        */
        public post(opt: any): void;
        /**
        * <pre><code>opt = {
        * 	'url': string,
        * 	'sData'?: {},
        * 	'sFiles': {}[],
        * 	'done'?: Function,
        * 	'fail'?: Function,
        * 	'rDataType'?: 'json|script|css|text|detect', [default: 'json']
        * 	'sAsJson'?: string, // contains the parameter name
        * 	'attempts'?: integer [default: 1] // on XHR fail or HTTP 400 or malformed received JSON
        * }</code></pre>
        */
        public upload(opt: any): void;
        private doAjax(method, opt);
        private safelyDone(rData, statusCode, rDataType, opt);
        private safelyFail(statusCode, statusText, opt);
        private safelyUpdateStatus(running);
        private static doXHR(method, url, sData, rDataType, doneCallback, failCallback);
        private static jsonParse(s);
        private static jsonStringify(o);
        private static isArray(data);
    }
    class CustomAjax {
        private ajaxSrv;
        private defaultGet;
        private defaultPost;
        /**
        * <pre><code>defaultOpt = {
        * 	'get'?: {
        * 		'baseUrl'?: string,
        * 		'rDataType'?: 'json|script|text|detect',
        * 		'attempts'?: integer // on XHR fail or malformed received JSON
        * 	},
        * 	'post'?: {
        * 		'url'?: string,
        * 		'rDataType'?: 'json|script|text|detect',
        * 		'sAsJson'?: string, // contains the parameter name
        * 		'attempts'?: integer // on XHR fail or HTTP 400 or malformed received JSON
        * 	}
        * }</code></pre>
        */
        constructor(ajaxSrv: Ajax, defaultOpt: any);
        public ajax(opt: any): void;
        public get(opt: any): void;
        /**
        * <pre><code>bundleOpt = {
        * 	'urls': [opt],
        * 	'done'?: Function,
        * 	'fail'?: Function
        * }</code></pre>
        */
        public bundleAjax(bundleOpt: any): void;
        public post(opt: any): void;
        public upload(opt: any): void;
        private makeAjaxOpt(opt);
        private makeGetOpt(opt, withMethod);
        private makePostOpt(opt, withMethod);
    }
}
declare module wot {
    interface BundleMain {
        start(element: any): void;
    }
    interface Component {
        compose? (...props: any[]): Component;
        setData? (...data: any[]): Component;
        getElement? (): HTMLElement;
        reset? (): Component;
        show? (): Component;
        hide? (): Component;
        setEnabled? (b: boolean): Component;
        destroy(): void;
    }
    interface LiveState {
        isLive(): boolean;
        addLiveListener(cb: (live: boolean) => void): void;
    }
    interface Dialog {
        getDialogElement(): any;
        setDialogOpened(): void;
        setDialogClosed(): void;
    }
    /**
    * The services that implement this interface can be declared as an alias of wot.Dialogs
    */
    interface Dialogs {
        /**
        * @param dialog wot.Dialog
        * @param forcedOpen boolean
        * @param hideBelow boolean
        * @returns {number} The dialog ID
        */
        addDialog(dialog: Dialog, forcedOpen?: any, hideBelow?: any): number;
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
        openDisposableDialog(dialogElem: any, setClosedCallback?: Function, forcedOpen?: any, hideBelow?: any): Function;
        clearDialogs(): boolean;
        showInfo(msgHtml: string): void;
        showWarning(msgHtml: string): void;
        reportError(e: any): void;
        /**
        * @param msgHtml
        * @param buttonList [{'label': string, 'callback': Function, 'ajax'?: boolean}]
        */
        showConfirm(msgHtml: string, buttonList: any[]): void;
    }
    class ApplicationContext {
        public properties: {};
        private debug;
        private libraries;
        private services;
        private components;
        private bundles;
        private loader;
        constructor(properties: {}, debug?: boolean);
        public isDebug(): boolean;
        public getService(serviceName: any): any;
        public createComponent(componentName: string, props: {}, st: LiveState): any;
        public getServiceContext(serviceName: string): ServiceContext;
        public getComponentTypeContext(componentName: string): ComponentTypeContext;
        /**
        * Available options:
        * <pre>{
        * 	'autoLoadCss': boolean,
        * 	'version': string,
        * 	'w': boolean,
        * 	'start': -DOM-element-,
        * 	'done': Function,
        * 	'fail': Function
        * }</pre>
        * @param bundlePath
        * @param opt
        */
        public loadBundle(bundlePath: string, opt?: {}): void;
        public hasLib(libName: any): boolean;
        public includeLib(libName: any): boolean;
        public requireLib(libName: any): void;
        public requireService(serviceName: any): void;
        public requireComponent(componentName: any): void;
    }
    class ServiceContext {
        private ac;
        private serviceName;
        private serviceBaseUrl;
        private service;
        constructor(ac: ApplicationContext, serviceName: string, serviceBaseUrl: string, cl: any);
        public getApplicationContext(): ApplicationContext;
        public getServiceName(): string;
        public getServiceBaseUrl(): string;
        public getOwnService(): any;
        public getService(serviceName: any): any;
        public createComponent(componentName: string, props: {}, st: LiveState): any;
        public hasLib(libName: any): boolean;
        public includeLib(libName: any): boolean;
        public requireLib(libName: any): void;
        public requireService(serviceName: any): void;
        public requireComponent(componentName: any): void;
    }
    class ComponentContext {
        private ac;
        private ctc;
        private st;
        private compList;
        private rmCbList;
        constructor(ac: ApplicationContext, ctc: ComponentTypeContext, st: LiveState);
        public getApplicationContext(): ApplicationContext;
        public getLiveState(): LiveState;
        public getComponentName(): string;
        public getComponentBaseUrl(): string;
        public getTemplate(sel: string, elMap?: {}): HTMLElement;
        public createOwnComponent(props?: {}, st?: LiveState): any;
        public createComponent(componentName: string, props?: {}, st?: LiveState): any;
        public getService(serviceName: any): any;
        public hasLib(libName: any): boolean;
        public includeLib(libName: any): boolean;
        public requireLib(libName: any): void;
        public requireService(serviceName: any): void;
        public requireComponent(componentName: any): void;
        public addComp(comp: Component): Component;
        public addListenerRm(cb: Function): void;
        public propagReset(): void;
        public propagSetEnabled(b: boolean): void;
        public propagCall(method: string, arg?: any): void;
        public propagDestroy(): void;
    }
    class ComponentTypeContext {
        private ac;
        private componentName;
        private componentBaseUrl;
        private tplArr;
        private tplSel;
        private tplLab;
        constructor(ac: ApplicationContext, componentName: string, componentBaseUrl: string, tplArr: {}, tplSel: {}, tplLab: {});
        public getComponentName(): string;
        public getComponentBaseUrl(): string;
        public getTemplate(sel: string, elMap?: {}): HTMLElement;
        public createOwnComponent(props: {}, st: LiveState): any;
        private fillPlaceholders(el, elMap);
        private fillLabels(el);
        private static getElementsByClassName(className, fromElem);
    }
}
declare module wot {
    class Log {
        private hasConsole;
        private debug;
        private listeners;
        constructor(sc: ServiceContext);
        /**
        *
        * @param cb This function must return TRUE if the message is successfully logged
        */
        public addListener(cb: Function): void;
        public error(msg: string, stack?: any): void;
        public info(msg: any): void;
        public warning(msg: any): void;
        public trace(msg: string): void;
        public unexpectedErr(err: any): void;
        private fireEvent(type, msg, errStack?);
    }
}
declare module wot {
    interface UrlProps {
        relUrl: string;
        args: {
            string: string;
        };
        sel: string;
        title?: string;
    }
    interface UrlController {
        fillUrlProps(props: UrlProps): boolean;
    }
    class Router {
        private sc;
        private log;
        private listeners;
        private selList;
        private baseUrl;
        private firstRelUrl;
        private withHistory;
        private withHashBang;
        private curUrlProps;
        constructor(sc: ServiceContext);
        /**
        *
        * @param selList
        * @param urlController
        * @returns Function A callback that deletes the added selectors
        */
        public addSelectors(selList: string[], urlController: UrlController): Function;
        public start(opt?: {}): void;
        /**
        * @param cb The listener
        * @returns Function a callback for removing the listener
        */
        public addChangeListener(cb: Function): Function;
        /**
        * @param cb The listener
        * @returns Function a callback for removing the listener
        */
        public addBeforeListener(cb: Function): Function;
        public goTo(relUrl: string): boolean;
        public getCurrentUrlProps(): UrlProps;
        private doGoTo(relUrl, changeHist);
        private addListener(type, cb);
        private fireListeners(type, up, stopOnFalse?);
        private static matchRelUrl(relUrl, regex, keys);
        private static pathToRegexp(path, keys, sensitive, strict);
        private static appendUrl(a, b);
        private static getDefaultFirstRelUrl(baseUrl, withHashBang);
    }
}