// REAL HANDLER
function realHandler(binary, binary2){
    binary = convertTo16bit(binary);
    binary2 = convertTo16bit(binary2);
    var bit32 = binary2 + binary;
    var result = parseInt(bit32, 2);
    var float = bit32ToFloat(result);
    return float;
  } 

// INTEGER HANDLER
function integerHandler(binary){
    var binary = convertTo16bit(binary);
    var int = binaryToInt(binary);
    return int;
  }

// SIGNAL QUALITY HANDLER
function signalQuality(binary){
  var high = 0;
  var low = 0;
  const highbinary = binary.substring(0,binary.length-8);
  const lowbinary = binary.substring(binary.length-8);
  high = parseInt(highbinary, 2);
  low = parseInt(lowbinary, 2);
  const list = [high,low];
  return list;
}

// LONG HANDLER
function longHandler(binary, binary2){
  var binary = convertTo16bit(binary);
  var binary2= convertTo16bit(binary2);
  var result = binary2 + binary;
  var long = binaryToLong(result);
  return long;
}

//HELPER FUNCTIONS
function binaryToLong(binary) {
  const isNegative = binary[0] === '1';
  let long = parseInt(binary, 2);
  if (isNegative) {
    long += Math.pow(2, 32) *(-1);
  }
  return long;
}

function convertTo16bit(binarystring) {
  while (binarystring.length < 16) {
    binarystring = "0" + binarystring;
  }
  return binarystring;
}

function bit32ToFloat(intval) {
  var fval = 0.0;
  var x;//exponent
  var m;//mantissa
  var s;//sign
  s = (intval & 0x80000000)?-1:1;
  x = ((intval >> 23) & 0xFF);
  m = (intval & 0x7FFFFF);
  switch(x) {
      case 0:
          break;
      case 0xFF:
          if (m) fval = NaN;
          else if (s > 0) fval = Number.POSITIVE_INFINITY;
          else fval = Number.NEGATIVE_INFINITY;
          break;
      default:
          x -= 127;
          m += 0x800000;
          fval = s * (m / 8388608.0) * Math.pow(2, x);
          break;
  }
  return fval;
}

function binaryToInt(binary) {
  const isNegative = binary[0] === '1';
  let long = parseInt(binary, 2);
  if (isNegative) {
    long += Math.pow(2, 16) *(-1);
  }

  return long;
}

export { realHandler, integerHandler, signalQuality, longHandler};
  