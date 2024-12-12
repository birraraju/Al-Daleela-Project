const config = {
  featureServices: [
    { name: "Island", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/91" },
    { name: "Marine", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/1" },
    { name: "Terrestrial", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/93" },
  ],
  Print: {
    printServiceUrl: "https://devedp.ead.ae/server/rest/services/AlDaleela/AlDaleela_PrintTemplate/GPServer/Export%20Web%20Map",
    allowedFormats: ["Portable Document Format (PDF)"],
    allowedLayouts: ["Print"]
  },
  Export: {
    printServiceUrl: "https://devedp.ead.ae/server/rest/services/AlDaleela/AlDaleela_PrintTemplate/GPServer/Export%20Web%20Map",
    allowedFormats: ["32-bit Portable Network Graphics (PNG32)", "Joint Photographic Experts Group (JPG)"],
    allowedLayouts: ["Export"]
  },
  layerListServices: [
    { name: "Island", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/91", visible:true },
    { name: "Marine", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/1", visible:true },
    { name: "Terrestrial", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/93", visible:true },
    { name: "Protected", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/90", visible:false },
    { name: "Pearl", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/89", visible:false },
  ],
  basemaps: [
    {
      title: "Arabic Dark Gray Geographic",
      id: "Basemap Arabic Dark Gray Geographic coordinates",
      thumbnailImg: "./images/Basemap Arabic Dark Gray Geographic coordinates.png",
      baseLayers: [
        "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_DarkGray_GCS/MapServer"
      ]
    },
    {
      title: "Arabic Dark Gray Web Mercator",
      id: "Basemap Arabic Dark Gray Web Mercator coordinates",
      thumbnailImg: "./images/Arabic Dark Gray Web Mercator .png",
      baseLayers: [
        "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_DarkGray_WM/MapServer"
      ]
    },
    {
      title: "Arabic light Gray Geographic",
      id: "Basemap Arabic light Gray Geographic coordinates",
      thumbnailImg: "./images/Arabic light Gray Geographic.jpg",
      baseLayers: [
        "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_LightGray_GCS/MapServer"
      ]
    },
    {
      title: "Arabic light Gray Web Mercator",
      id: "Basemap Arabic light Gray Web Mercator coordinates",
      thumbnailImg: "./images/Arabic light Gray Web Mercator.png",
      baseLayers: [
        "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_LightGray_WM/MapServer"
      ]
    },
    // {
    //   title: "English Dark Gray Geographic",
    //   id: "Basemap English Dark Gray Geographic coordinates",
    //   thumbnailImg: "./images/English Dark Gray Geographic.png",
    //   baseLayers: [
    //     "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_DarkGray_GCS/MapServer"
    //   ]
    // },
    // {
    //   title: "English Dark Gray Web Mercator",
    //   id: "Basemap English Dark Gray Web Mercator coordinates",
    //   thumbnailImg: "./images/English Dark Gray Web Mercator.png",
    //   baseLayers: [
    //     "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_DarkGray_WM/MapServer"
    //   ]
    // },
    // {
    //   title: "English light Gray Geographic",
    //   id: "Basemap English light Gray Geographic coordinates",
    //   thumbnailImg: "./images/English light Gray Geographic.png",
    //   baseLayers: [
    //     "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_LightGray_GCS/MapServer"
    //   ]
    // },
    // {
    //   title: "English light Gray Web Mercator",
    //   id: "Basemap English light Gray Web Mercator coordinates",
    //   thumbnailImg: "./images/English Light Gray Web Mercator.png",
    //   baseLayers: [
    //     "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_LightGray_WM/MapServer"
    //   ]
    // },
    {
      title: "Satellite imagery",
      id: "Satellite imagery",
      thumbnailImg: "./images/Satellite Imagery.png",
      baseLayers: [
        "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_LightGray_WM/MapServer"
      ]
    },
  ],
  PortalUrl: "https://devedp.ead.ae/portal",
  ItemWebMapID: "a4f3e0fc881e41c8bc9f14ceb880374f",
  ItemWebMapIDEng: "1e4b6216e5f0496f8f28f5f1b830bb67",
  BaseUrl: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/MapServer"
};

export default config;
