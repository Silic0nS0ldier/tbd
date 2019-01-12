import { VNode } from "../vnode";

/**
 * Isolated component base class.
 * Components extending this cannot recieve props nor context.
 * Expected use case is interative components that operate independently.
 * Gains include better performance and 
 */
export abstract class IsolatedComponent<TState extends object = {}> {
    /**
     * Components' current state.
     */
    public abstract state: TState;

    private stateQueue: ((state: TState) => TState)[];

    /**
     * Isolated component constructor.
     */
    constructor() {
        this.stateQueue = [];
    }

    /**
     * Set component state.
     * @param state New state.
     * 
     * @todo How will we handle calling setState when stateQueue is being processed?
     * State could be set from an async context too. Need to lock somehow without loosing order.
     * Another queue?
     * Can always chain only a resolved promise.
     * Maybe a function can help?
     * Should it be located in here?
     */
    protected setState(getState: (state: TState) => TState): void {
        this.stateQueue.push(getState);
        // TODO Need to somehow tell system to queue up work
    }

    /**
     * Lifecycle method used to determine if component should render.
     * @param nextState Components' next state.
     */
    protected shouldRender?(nextState: TState): boolean;

    /**
     * Lifecycle method called after component has rendered.
     * Component can change during execution including being unmounted.
     * @param state Component's current state at time of function call.
     */
    public async didRender?(state: TState): Promise<void>;

    /**
     * Lifecycle method called immediately after component is mounted (e.g. inserted into DOM).
     * Component can change during execution including being unmounted.
     * @param state Component's current state at time of function call.
     */
    public async didMount?(state: TState): Promise<void>;

    /**
     * Lifecycle method called before component is unmounted (e.g. removed from DOM).
     */
    public willUnmount?(): void;

    /**
     * Emits components' virtual node tree.
     * @param state Components' current state.
     */
    public abstract emit(state: TState): VNode;
}
