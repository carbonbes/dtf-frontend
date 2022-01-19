import { instance_v2 } from "./configure";

export const API_v2 = {
  getSubsiteMe() {
    return instance_v2.get(`subsite/me`);
  },

  getUser(id) {
    return instance_v2.get(`subsite?id=${id}`);
  },

  getTimeline(allSite, subsitesId, sorting, lastId, lastSortingValue) {
    if (allSite && subsitesId && sorting && lastId && lastSortingValue) {
      return instance_v2.get(
        `timeline?allSite=true&sorting=${sorting}&lastId=${lastId}&lastSortingValue=${lastSortingValue}`
      );
    }

    if (!allSite && !subsitesId && !sorting && !lastId && !lastSortingValue) {
      return instance_v2.get(`timeline?allSite=false`);
    }

    if (!allSite && subsitesId && sorting && lastId) {
      return instance_v2.get(
        `timeline?allSite=false&subsitesIds=${subsitesId}&sorting=${sorting}&lastId=${lastId}`
      );
    }

    if (!allSite && subsitesId && sorting) {
      return instance_v2.get(
        `timeline?allSite=false&subsitesIds=${subsitesId}&sorting=${sorting}`
      );
    }

    if (!allSite && !subsitesId && sorting && lastId && lastSortingValue) {
      return instance_v2.get(
        `timeline?allSite=false&sorting=${sorting}&lastId=${lastId}&lastSortingValue=${lastSortingValue}`
      );
    }

    if (!allSite && !subsitesId && sorting && lastId && !lastSortingValue) {
      return instance_v2.get(
        `timeline?allSite=false&sorting=${sorting}&lastId=${lastId}`
      );
    }

    if (!allSite && !subsitesId && !lastId && !lastSortingValue) {
      return instance_v2.get(`timeline?allSite=false&sorting=${sorting}`);
    }
  },

  getSubsiteSubscriptions(id) {
    return instance_v2.get(`subsite/subscriptions?subsiteId=${id}`);
  },

  getEntry(id) {
    return instance_v2.get(`content?id=${id}`);
  },

  getComments(subsiteId, contentId) {
    if (subsiteId && !contentId) {
      return instance_v2.get(`comments?subsiteId=${subsiteId}`);
    }

    if (!subsiteId && contentId) {
      return instance_v2.get(`comments?contentId=${contentId}`);
    }
  },
};
