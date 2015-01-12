{
  "name": "CLR",
  "doc": {
    "de": {
      "description": "Setzt den Wert des Registers auf 0x00.",
      "flags": {
      }
    },
    "en": {
      "description": "Sets the value of the register to 0x00",
      "flags": {
      }
    }
  },
  "tests": [
    {
      cmd: "CLR b0",
      setup: { reg: { "b0": 0xFF } },
      steps: { reg: { "b0": 0 }, flags: { c: false, z: true } }
    }
  ],
  "code": [
    {
      "value": 0x40
    },
    {
      "value": "011"
    }
  ],
  "params": [
    {
      "valueNeeded": false,
      "type": "r_byte"
    }
  ],
  "exec": function (rbyte) {
    this.writeByteRegister(rbyte.address, 0);
    this.writeFlags(null, true);
  }
}
