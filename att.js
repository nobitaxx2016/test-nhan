const url = $request.url;

if (url.includes("https://autotouch.net/license/check")) {
  const body = {
    licensed: true,
    expires_at: 9999999999
  };

  $done({
    body: JSON.stringify(body)
  });
} else {
  $done({});
}
