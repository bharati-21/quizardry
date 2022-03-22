import { Route, Routes } from "react-router-dom";
import { HomePage, Rules, Questions, Results } from 'pages/';

const WebsiteRoutes = () => {
  return (
    <Routes>
        <Route path="/" component={<HomePage />} />
        <Route path="/rules" component={<Rules />} />
        <Route path="/questions" component={<Questions />} />
        <Route path="/results" component={<Results />} />
    </Routes>
  )
}

export { WebsiteRoutes };