import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";

import {
  Login,
  Register,
  HomePage,
  TermsAndConditions,
  NotFoundPage,
  DashboardPage,
  VideoPlayPage,
  ChannelPage,
  ChannelVideos,
  ChannelTweets,
  ChannelPlaylist,
  ChannelSubcribers,
  WatchHistory,
  LikedVideos,
  SubscribedChannelsPage,
  EditPersonalInfo,
  EditPassword,
  EditChannelPage,
  SearchVideos,
} from "./pages/index";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getcurrentUserAPI } from "./api/auth";
import { deleteUserData, saveUserData } from "./redux/slices/authSlice";
import AuthConntainer from "./components/AuthConntainer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route
        path="search/:query"
        element={
          <AuthConntainer authentication={true}>
            <SearchVideos />
          </AuthConntainer>
        }
      />
      <Route
        path="register/"
        element={
          <AuthConntainer authentication={false}>
            <Register />
          </AuthConntainer>
        }
      />
      <Route
        path="login/"
        element={
          <AuthConntainer authentication={false}>
            <Login />
          </AuthConntainer>
        }
      />
      <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      <Route
        path="video/:id/"
        element={
          <AuthConntainer authentication={true}>
            <VideoPlayPage />
          </AuthConntainer>
        }
      />
      <Route
        path="dashboard/"
        element={
          <AuthConntainer authentication={true}>
            <DashboardPage />
          </AuthConntainer>
        }
      />
      <Route
        path="history/"
        element={
          <AuthConntainer authentication={true}>
            <WatchHistory />
          </AuthConntainer>
        }
      />
      <Route
        path="liked-videos/"
        element={
          <AuthConntainer authentication={true}>
            <LikedVideos />
          </AuthConntainer>
        }
      />
      <Route
        path="subscribed-channels/"
        element={
          <AuthConntainer authentication={true}>
            <SubscribedChannelsPage />
          </AuthConntainer>
        }
      />
      <Route
        path="channel/:username/"
        element={
          <AuthConntainer authentication={true}>
            <ChannelPage />
          </AuthConntainer>
        }
      >
        <Route
          path="videos/"
          element={
            <AuthConntainer authentication={true}>
              <ChannelVideos />
            </AuthConntainer>
          }
        />
        <Route
          path="playlist/"
          element={
            <AuthConntainer authentication={true}>
              <ChannelPlaylist />
            </AuthConntainer>
          }
        />
        <Route
          path="tweets/"
          element={
            <AuthConntainer authentication={true}>
              <ChannelTweets />
            </AuthConntainer>
          }
        />
        <Route
          path="subscribers/"
          element={
            <AuthConntainer authentication={true}>
              <ChannelSubcribers />
            </AuthConntainer>
          }
        />
      </Route>
      <Route
        path="edit/"
        element={
          <AuthConntainer authentication={true}>
            <EditChannelPage />
          </AuthConntainer>
        }
      >
        <Route
          path="personal-info/"
          element={
            <AuthConntainer authentication={true}>
              <EditPersonalInfo />
            </AuthConntainer>
          }
        />
        <Route
          path="password/"
          element={
            <AuthConntainer authentication={true}>
              <EditPassword />
            </AuthConntainer>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getcurrentUserAPI()
      .then((response) => {
        if (response) {
          dispatch(saveUserData(response));
        } else {
          dispatch(deleteUserData());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? <RouterProvider router={router} /> : null;
}

export default App;
