const initialRoute = "/escort-verificada/";

function generateRoutes() {
  for (let index = 1; index < 450; index++) {
    console.log(`${initialRoute}${index}`);
  }
}

generateRoutes();
