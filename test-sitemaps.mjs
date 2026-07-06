import http from 'http';
import https from 'https';

const checkUrl = (url) => {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => resolve(0));
  });
};

(async () => {
  let count200 = 0;
  for (let i = 0; i < 1000; i++) {
    const status = await checkUrl(`http://localhost:3000/sitemap/${i}.xml`);
    if (status === 200) {
      count200++;
    } else {
      console.log(`sitemap/${i}.xml returned ${status}`);
    }
  }
  console.log(`Total 200 OK: ${count200}`);
})();
