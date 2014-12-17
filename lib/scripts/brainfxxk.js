// Description
//   A Hubot script for running a brainfxxk program
//
// Configuration:
//   None
//
// Commands:
//   hubot brainfxxk add <code> - add & run
//   hubot brainfxxk list - list
//   hubot brainfxxk remove <N> - remove
//   hubot brainfxxk run <N> - re-run
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var bf, brainKey, close, load, open, save;
  close = function(s, i) {
    if (i === s.length) {
      return void 0;
    }
    if (s[i] === ']') {
      return i;
    }
    return close(s, (s[i] === '[' ? close(s, i + 1) : i) + 1);
  };
  open = function(s, i) {
    if (i === -1) {
      return void 0;
    }
    if (s[i] === '[') {
      return i;
    }
    return open(s, (s[i] === ']' ? open(s, i - 1) : i) - 1);
  };
  bf = function(source) {
    var index, memory, o, op, output, pointer;
    memory = [];
    pointer = 0;
    index = 0;
    output = '';
    op = {
      '>': function() {
        return pointer += 1;
      },
      '<': function() {
        return pointer -= 1;
      },
      '+': function() {
        var _ref;
        return memory[pointer] = (((_ref = memory[pointer]) != null ? _ref : 0) + 1) & 0xff;
      },
      '-': function() {
        var _ref;
        return memory[pointer] = (((_ref = memory[pointer]) != null ? _ref : 0) - 1) & 0xff;
      },
      ',': function() {
        throw new Error('operator "," is not implemnted');
      },
      '.': function() {
        var _ref;
        return output += String.fromCharCode((_ref = memory[pointer]) != null ? _ref : 0);
      },
      '[': function() {
        var _ref;
        if (((_ref = memory[pointer]) != null ? _ref : 0) === 0) {
          return index = close(source, index + 1);
        }
      },
      ']': function() {
        var _ref;
        if (((_ref = memory[pointer]) != null ? _ref : 0) !== 0) {
          return index = open(source, index - 1);
        }
      }
    };
    while (index < source.length) {
      o = source[index];
      op[o]();
      index += 1;
    }
    return {
      pointer: pointer,
      memory: memory,
      output: output
    };
  };
  brainKey = 'hubot-brainfxxk';
  load = function() {
    var _ref;
    return (_ref = robot.brain.get(brainKey)) != null ? _ref : [];
  };
  save = function(data) {
    return robot.brain.set(brainKey, data);
  };
  robot.respond(/brainf..k add (.+)$/i, function(res) {
    var e, memory, output, pointer, source, sources, _ref;
    sources = load();
    source = res.match[1];
    try {
      _ref = bf(source), pointer = _ref.pointer, memory = _ref.memory, output = _ref.output;
      res.send("pointer: " + pointer + "\nmemory : " + (JSON.stringify(memory)) + "\noutput : " + output);
      sources.push(source);
      return save(sources);
    } catch (_error) {
      e = _error;
      return robot.logger.error(e);
    }
  });
  robot.respond(/brainf..k li?st?$/i, function(res) {
    var sources;
    sources = load();
    return res.send(sources.map(function(i, index) {
      return "" + (index + 1) + ": " + i;
    }).join('\n'));
  });
  robot.respond(/brainf..k re?m(?:ove)? (\d+)$/i, function(res) {
    var number, source, sources;
    sources = load();
    number = res.match[1];
    if (number < 1 || sources.length < number) {
      return res.send('invalid number');
    }
    source = sources.splice(number - 1, 1)[0];
    if (source != null) {
      res.send('removed ' + source);
    }
    return save(sources);
  });
  return robot.respond(/brainf..k run (\d+)$/i, function(res) {
    var memory, number, output, pointer, source, sources, _ref;
    sources = load();
    number = res.match[1];
    if (number < 1 || sources.length < number) {
      return res.send('invalid number');
    }
    source = sources[number - 1];
    _ref = bf(source), pointer = _ref.pointer, memory = _ref.memory, output = _ref.output;
    return res.send("pointer: " + pointer + "\nmemory : " + (JSON.stringify(memory)) + "\noutput : " + output);
  });
};
