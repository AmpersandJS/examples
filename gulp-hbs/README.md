# Gulp Handlebars

This app was generated with the 'express' flavor of ampersand via the [ampersand cli tool](http://ampersandjs.com/learn/quick-start-guide).

## Why Handlebars?

It's personal preference, but I like [Handlebars](http://handlebarsjs.com/) much better than [jade](http://jade-lang.com/). Whitespace-sensitive syntax has never seemed compelling to me. I'm looking at you- YAML, HAML, Python, and ... CoffeeScript. So, one of my first tasks when starting an Ampersand project was to switch out `jade` for something else. `handlebars` was recommended on the [Ampersand Learn](http://ampersandjs.com/learn/templates) page and is much more HTML-like.

[dömthing](https://github.com/latentflip/domthing) might be another fine choice, but I didn't fully grok the benefit over handlebars.

## Why Gulp?

I chose to use a gulp plugin for Handlebars over other solutions for 2 main reasons:

1. How the namespaces were created. I wanted to keep the same syntax as the generated app: `template: templates.includes.personView`
2. Compatibility with Handlebars V2.0. At the time, the `gulp` plugin was the only option. `grunt-contrib-handlebars` was still on V1, and I prefer gulp as a taskrunner for front-end  projects anyhow.

Considered options:

- [gulp-hanlebars](https://www.npmjs.org/package/gulp-handlebars)
- [grunt-contrib-handlebars](https://www.npmjs.org/package/grunt-contrib-handlebars)
- [handlebars-precompiler](https://www.npmjs.org/package/handlebars-precompiler)
- [handlebarizer](https://www.npmjs.org/package/handlebarizer)
- [templatizer-hbs](https://www.npmjs.org/package/templatizer-hbs)

## How to run it

1. download/install [node.js](http://nodejs.org/)
1. install gulp globally: `$ npm install -g gulp`
1. install dependencies: `$ npm install`
1. run it: `$ gulp`
1. open http://localhost:3000 in a browser

## How it's structured

See docs: http://ampersandjs.com/
Curated modules: http://tools.ampersandjs.com/

## Credits

Ampersand is built by folks at [&yet](http://andyet.com).
Example by [Drew Fyock](https://github.com/fyockm)
