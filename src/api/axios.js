import axios from "axios";

export const api = axios.create({
  //   baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: "https://dev.bjlfarmersmarket.net",
  timeout: 10000,
  headers: {
    // "Content-Type": "application/json",
    "X-Origin": "WEB",
  },
});

export const setupInterceptors = (token, logoutUser) => {
  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        localStorage.clear();
        logoutUser();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

//collection of all api calls
export const apiCalls = {
  login: (credentials) => api.post("/auth/login", credentials),
  resetPassword: (credentials) => api.post("/user/password-reset", credentials),

  getDashboardMetrics: () => api.get("/dashboard/metrics"),
  getFarmersMetrics: () => api.get("/dashboard/farmers/count"),
  //user management
  getUsers: (page, size) =>
    api.get(`/users?&page=${page}&size=${size}&sort=dateCreated,desc`),
  createUser: (data) => api.post("/user", data),
  updateUser: (userId, data) => api.put(`/user/${userId}`, data),
  getUserActivities: (data) =>
    api.get(
      `/user/activities?&page=${data.page}&size=${data.size}&sort=${data.sort},desc`
    ),
  updateUserStatus: (userId, data) =>
    api.patch(`/user/${userId}/update-status`, data),
  uploadFile: (imageUrl) =>
    api.post("/api/file-upload", imageUrl, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  //farms management
  getFarms: (page, size) =>
    api.get(`/farms?&page=${page}&size=${size}&sort=dateCreated,desc`),
  createFarm: (data) => api.post("/farm", data),
  updateFarm: (farmId, data) => api.put(`/farm/${farmId}`, data),
  downloadFarm: (page, size, searchParam) =>
    api.post(
      `/farms/download?&page=${page}&size=${size}&sort=dateCreated,desc&searchParam=${searchParam}`
    ),

  //farmers
  getFarmers: (page) =>
    api.get(`/farmers-paged?&page=${page}&size=${20}&sort=dateCreated,desc`),
  getRegions: () => api.get("geo/regions"),
  getDistricts: (regionId) => api.get(`geo/${regionId}/districts`),
  getCommunities: (districtId) => api.get(`geo/${districtId}/communities`),
  getGroup: () => api.get("farmer/groups"),
  getFarmersByType: (type) => api.get(`/farmers?&type=${type}`),
  createFarmer: (data) => api.post("/farmer", data),
  updateFarmer: (farmerId, data) => api.put(`/farmer/${farmerId}`, data),
  downloadFarmer: (page, size) =>
    api.post(
      `/farmers/download?&page=${page}&size=${size}&sort=dateCreated,desc`
    ),
  //preplanting
  ViewPrePlantingActivities: (farmId) =>
    api.get(`/farm/${farmId}/activities/pre-planting`),
  createPrePlantingActivity: (data) =>
    api.post("/farm/activity/pre-planting", data),
  updatePrePlantingActivity: (activityId, data) =>
    api.put(`/farm/activity/pre-planting/${activityId}`, data),
  deletePrePlantingActivity: (id) =>
    api.delete(`farm/activity/pre-planting/${id}`),
  getPrePlantingActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/pre-planting`),

  //landpreparation
  createLandPreparationActivity: (data) =>
    api.post("/farm/activity/land-preparation", data),
  updateLandPreparationActivity: (activityId, data) =>
    api.put(`/farm/activity/land-preparation/${activityId}`, data),
  viewLandPreparationActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/land-preparation`),
  deleteLandPreparationActivity: (id) =>
    api.delete(`farm/activity/land-preparation/${id}`),

  //planting
  createPlantingActivity: (data) => api.post("/farm/activity/planting", data),
  updatePlantingActivity: (activityId, data) =>
    api.put(`/farm/activity/planting/${activityId}`, data),
  viewPlantingActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/planting`),
  deletePlantingActivity: (id) => api.delete(`farm/activity/planting/${id}`),
  //weedcontrol
  createWeedControlActivity: (data) =>
    api.post("/farm/activity/weed-control", data),
  updateWeedControlActivity: (activityId, data) =>
    api.put(`/farm/activity/weed-control/${activityId}`, data),
  viewWeedControlActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/weed-control`),
  deleteWeedControlActivity: (id) =>
    api.delete(`farm/activity/weed-control/${id}`),
  //fertilizing
  createFertilizingActivity: (data) =>
    api.post("/farm/activity/fertilizer-application", data),
  updateFertilizingActivity: (activityId, data) =>
    api.put(`/farm/activity/fertilizer-application/${activityId}`, data),
  viewFertilizingActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/fertilizer-application`),
  deleteFertilizingActivity: (id) =>
    api.delete(`farm/activity/fertilizer-application/${id}`),
  //pest control
  createPestControlActivity: (data) =>
    api.post("/farm/activity/pest-control", data),
  updatePestControlActivity: (activityId, data) =>
    api.put(`/farm/activity/pest-control/${activityId}`, data),
  viewPestControlActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/pest-control`),
  deletePestControlActivity: (id) =>
    api.delete(`farm/activity/pest-control/${id}`),
  //harvesting
  createHarvestingActivity: (data) =>
    api.post("/farm/activity/harvesting", data),
  updateHarvestingActivity: (activityId, data) =>
    api.put(`/farm/activity/harvesting/${activityId}`, data),
  viewHarvestingActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/harvesting`),
  deleteHarvestingActivity: (id) =>
    api.delete(`farm/activity/harvesting/${id}`),
  //storage
  createStorageActivity: (data) => api.post("/farm/activity/storage", data),
  updateStorageActivity: (activityId, data) =>
    api.put(`/farm/activity/storage/${activityId}`, data),
  viewStorageActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/storage`),
  deleteStorageActivity: (id) => api.delete(`farm/activity/storage/${id}`),

  //communities
  getAllCommunities: () => api.get(`/geo/communities`),
  //sales
  createSalesActivity: (data) => api.post("/farm/activity/crop-sales", data),
  updateSalesActivity: (activityId, data) =>
    api.put(`/farm/activity/crop-sales/${activityId}`, data),
  viewSalesActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/crop-sales`),
  deleteSalesActivity: (id) => api.delete(`farm/activity/crop-sales/${id}`),
  //transportation
  createTransportationActivity: (data) =>
    api.post("/farm/activity/transportation", data),
  updateTransportationActivity: (activityId, data) =>
    api.put(`/farm/activity/transportation/${activityId}`, data),
  viewTransportationActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/transportation`),
  deleteTransportationActivity: (id) =>
    api.delete(`farm/activity/transportation/${id}`),
  //shipment
  createShipmentActivity: (data) => api.post("/farm/activity/shipment", data),
  updateShipmentActivity: (activityId, data) =>
    api.put(`/farm/activity/shipment/${activityId}`, data),
  viewShipmentActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/shipment`),
  deleteShipmentActivity: (id) => api.delete(`farm/activity/shipment/${id}`),

  //tracking
  getTrackingDetails: (traceNumber) => api.get(`farm/trace/${traceNumber}`),
  //shea preprocessing
  createSheaPreprocessingActivity: (data) =>
    api.post("/farm/activity/shea-preprocessing", data),
  updateSheaPreprocessingActivity: (activityId, data) =>
    api.put(`/farm/activity/shea-preprocessing/${activityId}`, data),
  viewSheaPreprocessingActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/shea-processing`),
  deleteSheaPreprocessingActivity: (id) =>
    api.delete(`farm/activity/shea-preprocessing/${id}`),
  //shea production
  getSheaFarms: (page) =>
    api.get(`/farms?&page=${page}&size=${20}&sort=dateCreated,desc`),
  createSheaProcessingActivity: (data) =>
    api.post("/farm/activity/shea-processing", data),
  updateSheaProcessingActivity: (activityId, data) =>
    api.put(`/farm/activity/shea-processing/${activityId}`, data),
  getSheaPreprocessingActivity: (farmId) =>
    api.get(`/farm/${farmId}/activities/shea-preprocessing`),
  getSheaProcessingActivity: (sheaId) =>
    api.get(`/farm/${sheaId}/activities/shea-processing`),
  deleteSheaProcessingActivity: (activityId) =>
    api.delete(`/farm/activity/shea-processing/${activityId}`),
};
