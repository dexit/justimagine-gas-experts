import { notFound as routerNotFound } from "@tanstack/react-router";

export function notFound() {
  throw routerNotFound();
}
