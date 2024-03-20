import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import { AwsRum } from 'aws-rum-web';

try {
  const config = {
    signing: true,
    sessionSampleRate: 1,
    guestRoleArn: "arn:aws:iam::188195028314:role/RUM-Monitor-us-east-2-188195028314-6079742610171-Unauth",
    identityPoolId: "us-east-2:6ddaee0b-a17a-43e3-aee3-a36cbde25927",
    endpoint: "https://dataplane.rum.us-east-2.amazonaws.com",
    telemetries: ["performance","errors","http"],
    allowCookies: true,
    enableXRay: false
  };

  const APPLICATION_ID = '7b300f2b-ded9-434b-ab3a-6ef1a83e1129';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'us-east-2';

  const awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

export default function App() {
  return (
    <Router>
      <div>
        <p><Link to="/">Home</Link></p>
        <p><Link to="/about">About</Link></p>
        <p><Link to="/users">Users</Link></p>
        <p><Link to="/welcome">Welcome</Link></p>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <div>
    <h2>Users</h2>
    <p><Link to="/user/1">User 1</Link></p>
    <p><Link to="/user/2">User 2</Link></p>
    <p><Link to="/user/3">User 3</Link></p>
  </div>
  ;
}

function User() {
  const location = useLocation();
  const user = location.pathname.split('/').pop();
  return <h2>User: {user}</h2>;
}

function Welcome() {
  // deliberate error
  return <h2>Welcome</h2>;
}