import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import FormComponent from "./components/FormComponent";
import SingleBlogComponent from "./components/SingleBlogComponent";
import EditComponent from "./components/EditComponent";
import LoginComponent from "./components/LoginComponent";
import AdminRoute from "./adminRoute";
const MyRoute = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <AdminRoute  exact path="/create" component={FormComponent} />
        <Route exact path="/blog/:slug" component={SingleBlogComponent} />
        <AdminRoute exact path="/blog/edit/:slug" component={EditComponent} />
        <Route exact path="/login" component={LoginComponent} />
      </Switch>
    </BrowserRouter>
  );
};
export default MyRoute;
