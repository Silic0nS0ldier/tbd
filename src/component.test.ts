import { Component, IContext } from "./component";
import { VNode } from "./vnode";

class TestComponent1 extends Component {
    render() {
        return new VNode("test");
    }
}

interface Props {
    foo: boolean
}

interface State {

}

class TestComponent2 extends Component<Props, State> {
    render() {
        return new VNode("test");
    }
}

test("ctor", () => {
    new TestComponent1({}, []);
});

test("ctor with defined generics", () => {
    new TestComponent2({
        foo: true
    }, []);
});

test("setState", () => {
    const tc = new TestComponent1({}, []);
    tc.setState({
        foo: true
    });
});

