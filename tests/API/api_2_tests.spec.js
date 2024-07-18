import { test, expect } from "@playwright/test";
const axios = require('axios');
const fs = require('fs');

//API URL
const baseURL = "https://jsonplaceholder.typicode.com";

//Test Case 1 - GET API Request - reach out to base URL and return success status code 200
   test('API GET Request', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts`, {
      ignoreHTTPSErrors: true,
    });
//Assertion - Success code
    expect(response.status()).toBe(200);
    console.log(response.status());
   });

//Test Case 2 - POST using API
test('API POST Request', async ({ request }) => {
  const response = await request.post(`${baseURL}/posts`, {
    ignoreHTTPSErrors: true,
    data: {
      userId: 11,
      id: 101,
      title: "FLORIDA MAN: The hero America never knew they needed",
      body: "Only in Florida could such a hero like this emerge and be praised by the nation."
    }
  });
  expect(response.status()).toBe(201); // 201 status code for resource creation
  const jsonResponse = await response.json();
  // Assertions - Verifying that the response contains the properties sent in the request
  expect(jsonResponse).toHaveProperty('userId', 11);
  expect(jsonResponse).toHaveProperty('id', 101);
  expect(jsonResponse).toHaveProperty('title', "FLORIDA MAN: The hero America never knew they needed");
  expect(jsonResponse).toHaveProperty('body', "Only in Florida could such a hero like this emerge and be praised by the nation.");
  console.log(jsonResponse);
  });


//Test Case 3 - Workflow usuage - Get Data Manipulation Reverse Data and Save as Artifact
