FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
  FilePondPluginImageTransform

  // FilePondPluginFileMetadata,
  // FilePondPluginFileValidateType,
);

const inputElement = document.querySelector("input[type='file']");

FilePond.setOptions(inputElement, {
  // stylePanelAspectRatio: 1,
  imageResizeTargetWidth: 250,
  imageResizeTargetHeight: 250,
  //imagePreviewMaxFileSize: 1,
});

FilePond.create(inputElement, {
  imageCropAspectRatio: "1:1",
  imageResizeTargetWidth: 250,
  imageResizeTargetHeight: 250,
  onaddfile: (err, fileItem) => {
    console.log(err, fileItem.getMetadata("resize"));
  },
  // imageTransformVariants: {
  //   coverImage: (transforms) => {
  //     transforms.resize = {
  //       size: {
  //         width: 400,
  //         height: 300,
  //       },
  //     };
  //     return transforms;
  //   },
  // },
});

// FilePond.create(inputElement, {
//   labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
//   imagePreviewHeight: 170,
//   imageCropAspectRatio: "1:1",
//   imageResizeTargetWidth: 200,
//   imageResizeTargetHeight: 200,
// });

FilePond.parse(document.body);
