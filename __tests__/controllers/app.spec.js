const request = require('supertest');
const mongoose = require('mongoose'); 

 const app = require("../../server")
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
     
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('/profile', () => {
  let tokenUser1;

  beforeAll(async () => {
    // Register and login User 1 to get the token
    const registerResponse = await request(app)
      .post('/auth/register')
      .send({ username: 'john_doe', password: 'password123' });

    expect(registerResponse.statusCode).toBe(200);

    const loginResponse = await request(app)
      .post('/auth//login')
      .send({ username: 'john_doe', password: 'password123' });

    expect(loginResponse.statusCode).toBe(200);
    tokenUser1 = loginResponse.body.token;
  });
}) 

//   test('GET /profile - View authenticated user\'s profile', async () => {
//     const response = await request(app)
//       .get('/profile')
//       .set('Authorization', `Bearer ${tokenUser1}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('_id');
//     expect(response.body).toHaveProperty('username', 'john_doe');
//     expect(response.body).toHaveProperty('password');
//     expect(response.body).toHaveProperty('bio', '');
//     expect(response.body).toHaveProperty('profilePictureURL', '');
//   });

//   test('GET /profile - Error when User ID is required', async () => {
//     const response = await request(app)
//       .get('/profile');

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toHaveProperty('error', 'User ID is required');
//   });

//   // Add more tests as needed for error handling and edge cases

// });

// // Add more describe blocks and tests as needed for other functionalities



  

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe('Follow Controller Tests', () => {
//   let tokenUser1, tokenUser2, userIdUser1, userIdUser2;

//   beforeAll(async () => {
//     // Register and login User 1
//     const registerResponseUser1 = await request(app)
//       .post('/register')
//       .send({ username: 'john_doe', password: 'password123' });

//     expect(registerResponseUser1.statusCode).toBe(200);

//     const loginResponseUser1 = await request(app)
//       .post('/login')
//       .send({ username: 'john_doe', password: 'password123' });

//     expect(loginResponseUser1.statusCode).toBe(200);
//     tokenUser1 = loginResponseUser1.body.token;
//     userIdUser1 = loginResponseUser1.body.user._id;

//     // Register and login User 2
//     const registerResponseUser2 = await request(app)
//       .post('/register')
//       .send({ username: 'jane_doe', password: 'password456' });

//     expect(registerResponseUser2.statusCode).toBe(200);

//     const loginResponseUser2 = await request(app)
//       .post('/login')
//       .send({ username: 'jane_doe', password: 'password456' });

//     expect(loginResponseUser2.statusCode).toBe(200);
//     tokenUser2 = loginResponseUser2.body.token;
//     userIdUser2 = loginResponseUser2.body.user._id;
//   });

//   describe('followUser', () => {
//     test('Follow User - Success', async () => {
//       const response = await request(app)
//         .post(`/follow/${userIdUser2}`)
//         .set('Authorization', `Bearer ${tokenUser1}`);

//       expect(response.statusCode).toBe(200);
//       expect(response.body).toHaveProperty('message', 'User followed successfully');
//     });

//     test('Follow User - Invalid User ID format', async () => {
//       const response = await request(app)
//         .post('/follow/invalidUserId')
//         .set('Authorization', `Bearer ${tokenUser1}`);

//       expect(response.statusCode).toBe(400);
//       expect(response.body).toHaveProperty('error', 'Invalid User ID format');
//     });

//     // Add more tests as needed
//   });

//   describe('unfollowUser', () => {
//     test('Unfollow User - Success', async () => {
//       const response = await request(app)
//         .post(`/unfollow/${userIdUser2}`)
//         .set('Authorization', `Bearer ${tokenUser1}`);

//       expect(response.statusCode).toBe(200);
//       expect(response.body).toHaveProperty('message', 'User unfollowed successfully');
//     });

//     // Add more tests as needed
//   });

//   describe('getFollowers', () => {
//     test('Get Followers - Success', async () => {
//       const response = await request(app)
//         .get(`/followers/${userIdUser1}`);

//       expect(response.statusCode).toBe(200);
//       // Add assertions for the response body based on your expected data
//     });

//     test('Get Followers - Invalid User ID format', async () => {
//       const response = await request(app)
//         .get('/followers/invalidUserId');

//       expect(response.statusCode).toBe(400);
//       expect(response.body).toHaveProperty('error', 'Invalid User ID format');
//     });

//     // Add more tests as needed
//   });

//   describe('getFollowing', () => {
//     test('Get Following - Success', async () => {
//       const response = await request(app)
//         .get(`/following/${userIdUser1}`);

//       expect(response.statusCode).toBe(200);
//       // Add assertions for the response body based on your expected data
//     });

//     // Add more tests as needed
//   });

//   describe('getCurrentUserFollowersList', () => {
//     test('Get Current User Followers List - Success', async () => {
//       const response = await request(app)
//         .get('/currentuser/followers')
//         .set('Authorization', `Bearer ${tokenUser1}`);

//       expect(response.statusCode).toBe(200);
//       // Add assertions for the response body based on your expected data
//     });

//     // Add more tests as needed
//   });

//   describe('getCurrentUserFollowingList', () => {
//     test('Get Current User Following List - Success', async () => {
//       const response = await request(app)
//         .get('/currentuser/following')
//         .set('Authorization', `Bearer ${tokenUser1}`);

//       expect(response.statusCode).toBe(200);
//       // Add assertions for the response body based on your expected data
//     });

//     // Add more tests as needed
//   });

// });
