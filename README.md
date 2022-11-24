> **Warning**  
> Repo is archived! Plugin available in Pattern Lab core: https://github.com/pattern-lab/patternlab-node/releases/tag/v5.17.0

# Pattern Wrapper Plugin for Pattern Lab Node

This plugin allows users to add a wrapper div with css class(es) around a pattern when shown in the
single preview.   
If it gets included in another pattern, the wrapper is not added.

This comes in handy if you, for example, use theming classes to visualize different backgrounds, colors etc.

## Install

```
npm i @hadl/patternlab-plugin-pattern-wrap -D
```

## Configuration

After the installation, you will see the config in your `patternlab-config.json`:

```
"plugins": {
  "@hadl/patternlab-plugin-pattern-wrap": {
    "enabled": true,
    "initialized": false,
    "options": {
      "wrapClassKey": [""]
    }
  }
}
```

If you don't see this config object, add the plugin via the command:

``` 
npx patternlab install --plugins @hadl/patternlab-plugin-pattern-wrap 
```

In the `wrapClassKey` array you can add the data keys which should be used to get the class names.

## How does it work?

The plugin will look for any "data key" added to the `wrapClassKey` array and then will add that
entry to the wrapper element.

Data key can be set inside the Markdown or JSON file of any pattern.

**Example Config**

```
"wrapClassKey": ["theme-class"]
```

### Markdown

Usage https://patternlab.io/docs/documenting-patterns/

_my-pattern.md_

``` 
---
theme-class: my-theme-class
---
```

Will create `<div class="pl-pattern-wrapper-element my-theme-class"></div>` around the rendered
pattern.

### JSON

Usage https://patternlab.io/docs/creating-pattern-specific-values/

_my-pattern.json_

``` 
{
  "theme-class": "my-other-theme-class"
}
```

Will create `<div class="pl-pattern-wrapper-element my-other-theme-class"></div>` around the
rendered pattern.

#### Pseudo-Patterns

This will work with pseudo-patterns too (Usage https://patternlab.io/docs/using-pseudo-patterns/)

_my-pattern~variant.json_

``` 
{
  "theme-class": "my-variant-theme-class"
}
```

Will create `<div class="pl-pattern-wrapper-element my-variant-theme-class"></div>` around the
rendered pattern.

### Multiple entries in "wrapClassKey"

Will result in multiple classes in the wrapper div.

**Example Config**

```
"wrapClassKey": ["theme-class", "other-class"]
```

_my-pattern.json_

``` 
{
  "theme-class": "theme-class",
  "other-class": "some-other-class"
}
```

_Result_

```
<div class="pl-pattern-wrapper-element theme-class some-other-class"></div>
```
