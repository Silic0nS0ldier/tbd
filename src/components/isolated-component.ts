import { VNode } from "../vnode";

/**
 * Isolated component base class.
 * Components extending this cannot recieve props nor have access to the Application instance.
 * Expected use case is interative components that operate independently.
 * This presents significant performance gains as the only trigger for work is events the component is listening too.
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
     */
    protected setState(getState: (state: TState) => TState): void {
        this.stateQueue.push(getState);
        // TODO Need to somehow tell system to queue up work
        // Using an abstraction around the app class might be the solution.
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
