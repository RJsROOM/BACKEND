import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

/*
FEATURES are those small components which do a specific defined tasks..like authentication related ones(login,register), post related ones(see post, create post, del post etc.).. these are called features


*/

/*
study about the react architecture from notes:

there are 4 layers in the react architecture--
1. UI layer which handles only the UI of our pages.
2. the hooks (orchestration) which handles the usage of all the hooks
3. state layer it is responsible for handling the states of whole application
4. API layer is reponsible for handling all the api calls and requests.

like we have used the api calling in login and register pages, we now have to shift them into the API layer. which is put under sevices folder with the name of auth.api.js

and for setting the states layer we can use Redux but here we will use Context..for this we create auth.context.js file under the auth folder only.

*/
