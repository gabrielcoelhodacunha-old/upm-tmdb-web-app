import addEventToButtons from "scripts/addEventToButtons";
import addEventToInputs from "scripts/addEventToInputs";
import enableLogin from "scripts/enableLogin";

function main() : void {
  addEventToInputs();
  addEventToButtons();
  enableLogin();
}

main();