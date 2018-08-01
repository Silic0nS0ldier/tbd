import { VNode } from "./vnode";
import { Component } from "./component";

/**
 * JSX/hyperscript reviver
 * @see https://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 * 
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a
 * lightweight representation of the structure of a DOM tree. This structure can
 * be realized by recursively comparing it against the current _actual_ DOM
 * structure, and applying only the differences.
 * 
 * `h()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 * 
 * @example The following DOM tree
 * 
 * `<div id="foo" name="bar">Hello!</div>`
 * 
 * can be constructed using this function as:
 * 
 * `h("div", { id: "foo", name: "bar" }, "Hello!");`
 * 
 * @param nodeName An element name or Component class.
 * @param attributes Any attributes/props to set on the created element/Component.
 * @param nodes Children to append. Can be infinitely nested arrays.
 * 
 * @todo Finish this
 */
export function h(nodeName: string | Component, attributes: Map<string, any> | undefined, ...nodes: VNode[]): VNode {
    const n = new VNode(nodeName, attributes);
    n.children = nodes;
    return n;
}
