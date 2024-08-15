const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let Counter;
  let counter;

  beforeEach(async function () {
    // Despliega el contrato antes de cada test
    Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.deployed();
    console.log("Contrato desplegado en:", counter.address);
  });

  it("Debe iniciar con un número igual a 0", async function () {
    const initialNumber = await counter.number();
    console.log("Valor inicial de 'number':", initialNumber.toString());
    expect(initialNumber).to.equal(0);
  });

  it("Debe permitir configurar el número", async function () {
    const newNumber = 42;
    await counter.setNumber(newNumber);
    const updatedNumber = await counter.number();
    console.log(
      `'setNumber' llamado con ${newNumber}. Nuevo valor de 'number': ${updatedNumber.toString()}`
    );
    expect(updatedNumber).to.equal(newNumber);
  });

  it("Debe incrementar el número en 1", async function () {
    await counter.setNumber(42);
    console.log(
      "Valor de 'number' antes de incrementar:",
      (await counter.number()).toString()
    );
    await counter.increment();
    const incrementedNumber = await counter.number();
    console.log(
      "Valor de 'number' después de incrementar:",
      incrementedNumber.toString()
    );
    expect(incrementedNumber).to.equal(43);
  });

  it("Debe incrementar el número a partir de 0", async function () {
    console.log(
      "Valor de 'number' inicial:",
      (await counter.number()).toString()
    );
    await counter.increment();
    const incrementedNumber = await counter.number();
    console.log(
      "Valor de 'number' después de incrementar desde 0:",
      incrementedNumber.toString()
    );
    expect(incrementedNumber).to.equal(1);
  });
});
