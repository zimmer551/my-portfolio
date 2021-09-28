const projectImages = {
  snapteam: require.context(
    `../../assets/images/projectImages/snapteam`,
    false,
    /.*\.png$/
  ),
  pulse: require.context(
    `../../assets/images/projectImages/pulse`,
    false,
    /.*\.png$/
  ),
  measure: require.context(
    `../../assets/images/projectImages/measure`,
    false,
    /.*\.png$/
  ),
  wakency: require.context(
    `../../assets/images/projectImages/wakency`,
    false,
    /.*\.png$/
  ),
  benefactory: require.context(
    `../../assets/images/projectImages/benefactory`,
    false,
    /.*\.png$/
  ),
  lighthouse: require.context(
    `../../assets/images/projectImages/lighthouse`,
    false,
    /.*\.png$/
  ),
  nykaa: require.context(
    `../../assets/images/projectImages/nykaa`,
    false,
    /.*\.png$/
  ),

  vc_music_player: require.context(
    `../../assets/images/projectImages/vc_music_player`,
    false,
    /.*\.png$/
  ),
  CCT: require.context(
    `../../assets/images/projectImages/connected_Clinical_Trials`,
    false,
    /.*\.png$/
  ),
  myProject_1: require.context(
    `../../assets/images/projectImages/myProject_1`,
    false,
    /.*\.png$/
  ),
  myProject_2: require.context(
    `../../assets/images/projectImages/myProject_2`,
    false,
    /.*\.png$/
  ),
  myProject_3: require.context(
    `../../assets/images/projectImages/myProject_3`,
    false,
    /.*\.png$/
  ),
  myProject_4: require.context(
    `../../assets/images/projectImages/myProject_4`,
    false,
    /.*\.png$/
  ),
  myProject_5: require.context(
    `../../assets/images/projectImages/myProject_5`,
    false,
    /.*\.png$/
  ),
  myProject_6: require.context(
    `../../assets/images/projectImages/myProject_6`,
    false,
    /.*\.png$/
  ),
  microcontrollers: require.context(
    `../../assets/images/projectImages/microcontrollers`,
    false,
    /.*\.png$/
  ),
};

export const getProjectImages = (id) => {
  if (!id) return [];
  console.log("id >", id);
  const images = projectImages[id];
  const extractedImages = [];
  images.keys().forEach((key, index) => {
    const image = images(key);
    // extracts filename with extension for id
    const id = key
      .substring(0, key.lastIndexOf("."))
      .substring(key.lastIndexOf("/") + 1);

    extractedImages.push({ image, id, index });
  });
  return extractedImages;
};

// used to explicitly specify a image ratio to be show in grid
export const imageSpecificRatio = {
  wakency: [{ id: "1", ratioWidth: 3, ratioHeight: 1 }],
  benefactory: [{ id: "1", ratioWidth: 2, ratioHeight: 1 }],
  nykaa: [
    { id: "1", ratioWidth: 3, ratioHeight: 1 },
    { id: "5", ratioWidth: 3, ratioHeight: 1 },
  ],
};
