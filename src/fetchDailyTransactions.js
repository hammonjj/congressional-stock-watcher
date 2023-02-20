async function fetchDailyTransactions() {
  /*
  fetch('https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/filemap.xml')
    .then((response) => response.text())
    .then((response) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(response, 'text/xml');
      const results = [].slice.call( xml.getElementsByTagName('Key') ).filter((key) => key.textContent.includes('.json'));
      const files = results.map(file => file.textContent.split('/')[1]);
      console.log(`Results: ${results} - Files: ${files}`);
      return files;
  })
  .catch((response) => {
    console.log(response)
  })
  */

  const res = await fetch('https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/filemap.xml');
  const resText = res.text;
  const parser = new DOMParser();
  const xml = parser.parseFromString(resText, 'text/xml');
  const results = [].slice.call( xml.getElementsByTagName('Key') ).filter((key) => key.textContent.includes('.json'));
  const files = results.map(file => file.textContent.split('/')[1]);
  console.log(`Results: ${results} - Files: ${files}`);

  return files;






  /*
  const { animal, location, breed } = queryKey[1];
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!res.ok)
    throw new Error(`pet search not okay: ${animal}, ${location}, ${breed}`);

  return res.json();
  */
}

export default fetchDailyTransactions;
