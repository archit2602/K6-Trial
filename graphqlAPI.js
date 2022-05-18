import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://graphql.lottiefiles.com';

export const options = {
    stages: [
      { duration: '50s', target: 999 },
      { duration: '5s', target: 5 },
    ],
  };

  export default function () {
    const query = `
    {
    featuredToday{ 
      name
      id
     }
    }`;
     let res = http.post(
         BASE_URL,
         JSON.stringify({ query: query}),
         { headers:{"Content-Type": "application/json"}}
     );
    check(res, { 
        'status was 200': (r) => r.status == 200,
        'test validation': (r) => r.body.includes("name")
     });
    sleep(1);
  }
