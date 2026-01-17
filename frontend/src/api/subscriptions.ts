import axiosInstance from "../utils/axiosInstance";

const getSubscribedChannelsAPI = async(subscriberId: string) => {
  try {
    const response = await axiosInstance.get(`/subscriptions/u/${subscriberId}`);
    return response.data.data;
  } catch (error) {
    console.log("getSubscribedChannelsAPI :: error :: "+ error);
  }
}

const getSubscriberChannelsAPI = async(channelId: string) => {
  try {
    const response = await axiosInstance.get(`/subscriptions/c/${channelId}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log("getSubscriberChannelsAPI :: error :: "+ error);
  }
}

const toggleSubscriptionAPI = async(channelId: string) => {
  try {
    const response = await axiosInstance.post(`/subscriptions/c/${channelId}`);
    return response.data.data;
  } catch (error) {
    console.log("toggleSubscription :: error :: "+ error);
  }
}

export {
  getSubscribedChannelsAPI,
  getSubscriberChannelsAPI,
  toggleSubscriptionAPI
}