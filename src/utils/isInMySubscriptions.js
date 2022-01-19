export const isInMySubscriptions = (subsiteId) => {
  let mySubscriptionSubsiteIds = JSON.parse(
    localStorage.getItem("my_subscription_ids")
  );

  if (mySubscriptionSubsiteIds) {
    return mySubscriptionSubsiteIds.some((id) =>
      subsiteId.toString().includes(id)
    );
  } else return true;
};
