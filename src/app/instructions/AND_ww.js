{
  "name": "AND",
  "description": "",
  "code": [
    {
      "value": 0x10
    },
    {
      "value": "010100",
      "length": 6
    }
  ],
  "params": [
    {
      "type": "r_word"
    },
    {
      "type": "r_word"
    }
  ],
  "checkFlags": { "z": true },
  "exec": function (rword1, rword2) {
    var newVal = rword1.value & rword2.value;
    this.writeWordRegister(rword1.address, newVal & 0xFFFF);
  }
}