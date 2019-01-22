- Enforce good habits.
  - `cloneElement` is an anti-pattern, and potentially breaks things, so we won't support it.
  - Should be able to use VNode subclasses to optimise handling of components, text nodes, and regular elements.

- Prevent hacks
  - Component's recieve an array of contexts, containing all the contexts from context providing Components.
    This makes it possible for more advanced contextual functionality (such as enhanced forms).
  - Events are automatically wrapped in a handler to enable more reliable event management.
    - Shortcuts for binding several events.
    - Possible to remove a specific event unlike with `addEventListener`.
    - Event property detection should be based on detection of function or object, except when target is component.
      Object could be used for advanced functionality, such as an options source.
      (e.g. don't remove event on parent component being dismounted, crazy `this` binding, etc)
  - Preact uses an options module to handle global options.
    I'd rather use a different mechanism that is more predictable to reduce risk of the TypeScript compiler breaking builds due to some encapsulation quirk.
  - `render` should accept options (for lifecycle events, etc) and pass in things like the queues.
    This will avoid the need to use a flyweight implementation that can be easily broken by compilation.
    (_I have no idea what I mean't here..._)

- Known issues
  - Preact and React doesn't always work right with things like the `<pre>` tag, which should preserve space.
    This is down to the compiler the library consumer has used, and so is out of our scope.
    Best solution is good documentation, maybe with some templates that aren't affected or examples of work arounds.

- Useful features
  - First class support for prerendering.
    - Perhaps have components mark themselves as capable of safely pre-rendering?
      Could be used to prerender what we can.
    - Could we determine if they could prerender ahead of time?
    - Is there a way we can preserve certain information to prevent components from needing to refetch once setup?
      Perhaps by adding certain info encoded in JSON to data attributes?
  - Use a preprocessor to allow a debug version to be easily created.
    Code should be able to run without preprocessor (in other words, there should only be code removal such that behaviour remains the same).
    Perhaps the projects MetaScript tooling could serve as a source of inspriation?

- Misc
  - Using Jest as despite the monumental dependency tree, it generates clean reports and is well supported.
    - Place unit tests next to associated file to permit easier access.
  - Do we need an analogue to `FORCE_RENDER`?
  - Make it impossible to force a render as it indicates an anti-pattern.
  - What if props went into state? Reduce amount of code? Prop changes do indicate state changes after all. Could also translate to less object recreation.
  - How do we want to handle things like a router? Is type-safety even possible?