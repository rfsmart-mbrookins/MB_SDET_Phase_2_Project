import { test, expect } from "@playwright/test";
const fs = require("fs");
const path = require("path");

/*Base URL*/
const baseURL = "https://jsonplaceholder.typicode.com";

/* Test Describe (Script) */
test.describe("API Tests", () => {
  /*Test Case 1*/
  // GET Request
  test("API GET Request", async ({ request }) => {
    const response = await request.get(`${baseURL}/posts`, {
      ignoreHTTPSErrors: true,
    });
    expect(response.status()).toBe(200);
    console.log(response.status());
  });

  /*Test Case 2*/
  //POST Request
  test("API POST Request", async ({ request }) => {
    const response = await request.post(`${baseURL}/posts`, {
      ignoreHTTPSErrors: true,
      data: {
        userId: 11,
        id: 101,
        title: "JavaScript for Dummies",
        body: "Learn JavaScript the easy way with JavaScript for Dummies...",
      },
    });
    expect(response.status()).toBe(201);
    const jsonResponse = await response.json();
    expect(jsonResponse).toHaveProperty("userId", 11);
    expect(jsonResponse).toHaveProperty("id", 101);
    expect(jsonResponse).toHaveProperty("title", "JavaScript for Dummies");
    expect(jsonResponse).toHaveProperty(
      "body",
      "Learn JavaScript the easy way with JavaScript for Dummies..."
    );
    console.log(jsonResponse);
  });

  /*Test Cases 3 and 4*/
  //Workflow (GET Data, Reverse Order, Select Last 5 Posts, Save Last 5 as Artifact)
  test("Workflow", async ({ request }) => {
    const response = await request.get(`${baseURL}/posts`, {
      ignoreHTTPSErrors: true,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    responseBody.forEach((post) => {
      expect(post).toHaveProperty("userId");
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("body");
    });
    //Data Manipulation - Reverse Order
    const reversedPosts = responseBody.reverse();
    reversedPosts.forEach((post) => {
      expect(post).toHaveProperty("userId");
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("body");
    });
    // Select Last 5 Posts from reversed posts
    const last5Posts = responseBody.slice(-5);
    last5Posts.forEach((post) => {
      expect(post).toHaveProperty("userId");
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("body");
    });
    console.log("Last 5 posts:", last5Posts);
    //Save last 5 posts as an artifact to "Artifacts" directory
    const artifactDir = path.resolve(__dirname, "Artifacts");
    if (!fs.existsSync(artifactDir)) {
      fs.mkdirSync(artifactDir);
    }
    const artifactPath = path.resolve(artifactDir, "last5Posts.json");
    fs.writeFileSync(artifactPath, JSON.stringify(last5Posts, null, 2));
    const artifactPosts = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
    console.log(`Last 5 posts saved to ${artifactPath}`);
    artifactPosts.forEach((post) => {
      expect(post).toHaveProperty("userId");
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("body");
    });
  });
});
