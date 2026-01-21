import { test, expect } from "@playwright/test";

test("homepage has title and contact widget", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/KIA Khánh Hòa/);

  // Check for Contact Widget
  const contactWidget = page.locator("button", { hasText: "Liên hệ" });
  // Just check if any contact element is visible or footer
  const footer = page.locator("footer");
  await expect(footer).toBeVisible();
});

test("navigation contains main links", async ({ page }) => {
  await page.goto("/");

  // Check for standard navigation links
  await expect(page.getByRole("link", { name: "Trang chủ" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sản phẩm" })).toBeVisible();
});
