const outer= ()=> {
  let count = 0;

  return ()=> {
    count++;
    console.log(count);
  }

}

const counter = outer();

counter(); // 1
counter(); // 2
counter(); // 3