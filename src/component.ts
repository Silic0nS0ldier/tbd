export interface IRenderCallback {
    (component?: Component): void;
}

export interface IContext {
    [key: string]: any
}

export interface IStateCallback<TState, TProps> {
    (prevState: TState, prevProps: TProps): TState;
}

export abstract class Component<TProps extends object = object, TState extends object = object> {
    /**
     * Base Component class.
     * 
     * @param props The initial component props.
     * @param context Context objects from components' parents.
     */
    constructor(props: TProps, context: IContext[]) {
        this.context = context;
        this.props = props;
    }

    /**
     * Context objects from components' parents.
     * 
     * First index (context) will be furthest from component. This makes it easier to build the array
     * and encourages using a backwards iteration which effectively caching the array length. Just a
     * good habit. 🤷‍
     */
    public context: IContext[];

    /**
     * Components' props.
     */
    public props: TProps;

    /**
     * Components' current state.
     */
    public state: TState = {} as TState;

    /**
     * Callbacks to execute after render. Callback is removed once called.
     */
    private renderCallbacks: IRenderCallback[] = [];

    /**
     * Update component state and schedule a render.
     * 
     * @param state Object to shallow merge into components' state.
     *              If a callback, result will be used instead.
     * @param callback A function to be called after component is rendered.
     * 
     * @todo This should be revised to not track previous state. Instead, the previous state should be passed
     * whatever rendering system I create.
     */
    public setState(state: TState | IStateCallback<TState, TProps>, callback?: IRenderCallback): void {
        //? if (!PRODUCTION) {
        // Check types (dev)
        if (typeof state !== "object" && typeof state !== "function") {
            throw new Error("Provided state not an object nor function.");
        }
        if (callback && typeof callback !== "function") {
            throw new Error("Provided callback not a function.");
        }
        //? }

        // Preserve previous state.
        //this.prevState = Object.assign({}, this.state);
        // Shallow merge changes.
        Object.assign(this.state, typeof state === "function" ? state(this.state, this.props) : state);
        // Add render callback to stack.
        if (callback) this.renderCallbacks.push(callback);
        // Schedule a re-render.
        //enqueueRender(this);
    }

    /**
     * Immediately perform a synchronous render of the component.
     * 
     * Bypasses `shouldUpdate()`.
     * 
     * @param callback A function to be called after component is rendered.
     */
    private forceUpdate(callback?: IRenderCallback): void {
        // Add render callback to stack.
        if (callback) this.renderCallbacks.push(callback);
        // Force render.
        //renderComponent(this, FORCE_RENDER);
    }

    /**
     * Generates a new Virtual DOM tree.
     * 
     * @param props Props (eg. JSX attributes) received from parent element/component.
     * @param state The components' current state.
     * @param context Context objects from components' parents.
     */
    public abstract render(props: TProps, state: TState, context: IContext[]): string | number | import("./vnode").VNode | null;

    /**
     * Provides a context object that may be used by components' children.
     */
    public getChildContext?(): IContext;

    /**
     * Lifecycle method called before component is mounted to DOM.
     */
    public willMount?(): void;

    /**
     * Lifecycle method called after component is mounted to DOM.
     */
    public didMount?(): void;

    /**
     * Lifecycle method called before component is unmounted from DOM.
     */
    public willUnmount?(): void;

    /**
     * @todo What is the purpose of this?
     * 
     * @param nextProps 
     * @param nextContext 
     */
    public willReceiveProps?(nextProps: TProps, nextContext: IContext[]): void;

    /**
     * Lifecycle method called before component is rendered.
     * Falsey result will prevent render.
     * 
     * Forced renders will bypass this.
     * 
     * @param nextProps New props.
     * @param nextState Incoming changes to state.
     * @param nextContext New context.
     * 
     * @todo this.props etc should be considered the previous version. Better for memory usage long term this way.
     */
    public shouldUpdate?(nextProps: TProps, nextState: TState, nextContext: IContext[]): boolean;

    /**
     * Lifecycle method called before component is re-rendered.
     * 
     * @todo Are the next params fully resolved.
     * 
     * @param nextProps 
     * @param nextState 
     * @param nextContext 
     * 
     * @todo this.props etc should be considered the previous version. Better for memory usage long term this way.
     */
    public willUpdate?(nextProps: TProps, nextState: TState, nextContext: IContext[]): void;

    /**
     * Lifecycle method called after component is re-rendered.
     * 
     * @param prevProps 
     * @param prevState 
     * @param prevContext 
     * 
     * @todo this.props etc should be considered the current version. Better for memory usage long term this way.
     */
    public didUpdate?(prevProps: TProps, prevState: TState, prevContext: IContext[]): void;
}
