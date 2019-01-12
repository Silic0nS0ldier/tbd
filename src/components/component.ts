import { IsolatedComponent } from "./isolated-component";

interface IStateProps<TProps> {
    props: TProps;
}

type TStateWithProps<TState, TProps> = TState & IStateProps<TProps>;

/**
 * Component base class.
 */
export abstract class Component<TState = {}, TProps extends object = {}> extends IsolatedComponent<TStateWithProps<TState, TProps>> {
    
    /**
     * Set components properties.
     * Properties are merged into `this.state.props` via `this.setState`.
     * @param props New props.
     */
    public setProps(props: TProps): void {
        this.setState(state => state);
    }
}
