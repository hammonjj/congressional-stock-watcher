async function getTransactionReports() {
    fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/filemap.xml")
      .then((response) => response.text())
      .then((response) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response, "text/xml");
        const results = [].slice
          .call(xml.getElementsByTagName("Key"))
          .filter((key) => key.textContent.includes(".json"));
        const files = results.map((file) => file.textContent.split("/")[1]);
        return files;
        //setTransactionReports(files);
      });
}

export default getTransactionReports;