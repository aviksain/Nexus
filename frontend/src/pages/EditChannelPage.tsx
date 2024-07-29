import { useEffect, useState } from "react";
import { NavbarContainer } from ".";
import {
  Body,
  ChannelButtonsComp,
  ChannelCoverImage,
  ChannelDetails,
  LoadingComp,
  SideBar,
} from "../components";
import { Outlet } from "react-router-dom";

function ChannelPage() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <NavbarContainer>
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <Body>
            {loading ? (
              <LoadingComp />
            ) : (
              <>
                <ChannelCoverImage isEdit={true}/>
                <div className="px-4 pb-4">
                  <ChannelDetails isEdit={true}/>
                  <ChannelButtonsComp type="edit" />
                  <Outlet />
                </div>
              </>
            )}
          </Body>
        </div>
      </NavbarContainer>
    </>
  );
}

export default ChannelPage;
