import assert from "node:assert/strict";
import test from "node:test";
import {
  clientProjects,
  coreProjects,
  getProject,
  projects,
} from "../src/projectData.js";

test("publishes a unique case-study route for every featured project", () => {
  assert.equal(projects.length, 5);
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.equal(getProject(project.slug), project);
    assert.ok(project.summary);
    assert.ok(project.media.startsWith("/images/projects/"));
    assert.ok(project.repoUrl.startsWith("https://github.com/GYASH28/"));
  }
});
test("separates Fakhri Mart from independent work as the client project", () => {
  assert.deepEqual(clientProjects.map((project) => project.slug), ["fakhri-mart"]);
  assert.ok(coreProjects.every((project) => !project.client));
  assert.ok(!coreProjects.some((project) => project.slug === "fakhri-mart"));
});

test("uses live iframes only where a public deployment allows framing", () => {
  const liveEmbeds = projects.filter((project) => project.embed === "live");
  assert.deepEqual(
    liveEmbeds.map((project) => project.slug).sort(),
    ["campusmate", "fakhri-mart", "interactive-quiz"],
  );
  assert.ok(liveEmbeds.every((project) => project.liveUrl));
  assert.equal(getProject("lernio-ai").embed, "protected");
  assert.equal(getProject("brace").embed, "local");
  assert.equal(getProject("brace").liveUrl, undefined);
});
