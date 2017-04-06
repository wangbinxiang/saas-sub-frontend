import crypto from 'crypto'

export function lookup(obj, field) {
  if (!obj) { return null; }
  var chain = field.split(']').join('').split('[');
  for (var i = 0, len = chain.length; i < len; i++) {
    var prop = obj[chain[i]];
    if (typeof(prop) === 'undefined') { return null; }
    if (typeof(prop) !== 'object') { return prop; }
    obj = prop;
  }
  return null;
};

export function isPositiveInteger(s) { //是否为正整数
    var re = /^[1-9]+[0-9]*[0-9]*$/;
    return re.test(s)
}


//对称加密

export function encrypt(dec, key, algorithm = 'des-cbc') {
  const cipher = crypto.createCipher(algorithm, key);//bf-cfb, des-cfb
  let enc = cipher.update(dec, 'utf8', 'hex');//编码方式从utf-8转为hex;
  enc += cipher.final('hex');//编码方式转为hex;

  return enc
}


//对称解密

export function decrypt(enc, key, algorithm = 'des-cbc') {
  const decipher = crypto.createDecipher(algorithm, key);
  let dec = decipher.update(enc, 'hex', 'utf8');//编码方式从hex转为utf-8;
  dec += decipher.final('utf8');//编码方式从utf-8;

  return dec
}

