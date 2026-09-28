const url = $request.url;

if (url.includes("https://autotouch.net/license/check")) {
  const body = {"licensed":true,"expires_at":0,"device_hash":"856E06255BD99B66","nonce":"1d82d56bdd891d6eaf880755597da629","checked_at":1790625983,"sig":"MEYCIQCjfS9W25D6dCsQkUew4VqglqJVRMD5MTRNBSyWjoDyOAIhAMCqAREpISdV6ar5WHi5ohteisde2JXch6jIjChb4hDf"}


  $done({
    body: JSON.stringify(body)
  });
} else {
  $done({});
}
