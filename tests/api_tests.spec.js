import { test, expect } from '@playwright/test';
import axios from 'axios';
import * as fs from 'node.fs';

// Test data
const baseURL = "https://jsonplaceholder.typicode.com";

// Describer Container (Test Suite)
test.describe.parallel("API Tests", () => {

   // POST API Request
  test('API POST Request', async ({ request }) => {
    const response = await request.post(`${baseURL}/posts`, {
      ignoreHTTPSErrors: true,
      data: {
        userId: 11,
        id: 101,
        title: "Jenny's Number",
        body: "Hey Jenny I've got your number. 867-5309."
      }
    });
    expect(response.status()).toBe(201); // 201 is the correct status code for resource creation
    const jsonResponse = await response.json();
    // Verifying that the response contains the properties sent in the request
    expect(jsonResponse).toHaveProperty('userId', 11);
    expect(jsonResponse).toHaveProperty('id', 101);
    expect(jsonResponse).toHaveProperty('title', "Jenny's Number");
    expect(jsonResponse).toHaveProperty('body', "Hey Jenny I've got your number. 867-5309.");
    console.log(jsonResponse);
  });

   // GET API Request
   test('API GET Request', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts`, {
      ignoreHTTPSErrors: true,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);

    //Data Manipulation
    // Reverse Order
    const reversedPosts = responseBody.reverse();
    console.log('Reversed posts:', reversedPosts);
    // Select Last 5 Posts
    const last5Posts = responseBody.slice(-5);
    console.log('Last 5 posts:', last5Posts);
    

   
  });

});