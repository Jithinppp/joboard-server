# joboard-server

// 1 get a single job collection: /api/job/d7440dc6-7abb-4702-bec9-7c646b3082ab ✅
// 2 get limited number of jobs collection (no pagination): /api/jobs/get-few/?limit=10 ✅
// 3 get jobs collection with pagination (page=1,2,3....): /api/jobs?limit=10&page=1 ✅
// 4 get jobs collection with queryStr (page=1,2,3....): /api/jobs/search?q=hr&limit=10&page=1 ✅

- 1 /api/job/:id
- 2 /api/jobs/get-few
- 3 /api/jobs
- 4 /api/jobs/search
