import { IsolatedComponent } from "./isolated-component";
import { Application } from "../application";

interface IStateProps<TProps> {
    props: TProps;
}

type TStateWithProps<TState, TProps> = TState & IStateProps<TProps>;

/**
 * Component base class.
 */
export abstract class Component<TState = object, TProps extends object = object, TApplication extends Application = Application> extends IsolatedComponent<TStateWithProps<TState, TProps>> {
    
    /**
     * Set components properties.
     * Properties are merged into `this.state.props` via `this.setState`.
     * @param props New props.
     */
    protected setProps(props: TProps): void {
        this.setState(state => {
            state.props = props;
            return state;
        });
    }
}
