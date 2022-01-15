const storage = {
  initialize(storage) {
    this.storageRef = storage.ref();
  },

  async upload(file) {
    const ref = this.storageRef.child(file.name);
    var downloadURL;

    await ref.put(file).then(async snapshot => {
      await snapshot.ref.getDownloadURL().then(url => {
        downloadURL = url;
      });
    });

    return downloadURL;
  }
};

export default storage;
