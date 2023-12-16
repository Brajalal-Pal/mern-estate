import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Netblix from "./pages/Netblix";
import MovieDetails from "./components/MovieDetails";
import Playground from "./components/Playground";

export default function App() {
   return (
      <BrowserRouter>
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/netblix" element={<Netblix />} />
            <Route path="/about" element={<About />} />
            <Route element={<PrivateRoute />}>
               <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="movie-details/:id" element={<MovieDetails />} />
         </Routes>
      </BrowserRouter>
   );
}
