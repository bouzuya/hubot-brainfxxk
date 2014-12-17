# Description
#   A Hubot script for running a brainfxxk program
#
# Configuration:
#   None
#
# Commands:
#   hubot brainfxxk add <code> - add & run
#   hubot brainfxxk list - list
#   hubot brainfxxk remove <N> - remove
#   hubot brainfxxk run <N> - re-run
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  # brainfxxk
  close = (s, i) ->
    return undefined if i is s.length
    return i if s[i] is ']'
    close(s, (if s[i] is '[' then close(s, i + 1) else i) + 1)

  open = (s, i) ->
    return undefined if i is -1
    return i if s[i] is '['
    open(s, (if s[i] is ']' then open(s, i - 1) else i) - 1)

  bf = (source) ->
    memory = []
    pointer = 0
    index = 0
    output = ''

    op =
      '>': -> pointer += 1
      '<': -> pointer -= 1
      '+': -> memory[pointer] = ((memory[pointer] ? 0) + 1) & 0xff
      '-': -> memory[pointer] = ((memory[pointer] ? 0) - 1) & 0xff
      ',': -> throw new Error('operator "," is not implemnted')
      '.': -> output += String.fromCharCode(memory[pointer] ? 0)
      '[': -> index = close(source, index + 1) if (memory[pointer] ? 0) is 0
      ']': -> index = open(source, index - 1) if (memory[pointer] ? 0) isnt 0

    while index < source.length
      o = source[index]
      op[o]()
      index += 1

    { pointer, memory, output }

  # brain
  brainKey = 'hubot-brainfxxk'

  load = ->
    robot.brain.get(brainKey) ? []

  save = (data) ->
    robot.brain.set brainKey, data

  # listener
  robot.respond /brainf..k add (.+)$/i, (res) ->
    sources = load()
    source = res.match[1]
    try
      { pointer, memory, output }  = bf(source)
      res.send """
        pointer: #{pointer}
        memory : #{JSON.stringify(memory)}
        output : #{output}
      """
      sources.push source
      save(sources)
    catch e
      robot.logger.error e

  robot.respond /brainf..k li?st?$/i, (res) ->
    sources = load()
    res.send sources.map((i, index) -> "#{index + 1}: #{i}").join('\n')

  robot.respond /brainf..k re?m(?:ove)? (\d+)$/i, (res) ->
    sources = load()
    number = res.match[1]
    if number < 1 or sources.length < number
      return res.send('invalid number')
    source = sources.splice(number - 1, 1)[0]
    res.send 'removed ' + source if source?
    save(sources)

  robot.respond /brainf..k run (\d+)$/i, (res) ->
    sources = load()
    number = res.match[1]
    if number < 1 or sources.length < number
      return res.send('invalid number')
    source = sources[number - 1]
    { pointer, memory, output }  = bf(source)
    res.send """
      pointer: #{pointer}
      memory : #{JSON.stringify(memory)}
      output : #{output}
    """
