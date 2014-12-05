# Ampersand + Domthing demo

[Domthing](http://github.com/latentflip/domthing) is a (beta) templating engine, that has support for data-bindings and things built in, which together with ampersand-state/model/view objects means you can throw away the bindings hash from your views and declare your bindings in your view `{{ like.this }}`.

It has a syntax similar to mustache/handlebars, and currently has support for bindings in most places in your template (as text, as whole/partial attributes, in if blocks).

This repo demonstrates in a very simple form how to get domthing working with ampersand, and is a working demo of the bindings working.



## Overview

Getting domthing working with ampersand requires a few steps:

* **Your `filename.dom` templates need to be precompiled into javascript.** The simplest way to do this is with the [domthingify](http://github.com/latentflip/domthingify) browserify transform. Install domthing and domthingify in your project and then configure browserify/moonboots/etc to use the transform. Here I'm using the `"browserify"` key in [package.json](./package.json) as beefy (a simple browserifying dev server) will look there for the transforms. You can also precompile yourself with the domthing command-line executable which bundles with domthing.

* **You need to configure your views to work with domthing.** Domthing makes no assumptions about how it's bindings are going to work, so it's not presetup to work with ampersand-views. The [ampersand-domthing-mixin](http://github.com/ampersandjs/ampersand-domthing-mixin]) makes this really easy. Just extend it in your base-view as per [app.js#L1-L2](./app.js#L1-L2). This mixin will basically listen to changes on your view/models and trigger the updates on the template so that domthings built-in bindings can update the elements on the page.

* That's about it, the rest of this project is really just the typical setup required to get things working.

## Benefits of domthing

* With this setup, bindings are effectively setup magically for you. Look at how in our view we don't create a `bindings: {}` hash, and yet when the age changes in the setInterval, the view updates.
* It's really fast: domthing keeps track of the elements that it's bound to, so if something changes, it knows exactly where to make the change.
* You can extend it with filters/expressions/etc that will be autobound too (more to come on this).

## Caveats

* Domthing is still beta, so almost certainly has a few warts/missing docs.

## Help

Find me on [twitter](http://twitter.com/philip_roberts) or raise an issue in the [domthing repo](http://github.com/latentflip/domthing).
