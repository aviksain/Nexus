import { useDispatch, useSelector } from "react-redux";
import { subscribersChannelsType } from "../../Types/dashboard";
import { useEffect } from "react";
import {
  updateSubscribers,
  toggleSubscription as toggleSubscriptionRedux,
  reset as resetRedux,
} from "../../redux/slices/subscriptionSlice";
import {
  getSubscriberChannelsAPI,
  toggleSubscriptionAPI,
} from "../../api/subscriptions";
import { Button, EmptyPage } from "../../components";
import { Link } from "react-router-dom";
import { UserCheck, UserPlus } from "lucide-react";

function ChannelSubcribers() {
  const dispatch = useDispatch();
  const channelOwner = useSelector((state: any) => state.channel.userData);
  const subscribers = useSelector(
    (state: any) => state.subscription.subscribers
  );

  useEffect(() => {
    return () => {
      dispatch(resetRedux());
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const subscribers = await getSubscriberChannelsAPI(channelOwner?._id);
        console.log(subscribers);
        dispatch(updateSubscribers(subscribers));
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubscribers();
  }, []);

  const toggleSubscription = async (channelId: string) => {
    try {
      const res = await toggleSubscriptionAPI(channelId);
      if(res) dispatch(toggleSubscriptionRedux(channelId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-4 py-4">
        {subscribers?.length > 0 ? (
          <>
            {subscribers?.map((it: subscribersChannelsType) => {
              return (
                <div key={it._id} className="flex w-full justify-between">
                  <div className="flex items-center gap-x-2">
                    <div className="h-14 w-14 shrink-0">
                      <Link to={`/channel/${it.subscriber.username}/videos`}>
                        <img
                          src={it.subscriber.avatar}
                          className="h-full w-full rounded-full"
                        />
                      </Link>
                    </div>
                    <div className="block">
                      <h6 className="font-semibold">
                        {it.subscriber.fullname}
                      </h6>
                      <p className="text-sm text-gray-300">
                        {it.subscriber.subCnt} Subscribers
                      </p>
                    </div>
                  </div>
                  <div className="block">
                    <Button
                      bgColor={`${
                        it.subscriber.isSubscribed
                          ? "bg-[#64748B]"
                          : "bg-[#AE7AFF]"
                      }`}
                      onClick={() => toggleSubscription(it.subscriber._id)}
                    >
                      {it.subscriber.isSubscribed ? (
                        <div className="flex">
                          <UserCheck className="mr-2" />
                          Subscribed
                        </div>
                      ) : (
                        <div className="flex">
                          <UserPlus className="mr-2" />
                          Subscribe
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <EmptyPage name="subscribers" logo={<UserCheck />} />
        )}
      </div>
    </>
  );
}

export default ChannelSubcribers;
