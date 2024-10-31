import { expect, test } from "vitest";

test("returns correct weekday", async () => {
  const res = await fetch("http://localhost:3000/weekday?date=03/01/2023");
  const data = await res.json();
  expect(data.weekday).toBe("Wednesday");
});

test("rejects missing query parameter", async () => {
  const res = await fetch("http://localhost:3000/weekday");
  expect(res.status).toBe(400);
});

test("rejects unparseable date string", async () => {
  const res = await fetch("http://localhost:3000/weekday?date=foobar");
  expect(res.status).toBe(400);
});
