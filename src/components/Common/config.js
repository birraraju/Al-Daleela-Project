const config = {
    featureServices: [
      { name: "Island", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/91" },
      { name: "Marine", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/1" },
      { name: "Terrestrial", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/93" },
    ],
    layerListServices: [
      { name: "Island", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/91", visible:true },
      { name: "Marine", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/1", visible:true },
      { name: "Terrestrial", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/93", visible:true },
      { name: "Protected", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/90", visible:false },
      { name: "Pearl", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/89", visible:false },
    ],
    basemaps: [
      {
        title: "Arabic Dark Gray Geographic",
        id: "Basemap Arabic Dark Gray Geographic coordinates",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_DarkGray_GCS/MapServer"
        ]
      },
      {
        title: "Arabic Dark Gray Web Mercator",
        id: "Basemap Arabic Dark Gray Web Mercator coordinates",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_DarkGray_WM/MapServer"
        ]
      },
      {
        title: "Arabic light Gray Geographic",
        id: "Basemap Arabic light Gray Geographic coordinates",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_LightGray_GCS/MapServer"
        ]
      },
      {
        title: "Arabic light Gray Web Mercator",
        id: "Basemap Arabic light Gray Web Mercator coordinates",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_LightGray_WM/MapServer"
        ]
      },
      {
        title: "English Dark Gray Geographic",
        id: "Basemap English Dark Gray Geographic coordinates",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_DarkGray_GCS/MapServer"
        ]
      },
      {
        title: "English Dark Gray Web Mercator",
        id: "Basemap English Dark Gray Web Mercator coordinates",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_DarkGray_WM/MapServer"
        ]
      },
      {
        title: "English light Gray Geographic",
        id: "Basemap English light Gray Geographic coordinates",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_LightGray_GCS/MapServer"
        ]
      },
      {
        title: "English light Gray Web Mercator",
        id: "Basemap English light Gray Web Mercator coordinates",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_LightGray_WM/MapServer"
        ]
      },
      {
        title: "Satellite imagery",
        id: "Satellite imagery",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/arcgis/rest/services/Pub/IMG_SAT_50CM_WM/MapServer"
        ]
      },
    ],
    PortalUrl: "https://maps.smartgeoapps.com/portal",
    ItemWebMapID: "ac2003df385e4c1ead7d2243e3909c26",
    BaseUrl: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/MapServer"
  };
  
  export default config;
  