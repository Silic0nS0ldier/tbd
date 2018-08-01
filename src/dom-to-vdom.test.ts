/**
 * @todo There has got to be a better way to test this.
 */

import { domToVdom } from "./dom-to-vdom";
import { VNode } from "./vnode";

const basicPage = new DOMParser().parseFromString(`<!DOCTYPE>
<html>
    <head><title>Basic Test Page</title></head>
    <body data-test="testData">
        <div>Test</div>
        <div>Test<hr/></div>
    </body>
</html>
`, "text/html");

test("Create VDOM from basic page body", () => {
    const result = <VNode>domToVdom(basicPage.body);

    // Base object type
    expect(result).toBeInstanceOf(VNode);
    // Base object name
    expect(result.nameOrComponent).toBe("BODY");
    // Base object attributes
    expect(result.attributes).toBeInstanceOf(Map);
    expect(result.attributes.size).toBe(1);
    expect(result.attributes.has("data-test")).toBeTruthy();
    expect(result.attributes.get("data-test")).toBe("testData");
    // Base object children
    expect(result.children).toBeInstanceOf(Array);
    expect(typeof result.children[0]).toBe("string");
    expect(result.children[1]).toBeInstanceOf(VNode);
    expect(typeof result.children[2]).toBe("string");
    expect(result.children[3]).toBeInstanceOf(VNode);
    expect(typeof result.children[4]).toBe("string");

    // Children do not need to be tested as they are produced via the same function with recursion.
});