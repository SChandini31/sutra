import bcrypt from "bcrypt";   // if this fails, change to: const bcrypt = require("bcrypt");

const hash = "$2b$10$dZwCLWjlBNd2oA.9s9K.3uuKlnA2FmTR.BN0Ag7E8ukuWahy6s.6O";

async function test() {
  const ok = await bcrypt.compare("Password123", hash);
  console.log("Password match?", ok);
}

test();
