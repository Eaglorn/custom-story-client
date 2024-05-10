const numberSymbols = 9
const numberGroup = 7

const getRandomCoord = function () {
  let result = ''
  const characters =
    'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*№?+'
  const charactersLength = characters.length
  for (let i = 0; i < numberSymbols; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const RandomCoord = function () {
  let result = ''
  for (let i = 0; i < numberGroup; i++) {
    result += getRandomCoord()
  }
  return result
}

export { RandomCoord }
