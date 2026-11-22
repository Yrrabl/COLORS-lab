
describe("COLORS Lab API integration tests", () => {
  test("SearchColors.php returns valid JSON", async () => {
    const response = await fetch(
      "http://colorslabcop4331.xyz/LAMPAPI/SearchColors.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: "Blue",
          userId: 0,
        }),
      }
    );

    expect(response.ok).toBe(true);

    const data = await response.json();

    expect(data).toBeDefined();
    expect(typeof data).toBe("object");
    expect(Array.isArray(data)).toBe(false);
  });
});
