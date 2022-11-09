import testComponent from "./testComponent";

function a(plusPatameter: number) {
  return plusPatameter + testComponent(4, 5);
}

console.log(a(50));