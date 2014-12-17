# hubot-brainfxxk

A Hubot script for running a brainfxxk program

## Installation

    $ npm install https://github.com/bouzuya/hubot-brainfxxk/archive/master.tar.gz

or

    $ npm install https://github.com/bouzuya/hubot-brainfxxk/archive/{VERSION}.tar.gz

## Example

    bouzuya> hubot brainf*ck add  +++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.------------.<++++++++.--------.+++.------.--------.>+.
      hubot> pointer: 3
             memory : [0,72,100,33]
             output : Hello, world!

## Configuration

See [`src/scripts/brainfxxk.coffee`](src/scripts/brainfxxk.coffee).

## Development

`npm run`

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][mail]&gt; ([http://bouzuya.net][url])

## Badges

[![Build Status][travis-badge]][travis]
[![Dependencies status][david-dm-badge]][david-dm]
[![Coverage Status][coveralls-badge]][coveralls]

[travis]: https://travis-ci.org/bouzuya/hubot-brainfxxk
[travis-badge]: https://travis-ci.org/bouzuya/hubot-brainfxxk.svg?branch=master
[david-dm]: https://david-dm.org/bouzuya/hubot-brainfxxk
[david-dm-badge]: https://david-dm.org/bouzuya/hubot-brainfxxk.png
[coveralls]: https://coveralls.io/r/bouzuya/hubot-brainfxxk
[coveralls-badge]: https://img.shields.io/coveralls/bouzuya/hubot-brainfxxk.svg
[user]: https://github.com/bouzuya
[mail]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
